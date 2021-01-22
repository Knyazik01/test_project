let speedInput = document.querySelector('#speed');
const speedBoard = document.querySelector('#speedBoard');
const el = document.querySelector('#box');
const field = document.querySelector('.main');
const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
let timerId;
let onMoove = false;
let toRight = true;
let toBottom = true;

function move(v, flag, pos, xy) {

    if (xy === 'x') {
        if (pos >= field.offsetWidth - el.offsetWidth || pos < 0) {
            flag = toRight = !toRight;
            pos = (pos > 0) ? field.offsetWidth - el.offsetWidth : 0;
        }
    } else if (xy === 'y') {
        if (pos >= field.offsetHeight - el.offsetHeight || pos < 0) {
            flag = toBottom = !toBottom;
            pos = (pos > 0) ? field.offsetHeight - el.offsetHeight : 0;
        }
    }

    pos += (flag) ? v : -v;

    return pos;
}


function movebox() {
    const V = +speedInput.value;
    el.style.left = move(V, toRight, parseInt(el.style.left) || 0, 'x');
    el.style.top = move(V, toBottom, parseInt(el.style.top) || 0, 'y');
    
}

function startMove() {
    stopMove();
    timerId = setInterval(movebox, 40);
    onMoove = true;
}

function stopMove() {
    clearTimeout(timerId);
    onMoove = false;
}



speedInput.addEventListener('change', function () {
      speedBoard.innerText = speedInput.value;
      if (onMoove) startMove();
});

startBtn.addEventListener('click', startMove);

stopBtn.addEventListener('click', stopMove);


speedBoard.innerText = speedInput.value;