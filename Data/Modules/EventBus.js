"use strict";

class EventBus
{
    constructor()
    {
        if(EventBus.instance)
            return EventBus.instance;

        this.subscribers = [];
        EventBus.instance = this;
    }

    subscribe(subscriber)
    {
        this.subscribers.push(subscriber);
    }

    unsubscribe(subscriber)
    {
        this.subscribers.slice(this.subscribers.indexOf(subscriber), 1);
    }

    /**
     *
     * @param event - object, that should have one compulsory field: type
     * rest fields depend on current event and can be send as additional arguments if required
     */
    emitEvent(event)
    {
        this.subscribers.forEach((item) =>
        {
            item.eventFired(event);
        });
    }
}

export default EventBus;
