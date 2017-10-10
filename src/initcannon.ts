class initcannon extends egret.DisplayObjectContainer {
	public constructor(kind:number) {
super();
this.init(kind);
	}

public cannonbody:egret.Bitmap;
public cannonhead:egret.Bitmap;

//初始化炮台
	private init(kind:number){
	
		this.cannonbody=this.createBitmapByName("fish_cannon_1_body_png");
			this.cannonbody.anchorOffsetX=	this.cannonbody.width/2;
			this.cannonbody.anchorOffsetY=	this.cannonbody.height/2;
		this.addChild(	this.cannonbody);
        
	this.cannonhead=this.createBitmapByName("fish_cannon_1_head_png");
		this.cannonhead.anchorOffsetX=this.cannonhead.width/2;
		//cannonhead.anchorOffsetY=cannonhead.height/2;
		this.cannonhead.y=-60;
		this.addChildAt(this.cannonhead,0);
       switch(kind){

case 1:
	this.cannonbody.texture=RES.getRes("fish_cannon_1_body_png");
	this.cannonhead.texture=RES.getRes("fish_cannon_1_head_png");
break;
	   }


	   

	}

	   private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}