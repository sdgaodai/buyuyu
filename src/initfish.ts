class initfish extends egret.DisplayObjectContainer {
	public constructor(kind:string,strpos:number[],endpos:number[],speed:number,serious:string) {
super();
this.init(kind,strpos,endpos,speed,serious);
	}
 
private sum=0;
private fish:egret.Bitmap;
public die=false;
public catch=false;

private serious="";
	private init(kind:string,strpos:number[],endpos:number[],speed:number,serious:string){
	window[serious]=this;
     var  fish=this.createBitmapByName(kind);
	 fish.anchorOffsetX=fish.width/2;
	 fish.anchorOffsetY=fish.height/2;
	 this.addChild(fish);

	 if(strpos[0]<0){
       fish.rotation=180;
	 }
	 else if(strpos[1]>1136){
fish.rotation=0

	 }
  
   fish.x=strpos[0];
   fish.y=strpos[1];
   this.fish=fish;
  this.kind =kind.split("_");
  
   egret.Tween.get(fish).to({x:endpos[0],y:endpos[1]},speed).call(function(){
	window[serious].die=true;

	
	
   });
	// fish.texture=RES.getRes("fish_1101_1 ("+this.sum.toString()+")_png");
	 this.time=new egret.Timer(0,0);
	  this.time.addEventListener(egret.TimerEvent.TIMER,this.animate,this);
	  this.time.start();
	 
	}
    private kind;
 private time:egret.Timer;


	private animate(e:egret.TimerEvent){
	
		this.sum+=1;
     this.time.delay=100;
	 // fish_1101_1 (1)_png
	 
	  if(RES.getRes("fish_"+this.kind[1]+"_1 ("+this.sum.toString()+")_png")==null){
		 this.sum=1;
	  }
	 
	this.fish.texture=RES.getRes("fish_"+this.kind[1]+"_1 ("+this.sum.toString()+")_png");
		 
      
	}

	public catched(){
		egret.Tween.removeTweens(this.fish);
		this.sum=1;
		this.time.stop();
		this.time.removeEventListener(egret.TimerEvent.TIMER,this.animate,this);
		this.time=new egret.Timer(0,20);
		this.time.addEventListener(egret.TimerEvent.TIMER,this.catchfish,this);
		this.time.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.endcatch,this);
		this.time.start();
		this.catch=true;
	}

	private catchfish(){
		this.time.delay=100;
		this.fish.texture=RES.getRes("fish_"+this.kind[1]+"_catch_"+this.sum.toString()+"_png");
		this.sum+=1;
		if(RES.getRes("fish_"+this.kind[1]+"_catch_"+this.sum.toString()+"_png")==null){
			this.sum=1;
		}
	}

	private endcatch(){
	        this.time.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.endcatch,this);
			this.time.removeEventListener(egret.TimerEvent.TIMER,this.catchfish,this);
			this.fish=null;
		//var serious=this.serious;
		this.die=true;

	}


	   private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}