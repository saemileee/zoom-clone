const socket = new WebSocket(`ws://${window.location.host}`);

function handleOpen() {
  console.log('Connected to Server ✅');
}

socket.addEventListener('open', handleOpen);

socket.addEventListener('message', (message) => {
  console.log('New message: ', message.data);
});

socket.addEventListener('close', () => {
  console.log('Disconnected from Server❌');
});

setTimeout(() => {
  //프론트에서 백엔드로 보냄
  socket.send('hello from the browser!');
}, 4000);
