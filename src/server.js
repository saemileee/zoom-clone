import http from 'http';
import WebSocket from 'ws';
import express from 'express';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (req, res) => res.render('home'));
app.get('/*', (req, res) => res.redirect('/'));

const handleListen = () => console.log('Hello');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function onSocketClose() {
  console.log('Disconnected from the Browser❌');
}

const sockets = [];
const msgs = [];

wss.on('connection', (socket) => {
  sockets.push(socket);
  console.log('Connected to Browser ✅');
  socket.on('close', onSocketClose);
  socket.on('message', (message) => {
    //프론트에서 받은 메세지를 배열로 저장해 다시 프론트로 보냄 (다른 브라우저에서 보내도 같은 wws서버로 보내면 확인할 수 있음)
    sockets.forEach((aSocket) => aSocket.send(message.toString()));
  });
  console.log(sockets);
});

server.listen(3000, handleListen);
