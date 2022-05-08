const { fileToSet } = require('./lib/util');

const VALID_KEYS_PATH = __dirname + '/valid-keys.txt';

module.exports = function (req, res, next) {
  (async () => {
    const apiKeys = await fileToSet(VALID_KEYS_PATH);
    const requestKey = req.get('x-api-key')?.trim();
    if (requestKey !== 'undefined' || requestKey !== '') {
      if (apiKeys.has(requestKey)) {
        return next();
      }
    }

    // console.log('apiKeys', apiKeys, requestKey);
    res.status(401).json({ error: 'Invalid API Key' });
  })();
};
