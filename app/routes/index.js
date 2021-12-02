var express = require('express');
const Visualizer = require('../lib/visualizer');
var router = express.Router();

const whitepaperVisualizer = new Visualizer('./lib/data/scierc/whitepaper.jsonl');
whitepaperVisualizer.initializeEntityDict();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/data', async function (req, res, next) {
  res.send({
    frequencyList: whitepaperVisualizer.getFrequencyList(),
    entityDict: whitepaperVisualizer.entityDict,
    glossary: whitepaperVisualizer.getGlossaryEntities()
  });
});

router.get('/documents', async function (req, res, next) {
  res.send({
    documentKeys: whitepaperVisualizer.getDocumentKeys()
  });
});

router.get('/documents/:doc_key', async function (req, res, next) {
  const doc_key = req.params.doc_key;

  const documentInfo = whitepaperVisualizer.getDocumentInfo(doc_key);

  res.send({
    data: documentInfo
  });
});

module.exports = router;
