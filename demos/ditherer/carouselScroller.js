class Carousel
{

    constructor(carouselElement)
    {
        this.carousel = carouselElement;
        this.slides = this.carousel.querySelectorAll("div");
        this.priorSelectionIndex = 1;
        this.selectionIndex = 0;
        // const slideStyle = getComputedStyle(slides[0]);
        this.slideWidth = this.slides[0].scrollWidth;
        // because the carousel always shows 3 slides, the carousel will hold all unique slides, in addition to the end 2 copied to the beginning and vice-versa
        // such as d e [a b c d e] a b
        // that way, we can simulate an infinite/looping carousel
        this.realSlideCount = this.slides.length - 4;

        this.carousel.scrollTo({ left: this.slideWidth * 2, behavior: "auto" });

        let carouselButtons = this.carousel.querySelectorAll("[data-group='carousel-button']");
        console.log(carouselButtons);
        carouselButtons[0].addEventListener("click", () => this.prevClick());
        carouselButtons[1].addEventListener("click", () => this.nextClick());
    }

    prevClick()
    {
        this.priorSelectionIndex = this.selectionIndex;
        this.selectionIndex = (this.selectionIndex - 1 + this.realSlideCount) % this.realSlideCount;
        this.updateCarousel();
    }

    nextClick()
    {
        this.priorSelectionIndex = this.selectionIndex;
        this.selectionIndex = (this.selectionIndex + 1) % (this.realSlideCount);
        this.updateCarousel();
    }

    smoothCarouselTransition()
    {
        console.log(`smooth transition from ${this.priorSelectionIndex} to ${this.selectionIndex}`)
        this.carousel.scrollTo({ left: this.slideWidth * (this.selectionIndex + 2), behavior: "smooth" });
    }

    updateCarousel()
    {
        this.carousel.dataset.selectedImageIndex = this.selectionIndex;
        console.log(`selectionIndex: ${this.selectionIndex}; priorSelectionIndex: ${this.priorSelectionIndex}`)
        if (this.selectionIndex == 0 && this.priorSelectionIndex == (this.realSlideCount - 1))
        {
            console.log(`jumped from ${this.priorSelectionIndex} back to the beginning (${this.selectionIndex})`)
            document.documentElement.setAttribute("style", "scroll-behavior: auto;");
            // timeout so style is applied before scrolling
            setTimeout(() => {
                this.carousel.scrollTo({ left: this.slideWidth * 1});
                document.documentElement.removeAttribute("style");
                this.smoothCarouselTransition();
            }, 0)
        }
        else if (this.selectionIndex == (this.realSlideCount - 1) && this.priorSelectionIndex == 0)
        {
            console.log(`jumped from ${this.priorSelectionIndex} to the end (${this.selectionIndex})`)
            document.documentElement.setAttribute("style", "scroll-behavior: auto;");
            setTimeout(() => {
                this.carousel.scrollTo({ left: this.slideWidth * (2 + this.realSlideCount)});
                document.documentElement.removeAttribute("style");
                this.smoothCarouselTransition();
            }, 0)
        }
        else
        {
            this.smoothCarouselTransition();
        }
    }
}

let carouselElements = document.querySelectorAll("[data-group='carousel']");
const carousels = [];
carouselElements.forEach(carousel => {
    carousels.push(new Carousel(carousel));
});

