import SmartActor from "../SmartActor"
const {ccclass, property} = cc._decorator;

@ccclass
export default class MoveCtrl extends cc.Component {

    protected curDir : cc.Vec2 = cc.v2();
    public isMoving : boolean = false;

    protected speed : number = 100;
    start () {

    }

    startMove(dir : cc.Vec2)
    {
        this.curDir = dir;
    }
    updateMove(dir : cc.Vec2)
    {
        this.curDir = dir;
        this.isMoving = true;
    }

    stopMove()
    {
        this.isMoving = false;
    }

    update(dt)
    {
        if(this.isMoving)
        {
            this.updateRotation();
            this.updatePosition(dt);
        }
    }

    updateRotation()
    {
        if(this.curDir.x > 0)
        {
            this.node.scaleX = 1;
        }else if(this.curDir.x < 0)
        {
            this.node.scaleX = -1;
        }
    }

    updatePosition(dt)
    {
        let newPos = this.node.position.add(cc.pMult(this.curDir,this.speed * dt))
        this.node.setPosition(newPos);
    }
}
