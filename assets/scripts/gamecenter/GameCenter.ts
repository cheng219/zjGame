const {ccclass, property} = cc._decorator;
import LoginMng from '../manager/LoginMng'
import UserMng from '../manager/UserMng';

@ccclass
export default class GameCenter extends cc.Component {
    public static intance : GameCenter = null;

    //管理类
    public static loginMng : LoginMng = null;
    public static userMng : UserMng = null;

    onLoad () {
        GameCenter.intance = this;
    }

    start () {

    }

    createMng()
    {
        LoginMng.CreateNew();
    }

}
