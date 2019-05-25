const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const pathMatch = require('path-match');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const route = pathMatch();
const match = route('/campagnes/:slug');

app.prepare().then(() => {
  createServer((req, res) => {
    const { pathname, query } = parse(req.url, true);
    const params = match(pathname);
    if (params === false) {
      handle(req, res);
      return
    }
    // assigning `query` into the params means that we still
    // get the query string passed to our application

    app.render(req, res, '/campagnes', Object.assign(params, query));


  }).listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`)
  })
});





// const next = require('next');
// const routes = require('./routes');
//
// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dir: '.', dev });
// const handler = routes.getRequestHandler(app);
//
// const { createServer } = require('http');
//
// app.prepare().then(() => {
//   createServer(handler).listen(3000);
// });
