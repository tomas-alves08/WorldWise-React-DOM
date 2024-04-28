const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();

// Add custom delete endpoint
server.delete('/cities/:id', (req, res) => {
  const { id } = req.params;
  // Delete city logic here
  res.sendStatus(204); // Send success response
});

server.use(middlewares);
server.use(router);

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});