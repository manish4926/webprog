let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");

let redoDb = [];


undo.addEventListener("click", undoLine);
redo.addEventListener("click", redoLine);

function undoLine() {
    if(linesDb.length) {
        redoDb.push(linesDb[linesDb.length-1]);
        linesDb.pop();
    
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawLinesFromDB();
    }
    
}


let drawLinesFromDB = () => {   //Sugar Syntax Function
    for(i in linesDb) {
        let line = linesDb[i];
        for(j in line) {
            if(line[j].type == 'md') {
                ctx.beginPath();
                ctx.moveTo(line[j].x, line[j].y-100);
            } else {
                ctx.lineTo(line[j].x, line[j].y-100);
            }
        }
        ctx.stroke();

    }
    checkDisabledTools();
}

function redoLine() {
    if(redoDb.length) {
        linesDb.push(redoDb[redoDb.length-1]);
        redoDb.pop();
    
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawLinesFromDB();
    }
}

let checkDisabledTools = () => {
    if(linesDb.length == 0) {
        undo.classList.add('disabled-tool');
    } else {
        undo.classList.remove('disabled-tool');
    }
    if(redoDb.length == 0) {
        redo.classList.add('disabled-tool');
    } else {
        redo.classList.remove('disabled-tool');
    }
    
}

checkDisabledTools();