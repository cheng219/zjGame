import GameCenter from "../gamecenter/GameCenter";
import UIMng from "../manager/UIMng"
import PlayerInfo from "../object/objectInfo/PlayerInfo";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SceneMng {

    protected curStageName : string = "";
    protected curMapConfig = null;
    constructor(stageName : string)
    {
        this.curStageName = stageName;
        this.curMapConfig = GameCenter.configMng.getMapConfig(stageName);
    }
    static CreateNew(stageName : string) : SceneMng
    {
        if(GameCenter.sceneMng != null)
        {
            GameCenter.sceneMng.destorySelf();  
        }
        GameCenter.sceneMng = new SceneMng(stageName);
        return GameCenter.sceneMng;
    }

    startBuild()
    {
        this.loadMap();
        this.loadMainPlayer();
    }

    loadMap()
    {
        UIMng.instance.loadMap();
        
    }

    loadMainPlayer()
    {
        var bornPoint = cc.v2(this.curMapConfig.born_point[0],this.curMapConfig.born_point[1]);
        UIMng.instance.loadPlayer((player)=>
        {
            GameCenter.instance.mainPlayer = player;
        });
    }

    destorySelf()
    {
        this.curStageName = "";
    }
}
