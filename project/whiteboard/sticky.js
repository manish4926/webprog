let sticky = document.querySelector("#sticky");
sticky.addEventListener("click", function() {
    addSticky();
});

function addSticky(imageElement) {
    let stickyDiv = document.createElement("div");
    stickyDiv.classList.add("sticky");
    //stickyDiv.contentEditable = true;
    stickyDiv.innerHTML = `
    <div class="sticky-header">
        <div class="minimize"></div>
        <div class="close"></div>
    </div>
    <div class="sticky-content"></div>`;

    let stickyHeader = stickyDiv.querySelector(".sticky-header");
    let stickyContent = stickyDiv.querySelector(".sticky-content");
    let minimize = stickyDiv.querySelector(".minimize");
    let close = stickyDiv.querySelector(".close");
    

    if(imageElement) {
        stickyContent.append(imageElement);
    } else {
        stickyContent.contentEditable = true;
    }

    stickyContent.addEventListener("dblclick", function() {
        stickyDiv.contentEditable = true;
        
    })


    minimize.addEventListener("click", function() {
        stickyDiv.contentEditable = false;
        stickyContent.style.display == "none" ? stickyContent.style.display = 'block' : stickyContent.style.display="none";
    })

    close.addEventListener("click", function() {
        stickyDiv.remove();
    })

    let isStickyHold = false;
    let initialX;
    let initialY;
    stickyHeader.addEventListener("mousedown", function(e) {
        initialX = e.clientX;
        initialY = e.clientY;
        isStickyHold = true;
    })

    stickyHeader.addEventListener("mousemove", function(e) {
        if(isStickyHold) {
            let finalX = e.clientX;
            let finalY = e.clientY;

            let dx = finalX - initialX;
            let dy = finalY - initialY;
            
            let {top, left} = stickyDiv.getBoundingClientRect();
            stickyDiv.style.top = top + dy + "px";
            stickyDiv.style.left = left + dx + "px";
        }
        
    })

    stickyHeader.addEventListener("mouseup", function(e) {
        isStickyHold = false;
        console.log('disa');
    })

    document.body.append(stickyDiv);
}