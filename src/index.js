import Visualizer from "./lib/visualizer.js";
import glossary from "./lib/glossary.js";

const whitepaperVisualizer = new Visualizer('./data/whitepaper.jsonl');
const academicVisualizer = new Visualizer('./data/academic.jsonl');
const wikiVisualizer = new Visualizer('./data/wiki.jsonl');

whitepaperVisualizer.initializeEntityDict();
academicVisualizer.initializeEntityDict();
wikiVisualizer.initializeEntityDict();

let glossaryEntities = whitepaperVisualizer.getGlossaryEntitiesWithAlias();
console.log(`Detected ${Object.keys(glossaryEntities).length} out of ${glossary.length} terms as entities on whitepaper corpus (${(Object.keys(glossaryEntities).length / glossary.length).toFixed(2) * 100}%)`)