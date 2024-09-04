const modeBtn = document.getElementById("mode-btn");

// const colorOptions = document.getElementsByClassName('color-option');
// => 이렇게 생성한 colorOptions는 ArrayLike 객체(O), Array(X)이므로 forEach로 접근할 수 없음.
const colorOptions = Array.from(document.getElementsByClassName('color-option'));
// => 따라서 Array.from을 사용해 배열로 만들어줌

const currentColor = document.querySelector('.current-color');

const color = document.getElementById('color');
const lineWidth = document.getElementById('line-width');
const canvas = document.querySelector('canvas');
// context : 페인트 브러쉬 => 축약해서 ctx로 씀
const ctx = canvas.getContext('2d'); //WebGL은 3D 요소

// JS에게 캔버스 크기 알려주기 => 왜 ... ? => 좌표값 때문인가봄
canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = lineWidth.value;

let isPainting = false;

function onMove(event) {
    if(isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
        // isPainting이 true이면(= mousedown 상태이면) 선 그리기
    }
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
    // isPainting이 true이면(= mousedown 상태가 아니면) 브러시 시작점만 이동
}

function onMouseDown() {
    isPainting = true;
}

function onMouseUp() {
    isPainting = false;
}

function onLineWidthChange(event) {
    ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
    ctx.strokeStyle = event.target.dataset.color;
    ctx.fillStyle = event.target.dataset.color;
    color.value = event.target.dataset.color; // color input의 색상도 바꿔주기
    currentColor.innerText = event.target.dataset.color;
}

canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mouseup', onMouseUp);
canvas.addEventListener('mouseleave', onMouseUp);

lineWidth.addEventListener('change', onLineWidthChange);
color.addEventListener('change',onColorChange);

colorOptions.forEach(color => color.addEventListener('click', onColorClick));