const form = document.getElementById("ditherUploadForm");
form.onsubmit = async (event) => 
{
    event.preventDefault();

    const formData = new FormData(form);

    if (form.inputImage.files.length == 0 || document.getElementById("useInputImageCarousel").checked)
    {
        const carousel = document.getElementById("inputImageCarousel");
        const slides = carousel.querySelectorAll("img");
        const inputImageURL = slides[parseInt(carousel.dataset.selectedImageIndex) + 2].src;

        const inputImageResponse = await fetch(inputImageURL);
        const inputImageBlob = await inputImageResponse.blob();
        // this line removes the existing form field with the same name first
        formData.delete("inputImage");
        formData.append("inputImage", inputImageBlob, "placeholderfilename.placeholderfiletype");
    }
    if (form.palette.files.length == 0 || document.getElementById("usepaletteUpload").checked)
    {
        
        const carousel = document.getElementById("paletteImageCarousel");
        const slides = carousel.querySelectorAll("img");
        const paletteURL = slides[parseInt(carousel.dataset.selectedImageIndex) + 2].src;

        const paletteResponse = await fetch(paletteURL);
        const paletteBlob = await paletteResponse.blob();
        formData.delete("palette");
        formData.append("palette", paletteBlob, "placeholderfilename.placeholderfiletype");
    }
    if (form.kernel.files.length == 0)// || document.getElementById("useKernelCarousel").checked)
    {
        // TODO: use uploaded kernel/pattern when the back-end supports it
        const kernelResponse = await fetch("media/sample-diffusions/diffusion.png");
        const kernelBlob = await kernelResponse.blob();
        formData.delete("kernel");
        formData.append("kernel", kernelBlob, "placeholderfilename.placeholderfiletype");
    }

    try
    {
        const response = await fetch("https://api.jcooksey.dev/ditherer/dither", {
            method: "POST",
            body: formData
        });

        const jsonResult = await response.json();
        console.log(`jsonResult: ${jsonResult}`);
        
        if ("error" in jsonResult)
        {
            const errorTextField = document.getElementById("errorTextField");
            errorTextField.textContent = `An error occurred whilst processing your input. Details:\n${jsonResult["error"]}`;
            errorTextField.hidden = false;
            return;
        }
        const imageElement = document.getElementById("resultImageHolder");
        imageElement.src = `data:image/png;base64,${jsonResult["resultImage"]}`;
        imageElement.hidden = false;
    }
    catch (error)
    {
        console.error(error);
        const errorTextField = document.getElementById("errorTextField");
        errorTextField.textContent = `A problem occured during parsing. Please refresh the page before trying again. Details:\n${error}`;
        errorTextField.hidden = false;
        return;
    }
}