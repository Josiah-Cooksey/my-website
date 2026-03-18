
// displays uploaded images for easier viewing, in addition to resizing them to reduce POST request size and better display the dithering effect 
let maxImageUploadWidth = 1280;
let maxImageUploadHeight = 720;
let imageInputs = document.querySelectorAll("[data-canvas-target]");

imageInputs.forEach(inputElement => {

    let canvasHolder = document.querySelector(inputElement.dataset.canvasTarget);
    let canvasElement = canvasHolder.querySelector("canvas");
    let canvasLabel = canvasHolder.querySelector("p");
    let removeImageButton = canvasHolder.querySelector("button");
    // the only child button will clear the user-selected file and hide all but the selected filename holder
    removeImageButton.addEventListener("click", () => {
        inputElement.value = "";
        removeImageButton.hidden = true;
        canvasLabel.textContent = "No file is selected. Click the upload button or paste an image from your clipboard.";
        canvasElement.hidden = true;
    });

    inputElement.addEventListener("change", () => {
        try 
        {
            let imageFile = inputElement.files[0];
            if (!imageFile)
            {
                canvasElement.width = 0;
                canvasElement.height = 0;
                return;
            }
            
            canvasLabel.textContent = `Selected file: ${imageFile.name}`;
            removeImageButton.hidden = false;
            scaleAndPreviewImage(imageFile, canvasElement);
        } 
        catch (error) 
        {
            console.log(`error on ${inputElement} file upload; details: ${error}`);
        }
    });
});


document.addEventListener("paste", (pasteEvent) => {
    const items = pasteEvent.clipboardData.items;

    let clipboardImageFile;
    for (let item of items)
    {
        if (item.type.startsWith("image/"))
        {
            clipboardImageFile = item.getAsFile();
            break;
        }
    }

    if (clipboardImageFile === undefined)
    {
        console.log("paste did not contain an image");
        return;
    }
    
    imageInputs.forEach(inputElement => {
        let canvasHolder = document.querySelector(inputElement.dataset.canvasTarget);
        if (!inputElement.parentElement.hidden)
        {
            console.log(`inputElement.parentElement.hidden: ${inputElement.parentElement.hidden}`);
            let canvasElement = canvasHolder.querySelector("canvas");
            let canvasLabel = canvasHolder.querySelector("p");
            let removeImageButton = canvasHolder.querySelector("button");
            
            canvasLabel.textContent = `Pasted from clipboard: ${clipboardImageFile.name}`;
            removeImageButton.hidden = false;
            scaleAndPreviewImage(clipboardImageFile, canvasElement);

            return;
        }
    });
});


function scaleAndPreviewImage(imageFile, canvasElement)
{
    canvasElement.hidden = false;

    createImageBitmap(imageFile).then(bitmap => {
        let ctx = canvasElement.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        let drawWidthScale = maxImageUploadWidth / bitmap.width;
        let drawHeightScale = maxImageUploadHeight / bitmap.height;
        let scaleFactor = 1;
        
        // I want to scale the image squarely so that there is no horizontal or vertical distortion
        if (drawHeightScale < drawWidthScale)
        {
            scaleFactor = drawHeightScale;
        }
        else
        {
            scaleFactor = drawWidthScale;
        }

        if (bitmap.width > maxImageUploadWidth)
        {
            canvasElement.width = maxImageUploadWidth;
        }
        else
        {
            canvasElement.width = bitmap.width;
        }
        if (bitmap.height > maxImageUploadHeight)
        {
            canvasElement.height = maxImageUploadHeight;
        }
        else
        {
            canvasElement.height = bitmap.height;
        }

        
        
        if (scaleFactor < 1)
        {
            let renderWidth = bitmap.width * scaleFactor;
            let renderHeight = bitmap.height * scaleFactor;
            canvasElement.width = renderWidth;
            canvasElement.height = renderHeight;
            ctx.drawImage(bitmap, 0, 0, renderWidth, renderHeight);
        }
        else
        {
            ctx.drawImage(bitmap, 0, 0, canvasElement.width, canvasElement.height);
        }
    });
}