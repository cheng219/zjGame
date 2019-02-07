
const {ccclass, property} = cc._decorator;

@ccclass
export default class ViewBase extends cc.Component {


    // onLoad () {}

    start () {

    }
    public openUi()
    {
        if(!this.node.active)
        {
            this.node.active = true;
        }
        this.onOpen()
    }
    public closeUi()
    {
        if(this.node.active)
        {
            this.node.active = false;
        }
        this.onClose()
    }

    onOpen()
    {
        this.bindEvent(true)
    }

    onClose()
    {
        this.bindEvent(false)
    }

    bindEvent(show)
    {

    }
}
