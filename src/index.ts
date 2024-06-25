import { LMStudioClient } from "@lmstudio/sdk";
import * as fs from 'fs';
import * as path from 'path';

async function main() {
    const prompt = require("prompt-sync")({ sigint: true });
  
    let resp = prompt("What is your request? ");

    // Create a client to connect to LM Studio, then load a model
    const client = new LMStudioClient();
    const model = await client.llm.load("lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF");

    // Predict!
    const prediction = model.respond([
    { role: "system", content: "You are a helpful AI assistant. Use markdown formatting. Use latex format for math. Make it brief." },
    { role: "user", content: resp },
    ]);
    
    // Write to output.md
    const mdFilePath = path.join(__dirname, 'output.md');
    const writeStream = fs.createWriteStream(mdFilePath);
    for await (const text of prediction) {
        writeStream.write(text);
    }
    writeStream.end();

    // Convert to docx
    const { exec } = require('child_process');
    const docxFilePath = path.join(__dirname, 'output.docx')
    const pandocCommand = `pandoc ${mdFilePath} -o ${docxFilePath}`;
    exec(pandocCommand);
    console.log(`Conversion successful! Output file: ${docxFilePath}`);
}

main();