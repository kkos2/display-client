const jsonServer = require('json-server');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const v1Router = jsonServer.router('v1.json');

const hydraRender = (req, res) => {
  const { data } = res.locals;

  if (Array.isArray(data)) {
    const path = req.originalUrl;

    res.jsonp({
      '@id': path,
      '@type': 'hydra:Collection',
      'hydra:member': data,
      'hydra:totalItems': data.length,
      'hydra:view': {
        '@id': `${path}`,
        '@type': 'hydra:PartialCollectionView',
        'hydra:first': `${path}`,
        'hydra:last': `${path}`,
        'hydra:next': `${path}`,
      },
    });
  } else {
    res.jsonp(data);
  }
};

v1Router.render = hydraRender;

server.use(middlewares);
server.use('/v1', v1Router);

server.listen(3000, () => {});
