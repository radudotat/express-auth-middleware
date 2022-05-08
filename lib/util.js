const LINE_ENDING = require('os').EOL;
const fs = require('fs');

module.exports = {
  fileToSet: async (VALID_KEYS_PATH) => {
    const result = await fs.promises.readFile(VALID_KEYS_PATH);
    const arrayOfLines = result.toString().trim().split(LINE_ENDING);
    return new Set(arrayOfLines);
  },
};
