import express from 'express';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';

const server = express();
const port = 3000;
server.use(cookieParser());
server.use(cookieSession({
  name: 'user_session',
  secret: 'supersecretstring'
}))

server.get('/', (req, res) => {
  res.send('Go to /login?name="NAME" to set name');
})

server.get('/login', (req, res) => {
  if (req.query.name) {
    let name = req.query.name;
    res.cookie('name', name).send(`Name set to ${name}`);
  } else {
    res.send('Go to /login?name="NAME" to set name...')
  }
})

server.get('/hello', (req, res) => {
  console.log(req.cookies)
  let name = req.cookies.name;
  res.send(`Hello ${name}`);
})

server.listen(port, () => {
  console.log(`server running on port ${port}`);
})