import GameUtil from "../utils/GameUtil";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ConfigMng {
    private static instance : ConfigMng = null;
    public getInstance() : ConfigMng
    {
        if(ConfigMng.instance == null)
        {
            ConfigMng.instance = new ConfigMng();
        }
        return ConfigMng.instance;
    }

    private mapConfig = null;
    public initMapConfig()
    {
        GameUtil.loadMapConfig("stage",(res)=>
        {
            this.mapConfig = res.json;
        });
    }
    public getMapConfig(stageName:string)
    {
        if(this.mapConfig != null)
        {
            return this.mapConfig[stageName];
        }
    }

    private playerSkillConfig = null;
    public initPlayerSkillConfig()
    {
        GameUtil.loadSkillConfig("skill",(res)=>
        {
            this.playerSkillConfig = res.json;
        });
    }
    public getSkillConfig(playerName:string,skillName?:string)
    {
        if(this.playerSkillConfig != null)
        {
            if(skillName != null && skillName != "")
            {
                return this.playerSkillConfig[playerName][skillName];
            }
            return this.playerSkillConfig[playerName];
        }
    }
}
