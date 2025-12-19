export default class EventHandler
{
    constructor()
    {
        this.listeners = {};
    }

    on(eventName, functionCallback)
    {
        if (!this.listeners[eventName])
        {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(functionCallback);
    }

    triggerEvent(eventName, eventData)
    {
        let subscribedListeners = this.listeners[eventName] || [];
        subscribedListeners.forEach(listener => {
            listener(eventData);
            console.log(eventData);
        });
    }
}