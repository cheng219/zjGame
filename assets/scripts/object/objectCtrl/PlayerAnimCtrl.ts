
const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerAnimCtrl extends cc.Component {
    private animation : cc.Animation = null;
    onLoad () {
        this.animation = this.node.getComponent<cc.Animation>(cc.Animation);
     }

    start () {

    }

    enterIdle()
    {
        var anim : cc.AnimationState = this.animation.play("player1_idle");
        anim.wrapMode = cc.WrapMode.Loop;
        cc.log("animation.play player1_idle")
    }

    enterWalk()
    {
        var anim : cc.AnimationState = this.animation.playAdditive("player1_walk");
        anim.wrapMode = cc.WrapMode.Loop;
    }

    enterAttack()
    {
        cc.log("animation.play player1_attack")
        this.animation.play("player1_attack");
        this.scheduleOnce(()=>{
            this.enterWalk();
        },1);
    }
    // update (dt) {}
}
