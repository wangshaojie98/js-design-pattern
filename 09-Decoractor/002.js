/**
 * 改写对象的方法
 */

let plane = {
  fire() {
    console.log('发射普通子弹！')
  }  
}

function missileDecorator() {
  console.log('发射导弹！')
}

function atomDecorator() {
  console.log('发射原子弹！')
}

let fire1 = plane.fire;

plane.fire = function() {
  fire1();
  missileDecorator();
}

let fire2 = plane.fire;

plane.fire = function() {
  fire2();
  atomDecorator();
}

plane.fire();