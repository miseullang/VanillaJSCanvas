const canvas = document.querySelector('canvas');

// context : 페인트 브러쉬 => 축약해서 ctx로 씀
const ctx = canvas.getContext('2d'); //WebGL은 3D 요소

// JS에게 캔버스 크기 알려주기 => 왜 ... ? => 좌표값 때문인가봄
canvas.width = 800;
canvas.height = 800;

// ctx.fillRect(50, 50, 100, 200); => 이 사각형을 만들기 위해서는 다음 과정을 거친다
// 1. 사각형 그리기
// ctx.rect(50, 50, 100, 100);
// ctx.rect(150, 150, 100, 100);
// ctx.rect(250, 250, 100, 100);
// 2. 색 채우기
// ctx.fill();

ctx.rect(50, 50, 100, 100);
ctx.rect(150, 150, 100, 100);
ctx.rect(250, 250, 100, 100);
ctx.fill();

// 앞서 그린 경로 끊고 새로 그리기
ctx.beginPath();
ctx.rect(350, 350, 100, 100);
ctx.fillStyle = 'red';
ctx.fill();

