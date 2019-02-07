import Actor from "../Actor"
import SmartActor from "../SmartActor"
const {ccclass, property} = cc._decorator;

@ccclass
export default class CommandMng{
    protected actor : Actor  = null;
    cmdList : ActorCommand[] = [];

    /// <summary>
    /// 构造 by邓成
    /// </summary>
    /// <param name="_actor"></param>
    public constructor ( _actor:Actor ) {
        this.actor = _actor;
    }


    /// <summary>
    /// 执行 by邓成
    /// </summary>
    public Tick () {
        if ( this.cmdList.length == 0 )
            return;

        //
        var curCommand : ActorCommand  = this.cmdList[0];
        var finished : boolean = curCommand.Exec(this.actor);
        if ( finished ) {
            if (this.cmdList.length > 0) {
                if (this.cmdList[0] == curCommand) {
                    this.cmdList.shift()
                }
                else {
                    // Exec完后，命令可能发生改变 by邓成
                    //this.cmdList.indexOf(curCommand);
                    cc.error("当前命令有变化")
                }
            }
        }
    }


    /// <summary>
    /// 取消所有命令 by邓成
    /// </summary>
    public CancelCommands () {
        if ( this.cmdList.length > 0 ) {
            this.cmdList[0].OnCancel(this.actor);
            this.cmdList = [];
        }
    }

    /// <summary>
    /// 取出命令队列中的第一个 by邓成
    /// </summary>
    /// <returns></returns>
    public  PopCommand () : ActorCommand
    { 
        if (this.cmdList.length > 0) {
            var cmd = this.cmdList.shift();
            return cmd;
        }
        return null;
    }

    /// <summary>
    /// 压入一个命令到命令队列的末尾 by邓成
    /// </summary>
    /// <param name="_cmd"></param>
    public PushCommand ( _cmd : ActorCommand) {
        this.cmdList.push(_cmd);
    } 

    /// <summary>
    /// 当前的命令 by邓成
    /// </summary>
    /// <returns></returns>
    public CurrentCommand () : ActorCommand
    { 
        if (this.cmdList.length > 0 ) 
            return this.cmdList[0];
        return null;
    }

    /// <summary>
    /// 是否有命令 by邓成
    /// </summary>
    /// <returns></returns>
    public HasCommand () : boolean
    {
        return this.cmdList.length > 0;
    }
}


export class ActorCommand {
    constructor(){}
    public Exec (  _actor : Actor) { return true; }
    public OnCancel( _actor:Actor) { }
}



export class Command_MoveTo extends ActorCommand {
    public destPos : cc.Vec2 = cc.v2();
    public path : cc.Vec2[] = [];
    public maxDistance : number = -1.0;

    public Exec( _actor : Actor) : boolean
    {
        //如果目标在使用技能，返回false ，等他用完 by邓成
        var sa : SmartActor = <SmartActor>_actor;
        // if (sa.isRigidity) //如果在僵直
        // {
        //     return false;
        // }
        // if (sa != null && (sa.isCasting || sa.isCastingAttackEffect)) //如果在使用技能
        // {
        //     sa.CancelAbility();
        // }

        // if (path == null || path.Length <= 1)
        // {
        //     path = GameStageUtility.StartPath(_actor.transform.position, destPos,5,GameHelper.GetWalkArea(_actor));

        //     if (path == null || path.Length <= 1)
        //     {
        //         GameSys.Log("寻路失败!");
        //         _actor.StopMovingTo();
        //         return true;
        //     }
        //     else
        //     {
        //         destPos = path[path.Length - 1];
        //     }
        // }

        //检查是否超出最远距离 by邓成
        // if (maxDistance > 0.0f)
        // {
        //     Vector3 delta = destPos - _actor.transform.position;
        //     if (ignoreY) delta.y = 0.0f;
        //     if (delta.sqrMagnitude <= (maxDistance * maxDistance))
        //     {
        //         _actor.StopMovingTo();
        //         return true;
        //     }
        // }


        // if (firstTime)
        // {
        //     if (_actor.isMoveLocked == false)
        //     {
        //         firstTime = false;
        //         _actor.MoveTo(path, maxDistance, false);
        //     }

        //     return false;
        // }

        // if (maxDistance <= 0.0f)
        // {
        //     Vector3 delta = destPos - _actor.transform.position;
        //     if (ignoreY) delta.y = 0.0f;
        //     if (delta.sqrMagnitude < (0.1 * _actor.CurRealSpeed * 0.1 * _actor.CurRealSpeed))
        //     {
        //         var player = _actor as SmartActor;
        //         if (player != null)
        //         {
        //             _actor.StopMovingTo();
        //         }
        //         return true;
        //     }
        // }
        // if (_actor.IsMoving)
        // {
        //     return false;
        // }
        // else
        // {
        //     path = GameStageUtility.StartPath(_actor.transform.position, destPos, 5, GameHelper.GetWalkArea(_actor));
        //     _actor.MoveTo(path, maxDistance, false);

        //     if (path == null || path.Length <= 1)
        //     {
        //         return true;
        //     }
        // }
        return false;
    }

}


