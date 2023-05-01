import keys from './js/keys.js';

const body = document.querySelector('body');
const state = {
  langRu: false,
  shift: false,
  capsLock: false,
  up: false,
};

const keysRow1 = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'];
const keysRow2 = ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete'];
const keysRow3 = ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'];
const keysRow4 = ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'];
const keysRow5 = ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];
const keysRows = [...keysRow1, ...keysRow2, ...keysRow3, ...keysRow4, ...keysRow5];
const keysMiddle = ['Tab', 'ControlLeft', 'ControlRight'];
const keysBig = ['CapsLock', 'ShiftRight'];
const keysHuge = ['Backspace', 'Enter', 'ShiftLeft'];
const keysMark = ['Backquote', 'Minus', 'Equal', 'BracketLeft', 'BracketRight', 'Semicolon', 'Quote', 'Backslash', 'Comma', 'Period', 'Slash', 'Space', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];
const keysMarkShift = ['Backquote', 'BracketLeft', 'BracketRight', 'Semicolon', 'Quote', 'Comma', 'Period'];
const keysFunc = ['Tab', 'Backspace', 'Delete', 'CapsLock', 'Enter', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'ControlRight', 'AltRight'];

const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');
body.append(wrapper);

const h1 = document.createElement('h1');
h1.textContent = 'Virtual Keyboard';
wrapper.append(h1);

const input = document.createElement('textarea');
input.classList.add('input');
input.setAttribute('readonly', 'readonly');
wrapper.append(input);

const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
wrapper.append(keyboard);

function addText(text) {
  input.setRangeText(text, input.selectionStart, input.selectionEnd, 'end');
}

function getLetter(keyItem) {
  let res = '';
  if (state.langRu) {
    if (keyItem.code.includes('Key') || keysMarkShift.includes(keyItem.code)) {
      res = (state.up) ? keyItem.keyRuUp : keyItem.keyRuLow;
    } else {
      res = (state.shift) ? keyItem.keyRuUp : keyItem.keyRuLow;
    }
  } else if (keyItem.code.includes('Key')) {
    res = (state.up) ? keyItem.keyEnUp : keyItem.keyEnLow;
  } else {
    res = (state.shift) ? keyItem.keyEnUp : keyItem.keyEnLow;
  }
  return res;
}

function changeView() {
  state.up = (state.shift && !state.capsLock) || (state.capsLock && !state.shift);

  const allKeys = document.querySelectorAll('.key');
  allKeys.forEach((item) => {
    const itemNew = item;
    itemNew.textContent = getLetter(item.dataset);
  });

  const capsLock = document.getElementById('CapsLock');
  if (state.capsLock) {
    capsLock.classList.add('active');
  } else {
    capsLock.classList.remove('active');
  }
}

function actKey(code, shiftKey = false, ctrlKey = false, altKey = false) {
  const key = keys.find((k) => (k.code === code));

  if (code === 'ShiftLeft' || code === 'ShiftRight') {
    state.shift = false;
  }
  if (code === 'CapsLock') {
    state.capsLock = !state.capsLock;
  }

  let ctrlActive = ctrlKey;
  let altActive = altKey;
  if (code === 'ControlLeft' || code === 'AltLeft') {
    const ctrlActiveKey = document.getElementById('ControlLeft').classList.contains('active');
    ctrlActive = ctrlActive || ctrlActiveKey;
    const altActiveKey = document.getElementById('AltLeft').classList.contains('active');
    altActive = altActive || altActiveKey;
  }
  if (((code === 'ControlLeft' || code === 'ControlRight') && altActive) || ((code === 'AltLeft' || code === 'AltRight') && ctrlActive)) {
    state.langRu = !state.langRu;
  }

  changeView();

  if (keysMark.includes(code) || code.includes('Key') || code.includes('Digit')) {
    const text = getLetter(key);
    addText(text);
  } else if (code === 'Backspace') {
    if (input.selectionStart > 0) {
      input.setRangeText('', input.selectionStart - 1, input.selectionStart, 'end');
    }
  } else if (code === 'Delete') {
    input.setRangeText('', input.selectionStart, input.selectionStart + 1, 'end');
  } else if (code === 'Enter') {
    addText('\n');
  } else if (code === 'Tab') {
    addText('\t');
  }

  if (shiftKey) {
    state.shiftKey = shiftKey;
  }
}

function mousedownKey(e) {
  const { code } = e.target.dataset;
  if (e.target) {
    e.target.classList.add('active');
  }
  if (code === 'ShiftLeft' || code === 'ShiftRight') {
    state.shift = true;
    changeView();
  }
}

function mouseupKey(e) {
  const { code } = e.target.dataset;
  if (e.target) {
    e.target.classList.remove('active');
  }
  actKey(code, e.target.shiftKey, e.target.ctrlKey, e.target.altKey);
}

function pressKeydown(e) {
  const key = document.getElementById(e.code);
  if (key) {
    key.classList.add('active');

    if (e.key === 'Shift') {
      state.shift = true;
      changeView();
    }
  }
  if (e.code === 'Tab') {
    e.preventDefault();
  }
}

function pressKeyup(e) {
  const key = document.getElementById(e.code);
  if (key) {
    key.classList.remove('active');
    actKey(key.dataset.code, e.shiftKey, e.ctrlKey, e.altKey);
  }
}

function createKey(row, objKey) {
  const key = document.createElement('div');
  key.classList.add('key');
  if (keysMiddle.includes(objKey.code)) {
    key.classList.add('size-middle');
  } else if (keysBig.includes(objKey.code)) {
    key.classList.add('size-big');
  } else if (keysHuge.includes(objKey.code)) {
    key.classList.add('size-huge');
  }
  if (keysFunc.includes(objKey.code)) {
    key.classList.add('func');
  }
  key.id = objKey.code;
  key.dataset.code = objKey.code;
  key.dataset.keyEnUp = objKey.keyEnUp;
  key.dataset.keyEnLow = objKey.keyEnLow;
  key.dataset.keyRuUp = objKey.keyRuUp;
  key.dataset.keyRuLow = objKey.keyRuLow;
  key.textContent = objKey.keyEnLow;
  key.addEventListener('mousedown', mousedownKey);
  key.addEventListener('mouseup', mouseupKey);
  row.append(key);
}

keysRows.forEach((item) => {
  const keyItem = keys.find((k) => (k.code === item));
  createKey(keyboard, keyItem);
});

const p = document.createElement('p');
p.classList.add('info');
p.textContent = 'Keyboard created for OS Windows. Change language: left Ctrl + Alt.';
wrapper.append(p);

document.addEventListener('keydown', pressKeydown);
document.addEventListener('keyup', pressKeyup);
changeView();

function init() {
  state.langRu = JSON.parse(localStorage.getItem('langRu'));
  changeView();
}
window.addEventListener('load', init);

function saveSettings() {
  localStorage.setItem('langRu', JSON.stringify(state.langRu));
}
window.addEventListener('beforeunload', saveSettings);
