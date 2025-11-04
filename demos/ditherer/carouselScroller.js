// TODO: support multiple carousels on single page
const carousel = document.getElementById("carousel");
const slides = carousel.querySelectorAll("div");
let priorSelectionIndex = 1;
let selectionIndex = 0;
const slideStyle = getComputedStyle(slides[0]);
const slideWidth = slides[0].scrollWidth;
// because the carousel always shows 3 slides, the carousel will hold all unique slides, in addition to the end 2 copied to the beginning and vice-versa
// such as d e [a b c d e] a b
// that way, we can simulate an infinite/looping carousel
const realSlideCount = slides.length - 4;

carousel.scrollTo({ left: slideWidth * 2, behavior: "auto" });


function updateCarousel()
{
    carousel.dataset.selectedImageIndex = selectionIndex;
    console.log(`selectionIndex: ${selectionIndex}; priorSelectionIndex: ${priorSelectionIndex}`)
    if (selectionIndex == 0 && priorSelectionIndex == (realSlideCount - 1))
    {
        console.log(`jumped from ${priorSelectionIndex} back to the beginning (${selectionIndex})`)
        document.documentElement.setAttribute("style", "scroll-behavior: auto;");
        // timeout so style is applied before scrolling
        setTimeout(function() {
            carousel.scrollTo({ left: slideWidth * 1});
            document.documentElement.removeAttribute("style");
            smoothCarouselTransition();
        }, 0)
    }
    else if (selectionIndex == (realSlideCount - 1) && priorSelectionIndex == 0)
    {
        console.log(`jumped from ${priorSelectionIndex} to the end (${selectionIndex})`)
        document.documentElement.setAttribute("style", "scroll-behavior: auto;");
        setTimeout(function() {
            carousel.scrollTo({ left: slideWidth * (2 + realSlideCount)});
            document.documentElement.removeAttribute("style");
            smoothCarouselTransition();
        }, 0)
    }
    else
    {
        smoothCarouselTransition();
    }
}

function instantCarouselJump(jumpLeft)
{

}

function smoothCarouselTransition()
{
    console.log(`smooth transition from ${priorSelectionIndex} to ${selectionIndex}`)
    carousel.scrollTo({ left: slideWidth * (selectionIndex + 2), behavior: "smooth" });
}

document.getElementById("nextBtn").onclick = () => {
    priorSelectionIndex = selectionIndex;
    selectionIndex = (selectionIndex + 1) % (realSlideCount);
    updateCarousel();
};

document.getElementById("prevBtn").onclick = () => {
    priorSelectionIndex = selectionIndex;
    selectionIndex = (selectionIndex - 1 + realSlideCount) % realSlideCount;
    updateCarousel();
};