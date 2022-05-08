const VALID_KEYS_PATH = __dirname + '/valid-keys.txt';
const fs = require('fs');
const shortid = require('shortid');
const { fileToSet } = require('./lib/util');
// To generate a unique API KEY, use shortid.generate()
const LINE_ENDING = require('os').EOL;

module.exports = function (req, res) {
  let newKey = shortid.generate();
  (async () => {
    // const result = await fs.promises.readFile(VALID_KEYS_PATH);
    // const arrayOfLines = result.toString().trim().split(LINE_ENDING);
    const lines = await fileToSet(VALID_KEYS_PATH);

    // loop until the generated key is unique
    while (lines.has(newKey) === true) {
      newKey = shortid.generate();
    }

    await fs.promises.appendFile(
      VALID_KEYS_PATH,
      `${newKey}${LINE_ENDING}`,
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).send(error);
        }
      },
    );

    res.status(201).json({ apiKey: newKey });
  })();
};
