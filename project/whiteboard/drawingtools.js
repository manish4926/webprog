let pen = document.querySelector('#pen');
let eraser = document.querySelector('#eraser');

let penTools = pen.querySelector('.tool-options');
let eraserTools = eraser.querySelector('.tool-options');

pen.addEventListener("click", function() {
    eraserTools.classList.add('hide');
    if(pen.classList.contains("active-tool")) {
        if(penTools.classList.contains('hide')) {
            penTools.classList.remove('hide');
        } else {
            penTools.classList.add('hide');
        }
        
        
    } else {
        pen.classList.add("active-tool");
        pen.classList.remove("disabled-tool");

        eraser.classList.add("disabled-tool");
        eraser.classList.remove("active-tool");

        penTools.classList.add('hide');

    }
})



eraser.addEventListener("click", function() {
    penTools.classList.add('hide');
    if(eraser.classList.contains("active-tool")) {
        if(eraserTools.classList.contains('hide')) {
            eraserTools.classList.remove('hide');
        } else {
            eraserTools.classList.add('hide');
        }
        
        
    } else {
        eraser.classList.add("active-tool");
        eraser.classList.remove("disabled-tool");

        pen.classList.add("disabled-tool");
        pen.classList.remove("active-tool");

        eraserTools.classList.add('hide');
    }
})