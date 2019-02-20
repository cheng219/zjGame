import GameCenter from "../gamecenter/GameCenter";
import ViewBase from "./base/ViewBase";


const {ccclass, property} = cc._decorator;

@ccclass
export default class LoginView extends ViewBase
{
    
    @property(cc.Button)
    btnLogin : cc.Button = null;
    start () {

    }

    bindEvent(show)
    {
        console.log("loginView bindEvent");
        if(show)
        {
            this.btnLogin.node.on("click",this.clickLogin,this);
            
        }else
        {
            this.btnLogin.node.off("click",this.clickLogin,this);
        }
    }

    clickLogin()
    {
        console.log("clickLogin")
        GameCenter.loginMng.Login();
    }
}
