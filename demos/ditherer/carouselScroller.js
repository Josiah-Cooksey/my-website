const carousel = document.getElementById("carousel");
const slides = carousel.querySelectorAll("div");
let priorSelectionIndex = 0;
let selectionIndex = 0;
const slideStyle = getComputedStyle(slides[0]);
 // includes margin
const slideWidth = slides[0].scrollWidth;
// because the carousel always shows 3 slides, the carousel will hold all unique slides, in addition to the end 2 copied to the beginning and vice-versa
// such as d e a b c d e a b
// that way, we can simulate an infinite/looping carousel
const realSlideCount = slides.length - 4;

carousel.scrollTo({ left: slideWidth * 2, behavior: "smooth" });
function updateCarousel() {
    console.log(`selectionIndex: ${selectionIndex}; priorSelectionIndex: ${priorSelectionIndex}`)
    if (selectionIndex == 0 && priorSelectionIndex == realSlideCount)
    {
        // TODO: add infinite scroll by learning how to instantly jump instead of always smoothly scrolling
        // carousel.scrollLeft = slideWidth * 3;
        carousel.scrollTo({ left: slideWidth * 3, behaviour: "auto !important"});
        // carousel.scrollTo({ left: slideWidth * selectionIndex, behavior: "smooth" });
    }
    else if (selectionIndex == realSlideCount && priorSelectionIndex == 0)
    {
        carousel.scrollLeft = slideWidth * (2 + realSlideCount);
        // carousel.scrollTo({ left: slideWidth * (2 + realSlideCount)});
        // carousel.scrollTo({ left: slideWidth * selectionIndex, behavior: "smooth" });
    }
    else
    {
        carousel.scrollTo({ left: slideWidth * (selectionIndex + 2), behavior: "smooth" });
    }

}

document.getElementById("nextBtn").onclick = () => {
    priorSelectionIndex = selectionIndex;
    selectionIndex = (selectionIndex + 1) % realSlideCount;
    updateCarousel();
};

document.getElementById("prevBtn").onclick = () => {
    priorSelectionIndex = selectionIndex;
    selectionIndex = (selectionIndex - 1 + slides.length) % realSlideCount;
    updateCarousel();
};