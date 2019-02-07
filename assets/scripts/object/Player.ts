import PlayerAnimCtrl from '../object/objectCtrl/PlayerAnimCtrl'
const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    @property(cc.Node)
    animRoot: cc.Node = null;

    public animCtrl : PlayerAnimCtrl = null;

     onLoad () {
        this.animCtrl = this.animRoot.getComponent<PlayerAnimCtrl>(PlayerAnimCtrl);
     }

    start () {

    }

    init()
    {
        this.animCtrl.enterIdle();
        cc.log("Player init")
    }

    startAttack()
    {
        cc.log("startAttack")
        this.animCtrl.enterAttack();
    }

    startWalk()
    {
        cc.log("startWalk")
        this.animCtrl.enterWalk();
    }
    // update (dt) {}
}
