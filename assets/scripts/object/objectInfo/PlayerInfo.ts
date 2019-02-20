import ActorInfo from "./ActorInfo";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerInfo extends ActorInfo{
    // constructor()
    // {
        
    // }
    private playerConfig = null;
    public SetPlayerConfig(config : any)
    {
        this.playerConfig = config;
    }
}
