const canvas = document.querySelector('canvas');

// context : 페인트 브러쉬 => 축약해서 ctx로 씀
const ctx = canvas.getContext('2d'); //WebGL은 3D 요소

// JS에게 캔버스 크기 알려주기 => 왜 ... ? => 좌표값 때문인가봄
canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = 2;


const colors = {
    sunset : [
        "#3E7EAC",
        "#F2F3F5",
        "#FBACA4", 
        "#FFDCD4",
        "#D5756D"
    ],

    spring : [
        "#F3F6EB",
        "#FFCE55",
        "#DBF68F",
        "#92C3A5",
        "#568366"
    ],

    ocean : [
        "#2F4156",
        "#567C8D",
        "#C8D9E6",
        "#F5EFEB",
        "#FFFFFF"
    ]

}

// 저장될 테마
let selectTheme;

// 테마 랜덤 설정 함수
function randomTheme() {
    const themeKey = Object.keys(colors);
    const randomKey = themeKey[Math.trunc(Math.random() * themeKey.length)];
    selectTheme = colors[randomKey];
}

// 테마가 지정되지 않았을 때(= 첫 클릭시) 테마 랜덤 설정 함수 실행
canvas.addEventListener('click', (event) => {
    if (!selectTheme) {
        randomTheme();
    }
    onClick(event);
});

function onClick(event) {
    ctx.beginPath();
    ctx.moveTo(0,0);

    
    const color = selectTheme[Math.trunc(Math.random() * selectTheme.length)];
    ctx.strokeStyle = color;

    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
};

canvas.addEventListener('mousemove', onClick);