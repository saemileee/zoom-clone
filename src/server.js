import http from 'http';
import WebSocket from 'ws';
import express from 'express';
import { parse } from 'path';

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

wss.on('connection', (socket) => {
  sockets.push(socket);
  //닉네임을 입력하지 않으면 익명으로
  socket['nickname'] = 'Anonymous';
  console.log('Connected to Browser ✅');
  socket.on('close', onSocketClose);
  socket.on('message', (msg) => {
    const message = JSON.parse(msg);
    switch (message.type) {
      case 'new_message':
        //2. 프론트에서 받은 메세지를 배열로 저장해 다시 프론트로 보냄 (다른 브라우저에서 보내도 같은 wws서버로 보내면 확인할 수 있음)
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}:${message.payload}`)
        );
        break;
      case 'nickname':
        //소켓은 객체라 새로운 key와 value값을 줌
        socket['nickname'] = message.payload;
        break;
    }
  });
  console.log(sockets);
});

server.listen(3000, handleListen);
