const form = document.getElementById("ditherUploadForm");
form = async (event) => 
{
    event.preventDefault();

    const formData = new FormData(form);

    const inputImageResponse = await fetch("media/sample-images/small-happy-frog.png");
    const inputImageBlob = await inputImageResponse.blob();
    formData.append("inputImage", inputImageBlob, "placeholderfilename.placeholderfiletype");

    const kernelResponse = await fetch("media/sample-diffusions/diffusion.png");
    const kernelBlob = await kernelResponse.blob();
    formData.append("kernel", kernelBlob, "placeholderfilename.placeholderfiletype");

    const paletteResponse = await fetch("media/sample-palettes/palette.png");
    const paletteBlob = await paletteResponse.blob();
    formData.append("palette", paletteBlob, "placeholderfilename.placeholderfiletype");

    try
    {
        const response = await fetch("https://api.jcooksey.dev/ditherer/dither", {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        
        if ("error" in response)
        {
            const errorField = document.getElementById("errorDisplay");
            errorField.textContent = response["error"];
            return;
        }
        const imageElement = document.getElementById("resultImage");
        imageElement.src = `data:image/png;base64,${response["resultImage"]}`;
    }
    catch (error)
    {
        console.error(error);
    }
}