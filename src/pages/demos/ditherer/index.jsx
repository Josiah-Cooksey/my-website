"use client";

import PrimaryTemplate from "../../../components/PrimaryTemplate.jsx";

export default function DithererDemoPage()
{
    return (
        <PrimaryTemplate>
            <head>
                <title>Josiah Cooksey - Ditherer Demo</title>
                <meta name="description" content="Interactive image-processing pipeline supporting user-uploaded images and palettes." />
            </head>
            <section>
                <div class="m-4 w-full min-w-[320px] max-w-[600px] mx-auto rounded-2xl shadow-xl flex flex-wrap flex-shrink-0 bg-slate-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                    <div class="p-2 m-2 mx-auto w-full">
                        <div class="flex">
                            <button class="bg-lime-700 hover:bg-lime-800 active:bg-lime-900 text-white font-bold py-2 px-4 rounded-full" data-stage-aspect="navButton" hidden>Prior Step</button>
                            <div class="mx-auto"></div>
                            <button class="bg-lime-700 hover:bg-lime-800 active:bg-lime-900 text-white font-bold py-2 px-4 rounded-full" data-stage-aspect="navButton">Next Step</button>
                            <button id="formSubmittor" form="ditherUploadForm" type="submit" data-stage-aspect="navButton" class="bg-lime-700 hover:bg-lime-800 active:bg-lime-900 text-white font-bold py-2 px-4 rounded-full" hidden>Submit</button>
                        </div>
                        <p id="stepDisplay" class="text-2xl text-center">STEP 1/3</p>
                        <p id="stepInstruction" class="text-xl mb-2 text-center">Choose image source</p>
                        <div class="w-full">
                            <div class="w-max mx-auto" data-group-stage="inputImage">
                                <div>
                                    <input type="radio" id="useInputImageCarousel" name="inputImageSource" value="carousel" data-radio-hider="true" data-radio-enable-target="#inputImageCarouselHolder" data-radio-disable-target="#inputImageUpload" checked />
                                    <label for="useInputImageCarousel" class="text-md">Carousel — use arrows to pick an image</label>
                                </div>
                                
                                <div>
                                    <input type="radio" id="useInputImageUpload" name="inputImageSource" value="upload" data-radio-hider="true" data-radio-enable-target="#inputImageUpload" data-radio-disable-target="#inputImageCarouselHolder" />
                                    <label for="useInputImageUpload" class="text-md">Upload — choose a custom image</label>
                                </div>
                            </div>

                            
                            <div class="w-max mx-auto" data-group-stage="palette" hidden>
                                <div>
                                    <input type="radio" id="usepaletteCarousel" name="paletteSource" value="carousel" data-radio-hider="true" data-radio-enable-target="#paletteImageCarouselHolder" data-radio-disable-target="#paletteUpload" checked />
                                    <label for="usepaletteCarousel" class="text-md">Carousel — use arrows to pick a palette</label>
                                </div>
                                
                                <div>
                                    <input type="radio" id="usepaletteUpload" name="paletteSource" value="upload" data-radio-hider="true" data-radio-enable-target="#paletteUpload" data-radio-disable-target="#paletteImageCarouselHolder" />
                                    <label for="usepaletteUpload" class="text-md">Upload — choose a custom palette</label>
                                </div>
                            </div>

                            
                            <div class="w-max mx-auto" data-group-stage="pattern" hidden>
                                <div>
                                    <input form="ditherUploadForm" type="radio" id="useHilbertPattern" name="pattern" value="hilbert" data-radio-hider="true" data-radio-enable-target="#hilbertPatternVisualisation" data-radio-disable-target="#linearPatternVisualisation" checked />
                                    <label for="useHilbertPattern" class="text-md">Hilbert — zig-zagging fractal</label>
                                </div>
                                
                                <div>
                                    <input form="ditherUploadForm" type="radio" id="useLinearPattern" name="pattern" value="linear" data-radio-hider="true" data-radio-enable-target="#linearPatternVisualisation" data-radio-disable-target="#hilbertPatternVisualisation" />
                                    <label for="useLinearPattern" class="text-md">Linear — left to right, top to bottom</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="p-2 m-2 mx-auto w-full" id="inputImageCarouselHolder" data-group-stage="inputImage">
                        <div class="relative w-full max-w-lg mx-auto select-none">
                            <div id="inputImageCarousel" data-selected-image-index="0" data-carousel-aspect="carousel" class="touch-pan-y w-full items-center overflow-x-auto flex snap-x snap-mandatory rounded-xl px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                
                                <div class="flex-shrink-0 snap-center w-[80%] mx-2">
                                    <img src="./media/sample-images/lake.png" class="w-full rounded-xl" alt="lake next to a forest with a mountain in the background" draggable="false" />
                                </div>
                                <div class="flex-shrink-0 snap-center w-[80%] mx-2">
                                    <img src="./media/sample-images/puppies.png" class="w-full rounded-xl" alt="two small puppies alongside each other" draggable="false" />
                                </div>
                                
                                <div class="flex-shrink-0 snap-center w-[80%] mx-2">
                                    <img src="./media/sample-images/alley.png" class="w-full rounded-xl" alt="colourful alley or backyard that's paved" draggable="false" />
                                </div>
                                <div class="flex-shrink-0 snap-center w-[80%] mx-2">
                                    <img src="./media/sample-images/apple.png" class="w-full rounded-xl" alt="a single apple" draggable="false" />
                                </div>
                                <div class="flex-shrink-0 snap-center w-[80%] mx-2">
                                    <img src="./media/sample-images/happy-frog.png" class="w-full rounded-xl" alt="a frog that appears to be smiling" draggable="false" />
                                </div>
                                <div class="flex-shrink-0 snap-center w-[80%] mx-2">
                                    <img src="./media/sample-images/kitten.png" class="w-full rounded-xl" alt="a kitten" draggable="false" />
                                </div>
                                <div class="flex-shrink-0 snap-center w-[80%] mx-2">
                                    <img src="./media/sample-images/lake.png" class="w-full rounded-xl" alt="lake next to a forest with a mountain in the background" draggable="false" />
                                </div>
                                <div class="flex-shrink-0 snap-center w-[80%] mx-2">
                                    <img src="./media/sample-images/puppies.png" class="w-full rounded-xl" alt="two small puppies alongside each other" draggable="false" />
                                </div>
                                
                                <div class="flex-shrink-0 snap-center w-[80%] mx-2">
                                    <img src="./media/sample-images/alley.png" class="w-full rounded-xl" alt="colourful alley or backyard that's paved" draggable="false" />
                                </div>
                                <div class="flex-shrink-0 snap-center w-[80%] mx-2">
                                    <img src="./media/sample-images/apple.png" class="w-full rounded-xl" alt="a single apple" draggable="false" />
                                </div>

                                <button data-carousel-aspect="carousel-button" class="font-bold h-full w-[10%] absolute top-1/2 left-0 -translate-y-1/2 bg-black/50 text-white p-2 rounded-xl hover:bg-black/70">&lt;</button>
                                <button data-carousel-aspect="carousel-button" class="font-bold h-full w-[10%] absolute top-1/2 right-0 -translate-y-1/2 bg-black/50 text-white p-2  rounded-xl hover:bg-black/70">&gt;</button>
                            </div>
                        </div>
                    </div>
                    <div class="p-2 m-2 mx-auto w-full" id="paletteImageCarouselHolder" data-group-stage="palette" hidden>
                        <div class="relative w-full max-w-lg mx-auto select-none">
                            <div id="paletteImageCarousel" data-selected-image-index="0" data-carousel-aspect="carousel" class="touch-pan-y w-full items-center overflow-x-auto flex snap-x snap-mandatory rounded-xl px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                
                                <div class="flex-shrink-0 snap-center w-[80%] mx-2">
                                    <img src="./media/sample-palettes/neon.png" class="image-rendering-pixelated [image-rendering:pixelated] w-full rounded-xl" alt="the colors green, cyan, and magenta" draggable="false" />
                                </div>
                                <div class="flex-shrink-0 snap-center w-[80%] mx-2">
                                    <img src="./media/sample-palettes/red, green, and blue.png" class="image-rendering-pixelated [image-rendering:pixelated] w-full rounded-xl" alt="the colors red, green, and blue" draggable="false" />
                                </div>
                                
                                <div class="flex-shrink-0 snap-center w-[80%] mx-2">
                                    <img src="./media/sample-palettes/printer colors.png" class="image-rendering-pixelated [image-rendering:pixelated] w-full rounded-xl" alt="the colors cyan, magenta, yellow, black, and white" draggable="false" />
                                </div>
                                <div class="flex-shrink-0 snap-center w-[80%] mx-2">
                                    <img src="./media/sample-palettes/black and white.png" class="image-rendering-pixelated [image-rendering:pixelated] w-full rounded-xl" alt="the colors black and white" draggable="false" />
                                </div>
                                <div class="flex-shrink-0 snap-center w-[80%] mx-2">
                                    <img src="./media/sample-palettes/neon.png" class="image-rendering-pixelated [image-rendering:pixelated] w-full rounded-xl" alt="the colors green, cyan, and magenta" draggable="false" />
                                </div>
                                <div class="flex-shrink-0 snap-center w-[80%] mx-2">
                                    <img src="./media/sample-palettes/red, green, and blue.png" class="image-rendering-pixelated [image-rendering:pixelated] w-full rounded-xl" alt="the colors red, green, and blue" draggable="false" />
                                </div>

                                <div class="flex-shrink-0 snap-center w-[80%] mx-2">
                                    <img src="./media/sample-palettes/printer colors.png" class="image-rendering-pixelated [image-rendering:pixelated] w-full rounded-xl" alt="the colors cyan, magenta, yellow, black, and white" draggable="false" />
                                </div>
                                <div class="flex-shrink-0 snap-center w-[80%] mx-2">
                                    <img src="./media/sample-palettes/black and white.png" class="image-rendering-pixelated [image-rendering:pixelated] w-full rounded-xl" alt="the colors black and white" draggable="false" />
                                </div>
                                
                                <button data-carousel-aspect="carousel-button" class="font-bold h-full w-[10%] absolute top-1/2 left-0 -translate-y-1/2 bg-black/50 text-white p-2 rounded-xl hover:bg-black/70">&lt;</button>
                                <button data-carousel-aspect="carousel-button" class="font-bold h-full w-[10%] absolute top-1/2 right-0 -translate-y-1/2 bg-black/50 text-white p-2  rounded-xl hover:bg-black/70">&gt;</button>
                            </div>
                        </div>
                    </div>

                    <div class="m-2 mx-auto overflow-hidden" data-group-stage="pattern" hidden>
                        <div id="hilbertPatternVisualisation">
                            <img class="block max-w-none" src="./media/example-results/sunset.png-hilbert-dithered.png" alt="sunset on a beach with hilbert dithering applied" draggable="false" />
                        </div>
                        <div id="linearPatternVisualisation" data-default-hidden="true" hidden>
                            <img class="block max-w-none" src="./media/example-results/sunset.png-linear-dithered.png" alt="sunset on a beach with linear dithering applied" draggable="false" />
                        </div>
                    </div>

                    <div class="mb-3 mx-auto w-full">
                        <form id="ditherUploadForm" method="POST" enctype="multipart/form-data" autocomplete="off">
                            <div id="inputImageUpload" data-group-stage="inputImage" data-default-hidden="true" hidden>
                                <label for="inputImage" class="sr-only">Input image:</label>
                                <button type="button" class="block mx-auto bg-lime-700 hover:bg-lime-800 active:bg-lime-900 text-white font-bold py-2 px-4 rounded-full" onclick="
                                    document.getElementById('inputImage').click();
                                ">Upload Image</button>
                                <input accept=".png" type="file" id="inputImage" name="inputImage" class="m-2" data-canvas-target="#inputImageCanvas" hidden />
                                <div id="inputImageCanvas" class="m-2 p-2">
                                    <p class="text-md text-center">No file is selected.</p>
                                    <div class="flex justify-center">
                                        <button type="button" class="mx-auto text-gray-500 hover:text-gray-700 font-bold text-xl" hidden>
                                        &times; Remove Image
                                        </button>
                                    </div>
                                    <canvas class="w-full" hidden></canvas>
                                </div>
                            </div>
                            
                            <div id="paletteUpload" data-group-stage="palette" data-default-hidden="true" hidden>
                                <label for="palette" class="text-md" hidden>Palette:</label>
                                <button type="button" class="block mx-auto bg-lime-700 hover:bg-lime-800 active:bg-lime-900 text-white font-bold py-2 px-4 rounded-full" onclick="
                                    document.getElementById('palette').click();
                                ">Upload Palette</button>
                                <input accept=".png" type="file" id="palette" name="palette" class="m-2" data-canvas-target="#paletteCanvas" hidden />
                                <div id="paletteCanvas" class="m-2 p-2">
                                    <p class="text-md text-center">No file is selected.</p>
                                    <div class="flex justify-center">
                                        <button type="button" class="mx-auto text-gray-500 hover:text-gray-700 font-bold text-xl" hidden>
                                        &times; Remove Image
                                        </button>
                                    </div>
                                    <canvas class="w-full" hidden></canvas>
                                </div>
                            </div>

                        </form>
                    </div>
                    
                    <div class="m-2 mx-auto w-full" data-group-stage="outputImage" hidden>
                        <img id="resultImageHolder" alt="dithered result image after processing is complete" hidden />
                    </div>
                </div>
            </section>
            
            <script src="./scripts/uploadParser.js?v=202511282111"></script>
            <script src="./scripts/imageUploadPreviewer.js?v=202511282111"></script>
            
            <script src="/scripts/carouselScroller.js?v=202511282111"></script>
            <script src="/scripts/radioHiders.js?v=202511282111"></script>
            <script type="module" src="/scripts/GUIStageManager.js?v=202511282111"></script>
        </PrimaryTemplate>
    );
}