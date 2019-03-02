import server from './Server';

const port = 3001;//process.env.PORT || 3000

server.listen(port, (err?: string) => {
  if (err) {
    return console.log(err)
  }

  return console.log('server is listening on ${port}');
})