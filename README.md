# CodeAlpha Language Translation Tool

A responsive web-based language translation application built using HTML, CSS and JavaScript. It uses the MyMemory Translation API to translate text between supported languages.

## Features
- Source and target language selection
- Translation through a real translation API
- Swap languages
- Copy translated text
- Clear input and character counter
- Responsive interface and basic error handling

## Technologies
HTML5, CSS3, JavaScript (Fetch API), MyMemory Translation API.

## Run locally
1. Download or clone this repository.
2. Open the folder in VS Code.
3. Start a local server (recommended): install the VS Code **Live Server** extension, right-click `index.html`, and select **Open with Live Server**.
4. Enter text, choose languages and click **Translate text**.

You can also use Python's built-in server from this folder:
```bash
python -m http.server 5500
```
Then visit `http://localhost:5500`.

## API
The project calls `https://api.mymemory.translated.net/get` using the browser Fetch API. Internet access is required. The public service has usage limits and translation quality/availability may vary. Do not submit sensitive or confidential text to a public translation service.

## Project flow
1. User enters text and selects source and target languages.
2. JavaScript validates the input.
3. The selected language pair and text are sent to MyMemory using Fetch.
4. The JSON response is parsed.
5. The translated text is displayed in the output panel.

## CodeAlpha task mapping
This project implements the Language Translation Tool task: text input, language selection, translation API request, translated output, and optional copy functionality.
