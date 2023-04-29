import keys from './js/keys.js';

const body = document.querySelector('body');
const state = {
  lang: 'en',
  shift: false,
  capsLock: false,
  up: false,
};

const keysRow1 = ['Backquote', 'Digital1', 'Digital2', 'Digital3', 'Digital4', 'Digital5', 'Digital6', 'Digital7', 'Digital8', 'Digital9', 'Digital0', 'Minus', 'Equal', 'Backspace'];
const keysRow2 = ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete'];
const keysRow3 = ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'];
const keysRow4 = ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'];
const keysRow5 = ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];
const keysRows = [...keysRow1, ...keysRow2, ...keysRow3, ...keysRow4, ...keysRow5];
const keysMiddle = ['Tab', 'ControlLeft', 'ControlRight', 'ShiftRight'];
const keysBig = ['Backspace', 'CapsLock', 'Enter', 'ShiftLeft'];

const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');
body.append(wrapper);

const input = document.createElement('textarea');
input.classList.add('input');
wrapper.append(input);

const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
wrapper.append(keyboard);

function addText(text) {
  input.setRangeText(text, input.selectionStart, input.selectionEnd, 'end');
}

/*
function clickKey(e) {
  let code = e.target.dataset.code;
  if (code === 'CapsLock') {
    state.capsLock = !state.capsLock;
  };
  state.up = (state.shift && !state.capsLock) || (state.capsLock && !state.shift);

  let text = '';
  if (state.lang === 'ru') {
    text = (state.up) ? e.target.dataset.keyRuUp : e.target.dataset.keyRuLow;
  } else {
    text = (state.up) ? e.target.dataset.keyEnUp : e.target.dataset.keyEnLow;
  }
  //const text = e.target.dataset.keyEnUp;
  // input.textContent += symb;
  // let textContent = input.textContent;
  addText(text);
}
*/

function mousedownKey(e) {
  const { code } = e.target.dataset;
  if (code === 'ShiftLeft' || code === 'ShiftRight') {
    state.shift = true;
  }
}

function mouseupKey(e) {
  const { code } = e.target.dataset;
  if (code === 'ShiftLeft' || code === 'ShiftRight') {
    state.shift = false;
  }
  if (code === 'CapsLock') {
    state.capsLock = !state.capsLock;
  }
  state.up = (state.shift && !state.capsLock) || (state.capsLock && !state.shift);

  let text = '';
  if (state.lang === 'ru') {
    text = (state.up) ? e.target.dataset.keyRuUp : e.target.dataset.keyRuLow;
  } else {
    text = (state.up) ? e.target.dataset.keyEnUp : e.target.dataset.keyEnLow;
  }
  addText(text);
}

function pressKeydown(e) {
  const key = document.getElementById(e.code);
  if (key) {
    key.classList.add('active');
  }
}

function pressKeyup(e) {
  const key = document.getElementById(e.code);
  if (key) {
    key.classList.remove('active');
    addText(key.dataset.keyEnUp);
  }
}

function createRow() {
  const row = document.createElement('div');
  row.classList.add('row');
  keyboard.append(row);
  return row;
}

function createKey(row, objKey) {
  const key = document.createElement('div');
  key.classList.add('key');
  if (keysMiddle.includes(objKey.code)) {
    key.classList.add('size-middle');
  } else if (keysBig.includes(objKey.code)) {
    key.classList.add('size-big');
  }
  key.id = objKey.code;
  key.dataset.code = objKey.code;
  key.dataset.keyEnUp = objKey.keyEnUp;
  key.dataset.keyEnLow = objKey.keyEnLow;
  key.dataset.keyRuUp = objKey.keyRuUp;
  key.dataset.keyRuLow = objKey.keyRuLow;
  key.textContent = objKey.keyEnLow;
  // key.addEventListener('click', clickKey);
  key.addEventListener('mousedown', mousedownKey);
  key.addEventListener('mouseup', mouseupKey);
  row.append(key);
}

keysRows.forEach((item) => {
  const keyItem = keys.find((k) => (k.code === item));
  createKey(keyboard, keyItem);
});

/*
let row = createRow();
keysRow1.forEach((item) => {
  const keyItem = keys.find((k) => (k.code === item));
  createKey(row, keyItem);
});

row = createRow();
keysRow2.forEach((item) => {
  const keyItem = keys.find((k) => (k.code === item));
  createKey(row, keyItem);
});

row = createRow();
keysRow3.forEach((item) => {
  const keyItem = keys.find((k) => (k.code === item));
  createKey(row, keyItem);
});

row = createRow();
keysRow4.forEach((item) => {
  const keyItem = keys.find((k) => (k.code === item));
  createKey(row, keyItem);
});

row = createRow();
keysRow5.forEach((item) => {
  const keyItem = keys.find((k) => (k.code === item));
  createKey(row, keyItem);
});
*/

document.addEventListener('keydown', pressKeydown);
document.addEventListener('keyup', pressKeyup);
