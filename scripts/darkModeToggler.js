let darkModeButton = document.getElementById("darkModeToggle");
darkModeButton.addEventListener("click", () => {
    let theHTMLElement = document.getElementById('html')
    if (theHTMLElement.className != 'dark')
    {
        theHTMLElement.className='dark'
    }
    else
    {
        theHTMLElement.className='light'
    }
});