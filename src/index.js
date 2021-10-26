import Visualizer from "./lib/visualizer.js";
import glossary from "./lib/glossary.js";

const whitepaperVisualizer = new Visualizer('../data/whitepaper.jsonl');
const academicVisualizer = new Visualizer('../data/academic.jsonl');

whitepaperVisualizer.initializeEntityDict();
academicVisualizer.initializeEntityDict();

const whitepaperFrequencyList = whitepaperVisualizer.getFrequencyList();
const academicFrequencyList = academicVisualizer.getFrequencyList();

console.log(whitepaperVisualizer.entityDict)
// let countMap = {};

// whitepaperFrequencyList.forEach(item => {
//   glossary.forEach(word => {
//     if (
//       item[0].includes(word.toLowerCase()) &&
//       !countMap[word]
//     ) {
//       console.log(word);
//       countMap[word] = true;
//       return;
//     }
//   })
// });

// academicFrequencyList.forEach(item => {
//   glossary.forEach(word => {
//     if (
//       item[0].includes(word.toLowerCase()) &&
//       !countMap[word]
//     ) {
//       console.log(word);
//       countMap[word] = true;
//       return;
//     }
//   })
// });

// console.log(`Detected ${Object.keys(countMap).length} out of ${glossary.length} terms as entities on whitepaper corpus (${(Object.keys(countMap).length / glossary.length).toFixed(2) * 100}%)`)

// count = 0;
// glossary.forEach(word => {
//   if (academicVisualizer.entityDict[word] || academicVisualizer.entityDict[word.toLowerCase()]) {
//     console.log(word);
//     count++;
//   }
// })

// console.log(`Detected ${count} out of ${glossary.length} terms as entities on the academic corpus (${(count / glossary.length).toFixed(2) * 100}%)`)
