import GUIStepHandler from "../../scripts/GUIStepHandler.js";

const STAGES = Object.freeze({
    INPUTIMAGE: 0,
    PALETTE: 1,
    KERNEL: 2,
    OUTPUTIMAGE: 3
});

const STAGENAMES = Object.freeze([
    "inputImage",
    "palette",
    "kernel",
    "outputimage"
]);

class GUIStageManager
{
    constructor(stepHandler, navButtons)
    {
        // may not even need to use this first line given we're using events/callbacks
        this.stepHandler = stepHandler;
        this.buttons = navButtons;
        this.stepHandler.eventHandler.on("stepChange", this.handleStepChange.bind(this));
    }

    getStageName(stageIndex)
    {
        return STAGENAMES[stageIndex];
    }

    handleStepChange(stepData)
    {
        console.log(`step changed to ${stepData.step}; lastStep changed to ${stepData.lastStep}`);
        switch (stepData.step)
        {
            case STAGES.INPUTIMAGE:
                this.showStageGroup(STAGENAMES[STAGES.INPUTIMAGE]);
                if (stepData.lastStep == STAGES.PALETTE)
                {
                    this.buttons[0].hidden = true;
                }
                this.hideStageGroup(STAGENAMES[STAGES.PALETTE]);
                // document.querySelectorAll("[data-group-stage]:not(.hidden)").hidden = true;
                break;

            case STAGES.PALETTE:
                this.showStageGroup(STAGENAMES[STAGES.PALETTE]);
                if (stepData.lastStep == STAGES.INPUTIMAGE)
                {
                    this.buttons[0].hidden = false;
                }
                else if (stepData.lastStep == STAGES.KERNEL)
                {
                    this.buttons[1].hidden = false;
                    this.buttons[2].hidden = true;
                }
                this.hideStageGroup(STAGENAMES[stepData.lastStep]);
                break;

            case STAGES.KERNEL:
                this.showStageGroup(STAGENAMES[STAGES.KERNEL]);
                if (stepData.lastStep == STAGES.PALETTE)
                {
                    this.buttons[1].hidden = true;
                }
                this.buttons[2].hidden = false;
                this.hideStageGroup(STAGENAMES[stepData.lastStep]);
                break;
        }
    }

    showStageGroup(stageGroupName, hideElement = false)
    {
        let stageElements = document.querySelectorAll(`[data-group-stage='${stageGroupName}']`);
        stageElements.forEach(element => {
            element.hidden = hideElement;
        });
    }

    hideStageGroup(stageGroupName)
    {
        this.showStageGroup(stageGroupName, true);
    }
}

let stageNavigationButtons = document.querySelectorAll("[data-stage-aspect='navButton']");
let stepHandler = new GUIStepHandler(stageNavigationButtons[0], stageNavigationButtons[1], 0, 4, false);
let stageManager = new GUIStageManager(stepHandler, stageNavigationButtons);