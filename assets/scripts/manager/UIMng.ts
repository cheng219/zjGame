import ViewBase from "../view/base/ViewBase";
import Player from '../object/Player';

const {ccclass, property} = cc._decorator;


@ccclass
export default class UIMng extends cc.Component {
    static instance : UIMng = null;
    // onLoad () {}
    protected viewTable = {}
    onLoad() {
        UIMng.instance = this;
    }

    openView(viewType : ViewType)
    {
        var prefabName : string = this.getViewName(viewType);
        if(prefabName != "")
        {
            cc.loader.loadRes(prefabName, (err, prefab: cc.Prefab)=> {
                cc.log("加载预制返回：", prefabName)
                if (err) {
                    cc.warn("load module prefab error:", prefabName)
                    return
                }
                let newNode = cc.instantiate(prefab)
                if (this.node == null) {
                    cc.log("载体对象已经被销毁")
                    return
                }
                cc.loader.setAutoReleaseRecursively(prefab, true)//释放掉不用的
                this.node.addChild(newNode);
                let viewBase = newNode.getComponent<ViewBase>(ViewBase);
                this.viewTable[viewType] = viewBase;
                let widget = newNode.addComponent(cc.Widget)
                widget.isAlignTop = true;
                widget.isAlignBottom = true;
                widget.isAlignLeft = true;
                widget.isAlignRight = true;
                widget.alignMode = cc.Widget.AlignMode.ONCE;
                viewBase.openUi()
            })
        }else
        {
            cc.error("找不到对应的ViewType:"+viewType.toString());
        }
    }
    public closeView(viewType : ViewType)
    {
        if(this.viewTable[viewType] != null)
        {
            this.viewTable[viewType].closeUi()
        }
    }

    private getViewName(viewType : ViewType)
    {
        var path : string = "prefab/ui/";
        switch(viewType)
        {
            case ViewType.Login:
                return path + "loginWnd"
            case ViewType.Fight:
                return path + "fightWnd"
        }
        return "";
    }

    
    loadMap()
    {
        var mapName : string = "prefab/map/stage1";
        cc.loader.loadRes(mapName, (err, prefab: cc.Prefab)=> {
            cc.log("加载map返回：", mapName)
            if (err) {
                cc.warn("load map error:", mapName)
                return
            }
            let newNode = cc.instantiate(prefab)
            if (this.node == null) {
                cc.log("载体对象已经被销毁")
                return
            }
            cc.loader.setAutoReleaseRecursively(prefab, true)//释放掉不用的
            this.node.addChild(newNode);
            newNode.setSiblingIndex(0)
        })
    }
    loadPlayer(loadFinish)
    {
        var playerName : string = "prefab/object/player1";
        cc.loader.loadRes(playerName, (err, prefab: cc.Prefab)=> {
            cc.log("加载player返回：", playerName)
            if (err) {
                cc.warn("load player error:", playerName)
                return
            }
            let newNode = cc.instantiate(prefab)
            if (this.node == null) {
                cc.log("载体对象已经被销毁")
                return
            }
            cc.loader.setAutoReleaseRecursively(prefab, true)//释放掉不用的
            this.node.addChild(newNode);
            newNode.setSiblingIndex(1)
            var player : Player = newNode.getComponent<Player>(Player);
            if(player != null)
            {
                player.init();
            }else
            {
                cc.error("player is null:"+playerName);
            }
            if(loadFinish)
            {
                loadFinish(player)
            }
        })
    }
}
export enum ViewType
{
    Login = 0,
    Fight = 1,
}