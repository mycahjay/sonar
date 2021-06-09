import './app/lib/require-patch.ts';
import qs from 'qs';
import monitor from 'app/monitor';
import Server from 'app/server';
import routes from 'app/routes';
import config from 'config';

const serverOptions = {
  host: config.get('hapi.host'),
  port: config.get('hapi.port'),
  app: { namespace: 'api' },
  debug: { request: ['error '] },
  query: { parser: (query) => qs.parse(query) }
};
const monitoringOptions = {
  host: config.get('hapi.metrics.host'),
  port: config.get('hapi.metrics.port')
};
const pinoPlugin = {
  plugin: require('hapi-pino'),
  options: {
    level: 'fatal',
    serializers: {
      user: (user) => user?.id,
      req: () => ({})
    }
  }
};
const init = async () => {
  await monitor.init(monitoringOptions);
  const server = Server(serverOptions);
  await server.create(pinoPlugin);
  await server.route(routes);
  await server.hello();
};
init();
