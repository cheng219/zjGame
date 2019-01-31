

export default class LoaclDataMng {
    static setNumber(key: string, data: number) {
        try {
            cc.sys.localStorage.setItem(key, data.toString());
        } catch (error) {
            cc.warn(key, error)
        }
    }

    static getNumber(key: string, defaultValue?: number) {
        try {
            var value = cc.sys.localStorage.getItem(key);
            if (value == null) {
                if (defaultValue != null) {
                    return defaultValue;
                }
                return null;
            }
            return value;
        } catch (error) {
            cc.warn(key, error)
        }
    }

    static setJson(key: string, data: JSON) {
        try {
            cc.sys.localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            cc.warn(key, error)
        }
    }

    static getJson(key: string) {
        try {
            var str = cc.sys.localStorage.getItem(key);
            if (str == null || str == "") {
                return null;
            }
            var data = JSON.parse(str);
            return data;
        } catch (error) {
            cc.warn(key, error)
        }
    }

    static setString(key: string, data: String) {
        try {
            cc.sys.localStorage.setItem(key, data.toString());
        } catch (error) {
            cc.warn(key, error)
        }
    }

    static getString(key: string, defaultValue?: string): string {
        try {
            var str = cc.sys.localStorage.getItem(key);
            if (str == null || str == "") {
                if (defaultValue != null) {
                    return defaultValue;
                }
                return null;
            }
            return str;
        } catch (error) {
            cc.warn(key, error)
        }
    }

    static setItem(key: string, data: any) {
        try {
            cc.sys.localStorage.setItem(key, data);
        } catch (error) {
            cc.warn(key, error)
        }
    }

    static getItem(key: string): any {
        try {
            var str = cc.sys.localStorage.getItem(key);
            if (str == null) {
                return null;
            }
            return str;
        } catch (error) {
            cc.warn(key, error)
        }
    }

    static hasItem(key: string) {
        var str = cc.sys.localStorage.getItem(key);
        return str != null;
    }
}
