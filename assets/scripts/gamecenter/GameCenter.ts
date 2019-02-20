const {ccclass, property} = cc._decorator;
import LoginMng from '../manager/LoginMng'
import UserMng from '../manager/UserMng';
import UIMng, { ViewType } from '../manager/UIMng';
import Player from '../object/Player';
import GameUtil from '../utils/GameUtil';
import ConfigMng from '../manager/ConfigMng';
import SceneMng from '../manager/SceneMng';

@ccclass
export default class GameCenter extends cc.Component {
    public static instance : GameCenter = null;

    //全局管理类
    public static configMng : ConfigMng = null;
    //管理类
    public static loginMng : LoginMng = null;
    public static userMng : UserMng = null;

    public static sceneMng : SceneMng = null;

    public mainPlayer : Player = null;
    onLoad () {
        GameCenter.instance = this;
        this.initConfig();
        this.initAll();
    }

    initAll()
    { 
        this.createMng();
    }
    start () {
        //this.enterStage();
        this.enterLoginStage();
    }

    createMng()
    {
        
        GameCenter.loginMng = LoginMng.CreateNew();
    }

    initConfig()
    {
        GameCenter.configMng = ConfigMng.getInstance();
        GameCenter.configMng.initMapConfig();
        GameCenter.configMng.initPlayerSkillConfig();
        GameCenter.configMng.initActorConfig();
    }
    enterLoginStage()
    {
        UIMng.instance.openView(ViewType.Login);
    }
    enterStage()
    {
        UIMng.instance.closeView(ViewType.Login);
        GameCenter.sceneMng = SceneMng.CreateNew("stage1");
        GameCenter.sceneMng.startBuild();
        this.scheduleOnce(function()
        {
            UIMng.instance.openView(ViewType.Fight);
        },1)
    }

}
