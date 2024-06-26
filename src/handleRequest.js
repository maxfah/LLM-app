const { exec } = require('child_process');
const { LMStudioClient } = require("@lmstudio/sdk");
const path = require('path');
const fs = require('fs');

module.exports = async (event, input) => {
    const client = new LMStudioClient();
    const model = await client.llm.load("lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF");

    // Predict!
    const prediction = model.respond([
        { 
            role: "system", 
            content: `You are a helpful AI assistant. 
                      - Always use markdown formatting.
                      - Format markdown headings correctly and logically
                      - Use LaTeX format for math expressions if needed.
                      - Always place LaTeX math expressions on separate lines.
                      - Never put LaTeX in the middle of a sentence.
                      - For any math expression, enclose it in double dollar signs ($$) to ensure it is rendered properly.` 
        },
        { role: "user", content: input },
    ]);
    
    const inputFilePath = path.join(__dirname, 'output.md');
    const writeStream = fs.createWriteStream(inputFilePath);
    let output = "";
    for await (const text of prediction) {
        writeStream.write(text);
        output += text;
        event.reply('update-response', output); // Send update to renderer process
    }
    writeStream.end();

    const outputFilePath = path.join(__dirname, '..', 'output', 'output.docx');
    const pandocCommand = `pandoc ${inputFilePath} -o ${outputFilePath}`;
    exec(pandocCommand, (error, stdout, stderr) => {
        if (error) {
            event.reply('conversion-error', error.message);
            return;
        }
        if (stderr) {
            event.reply('conversion-error', stderr);
            return;
        }
        event.reply('conversion-success', outputFilePath);
    });
};