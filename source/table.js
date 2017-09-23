const fs = require('fs');

function Table (filePath) {
  this.filePath = filePath;
}

Table.toFilename = file => `${file}.json`;

Table.toId = file => file.slice(0, -5);

Table.prototype.read = function(file) {
  try {
    return JSON.parse(fs.readFileSync(`${this.filePath}/${Table.toFilename(file)}`));
  } catch(error) {
    console.error(error);
    return undefined;
  }
}

Table.prototype.getRowIds = function() {
  return fs.readdirSync(this.filePath).map(Table.toId);
}

module.exports = Table;
