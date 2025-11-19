
// displays uploaded images for easier viewing, in addition to resizing them to reduce POST request size and better display the dithering effect 
let maxImageUploadWidth = 1280;
let maxImageUploadHeight = 720;
let imageInputs = document.querySelectorAll("[data-canvas-target]");
imageInputs.forEach(inputElement => {
    inputElement.addEventListener("change", () => document.querySelectorAll(inputElement.dataset.canvasTarget).forEach(targetCanvas => {
        try 
        {   
            // the only child button will just be to clear the user-selected file
            /*canvasTarget.querySelectorAll("button")[0].addEventListener("click", () => {
                document.getElementById('inputImage').value = '';
            });
            delete canvasTarget.dataset.defaultHidden;
            canvasTarget.hidden = false;*/

            let imageFile = inputElement.files[0];
            if (!imageFile)
            {
                targetCanvas.width = 0;
                targetCanvas.height = 0;
                return;
            }
            createImageBitmap(imageFile).then(bitmap => {
                let ctx = targetCanvas.getContext("2d");
                ctx.imageSmoothingEnabled = false;
                if (bitmap.width > maxImageUploadWidth)
                {
                    targetCanvas.width = maxImageUploadWidth;
                }
                else
                {
                    targetCanvas.width = bitmap.width;
                }
                if (bitmap.height > maxImageUploadHeight)
                {
                    targetCanvas.height = maxImageUploadHeight;
                }
                else
                {
                    targetCanvas.height = bitmap.height;
                }
                ctx.drawImage(bitmap, 0, 0, targetCanvas.width, targetCanvas.height);
            });
        } 
        catch (error) 
        {
            console.log(`error on ${inputElement} file upload; details: ${error}`)
        }
    }));
});
