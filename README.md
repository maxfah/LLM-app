# LLM-app

LLM-app aims to simplify the process of generating responses as .docx from advanced language models, providing a clean and intuitive interface for users.

### Features
* **Integration with LM Studio:** Seamlessly connects to LM Studio for advanced language model capabilities.
* **Electron GUI:** Offers a desktop application interface powered by Electron for easy use.

### Prerequisites
* [Node.js](https://nodejs.org/en)
* [Pandoc](https://pandoc.org/installing.html)
* [LM Studio](https://lmstudio.ai/)

## Getting Started

### 0. Bootstrapping LM Studio

To use LM Studio, you need to run it at least once. After that, follow the instructions below based on your operating system to bootstrap LMS.

#### Mac / Linux

Open your terminal and run the following command:

```sh
~/.cache/lm-studio/bin/lms bootstrap
```

#### Windows

Open Command Prompt and run the following command:

```cmd
cmd /c %USERPROFILE%/.cache/lm-studio/bin/lms.exe bootstrap
```
### 1. Clone the Repository

```bash
git clone https://github.com/maxfah/LLM-app.git
cd LLM-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Enable LM Studio

To interact with LM Studio, you should start the LM Studio local server with the command:

```bash
lms server start
```

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
