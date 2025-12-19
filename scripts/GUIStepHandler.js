import EventHandler from "./eventHandler.js";

export default class GUIStepHandler
{
    constructor(prevButton, nextButton, startStep = 0, totalSteps = 2, loopSteps = false)
    {
        this.eventHandler = new EventHandler();
        this.lastStep = startStep - 1;
        this.step = startStep;
        this.minStep = 0;
        this.maxStep = totalSteps - 1;
        this.nextButton = nextButton;
        this.prevButton = prevButton;
        nextButton.addEventListener("click", () => this.changeStep(1));
        prevButton.addEventListener("click", () => this.changeStep(-1));
    }

    changeStep(amount)
    {
        this.lastStep = this.step;
        this.step += amount;

        if (this.step < this.minStep)
        {
            this.step = this.minStep;
        }
        else if (this.step > this.maxStep)
        {
            this.step = this.maxStep;
        }
        this.verifyLoop();

        // because it's a step CHANGE event, we only trigger it if there actually was a change from the last step
        if (this.step != this.lastStep)
        {
            this.eventHandler.triggerEvent("stepChange", {step: this.step, lastStep: this.lastStep});
        }
    }

    verifyLoop()
    {
        if (!this.loopSteps || this.lastStep != this.step)
        {
            return;
        }

        if (this.step == this.minStep)
        {
            this.step = this.maxStep;
        }
        else if (this.step == this.maxStep)
        {
            this.step = this.minStep;
        }
    }
}