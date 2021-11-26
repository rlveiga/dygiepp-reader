var express = require('express');
const Visualizer = require('../lib/visualizer');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/data', async function(req, res, next) {
  const whitepaperVisualizer = new Visualizer('./lib/data/scierc/whitepaper.jsonl');
  whitepaperVisualizer.initializeEntityDict();

  res.send({
    frequencyList: whitepaperVisualizer.getFrequencyList(),
    entityDict: whitepaperVisualizer.entityDict,
    glossary: whitepaperVisualizer.getGlossaryEntities()
  });
})

module.exports = router;
