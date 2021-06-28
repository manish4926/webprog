let photoDiv = document.querySelector('#photo');
let photoUploadInput = photoDiv.querySelector('#photo-upload');

photoDiv.addEventListener('click', function() {
    photoUploadInput.click();
})

photoUploadInput.addEventListener('change', function(e) {
    let fileObj = e.target.files[0];
    //console.log(fileObj);
    let filePath = URL.createObjectURL(fileObj, {type:"image/jpg"});
    //console.log(filePath);
    let img = document.createElement("img");
    img.setAttribute("src", filePath);
    img.classList.add("sticky-image");
    //document.querySelector("body").append(img);
    addSticky(img);
})