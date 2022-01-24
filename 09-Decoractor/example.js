/**
 * JavaScript设计模式与开发实践例子
 */

// ✈️大战的例子
class Plane {
  constructor(){}

  fire() {
    console.log('发射普通子弹！')
  }
}

class MissileDecorator {
  constructor(plane) {
    this.plane = plane;
  }

  fire() {
    this.plane.fire();
    console.log('发射导弹！')
  }
}

class AtomDecorator {
  constructor(plane) {
    this.plane = plane;
  }

  fire() {
    this.plane.fire();
    console.log('发射原子弹')
  }
}

const plane = new Plane();
const missilePlane = new MissileDecorator(plane);
const atomPlane = new AtomDecorator(missilePlane);
atomPlane.fire();

