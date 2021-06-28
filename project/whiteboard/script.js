let canvas = document.querySelector('#canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100;

window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 100;

    drawLinesFromDB();
})

let ctx = canvas.getContext("2d");
let linesDb = [];
let line = [];

// console.log(ctx);

// ctx.fillStyle = "yellow";

// ctx.fillRect(10, 10, 150, 100);
let isPenDown = false;
canvas.addEventListener("mousedown", function(e) {
    let x = e.clientX;
    let y = e.clientY;
    console.log(x, y);
    ctx.beginPath();
    ctx.moveTo(x, y-100);
    isPenDown = true;

    let pointObject = {
        x:x,
        y:y,
        type:"md"
    }
    line.push(pointObject);
})

canvas.addEventListener("mousemove", function(e) {
    if(isPenDown) {
        let x = e.clientX;
        let y = e.clientY;
        ctx.lineTo(x, y-100);
        ctx.stroke();
        console.log(x, y);

        let pointObject = {
            x:x,
            y:y,
            type:"mm"
        }
        line.push(pointObject);
    }
})

canvas.addEventListener("mouseup", function(e) {
    
    isPenDown = false;
    linesDb.push(line);
    line = [];
    console.log(linesDb);
    redoDb = [];
    checkDisabledTools();
})

