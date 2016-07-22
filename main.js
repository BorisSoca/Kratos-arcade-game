var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var bg = document.getElementById("bg");
c.width = window.innerWidth;
c.height = window.innerHeight*.9;
var player = {
x: 0,
y: 100,
velX : 0,
velY: 0,
sprite: [document.getElementById("player"),
         document.getElementById("playerf2"),
         document.getElementById("playerf3"),
],
ticks:0,
spriteNum: 0,
dir: "right",
update: function(){
  this.ticks++;
  this.x= this.x + this.velX;
  this.y= this.y + this.velY;
  if (this.velX !=0 || this.velY !=0)
   if(this.ticks % 10 === 0)
   this.spriteNum = this.spriteNum +1;
  if (this.spriteNum > 2) this.spriteNum = 0;
},
render: function(){
  //ctx.fillRect(this.x, this.y, 300, 85);
  if (this.dir== "left"){
    flipCtx(ctx, this);
  }
  ctx.drawImage(this.sprite[this.spriteNum], this.x, this.y)
  if (this.dir == "left"){
    restoreCtx(ctx);
  }
}
};

function animate(){
  ctx.drawImage(bg,0,0,c.width, c.height);
ctx.drawImage(bg,0,0);
if(player.dead){
  alert("You suck!");
  window.location.href= "http://www.donaldjtrump.com";
  return
}
enemy.update();
enemy.render();
player.update();
player.render();

  window.requestAnimationFrame(animate);
}


animate();

$(document).keydown(function(e){
  if(e.keyCode== 37){
    player.velX =-5;
    player.dir = "left";
  }
  if(e.keyCode== 38) player.velY =-5;
  if(e.keyCode== 39){
     player.velX = 5;
     player.dir = "right";
   }
  if(e.keyCode== 40) player.velY = 5;
});
$(document).keyup(function(e){
  if(e.keyCode== 37) player.velX =0;
  if(e.keyCode== 38) player.velY =0;
  if(e.keyCode== 39) player.velX =0;
  if(e.keyCode== 40) player.velY =0;
});

$(document). on ('touchstart', function(e){
  //where the touch happens:
  //e.touches[0].clientX, e.touches[0].clientY
  var touchX = e.touches[0].clientX;
  var touchY = e.touches[0].clientY;
  if (touchX < player.x) player.velX = -5;
  if (touchX < player.x) player.velX = 5;
  if (touchY < player.y) player.velY = -5;
  if (touchY < player.y) player.velY = 5;
});

function flipCtx( ctx, player){
  ctx.save();
  ctx.translate(player.x + 50,0); //50 is half the width of my player
  ctx.scale(-1,1);
  ctx.translate(-player.x-50,0);
  // ready to draw flipped!
}
function restoreCtx(ctx){
  ctx.restore();
}
