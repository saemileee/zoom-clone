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

wss.on('connection', (socket) => {
  console.log('Connected to Browser ✅');
  socket.on('close', onSocketClose);
  socket.on('message', (message) => {
    //프론트에서 받은 메세지를 다시 프론트로 보냄
    socket.send(message.toString());
  });
});

server.listen(3000, handleListen);
