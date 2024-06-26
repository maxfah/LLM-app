# LLM-app

LLM-app aims to simplify the process of generating responses as .docx from advanced language models, providing a clean and intuitive interface for users.

### Features
* **Integration with LM Studio:** Seamlessly connects to LM Studio for advanced language model capabilities.
* **Electron GUI:** Offers a desktop application interface powered by Electron for easy use.

### Created with LM Studio scaffold.

This scaffold is a starting point for building an AI-enabled Node.js project with [LM Studio](https://lmstudio.ai/) SDK. To interact with LM Studio, you should start the LM Studio local server with the command:

```bash
lms server start
```

### Prerequisites
* Node.js and npm
* Pandoc (for document conversions)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/maxfah/LLM-app.git
cd llm-studio-gui
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Pandoc

[Pandoc Installation Guide](https://pandoc.org/installing.html)

## Usage

The source code resides in the `src/` directory. For development purposes, you can run the project using:

```start
npm start
```

### Building for Production

To prepare your project for production, compile the TypeScript code to JavaScript using:

```bash
npm run build
```

This will compile the TypeScript code in the `src/` directory to JavaScript in the `dist/` directory.

### Community & Help

- [lmstudio.js GitHub](https://github.com/lmstudio-ai/lmstudio.js)
- [Documentation](https://lmstudio.ai/docs/welcome)
- [Discord](https://discord.gg/6Q7Xn6MRVS)
- [Twitter](https://twitter.com/LMStudioAI)
