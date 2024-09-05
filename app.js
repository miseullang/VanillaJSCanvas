const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById('destroy-btn');
const eraserBtn = document.getElementById('eraser-btn');
const fileInput = document.getElementById('file');
const textInput = document.getElementById('text');
const saveBtn = document.getElementById('save');

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

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

// JS에게 캔버스 크기 알려주기 => 왜 ... ? => 좌표값 때문인가봄
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round" // 옵션 : butt, round, square

let isPainting = false;
let isFilling = false;

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

function onModeClick(event) {
    if(isFilling) {
        isFilling = false
        modeBtn.innerText = '채우기 🎨'
    } else {
        isFilling = true
        modeBtn.innerText = '그리기 🖌️'
    }
}

function onCanvasClick() {
    if(isFilling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function onDestroyClick() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
    ctx.strokeStyle = 'white';
}

function onFileChange(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image() // => html로 <img src=""/> 쓰는 것과 같음
    image.src = url;
    image.onload = function() {
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        image.attributes
        // ctx.drawImage(캔버스 내에 배치할 이미지, x좌표, y좌표, 너비, 높이)
        fileInput.value = null; // 파일 목록 비워주기
    }
}

function onDoubleClick(event) {
    ctx.save(); // context를 변경하기 전 저장(현재 상태 : 색상, 스타일 ete...)
    const text = textInput.value;
    if (text !== "") {
        ctx.lineWidth = 1;
        ctx.font = "48px serif" // context의 font에는두 가지 property를 지정할 수 있음 (size, fontFamily)
        ctx.fillText(text, event.offsetX, event.offsetY);
        ctx.restore(); // save 한 지점으로 돌아가기
    }
}

function onSaveClick() {
    const url = canvas.toDataURL(); // 이미지를 URL로 인코딩
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mouseup', onMouseUp);
canvas.addEventListener('mouseleave', onMouseUp);
canvas.addEventListener('click', onCanvasClick);
canvas.addEventListener('dblclick', onDoubleClick);

lineWidth.addEventListener('change', onLineWidthChange);
color.addEventListener('change',onColorChange);

colorOptions.forEach(color => color.addEventListener('click', onColorClick));

modeBtn.addEventListener('click', onModeClick);
destroyBtn.addEventListener('click', onDestroyClick);
eraserBtn.addEventListener('click', onEraserClick);
fileInput.addEventListener('change', onFileChange);
saveBtn.addEventListener('click', onSaveClick);