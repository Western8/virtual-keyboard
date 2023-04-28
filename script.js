const body = document.querySelector('body');
let lang = 'en';
const keys = [
  { keyEn: 'q', keyRu: 'й', code: 'KeyQ' },
  { keyEn: 'w', keyRu: 'ц', code: 'KeyW' },
  { keyEn: 'e', keyRu: 'у', code: 'KeyE' },
  { keyEn: 'r', keyRu: 'к', code: 'KeyR' },
  { keyEn: 'T', keyRu: 'е', code: 'KeyT' },
  { keyEn: 'Y', keyRu: 'н', code: 'KeyY' },
  { keyEn: 'U', keyRu: 'г', code: 'KeyU' },
];

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

function pressKey(e) {
  // e.dataset.code;
  const text = e.target.dataset.keyEn;
  // input.textContent += symb;
  // let textContent = input.textContent;
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
    addText(key.dataset.keyEn);
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
  key.id = objKey.code;
  key.dataset.code = objKey.code;
  key.dataset.keyEn = objKey.keyEn;
  key.textContent = objKey.keyEn;
  key.addEventListener('click', pressKey);
  row.append(key);
}

let row = createRow();

keys.forEach((item) => {
  createKey(row, item);
});

document.addEventListener('keydown', pressKeydown);
document.addEventListener('keyup', pressKeyup);

/*
function getPos() {
  let pos = input.selectionStart;
  return pos;
}
*/
