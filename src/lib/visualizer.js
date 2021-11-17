import { getJSON } from "../scripts/get-json.js";
import fs from 'fs';
import glossary from "./glossary.js";
import aliases from "./aliases.js";

export default class Visualizer {
  constructor(filePath) {
    this.entityDict = {};
    this.lines = fs.readFileSync(filePath).toString().split('\n');
  }

  // PRIVATE METHODS

  // Initialize entity inside entity dictionary
  #initializeEntity(word, entity) {
    this.entityDict[word] = {
      relations: [],
      sentences: []
    }

    this.entityDict[word][entity] = {
      count: 1
    }
  }

  // Returns list of entities for a sentence
  #getPredictedNER(document, sentence, sentenceIndex) {
    const previousTokens = document["sentences"].slice(0, sentenceIndex).flat().length;

    return document["predicted_ner"][sentenceIndex].map((item) => {
      const startIndex = item[0] - previousTokens;
      const endIndex = item[1] - previousTokens;
      const entityType = item[2];

      return [sentence.slice(startIndex, endIndex + 1), entityType];
    });
  }

  // Returns list of relations for a sentence
  #getPredictedRelations(document, sentence, sentenceIndex) {
    const previousTokens = document["sentences"].slice(0, sentenceIndex).flat().length;

    return document["predicted_relations"][sentenceIndex].map((item) => {
      const startIndexLeft = item[0] - previousTokens;
      const endIndexLeft = item[1] - previousTokens;
      const startIndexRight = item[2] - previousTokens;
      const endIndexRight = item[3] - previousTokens;

      const relationType = item[4];

      return [
        sentence.slice(startIndexLeft, endIndexLeft + 1),
        sentence.slice(startIndexRight, endIndexRight + 1),
        relationType
      ];
    });
  }

  // Get all entities for a document
  #getEntities(docKey) {
    const document = getJSON(this.lines, docKey);

    return document["sentences"].map((sentence, index) => {
      const predictedEntities = this.#getPredictedNER(document, sentence, index);

      return predictedEntities;
    });
  }

  // Get all relations for a document
  #getRelations(docKey) {
    const document = getJSON(this.lines, docKey);

    return document["sentences"].map((sentence, index) => {
      const predictedRelations = this.#getPredictedRelations(document, sentence, index);

      return predictedRelations;
    });
  }

  // PUBLIC METHODS

  initializeEntityDict() {
    this.lines.forEach((item) => {
      item = JSON.parse(item);

      const entities = this.#getEntities(item['doc_key']);
      const relations = this.#getRelations(item['doc_key']);
      const sentences = item['sentences'];

      entities.forEach((e, sentenceIndex) => {
        e.forEach(words => {
          let word = words[0].join(" ").toLowerCase();
          let entity = words[1];

          if (word == ' ' || word == '-') {
            return;
          }

          // word not found in entityDict, initialize it
          if (!this.entityDict[word]) {
            this.#initializeEntity(word, entity);
          }

          else {
            // new entity for existing word
            if (!this.entityDict[word][entity]) {
              this.entityDict[word][entity] = {
                count: 1
              }
            }

            else {
              this.entityDict[word][entity].count = this.entityDict[word][entity].count + 1
            }
          }

          this.entityDict[word].sentences.push(sentences[sentenceIndex]);
        })
      })

      relations.forEach(r => {
        r.forEach(data => {
          let wordIn, wordOut;

          wordIn = data[0].join(" ");
          wordOut = data[1].join(" ");

          if (this.entityDict[wordIn]) {
            this.entityDict[wordIn].relations.push(data);
          }

          if (this.entityDict[wordOut]) {
            this.entityDict[wordOut].relations.push(data);
          }
        })
      })
    })
  }

  getFrequencyList() {
    let sortedList = [];

    for (const key in this.entityDict) {
      let count = 0;

      for (const entityType in this.entityDict[key]) {
        if (entityType != 'relations' && entityType != 'sentences') {
          count += this.entityDict[key][entityType].count;
        }
      }

      sortedList.push([key, count]);
    }

    sortedList.sort((a, b) => {
      return b[1] - a[1];
    })

    return sortedList;
  }

  getGlossaryEntitiesWithoutAlias() {
    let countMap = {};

    glossary.forEach(word => {
      let isEntity = false;

      if (this.entityDict[word]) {
        console.log("Found direct match");
        isEntity = true;
      }

      if (
        isEntity
      ) { // found glossary term as an entity
        countMap[word] = 0;

        for (const key in this.entityDict[word]) {
          if (key == 'relations' || key == 'sentences') {
            continue;
          }

          countMap[word] += this.entityDict[word][key].count;
        }
      }
    });

    return countMap;
  }

  getGlossaryEntitiesWithAlias() {
    let countMap = {};

    glossary.forEach(word => {
      let aliasList = aliases[word] || [];
      let isEntity = false;
      let matchedAlias = word;

      if (this.entityDict[word]) {
        console.log("Found direct match");
        isEntity = true;
      }

      else {
        aliasList.forEach(alias => {
          if (this.entityDict[alias]) {
            console.log("Found match trough alias");
            isEntity = true;
            matchedAlias = alias;
            return;
          }
        })
      }

      if (
        isEntity
      ) { // found glossary term as an entity
        countMap[word] = 0;

        for (const key in this.entityDict[matchedAlias]) {
          if (key == 'relations' || key == 'sentences') {
            continue;
          }

          countMap[word] += this.entityDict[matchedAlias][key].count;
        }
      }
    });

    return countMap;
  }

  getNumberOfSentences() {
    let count = 0;

    this.lines.forEach((line, index) => {
      console.log(`${JSON.parse(line)["sentences"].length} sentences in line ${index}`)
      count += JSON.parse(line)["sentences"].length;
    });

    console.log(count);
  }

  getDocumentInfo(docKey) {
    const entities = this.#getEntities(docKey);
    const relations = this.#getRelations(docKey);

    console.log("ENTITIES:");
    entities.forEach((e, i) => {
      console.log(i);
      console.log(e);
    });

    console.log("RELATIONS:");
    relations.forEach((e, i) => {
      console.log(i);
      console.log(e);
    });
  }
}