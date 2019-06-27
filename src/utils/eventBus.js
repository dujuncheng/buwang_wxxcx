export default class EventBus {
  constructor() {
    this._events = {};
  }
  
  on(ev, cb, ctx) {
    if (arguments.length !== 3) {
      throw new Error('EventBus Error: Must transfer three arguments, read doc for detail: http://git.beibei.com.cn/fe-wxmp/event-bus\n');
    }
    if (!ev) {
      throw new Error(`EventBus Error: Need transfer a non-empty string for event name.`);
    }
    if (typeof cb !== 'function') {
      throw new Error(`EventBus Error: The callback of '${ev}' must be a function.`);
    }
    if (!ctx) {
      throw new Error(`EventBus Error: Need transfer page instance as context of '${ev}' callback.`);
    }
    
    this._events[ev] = this._events[ev] || [];
    let events = this._events[ev];
    
    // Avoid repeatedly collect dependencies
    if (events.length) {
      const noRepeat = events.every((item) => {
        if (item.ctx !== ctx) {
          return true;
        }
        if (item.cb !== cb) {
          return true;
        }
        return false;
      });
      if (noRepeat) {
        events.push({
          cb,
          ctx,
        });
      }
    } else {
      events.push({
        cb,
        ctx,
      });
    }
  }
  
  emit(ev, ...args) {
    if (!ev) {
      throw new Error(`EventBus Error: Need transfer a non-empty string for event name.`);
    }
    let events = this._events[ev];
    
    if (!events || !events.length) {
      console.warn(`EventBus Warn: No registered listener of event '${ev}'.`);
      return;
    }
    
    events.forEach((item) => {
      item.cb.call(item.ctx, ...args);
    });
  }
  
  off(ev, cb) {
    // if no arg, remove all listeners
    if (!arguments.length) {
      this._events = {};
      return;
    }
    
    let events = this._events[ev];
    // if only transfer ev, remove all listeners of this event
    if (arguments.length === 1) {
      delete this._events[ev];
      return;
    }
    
    if (!events) {
      console.warn(`EventBus Warn: No registered event '${ev}'.`);
      return;
    }
    
    if (!events.length) {
      console.warn(`EventBus Warn: No listener of the event '${ev}'.`);
      return;
    }
    
    events.some((item, index) => {
      if (item.cb === cb) {
        events.splice(index, 1);
        return true;
      }
      return false;
    });
  }
}
