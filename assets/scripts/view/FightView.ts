import ViewBase from '../view/base/ViewBase'
import EventUtil from '../utils/EventUtil';
import UIMng, { ViewType } from '../manager/UIMng';
import GameCenter from '../gamecenter/GameCenter';
import Rocker from './Rocker';
const {ccclass, property} = cc._decorator;

@ccclass
export default class FightView extends ViewBase {
    @property(cc.Button)
    btnAttack : cc.Button = null;
    @property(cc.Button)
    btnSkill : cc.Button = null;
    @property(cc.Label)
    labSkillName : cc.Label = null;
    @property(Rocker)
    rocker : Rocker = null;
    start () {

    }

    bindEvent(show)
    {
        console.log("fightView bindEvent")
        this.rocker.bindEvent(show);
        if(show)
        {
            this.btnAttack.node.on("click",this.clickAttack,this);
            this.btnSkill.node.on("click",this.clickSkill,this);
            EventUtil.instance.on("Event_with_weapon",this.refreshSkillName,this);
        }else
        {
            this.btnAttack.node.off("click",this.clickAttack,this);
            this.btnSkill.node.on("click",this.clickSkill,this);
            EventUtil.instance.off("Event_with_weapon",this.refreshSkillName,this);
        }
    }

    clickAttack()
    {
        console.log("clickAttack")
        GameCenter.instance.mainPlayer.startAttack();
    }

    clickSkill()
    {
        console.log("clickSkill")
        GameCenter.instance.mainPlayer.startWalk();
    }

    refreshSkillName(withWeapon)
    {
        if(withWeapon)
        {
            this.labSkillName.string = "丢";
        }else
        {
            this.labSkillName.string = "捡";
        }
    }
}
