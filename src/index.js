import Visualizer from "./lib/visualizer.js";
import glossary from "./lib/glossary.js";

const whitepaperVisualizer = new Visualizer('./data/scierc/whitepaper.jsonl');
const academicVisualizer = new Visualizer('./data/scierc/academic.jsonl');
const wikiVisualizer = new Visualizer('./data/scierc/wiki.jsonl');

const whitepaperVisualizerLightweight = new Visualizer('./data/scierc_lightweight/whitepaper.jsonl');
const academicVisualizerLightweight = new Visualizer('./data/scierc_lightweight/academic.jsonl');
const wikiVisualizerLightweight = new Visualizer('./data/scierc_lightweight/wiki.jsonl');

whitepaperVisualizer.initializeEntityDict();
academicVisualizer.initializeEntityDict();
wikiVisualizer.initializeEntityDict();

whitepaperVisualizerLightweight.initializeEntityDict();
academicVisualizerLightweight.initializeEntityDict();
wikiVisualizerLightweight.initializeEntityDict();

console.log(academicVisualizer.entityDict['next - generation cryptocurrencies'].relations)
// console.log('\n')
// console.log(academicVisualizerLightweight.entityDict['smart-contract'].relations)