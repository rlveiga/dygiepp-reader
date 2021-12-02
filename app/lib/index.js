const Visualizer = require("./visualizer.js");

const args = process.argv;
const model = args[2];

if(!model) {
    console.error('Please provide a model (yarn start <model name>)');
    process.exit();
}

const whitepaperVisualizer = new Visualizer(`./lib/data/${model}/whitepaper.jsonl`);
const academicVisualizer = new Visualizer(`./lib/data/${model}/academic.jsonl`);
const wikiVisualizer = new Visualizer(`./lib/data/${model}/wiki.jsonl`);

whitepaperVisualizer.initializeEntityDict(false);
academicVisualizer.initializeEntityDict();
wikiVisualizer.initializeEntityDict();

console.log(whitepaperVisualizer.getDocumentKeys())