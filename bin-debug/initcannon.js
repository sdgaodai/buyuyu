var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var initcannon = (function (_super) {
    __extends(initcannon, _super);
    function initcannon(kind) {
        var _this = _super.call(this) || this;
        _this.init(kind);
        return _this;
    }
    //初始化炮台
    initcannon.prototype.init = function (kind) {
        this.cannonbody = this.createBitmapByName("fish_cannon_1_body_png");
        this.cannonbody.anchorOffsetX = this.cannonbody.width / 2;
        this.cannonbody.anchorOffsetY = this.cannonbody.height / 2;
        this.addChild(this.cannonbody);
        this.cannonhead = this.createBitmapByName("fish_cannon_1_head_png");
        this.cannonhead.anchorOffsetX = this.cannonhead.width / 2;
        //cannonhead.anchorOffsetY=cannonhead.height/2;
        this.cannonhead.y = -60;
        this.addChildAt(this.cannonhead, 0);
        switch (kind) {
            case 1:
                this.cannonbody.texture = RES.getRes("fish_cannon_1_body_png");
                this.cannonhead.texture = RES.getRes("fish_cannon_1_head_png");
                break;
        }
    };
    initcannon.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return initcannon;
}(egret.DisplayObjectContainer));
__reflect(initcannon.prototype, "initcannon");
//# sourceMappingURL=initcannon.js.map