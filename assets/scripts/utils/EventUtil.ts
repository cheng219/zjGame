
export default class EventUtil {

    public static readonly instance: EventUtil = new EventUtil();
    private handles = {};

    dispatch(eventName: string, ...data) {
        var returns = [] //返回值
        for (var findEvenName in this.handles) {
            if (findEvenName == eventName) {
                for (var i = 0; i < this.handles[findEvenName].length; i++) {
                    var returnValue = null
                    let length = 0
                    let callback = this.handles[findEvenName][i].callback
                    let target = this.handles[findEvenName][i].target
                    if (data) {
                        length = data.length
                    }
                    if (length == 0) {
                        returnValue = callback.call(target)
                    } else if (length == 1) {
                        returnValue = callback.call(target, data[0])
                    }
                    else if (length == 2) {
                        returnValue = callback.call(target, data[0], data[1])
                    }
                    else if (length == 3) {
                        returnValue = callback.call(target, data[0], data[1], data[2])
                    }
                    else if (length == 4) {
                        returnValue = callback.call(target, data[0], data[1], data[2], data[3])
                    }
                    else if (length == 5) {
                        returnValue = callback.call(target, data[0], data[1], data[2], data[3], data[4])
                    }
                    else if (length == 6) {
                        returnValue = callback.call(target, data[0], data[1], data[2], data[3], data[4], data[5])
                    }
                    else if (length == 7) {
                        returnValue = callback.call(target, data[0], data[1], data[2], data[3], data[4], data[5], data[6])
                    }
                    else {
                        returnValue = callback.call(target, data)
                    }
                    returns.push(returnValue)
                }
            }
        }
        return returns
    }

    has(eventName: string, callback: Function): boolean {
        if (this.handles[eventName] == null) {
            return false
        }

        let length = this.handles[eventName].length
        for (let i = 0; i < length; i++) {
            if (this.handles[eventName][i].callback == callback) {
                return true
            }
        }
        return false
    }

    on(eventName: string, callback: Function, target) {
        if (this.handles[eventName] == null) {
            this.handles[eventName] = [];
        }
        let data = {
            "callback": callback,
            "target": target
        }
        if (!this.has(eventName, callback)) {
            this.handles[eventName].push(data)
        }
        else {
            cc.log("重复注册事件:", eventName, target)
            let length = this.handles[eventName].length
            for (let i = 0; i < length; i++) {
                if (this.handles[eventName][i].callback == callback) {
                    this.handles[eventName][i] = data
                }
            }
        }
    }

    off(eventName: string, callback: Function, target) {
        if (this.handles[eventName] == null) {
            return;
        }
        for (var i = 0; i < this.handles[eventName].length; i++) {
            if (this.handles[eventName][i].callback === callback) {
                this.handles[eventName].splice(i, 1)
                break
            }
        }
    }

    clearAll() {
        this.handles = {};
    }
}
