const {ccclass, property} = cc._decorator;
import LoginMng from '../manager/LoginMng'
import UserMng from '../manager/UserMng';
import UIMng, { ViewType } from '../manager/UIMng';
import Player from '../object/Player';
import GameUtil from '../utils/GameUtil';

@ccclass
export default class GameCenter extends cc.Component {
    public static instance : GameCenter = null;

    //管理类
    public static loginMng : LoginMng = null;
    public static userMng : UserMng = null;

    public mainPlayer : Player = null;
    onLoad () {
        GameCenter.instance = this;
    }

    start () {
        this.enterStage();
    }

    createMng()
    {
        LoginMng.CreateNew();
    }

    enterStage()
    {
        this.scheduleOnce(function()
        {
            UIMng.instance.loadMap();
            GameUtil.loadSkillConfig("player1",(res)=>
            {
                //var rawAsset : cc.RawAsset = <cc.RawAsset>res;
                //cc.log("loadMapConfig返回")
                cc.log(res.json.attack0)
            });
            UIMng.instance.loadPlayer((player)=>
            {
                this.mainPlayer = player;
            });
        },1)
        this.scheduleOnce(function()
        {
            UIMng.instance.openView(ViewType.Fight);
        },2)
    }

}
