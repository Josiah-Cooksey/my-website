const form = document.getElementById("ditherUploadForm");
form.onsubmit = async (event) => 
{
    event.preventDefault();

    const formData = new FormData(form);

    if (form.inputImage.files.length == 0)
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

    // TODO: add logic to determine if custom image was uploaded to use in form instead of the image selected in the carousel

    if (form.kernel.files.length == 0)
    {
        const kernelResponse = await fetch("media/sample-diffusions/diffusion.png");
        const kernelBlob = await kernelResponse.blob();
        formData.delete("kernel");
        formData.append("kernel", kernelBlob, "placeholderfilename.placeholderfiletype");
    }
    if (form.palette.files.length == 0)
    {
        const paletteResponse = await fetch("media/sample-palettes/palette.png");
        const paletteBlob = await paletteResponse.blob();
        formData.delete("palette");
        formData.append("palette", paletteBlob, "placeholderfilename.placeholderfiletype");
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
            const errorField = document.getElementById("errorDisplay");
            errorField.textContent = jsonResult["error"];
            return;
        }
        const imageElement = document.getElementById("resultImageHolder");
        imageElement.src = `data:image/png;base64,${jsonResult["resultImage"]}`;
    }
    catch (error)
    {
        console.error(error);
    }
}