export function getJSON(lines, documentKey) {
  let documentLine = lines.find((item) => {
    item = JSON.parse(item);
    return item["doc_key"] == documentKey;
  })

  if(!documentLine) {
    console.error(`No document found for key ${documentKey}`);
    process.exit(0);
  }

  documentLine = JSON.parse(documentLine);

  return documentLine;
}