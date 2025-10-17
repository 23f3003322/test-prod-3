# Markdown to HTML (GitHub Pages ready)

This static site renders Markdown from the provided attachment and displays the rendered HTML inside the element with id `markdown-output`.

What it does
- Loads the Markdown input from the attachment via a data: URL
- Converts Markdown to HTML using a lightweight Markdown function named `marked` (included in the repo)
- Renders the result inside the #markdown-output container
- Loads a tiny highlight.js shim to mark code blocks (no external dependencies required)

How it works
1. The page loads two script files: assets/marked.min.js and assets/highlight.js
2. scripts/main.js fetches the input.md data URI, runs marked(md) to convert to HTML, and injects it into #markdown-output
3. After rendering, all code blocks are passed to hljs.highlightBlock to simulate syntax highlighting (styling is provided by CSS)

Attachment usage
- The input markdown is provided as a data: URL in the JavaScript file (see scripts/main.js). The project uses this to stay fully self-contained for GitHub Pages.

Usage
- Open index.html directly or host on GitHub Pages. The page will render automatically on load.

Development notes
- The markdown parser included here is a small, production-friendly subset focused on the needs of this brief (headings, bold/italic, code blocks).
- For full markdown support, swap in a complete Marked.js library and a real highlight.js integration.

License
- This project is MIT licensed. See LICENSE for details.
