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
        this.navButtons = navButtons;
        this.stepHandler.eventHandler.on("stepChange", this.handleStepChange.bind(this));
    }

    getStageName(stageIndex)
    {
        return STAGENAMES[stageIndex];
    }

    handleStepChange(stepData)
    {
        console.log(`step changed to ${stepData.step}; lastStep changed to ${stepData.lastStep}`);
        document.getElementById("stepDisplay").textContent = `STEP ${stepData.step + 1}/3`;
        
        document.querySelectorAll("[data-group-stage]:not(.hidden)").hidden = true;
        switch (stepData.step)
        {
            case STAGES.INPUTIMAGE:
                document.getElementById("stepInstruction").textContent = "Choose image source";
                this.showStageGroup(STAGENAMES[STAGES.INPUTIMAGE]);
                if (stepData.lastStep == STAGES.PALETTE)
                {
                    this.navButtons[0].hidden = true;
                }
                this.hideStageGroup(STAGENAMES[STAGES.PALETTE]);
                break;

            case STAGES.PALETTE:
                document.getElementById("stepInstruction").textContent = "Choose palette source";
                this.showStageGroup(STAGENAMES[STAGES.PALETTE]);
                if (stepData.lastStep == STAGES.INPUTIMAGE)
                {
                    this.navButtons[0].hidden = false;
                }
                else if (stepData.lastStep == STAGES.KERNEL)
                {
                    this.navButtons[1].hidden = false;
                    this.navButtons[2].hidden = true;
                }
                this.hideStageGroup(STAGENAMES[stepData.lastStep]);
                break;

            case STAGES.KERNEL:
                document.getElementById("stepInstruction").textContent = "Choose pattern source";
                this.showStageGroup(STAGENAMES[STAGES.KERNEL]);
                if (stepData.lastStep == STAGES.PALETTE)
                {
                    this.navButtons[1].hidden = true;
                }
                this.navButtons[2].hidden = false;
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
let startingStepIndex = 0;
let totalStepCount = 4;
let stepHandler = new GUIStepHandler(stageNavigationButtons[0], stageNavigationButtons[1], startingStepIndex, totalStepCount, false);
let stageManager = new GUIStageManager(stepHandler, stageNavigationButtons);