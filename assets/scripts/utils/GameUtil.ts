
const {ccclass, property} = cc._decorator;

@ccclass
export default class GameUtil{
    static loadObject(name : string, completeCallback: (resource: any) => void, connect?: number): void {
        var path : string = "prefab/object/";
        GameUtil.loadRes(path + name,completeCallback,connect);
    }
    static loadView(name : string, completeCallback: (resource: any) => void, connect?: number): void {
        var path : string = "prefab/ui/";
        GameUtil.loadRes(path + name,completeCallback,connect);
    }
    static loadMap(name : string, completeCallback: (resource: any) => void, connect?: number): void {
        var path : string = "prefab/map/";
        GameUtil.loadRes(path + name,completeCallback,connect);
    }
    static loadMapConfig(name : string, completeCallback: (resource: any) => void, connect?: number): void {
        var path : string = "config/map/";
        GameUtil.loadRes(path + name,completeCallback,connect);
    }
    static loadRes(url: string, completeCallback: (resource: any) => void, connect?: number): void {
        if (connect == null) {
            connect = 1
        }

        cc.loader.loadRes(url, function (error: Error, resource: any) {
            if (error) {
                cc.error(error);
                connect += 1
                if (connect < 5) {
                    GameUtil.loadRes(url, completeCallback, connect)
                } else {
                    completeCallback(resource)
                }
            } else {
                completeCallback(resource)
            }

        })
    }

    static loadResWithType(url: string,type: typeof cc.Asset, completeCallback: (resource: any) => void, connect?: number): void {
        if (connect == null) {
            connect = 1
        }

        cc.loader.loadRes(url, type,function (error: Error, resource: any) {
            if (error) {
                cc.error(error);
                connect += 1
                if (connect < 5) {
                    GameUtil.loadResWithType(url,type, completeCallback, connect)
                } else {
                    completeCallback(resource)
                }
            } else {
                completeCallback(resource)
            }

        })
    }
}
