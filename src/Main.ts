//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {
            //   console.log('hello,world')
            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }


        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
        RES.setMaxLoadingThread(4);
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private cannon:initcannon;
    //攻击间隔
    private attackspeed=300;
    //是否开炮
    private ifattack=false;
    //子弹列表
 private bulletlist:Array<egret.Bitmap>;
 //攻击速度
private attacktime=100;
    //鱼列表
private fishlist:Array<initfish>;
//子弹删除池
private tembullet:Array<egret.Bitmap>;
//鱼数量码
private fishsum=0;
    private createGameScene() {
    
        var bg=this.createBitmapByName("fish_scene_1_jpg");
            bg.touchEnabled=true;
      bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.where,this);
        bg.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.cannonrotate,this);
     
        bg.addEventListener(egret.TouchEvent.TOUCH_END,this.cancleshoot,this);
        this.stage.addChild(bg);

        this.cannon=new initcannon(1);
        this.stage.addChild(this.cannon);
        this.cannon.x=188
        this.cannon.y=606;
       
       var a=Math.random();
       if(a<0.5){
           this.fishsum+=1;
   var fish=new initfish("fish_1101_1 (1)_png",[Math.random()*-100-50,Math.random()*500+100],[Math.random()*100+1150,Math.random()*500+100],Math.random()*20000+10000,"fish"+this.fishsum.toString());
       }
       else{
              this.fishsum+=1;
   var fish=new initfish("fish_1101_1 (1)_png",[Math.random()*100+1150,Math.random()*500+100],[Math.random()*-100-50,Math.random()*500+100],Math.random()*20000+10000,"fish"+this.fishsum.toString());
       }
     
        this.stage.addChild(fish);
           

        this.bulletlist=new Array();
        this.fishlist=new Array();
        this.tembullet=new Array();
 this.fishlist.push(fish);
         this.stage.addEventListener(egret.Event.ENTER_FRAME,this.bulletmove,this);

         var time=new egret.Timer(1000,0);
time.addEventListener(egret.TimerEvent.TIMER,this.creatfish,this);
time.start();
    }
//创建鱼
private creatfish(){
     var a=Math.random();
       if(a<0.5){
              this.fishsum+=1;
   var fish=new initfish("fish_1103_1 (1)_png",[Math.random()*-100-50,Math.random()*500+100],[Math.random()*100+1150,Math.random()*500+100],Math.random()*20000+10000,"fish"+this.fishsum.toString());
       }
       else{
              this.fishsum+=1;
   var fish=new initfish("fish_1101_1 (1)_png",[Math.random()*100+1150,Math.random()*500+100],[Math.random()*-100-50,Math.random()*500+100],Math.random()*20000+10000,"fish"+this.fishsum.toString());
  
 
       }
        this.stage.addChild(fish);
        this.fishlist.push(fish);
}
//加农旋转点击

    private where(e:egret.TouchEvent){
        console.log(e.stageX+":"+e.stageY);
         if(e.stageX> this.cannon.x){
        
      
          this.cannon.rotation=Math.atan((e.stageY- this.cannon.y)/(e.stageX-this.cannon.x))*(180/Math.PI)+90;
         
       
      }
if(e.stageX< this.cannon.x){
     
        
             this.cannon.rotation=Math.atan((e.stageY- this.cannon.y)/(e.stageX- this.cannon.x))*(180/Math.PI)-90;
        
  
 }

 
  this.ifattack=true;
    }
    //加农旋转移动
 private cannonrotate(e:egret.TouchEvent){
    
 if(e.stageX> this.cannon.x){
        
      
          this.cannon.rotation=Math.atan((e.stageY- this.cannon.y)/(e.stageX-this.cannon.x))*(180/Math.PI)+90;
         
       
      }
if(e.stageX< this.cannon.x){
     
        
             this.cannon.rotation=Math.atan((e.stageY- this.cannon.y)/(e.stageX- this.cannon.x))*(180/Math.PI)-90;
        
  
 }

 
 }



