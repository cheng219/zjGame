import PlayerAnimCtrl from '../object/objectCtrl/PlayerAnimCtrl'
import SmartActor from './SmartActor';
import MoveCtrl from './objectCtrl/MoveCtrl';
const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends SmartActor {

    @property(cc.Node)
    animRoot: cc.Node = null;

    public animCtrl : PlayerAnimCtrl = null;
    public moveCtrl : MoveCtrl = null;

     onLoad () {
        this.animCtrl = this.animRoot.getComponent<PlayerAnimCtrl>(PlayerAnimCtrl);
        this.moveCtrl = this.node.getComponent<MoveCtrl>(MoveCtrl);
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

    public updateMoveDir(dir : cc.Vec2)
    {
        if(!this.IsMoving())
        {
            this.startWalk();
        }
        this.moveCtrl.updateMove(dir);
    }

    public stopMove()
    {
        this.moveCtrl.stopMove();
        this.animCtrl.enterIdle();
    }

    public IsMoving()
    {
        return this.moveCtrl != null && this.moveCtrl.isMoving;
    }
    // update (dt) {}
}
