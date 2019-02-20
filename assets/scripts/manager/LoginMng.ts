import GameCenter from "../gamecenter/GameCenter";
import PlayerInfo from "../object/objectInfo/PlayerInfo"

const {ccclass, property} = cc._decorator;

@ccclass
export default class LoginMng{

    public static CreateNew()
    {
        if(GameCenter.loginMng == null)
        {
            var loginMng  = new LoginMng()
            loginMng.Init();
            GameCenter.loginMng = loginMng;
        }else
        {
            GameCenter.loginMng.UnRegister();
            GameCenter.loginMng.Init();
        }
        return GameCenter.loginMng;
    }

    constructor()
    {

    }

    public Init()
    {

    }

    public UnRegister()
    {

    }

    public Login()
    {
        this.LoginRsp();
    }

    public mainPlayerInfo : PlayerInfo = null;
    protected LoginRsp()
    {
        var playerConfig = GameCenter.configMng.getActorConfig("player1");
        this.mainPlayerInfo = new PlayerInfo();
        this.mainPlayerInfo.SetPlayerConfig(playerConfig);
        GameCenter.instance.enterStage();
    }
}