//射击
private shoot(){
     
   if(this.attacktime>=this.attackspeed){
var bullet1=this.createBitmapByName("fish_bullet_1_png");
bullet1['kind']="fish_bullet_1_png";
this.stage.addChildAt(bullet1,2);
this.bulletlist.push(bullet1);
bullet1.rotation=this.cannon.rotation;


bullet1.anchorOffsetX=bullet1.width/2;
bullet1.anchorOffsetY=bullet1.height/2;
bullet1.x=this.cannon.x;
bullet1.y=this.cannon.y
bullet1["d"]=50;
this.attacktime=0;

}
  this.attacktime+=30;
}
//子弹移动和整体帧事件
 private bulletmove(){
      this.deletebullet();
      this.iffishdie();
  this.checkhit();

  for(var i=0;i<this.bulletlist.length;i++){
      this.bulletlist[i].y=this.cannon.y-this.bulletlist[i]["d"]*Math.sin(Math.PI/180*(90-this.bulletlist[i].rotation));
      this.bulletlist[i].x=this.bulletlist[i]["d"]*Math.cos(Math.PI/180*(90-this.bulletlist[i].rotation))+this.cannon.x;
      this.bulletlist[i]["d"]+=8;
 if(this.bulletlist[i].x>1190||this.bulletlist[i].x<-60||this.bulletlist[i].y>700||this.bulletlist[i].y<-60){
     this.tembullet.push(this.bulletlist[i]);
          
      }
  }
 
  if(this.ifattack){
      this.shoot();
  }
 
   }


//取消射击
 private cancleshoot(){
  this.ifattack=false;
 }
 //是否鱼死亡
 private iffishdie(){
     var temfishlist=new Array();
     for(var i=0;i<this.fishlist.length;i++){
           
       if(this.fishlist[i].die){
         
        
        temfishlist.push(this.fishlist[i]);
         this.stage.removeChild(this.fishlist[i]);
 }
     }

     for(var i=0;i<temfishlist.length;i++){
         this.fishlist.splice(this.fishlist.indexOf(temfishlist[i]),1);
     }

     
 }
