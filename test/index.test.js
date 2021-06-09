const qs = require('qs');
const config = require('config');
const request = require('supertest');
const Server = require('../app/server');
const routes = require('../app/routes');

const serverOptions = {
  host: config.get('hapi.host'),
  port: config.get('hapi.port'),
  app: { namespace: 'api' },
  debug: { request: ['error '] },
  query: { parser: (query) => qs.parse(query) }
};
let mockServer;
describe('Test endpoints', () => {
  beforeAll(async () => {
    mockServer = Server(serverOptions);
    await mockServer.create();
    await mockServer.route(routes);
    await mockServer.hello();
  });
  test('Says hi', async () => {
    const res = await request(mockServer.listener)
      .get('/hello-world')
      .query();

    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('Hello, World');
  });
  test('Says hello to the user', async () => {
    const name = 'Lil Wayne';
    const res = await request(mockServer.listener)
      .get('/hello')
      .query({ name });
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual(`Hello, ${name}!`);
  });
  afterAll((done) => {
    mockServer.bye();
    done();
  });
});
