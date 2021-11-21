import Visualizer from "../lib/visualizer.js";
import glossary from "../lib/glossary.js";

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

// Entities
// Whitepaper corpus glossary analysis
let glossaryEntities = whitepaperVisualizer.getGlossaryEntitiesWithAlias();
console.log(`Detected ${Object.keys(glossaryEntities).length} out of ${glossary.length} terms as entities on scierc whitepaper corpus (${(Object.keys(glossaryEntities).length / glossary.length).toFixed(2) * 100}%)`)

let glossaryEntitiesLightweight = whitepaperVisualizerLightweight.getGlossaryEntitiesWithAlias();
console.log(`Detected ${Object.keys(glossaryEntitiesLightweight).length} out of ${glossary.length} terms as entities on scierc_lightweight whitepaper corpus (${(Object.keys(glossaryEntitiesLightweight).length / glossary.length).toFixed(2) * 100}%)`)

// Academic corpus glossary analysis
glossaryEntities = academicVisualizer.getGlossaryEntitiesWithAlias();
console.log(`Detected ${Object.keys(glossaryEntities).length} out of ${glossary.length} terms as entities on scierc academic corpus (${(Object.keys(glossaryEntities).length / glossary.length).toFixed(2) * 100}%)`)

glossaryEntitiesLightweight = academicVisualizerLightweight.getGlossaryEntitiesWithAlias();
console.log(`Detected ${Object.keys(glossaryEntitiesLightweight).length} out of ${glossary.length} terms as entities on scierc_lightweight academic corpus (${(Object.keys(glossaryEntitiesLightweight).length / glossary.length).toFixed(2) * 100}%)`)

// Wiki corpus glossary analysis
glossaryEntities = wikiVisualizer.getGlossaryEntitiesWithAlias();
console.log(`Detected ${Object.keys(glossaryEntities).length} out of ${glossary.length} terms as entities on scierc wiki corpus (${(Object.keys(glossaryEntities).length / glossary.length).toFixed(2) * 100}%)`)

glossaryEntitiesLightweight = wikiVisualizerLightweight.getGlossaryEntitiesWithAlias();
console.log(`Detected ${Object.keys(glossaryEntitiesLightweight).length} out of ${glossary.length} terms as entities on scierc_lightweight wiki corpus (${(Object.keys(glossaryEntitiesLightweight).length / glossary.length).toFixed(2) * 100}%)`)

// Relations
glossary.forEach(word => {
  if (
    !whitepaperVisualizer.entityDict[word] ||
    !whitepaperVisualizerLightweight.entityDict[word]
  ) {
    return;
  }

  console.log(`Detected ${whitepaperVisualizer.entityDict[word].relations.length} relations for ${word} on scierc whitepaper corpus`);
  console.log(`Detected ${whitepaperVisualizerLightweight.entityDict[word].relations.length} relations for ${word} on scierc_lightweight whitepaper corpus`);
  
  if (
    !academicVisualizer.entityDict[word] ||
    !academicVisualizerLightweight.entityDict[word]
  ) {
    return;
  }

  console.log(`Detected ${academicVisualizer.entityDict[word].relations.length} relations for ${word} on scierc academic corpus`);
  console.log(`Detected ${academicVisualizerLightweight.entityDict[word].relations.length} relations for ${word} on scierc_lightweight academic corpus`);

  if (
    !wikiVisualizer.entityDict[word] ||
    !wikiVisualizerLightweight.entityDict[word]
  ) {
    return;
  }

  console.log(`Detected ${wikiVisualizer.entityDict[word].relations.length} relations for ${word} on scierc wiki corpus`);
  console.log(`Detected ${wikiVisualizerLightweight.entityDict[word].relations.length} relations for ${word} on scierc_lightweight wiki corpus`);
})