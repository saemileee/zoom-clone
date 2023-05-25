const messageList = document.querySelector('ul');
const messageForm = document.querySelector('#message');
const nickForm = document.querySelector('#nick');
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

function decodeMessage(json) {
  return JSON.parse(json);
}

function handleOpen() {
  console.log('Connected to Server ✅');
}

socket.addEventListener('open', handleOpen);

//3. 백단에서 받은 메세지를 list로 렌더링
socket.addEventListener('message', (message) => {
  const li = document.createElement('li');
  li.innerText = message.data;
  messageList.append(li);
});

socket.addEventListener('close', () => {
  console.log('Disconnected from Server❌');
});

function handleSubmit(e) {
  e.preventDefault();
  const input = messageForm.querySelector('input');
  //1. 프론트에서 백엔드로 보냄
  socket.send(makeMessage('new_message', input.value));

  //4. 내가 보내는 메세지는 굳이 서버에 전송하지 않고 렌더링
  const li = document.createElement('li');
  li.innerText = `You: ${input.value}`;
  messageList.append(li);
}

function handleNickSubmit(e) {
  e.preventDefault();
  const input = nickForm.querySelector('input');
  socket.send(makeMessage('nickname', input.value));
}

messageForm.addEventListener('submit', handleSubmit);
nickForm.addEventListener('submit', handleNickSubmit);
