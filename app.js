const canvas = document.querySelector('canvas');

// context : 페인트 브러쉬 => 축약해서 ctx로 씀
const ctx = canvas.getContext('2d'); //WebGL은 3D 요소

// JS에게 캔버스 크기 알려주기 => 왜 ... ? => 좌표값 때문인가봄
canvas.width = 800;
canvas.height = 800;

ctx.fillRect(200, 200, 50, 200);
ctx.fillRect(400, 200, 50, 200);
ctx.lineWidth = 2; // 라인의 두께를 먼저 조절해준 뒤
ctx.fillRect(300, 300, 50, 100); // 도형을 그려야 반영됨
ctx.fillRect(200, 200, 200, 20);
ctx.moveTo(200, 200);
ctx.lineTo(325, 100);
ctx.lineTo(450, 200);
ctx.fill();

ctx.fillRect(420, 500, 15, 100);
ctx.fillRect(550, 500, 15, 100);
ctx.fillRect(460, 500, 60, 150);

ctx.beginPath();
ctx.arc(490, 450, 40, 0, 2 * Math.PI);
// ctx.arc(x, y, radius, startAngle, endAngle)
// radius : 원의 크기
// startAngle : 원의 시작점
// endAngle : 원의 끝점 (2 * Math.PI = 0의 360도)
ctx.fill();

ctx.beginPath();
ctx.fillStyle = "white";
ctx.arc(475, 445, 6, 0, 2 * Math.PI);
ctx.arc(505, 445, 6, 0, 2 * Math.PI);
ctx.fill();

ctx.beginPath();
ctx.strokeStyle = "white";
ctx.moveTo(480, 470);
ctx.lineTo(490, 460);
ctx.lineTo(500, 470);
ctx.stroke();
