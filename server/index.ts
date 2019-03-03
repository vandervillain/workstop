import server from './Server';

const port = process.env.PORT || 3001

server.listen(port, (err?: string) => {
  if (err) {
    return console.log(err)
  }

  return console.log('server is listening on ' + port);
})