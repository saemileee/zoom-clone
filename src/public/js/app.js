//io는 자동적으로 백엔드의 socket.io와 연결해 주는 function
const socket = io();
const welcome = document.getElementById('welcome');
const form = welcome.querySelector('form');

function handleRoomSubmit(e) {
  e.preventDefault();
  const input = form.querySelector('input');
  //1. 프론트에서 입력받은 input.value를 io로 백엔드로 보냄
  //socket.emit 첫번째 인자 : event 이름, 두번째 인자: payload, 세번째 인자: 서버에서 호출하는 Function
  socket.emit('enter_room', { payload: input.value }, () => {
    console.log('server is done');
  });

  input.value = '';
}

form.addEventListener('submit', handleRoomSubmit);
