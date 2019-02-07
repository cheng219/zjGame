
const {ccclass, property} = cc._decorator;

enum AnimState
{
    None,
    Idle,
    Move,
    Attack,
}

@ccclass
export default class PlayerAnimCtrl extends cc.Component {
    
    private animation : cc.Animation = null;
    protected curAnimState : AnimState = AnimState.None;
    protected lastAnimState : AnimState = AnimState.None;
    onLoad () {
        this.animation = this.node.getComponent<cc.Animation>(cc.Animation);
     }

    start () {

    }

    enterIdle()
    {
        this.lastAnimState = this.curAnimState;
        this.curAnimState = AnimState.Idle;
        var anim : cc.AnimationState = this.animation.play("player1_idle");
        anim.wrapMode = cc.WrapMode.Loop;
        cc.log("animation.play player1_idle")
    }

    enterWalk()
    {
        this.lastAnimState = this.curAnimState;
        this.curAnimState = AnimState.Move;
        var anim : cc.AnimationState = this.animation.play("player1_walk");
        anim.wrapMode = cc.WrapMode.Loop;
    }

    enterAttack()
    {
        this.lastAnimState = this.curAnimState;
        this.curAnimState = AnimState.Attack;
        cc.log("animation.play player1_attack")
        //this.animation.stop();
        var anim : cc.AnimationState = this.animation.play("player1_attack");
        anim.wrapMode = cc.WrapMode.Normal;
        this.scheduleOnce(()=>{
            if(this.lastAnimState == AnimState.Move)
            {
                this.enterWalk();
            }
            if(this.lastAnimState == AnimState.Idle)
            {
                this.enterIdle();
            }
        },1);
    }
    // update (dt) {}
}
