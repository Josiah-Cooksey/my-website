
// hides/shows elements when users change which radio is selected and updates "defaultHidden" for them
// defaultHidden is for the GUIStageManager to use to track which elements to NOT turn back on for the stage when returning to it 
let radioHiders = document.querySelectorAll("[data-radio-hider]");
radioHiders.forEach(radio => {
    radio.addEventListener("click", () => document.querySelectorAll(radio.dataset.radioEnableTarget).forEach(targetElement => {
        console.log(`showing element ${targetElement}`);
        delete targetElement.dataset.defaultHidden;
        targetElement.hidden = false;
    }));
    radio.addEventListener("click", () => document.querySelectorAll(radio.dataset.radioDisableTarget).forEach(targetElement => {
        console.log(`hiding element ${targetElement}`);
        targetElement.dataset.defaultHidden = "true";
        targetElement.hidden = true;
    }));
});
