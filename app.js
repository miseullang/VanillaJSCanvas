const canvas = document.querySelector('canvas');

// context : 페인트 브러쉬 => 축약해서 ctx로 씀
const ctx = canvas.getContext('2d'); //WebGL은 3D 요소

// JS에게 캔버스 크기 알려주기 => 왜 ... ? => 좌표값 때문인가봄
canvas.width = 800;
canvas.height = 800;

// ctx.rect(50, 50, 100, 100); => 도형 그리기를 이용하지 않고, 선부터 그려볼 것
ctx.moveTo(50, 50); // 선의 시작점 좌표 (50,50)
ctx.lineTo(150, 50); // 선의 끝점 좌표 (150,50)
// ctx.stroke(); // x축으로 100만큼 선 긋기
ctx.lineTo(150, 150);
ctx.lineTo(50, 150);
ctx.lineTo(50, 50);
ctx.fill();


