var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var initfish = (function (_super) {
    __extends(initfish, _super);
    function initfish(kind, strpos, endpos, speed, serious) {
        var _this = _super.call(this) || this;
        _this.sum = 0;
        _this.die = false;
        _this.catch = false;
        _this.serious = "";
        _this.init(kind, strpos, endpos, speed, serious);
        return _this;
    }
    initfish.prototype.init = function (kind, strpos, endpos, speed, serious) {
        window[serious] = this;
        var fish = this.createBitmapByName(kind);
        fish.anchorOffsetX = fish.width / 2;
        fish.anchorOffsetY = fish.height / 2;
        this.addChild(fish);
        if (strpos[0] < 0) {
            fish.rotation = 180;
        }
        else if (strpos[1] > 1136) {
            fish.rotation = 0;
        }
        fish.x = strpos[0];
        fish.y = strpos[1];
        this.fish = fish;
        this.kind = kind.split("_");
        egret.Tween.get(fish).to({ x: endpos[0], y: endpos[1] }, speed).call(function () {
            window[serious].die = true;
        });
        // fish.texture=RES.getRes("fish_1101_1 ("+this.sum.toString()+")_png");
        this.time = new egret.Timer(0, 0);
        this.time.addEventListener(egret.TimerEvent.TIMER, this.animate, this);
        this.time.start();
    };
    initfish.prototype.animate = function (e) {
        this.sum += 1;
        this.time.delay = 100;
        // fish_1101_1 (1)_png
        if (RES.getRes("fish_" + this.kind[1] + "_1 (" + this.sum.toString() + ")_png") == null) {
            this.sum = 1;
        }
        this.fish.texture = RES.getRes("fish_" + this.kind[1] + "_1 (" + this.sum.toString() + ")_png");
    };
    initfish.prototype.catched = function () {
        egret.Tween.removeTweens(this.fish);
        this.sum = 1;
        this.time.stop();
        this.time.removeEventListener(egret.TimerEvent.TIMER, this.animate, this);
        this.time = new egret.Timer(0, 20);
        this.time.addEventListener(egret.TimerEvent.TIMER, this.catchfish, this);
        this.time.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.endcatch, this);
        this.time.start();
        this.catch = true;
    };
    initfish.prototype.catchfish = function () {
        this.time.delay = 100;
        this.fish.texture = RES.getRes("fish_" + this.kind[1] + "_catch_" + this.sum.toString() + "_png");
        this.sum += 1;
        if (RES.getRes("fish_" + this.kind[1] + "_catch_" + this.sum.toString() + "_png") == null) {
            this.sum = 1;
        }
    };
    initfish.prototype.endcatch = function () {
        this.time.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.endcatch, this);
        this.time.removeEventListener(egret.TimerEvent.TIMER, this.catchfish, this);
        this.fish = null;
        //var serious=this.serious;
        this.die = true;
    };
    initfish.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return initfish;
}(egret.DisplayObjectContainer));
__reflect(initfish.prototype, "initfish");
//# sourceMappingURL=initfish.js.map