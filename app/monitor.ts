const Hapi = require('@hapi/hapi');
const monitoring = require('app/lib/monitoring');
const { version } = require('../version.json');

const init = async (opts) => {
  monitoring.init(version);
  await monitoring.startServer(Hapi.server(opts));
  console.log(`🚀 metrics: ${opts.host}:${opts.port}`);
};

module.exports = { init };
