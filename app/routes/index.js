var express = require('express');
const glossary = require('../lib/glossary');
const Visualizer = require('../lib/visualizer');
var router = express.Router();

const whitepaperVisualizer = new Visualizer('./lib/data/scierc/whitepaper.jsonl');
whitepaperVisualizer.initializeEntityDict();

const academicVisualizer = new Visualizer('./lib/data/scierc/academic.jsonl');
academicVisualizer.initializeEntityDict();

const wikiVisualizer = new Visualizer('./lib/data/scierc/wiki.jsonl');
wikiVisualizer.initializeEntityDict();

const visualizerMap = {
  whitepaper: whitepaperVisualizer,
  academic: academicVisualizer,
  wiki: wikiVisualizer
}

router.get('/data/:corpus_name/:entity_name', async function (req, res, next) {
  const visualizer = visualizerMap[req.params.corpus_name];
  const entity_name = req.params.entity_name;

  res.send(visualizer.entityDict[entity_name] || null);
});

router.get('/documents/:corpus_name', async function (req, res, next) {
  const visualizer = visualizerMap[req.params.corpus_name];

  res.send({
    documentKeys: visualizer.getDocumentKeys()
  });
});

router.get('/documents/:corpus_name/:doc_key', async function (req, res, next) {
  const visualizer = visualizerMap[req.params.corpus_name];
  const doc_key = req.params.doc_key;

  const documentInfo = visualizer.getDocumentInfo(doc_key);

  res.send({
    data: documentInfo
  });
});

router.get('/glossary/', async function (req, res, next) {
  res.send({
    glossary: glossary
  });
});

module.exports = router;
