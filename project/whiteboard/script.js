let canvas = document.querySelector('#canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100;

window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 100;
})

let ctx = canvas.getContext("2d");

// console.log(ctx);

// ctx.fillStyle = "yellow";

// ctx.fillRect(10, 10, 150, 100);
let isPenDown = false;
canvas.addEventListener("mousedown", function(e) {
    let {clientX, clientY} = e;
    console.log(clientX, clientY);
    ctx.beginPath();
    ctx.moveTo(clientX, clientY-100);
    isPenDown = true;
})

canvas.addEventListener("mousemove", function(e) {
    if(isPenDown) {
        let {clientX, clientY} = e;
        ctx.lineTo(clientX, clientY-100);
        console.log(clientX, clientY);
    }
})

canvas.addEventListener("mouseup", function(e) {
    ctx.stroke();
    isPenDown = false;
})

