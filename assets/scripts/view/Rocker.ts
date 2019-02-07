import GameCenter from "../gamecenter/GameCenter";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Rocker extends cc.Component {

    // 控制点
    @property(cc.Node)
    public Rocker : cc.Node = null;
    @property(cc.Node)
    public area : cc.Node = null;
    @property(cc.Node)
    public mask : cc.Node = null;
    @property(cc.Node)
    public rockerParent : cc.Node = null; 
    public range : number = 100;
    originalPos : cc.Vec2 = cc.v2();
    parentPos : cc.Vec2 = cc.v2();
    onLoad()
    {
        this.originalPos = this.Rocker.position;
        this.parentPos = this.rockerParent.position;
    }

    bindEvent(show)
    {
        if(show)
        {
            this.area.on(cc.Node.EventType.MOUSE_DOWN,this.press,this);
            this.mask.on(cc.Node.EventType.MOUSE_UP,this.mouseUp,this);
            this.area.on(cc.Node.EventType.MOUSE_UP,this.mouseUp,this);
            //this.node.on(cc.Node.EventType.TOUCH_START,this.press,this);
            this.area.on(cc.Node.EventType.MOUSE_MOVE,this.move,this);
        }else
        {
            this.area.off(cc.Node.EventType.MOUSE_DOWN,this.press,this);
            this.mask.off(cc.Node.EventType.MOUSE_UP,this.mouseUp,this);
            this.area.off(cc.Node.EventType.MOUSE_UP,this.mouseUp,this);
            //this.node.off(cc.Node.EventType.TOUCH_START,this.press,this);
            this.area.off(cc.Node.EventType.MOUSE_MOVE,this.move,this);
        }
    }

    start () {

    }

    startPressPos : cc.Vec2 = cc.v2();
    startRockerPos : cc.Vec2 = cc.v2();
    press(event:cc.Event.EventTouch)
    {
        //触摸位置
        let touchStartPos = event.getLocation();
        this.startPressPos = touchStartPos;
        cc.log("touchStartPos:"+touchStartPos);
        let nodePos = this.node.convertToNodeSpaceAR(touchStartPos);
        this.startRockerPos = nodePos;
        this.rockerParent.setPosition(nodePos);
        this.Rocker.setPosition(nodePos);
        this.isRockMove = true;
    }
    mouseUp(event:cc.Event.EventTouch)
    {
        if(this.isRockMove)
        {
            this.Rocker.setPosition(this.originalPos);
            this.rockerParent.setPosition(this.parentPos);
            GameCenter.instance.mainPlayer.stopMove();
            this.isRockMove = false;
        }
    }
    onMovePos : cc.Vec2 = cc.v2();
    move(event:cc.Event.EventTouch)
    {
        if(this.isRockMove)
        {
            //触摸位置
            let touchStartPos = event.getLocation();
            if(touchStartPos.sub(this.startPressPos).mag() > this.range)
            {
                touchStartPos =  cc.pMult(touchStartPos.sub(this.startPressPos).normalize(),this.range).add(this.startPressPos);
            }
            this.onMovePos = touchStartPos;
            cc.log("touchStartPos:"+touchStartPos);
            let nodePos = this.node.convertToNodeSpaceAR(touchStartPos);
            this.Rocker.setPosition(nodePos);
            let dir = nodePos.sub(this.startRockerPos);
            dir = dir.normalize()
            GameCenter.instance.mainPlayer.updateMoveDir(dir);
        }
    }

    update(dt)
    {

    }

    //public Transform rockerParent; 

    /// <summary>
    /// 摇杆移动范围
    /// </summary>
    // public  Range : number = 82;
    // /// <summary>
    // /// 移动目标相对位置
    // /// </summary>
    // private GoalPos : cc.Vec2 = cc.v2();
    // private first : boolean = true;
    /// <summary>
    /// 摇杆是否移动
    /// </summary>
    private isRockMove : boolean = false;
    // private isRockMoveLastFrame : boolean = false;
    // private localPos : cc.Vec2 = cc.v2();

    // update(dt)
    // {
    //     if (this.isRockMove)
    //     {
    //         if (Input.touchCount == 0)
    //         {
    //             if (this.first)
    //             {
    //                 this.localPos = this.onMovePos;
    //                 this.first = false;
    //             }
    //             OnDragging((this.onMovePos.sub(this.localPos) - ));
    //             localPos = Input.mousePosition;
    //         }
    //         else if (Input.GetTouch(0).phase == TouchPhase.Moved)
    //         {
    //             if (first)
    //             {
    //                 localPos = Input.GetTouch(0).position;
    //                 first = false;
    //             }
    //             Vector3 temp = Input.GetTouch(0).position;
    //             OnDragging(sensitive * (temp - localPos));
    //             localPos = Input.GetTouch(0).position;
    //         }
    //     }
    //     if (isRockMoveLastFrame != isRockMove)
    //     {
    //         PlayerInputListener.isDragingRockerItem = isRockMove;
    //         if (OnDragStateChange != null)
    //         {
    //             OnDragStateChange(isRockMove);
    //         }
    //         isRockMoveLastFrame = isRockMove;
    //         if (!isRockMove)
    //         {
    //             GameCenter.curMainHero.StopMovingTowards();
    //         }
    //     }
    // }

    // protected Vector3 mousePos = Vector3.zero;
    // protected bool rockerMove = false;
    // void OnPress(bool _bool)
    // {
    //     if (GameCenter.curMainHero == null || GameCenter.curMainHero.isDummy) return;
    //     isRockMove = _bool;
    //     rockerMove = false;
    //     GoalPos = Vector2.zero;
    //     if (_bool)
    //     {
    //         first = true;
    //         PlayerInputListener.isDragingRockerItem = true;
    //         GameCenter.curMainHero.StopMovingTo();
    //         //GameCenter.curMainHero.GoNormal();
    //         GameCenter.curMainHero.commandMng.CancelCommands();
    //         if (Rocker != null)
    //         {
    //             Rocker.alpha = 1;
    //         }
    //         if(rockerParent != null && !rockerMove)
    //         {
    //             mousePos = GameHelper.MousePointToScreenPoint();
    //             if (mousePos.x <= 0 && mousePos.y <= 0)//限制移动的区域
    //             {
    //                 iTween.MoveTo(rockerParent.gameObject, mousePos, 0.2f);
    //                 rockerMove = false;
    //             }
    //         }
    //     }
    //     else
    //     {
    //         ReturnPos();
	// 		localPos.Set(0,0,0);
    //         if (Rocker != null)
    //         {
    //             Rocker.alpha = 0.5f;
    //         }
    //         if (arrow != null)
    //             arrow.localRotation = Quaternion.Euler(0, 0, 0);
    //     }
    // }



    // protected Transform cameraTransform = null;

    // Vector3 vector2Y = new Vector3(0,1);
    // void OnDragging(Vector2 delta)
    // {
    //     if (isRockMove && Rocker != null && BackGround != null)
    //     {
    //         GoalPos += delta;
    //         Vector2 nowPos = GoalPos;
    //         if (GoalPos.magnitude > Range)
    //         {
    //             nowPos = Range * GoalPos.normalized;
    //         }
    //         float angle = nowPos.x <= 0 ?Vector3.Angle(nowPos, vector2Y) : 360 - Vector3.Angle(nowPos, vector2Y);
    //         //Debug.Log("angle:"+ angle);
    //         Rocker.gameObject.transform.localPosition = nowPos;
    //         if (arrow != null) 
    //             arrow.localRotation = Quaternion.Euler(0,0, angle);
    //         if (cameraTransform == null)
    //         {
    //             cameraTransform = GameCenter.cameraMng.mainCamera.transform;
    //         }
    //         Vector3 dir = nowPos.y * cameraTransform.forward + nowPos.x * cameraTransform.right;
    //         dir.y = 0.0f;
    //         dir = dir.normalized;
    //         if (GameCenter.curGameStage.IsPause || curMainPlayer == null || curMainPlayer.isDummy|| curMainPlayer.isMoveLocked || curMainPlayer.IsTaunt || curMainPlayer.isRigidity)
    //         {
    //             if(curMainPlayer.isMovingTowards)
    //             {
    //                 GameCenter.curMainHero.StopMovingTowards();
    //             }
    //             return;
    //         }
    //         if (curMainPlayer.isCasting || curMainPlayer.isCastingAttackEffect)
    //         {
    //             curMainPlayer.CancelAbility();
    //         }
    //         GameCenter.sceneMng.UpdateAttackType(AttackType.NORMALFIGHT);
    //         if (curMainPlayer.isPathMoving)
    //         {
    //             curMainPlayer.StopMovingTo();
    //         }
    //         if (dir == Vector3.zero)
    //         {
    //             curMainPlayer.StopMovingTowards();
    //         }
    //         else
    //         {
    //             curMainPlayer.MoveTowards(dir);
    //         }
    //     }
    //     PlayerInputListener.isDragingRockerItem = true;

    // }
    // public void UpdateHero()
    // {
    //     //Debug.Log("UpdateHero");
    //     curMainPlayer = GameCenter.curMainHero;
    // }


    // void OnDisable()
    // {
    //     ReturnPos();
    //     isRockMove = false;
    //     PlayerInputListener.isDragingRockerItem = false;
    // }

    // void OnEnable()
    // {
    //     Rocker.transform.localPosition = Vector3.zero;
    // }

    // protected bool isFirstTime = true;
    // void ReturnPos()
    // {
    //     if (isFirstTime)
    //     {
    //         isFirstTime = false;
    //         return;
    //     }
    //     if (Rocker != null)
    //     {
	// 		iTween.MoveTo(Rocker.gameObject,transform.position, 0.2f);
    //     }
    //     if(rockerParent != null)
    //     {
    //         iTween.MoveTo(rockerParent.gameObject, transform.position, 0.2f);
    //     }
    // }
}
