import GameCenter from "../gamecenter/GameCenter";


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
}
