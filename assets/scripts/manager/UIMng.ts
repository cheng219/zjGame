

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIMng extends cc.Component {
    static instance : UIMng = null;
    // onLoad () {}

    start () {
        UIMng.instance = this;
    }

    // update (dt) {}
}
