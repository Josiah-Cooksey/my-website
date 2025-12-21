import GUIStepHandler from "../../scripts/GUIStepHandler.js";

const STAGES = Object.freeze({
    INPUTIMAGE: 0,
    PALETTE: 1,
    PATTERN: 2,
    OUTPUTIMAGE: 3
});

const STAGENAMES = Object.freeze([
    "inputImage",
    "palette",
    "pattern",
    "outputImage"
]);

class GUIStageManager
{
    constructor(stepHandler, navButtons)
    {
        // may not even need to use this first line given we're using events/callbacks
        this.stepHandler = stepHandler;
        this.navButtons = navButtons;
        this.stepHandler.eventHandler.on("stepChange", this.handleStepChange.bind(this));
        this.navButtons[2].addEventListener("click", () => this.handleStepChange({step: 3, lastStep: 2}));
    }

    getStageName(stageIndex)
    {
        return STAGENAMES[stageIndex];
    }

    handleStepChange(stepData)
    {
        console.log(`step changed to ${stepData.step}; lastStep changed to ${stepData.lastStep}`);
        document.getElementById("stepDisplay").textContent = `STEP ${stepData.step + 1}/3`;
        
        // TODO: track the visibility state of elements using data- attributes 
        // for example, data-default-hidden="true" means that when that stage is active, the element should remain hidden
        let visibleStageElements = document.querySelectorAll("[data-group-stage]:not(.hidden)");
        visibleStageElements.forEach(element => {
            element.hidden = true;
        });
        switch (stepData.step)
        {
            case STAGES.INPUTIMAGE:
                document.getElementById("stepInstruction").textContent = "Choose image source";
                this.showStageGroup(STAGENAMES[STAGES.INPUTIMAGE]);
                if (stepData.lastStep == STAGES.PALETTE)
                {
                    this.navButtons[0].hidden = true;
                }
                // TODO: avoid tracking which step we were last on and instead update visibility strictly based on current step
                this.navButtons[1].hidden = false;
                this.hideStageGroup(STAGENAMES[STAGES.PALETTE]);
                break;

            case STAGES.PALETTE:
                document.getElementById("stepInstruction").textContent = "Choose palette source";
                this.showStageGroup(STAGENAMES[STAGES.PALETTE]);
                if (stepData.lastStep == STAGES.INPUTIMAGE)
                {
                    this.navButtons[0].hidden = false;
                }
                else if (stepData.lastStep == STAGES.PATTERN)
                {
                    this.navButtons[1].hidden = false;
                    this.navButtons[2].hidden = true;
                }
                this.hideStageGroup(STAGENAMES[stepData.lastStep]);
                break;

            case STAGES.PATTERN:
                document.getElementById("stepInstruction").textContent = "Choose pattern";
                this.showStageGroup(STAGENAMES[STAGES.PATTERN]);
                if (stepData.lastStep == STAGES.PALETTE)
                {
                    this.navButtons[1].hidden = true;
                }
                this.navButtons[2].hidden = false;
                this.hideStageGroup(STAGENAMES[stepData.lastStep]);
                break;

            case STAGES.OUTPUTIMAGE:
                document.getElementById("stepDisplay").textContent = `Result:`;
                document.getElementById("stepInstruction").textContent = "Press the back button to input another image for dithering.";
                this.showStageGroup(STAGENAMES[STAGES.OUTPUTIMAGE]);
                if (stepData.lastStep == STAGES.PATTERN)
                {
                    this.navButtons[1].hidden = true;
                }
                this.navButtons[2].hidden = true;
                // TODO: address this lazy fix that may cause issues later
                this.stepHandler.step = 1;
                this.stepHandler.lastStep = 2;
                break;
        }
    }

    showStageGroup(stageGroupName, hideElement = false)
    {
        let stageElements = document.querySelectorAll(`[data-group-stage='${stageGroupName}']`);
        stageElements.forEach(element => {
            if (element.dataset.defaultHidden && !hideElement)
            {
                return;
            }
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