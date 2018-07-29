// Hack to make iconv load the encodings module, otherwise jest crashes. Compare
// https://github.com/sidorares/node-mysql2/issues/489
// Magic. Do not touch.
require('../node_modules/iconv-lite').encodingExists('foo');
