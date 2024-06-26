const { ipcRenderer } = require('electron');
const fs = require('fs');
const showdown  = require('showdown');
const converter = new showdown.Converter();
const mammoth = require('mammoth');

ipcRenderer.on('update-response', (event, markdownText) => {
    const htmlContent = converter.makeHtml(markdownText);
    document.getElementById('response-output').innerHTML = htmlContent;
});

// Handle file input change event
document.getElementById('docx-file').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Read file content
    fs.readFile(file.path, (err, data) => {
        if (err) {
            ipcRenderer.send('conversion-error', err.message);
            return;
        }

        // Process file content using Mammoth
        mammoth.extractRawText({ buffer: data })
            .then(result => {
                const text = result.value;  // Extracted text from DOCX
                document.getElementById('input').innerHTML = text;
                document.getElementById('docx-file').value = '';
                // Example: Send extracted text to main process for further processing
                // // ipcRenderer.send('submit', text);
            })
            .catch(error => {
                ipcRenderer.send('conversion-error', error.message);
                // Handle error, e.g., display error message to user
            });
    });
});


document.getElementById('submit-btn').addEventListener('click', () => {
    const input = document.getElementById('input').value;

    if (!input) {
        alert('Please enter text or upload a DOCX file.');
    } else {
        ipcRenderer.send('submit', input);
    }
});

ipcRenderer.on('conversion-success', (event, outputFilePath) => {
    document.getElementById('message').textContent = 'Conversion successful!';
    
    // Show the download button and attach the file path to it
    const downloadBtn = document.getElementById('download-btn');
    downloadBtn.style.display = 'block';
    downloadBtn.onclick = () => {
        const link = document.createElement('a');
        link.href = outputFilePath;
        link.download = 'output.docx';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
});

ipcRenderer.on('conversion-error', (event, errorMessage) => {
    document.getElementById('message').textContent = `Error: ${errorMessage}`;
    document.getElementById('download-btn').style.display = 'none';
});