//检查是否鱼和子弹碰撞
 private checkhit(){



     for(var i=0;i<this.fishlist.length;i++){
      //    var fishrec=new egret.Rectangle(this.fishlist[i].getChildAt(0).x-this.fishlist[i].getChildAt(0).width/2,this.fishlist[i].getChildAt(0).y-this.fishlist[i].getChildAt(0).height/2,this.fishlist[i].getChildAt(0).width,this.fishlist[i].getChildAt(0).height);
        
           for(var a=0;a<this.bulletlist.length;a++){
            //   var bulletrec=new egret.Rectangle(this.bulletlist[a].x-this.bulletlist[a].width/2,this.bulletlist[a].y-this.bulletlist[a].height/2,this.bulletlist[a].width,this.bulletlist[a].height);
              if(this.sat(this.bulletlist[a],this.fishlist[i].getChildAt(0) as egret.Bitmap)){
                 if(!this.fishlist[i].catch){
                     this.fishlist[i].catched();
                     this.tembullet.push(this.bulletlist[a]);
                     this.creatnet(this.bulletlist[a]['kind'],[this.bulletlist[a].x,this.bulletlist[a].y])
            //   console.log("this.stage.removeChild(this.bulletlist[a]);this.stage.removeChild(this.bulletlist[a]);");
             
                     
                 }
              }
           }

          
         
     }

   

   
 }
 //删除子弹
 private deletebullet(){
      for(var b=0;b<this.tembullet.length;b++){
         this.bulletlist.splice(this.bulletlist.indexOf(this.tembullet[b]),1);
      
      this.stage.removeChild(this.tembullet[b]);

     }
     this.tembullet=[];
 }

 //生成网
 private creatnet(kind:string,pos:number[]){
 var tx=kind.split("_");
 var net=this.createBitmapByName("fish_net_"+tx[2].toString()+"_png");
 this.stage.addChild(net);
 net.anchorOffsetX=net.width/2;
 net.anchorOffsetY=net.height/2;
 net.x=pos[0];
 net.y=pos[1];
net.scaleX=net.scaleY=0.2;
egret.Tween.get(net).to({scaleX:1,scaleY:1},300);
egret.setTimeout(function(){
try{
    this.stage.removeChild(net)

}
   catch (e) {
                        throw new Error(e);
                    }

},this,600);

 }

 //碰撞检测 
 private sat(a:egret.Bitmap,b:egret.Bitmap):boolean{
     var apos=new egret.Point(a.x,a.y);
var bpos=new egret.Point(b.x,b.y);

     var p1xmin=-a.width/2;
     var p1ymin=-a.height/2;
     var p1xmax=a.width/2;
     var p1ymax=a.height/2;
        var p2xmin=-b.width/2;
     var p2ymin=-b.height/2;
     var p2xmax=b.width/2;
     var p2ymax=b.height/2;
     var p1=[p1xmin,p1ymin,p1xmax,p1ymax];
      var p2=[p2xmin,p2ymin,p2xmax,p2ymax];
    if(SAT.boundHit(apos,bpos,p1,p2)){
  var apoint1=new egret.Point((0-a.width/2.4-0)*Math.cos(Math.PI/180*a.rotation)-(0-0-a.height/2.4)*Math.sin(Math.PI/180*a.rotation),(0-a.width/2.4-0)*Math.sin(Math.PI/180*a.rotation)+(0-0-a.height/2.4)*Math.cos(Math.PI/180*a.rotation));
  var apoint2=new egret.Point((0+a.width/2.4-0)*Math.cos(Math.PI/180*a.rotation)-(0-0-a.height/2.4)*Math.sin(Math.PI/180*a.rotation),(0+a.width/2.4-0)*Math.sin(Math.PI/180*a.rotation)+(0-0-a.height/2.4)*Math.cos(Math.PI/180*a.rotation));
  var apoint3=new egret.Point((0+a.width/2.4-0)*Math.cos(Math.PI/180*a.rotation)-(0-0+a.height/2.4)*Math.sin(Math.PI/180*a.rotation),(0+a.width/2.4-0)*Math.sin(Math.PI/180*a.rotation)+(0-0+a.height/2.4)*Math.cos(Math.PI/180*a.rotation));
  var apoint4=new egret.Point((0-a.width/2.4-0)*Math.cos(Math.PI/180*a.rotation)-(0-0+a.height/2.4)*Math.sin(Math.PI/180*a.rotation),(0-a.width/2.4-0)*Math.sin(Math.PI/180*a.rotation)+(0-0+a.height/2.4)*Math.cos(Math.PI/180*a.rotation));
  
   var bpoint1=new egret.Point((0-b.width/2.4-0)*Math.cos(Math.PI/180*b.rotation)-(0-0-b.height/2.4)*Math.sin(Math.PI/180*b.rotation),(0-b.width/2.4-0)*Math.sin(Math.PI/180*b.rotation)+(0-0-b.height/2.4)*Math.cos(Math.PI/180*b.rotation));
  var bpoint2=new egret.Point((0+b.width/2.4-0)*Math.cos(Math.PI/180*b.rotation)-(0-0-b.height/2.4)*Math.sin(Math.PI/180*b.rotation),(0+b.width/2.4-0)*Math.sin(Math.PI/180*b.rotation)+(0-0-b.height/2.4)*Math.cos(Math.PI/180*b.rotation));
  var bpoint3=new egret.Point((0+b.width/2.4-0)*Math.cos(Math.PI/180*b.rotation)-(0-0+b.height/2.4)*Math.sin(Math.PI/180*b.rotation),(0+b.width/2.4-0)*Math.sin(Math.PI/180*b.rotation)+(0-0+b.height/2.4)*Math.cos(Math.PI/180*b.rotation));
  var bpoint4=new egret.Point((0-b.width/2.4-0)*Math.cos(Math.PI/180*b.rotation)-(0-0+b.height/2.4)*Math.sin(Math.PI/180*b.rotation),(0-b.width/2.4-0)*Math.sin(Math.PI/180*b.rotation)+(0-0+b.height/2.4)*Math.cos(Math.PI/180*b.rotation));
      return SAT.sat(apos,bpos,[apoint1,apoint2,apoint3,apoint4],[bpoint1,bpoint2,bpoint3,bpoint4],false,false);
 }
 else{
     return false;
 }
   

  
 }
 //

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name:string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

   
}


