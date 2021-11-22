import Visualizer from "../lib/visualizer.js";
import glossary from "../lib/glossary.js";

const args = process.argv;
const model = args[2];
const useAliases = args[3] == 'false' ? false : true;

if (!model) {
  console.error('Please provide a model (yarn start <model name>)');
  process.exit();
}

console.log(`Running analysis ${useAliases ? 'with' : 'without'} the use of aliases...`)

const whitepaperVisualizer = new Visualizer(`./data/${model}/whitepaper.jsonl`);
const academicVisualizer = new Visualizer(`./data/${model}/academic.jsonl`);
const wikiVisualizer = new Visualizer(`./data/${model}/wiki.jsonl`);

whitepaperVisualizer.initializeEntityDict(useAliases);
academicVisualizer.initializeEntityDict(useAliases);
wikiVisualizer.initializeEntityDict(useAliases);

// Entities
// Whitepaper corpus glossary analysis
let glossaryEntities = whitepaperVisualizer.getGlossaryEntities();
console.log(`Detected ${Object.keys(glossaryEntities).length} out of ${glossary.length} terms as entities on ${model} whitepaper corpus (${(Object.keys(glossaryEntities).length / glossary.length).toFixed(2) * 100}%)`)

let missingTerms = [];
glossary.forEach(word => {
  if(!whitepaperVisualizer.entityDict[word]) {
    missingTerms.push(word)
  }
})

console.log(`Missing glossary terms for whitepaper corpus:`);
missingTerms.forEach(word => {
  console.log(word)
})

// Academic corpus glossary analysis
glossaryEntities = academicVisualizer.getGlossaryEntities();
console.log(`Detected ${Object.keys(glossaryEntities).length} out of ${glossary.length} terms as entities on ${model} academic corpus (${(Object.keys(glossaryEntities).length / glossary.length).toFixed(2) * 100}%)`)

missingTerms = [];
glossary.forEach(word => {
  if(!academicVisualizer.entityDict[word]) {
    missingTerms.push(word)
  }
})

console.log(`Missing glossary terms for academic corpus:`);
missingTerms.forEach(word => {
  console.log(word)
})

// Wiki corpus glossary analysis
glossaryEntities = wikiVisualizer.getGlossaryEntities();
console.log(`Detected ${Object.keys(glossaryEntities).length} out of ${glossary.length} terms as entities on ${model} wiki corpus (${(Object.keys(glossaryEntities).length / glossary.length).toFixed(2) * 100}%)`)

missingTerms = [];
glossary.forEach(word => {
  if(!wikiVisualizer.entityDict[word]) {
    missingTerms.push(word)
  }
})

console.log(`Missing glossary terms for wiki corpus:`);
missingTerms.forEach(word => {
  console.log(word)
})

// Relations
let whitepaperRelationCount = 0;
let academicRelationCount = 0;
let wikiRelationCount = 0;

glossary.forEach(word => {
  if (whitepaperVisualizer.entityDict[word]) {
    whitepaperRelationCount += whitepaperVisualizer.entityDict[word].relations.length;
  }

  if (academicVisualizer.entityDict[word]) {
    academicRelationCount += academicVisualizer.entityDict[word].relations.length;
  }

  if (wikiVisualizer.entityDict[word]) {
    wikiRelationCount += wikiVisualizer.entityDict[word].relations.length;
  }
})

console.log(`Detected ${whitepaperRelationCount} relations for glossary terms on whitepaper corpus`);
console.log(`Detected ${academicRelationCount} relations for glossary terms on academic corpus`);
console.log(`Detected ${wikiRelationCount} relations for glossary terms on wiki corpus`);

console.log(`Detected ${whitepaperRelationCount + academicRelationCount + wikiRelationCount} relations for glossary terms`);