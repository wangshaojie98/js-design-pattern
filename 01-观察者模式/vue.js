// 递归的将属性变成getter\setter
class Observer {
  constructor(value) {
    this.value = value;
    if (!Array.isArray(value)) {
      this.walk(value);
    }
  }

  walk(obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key]);
    })
  }
}


// parsePath
function parsePath(path) {
  const badPathRegex = /[^\w.$]/
  if (badPathRegex.test(path)) return;

  const segments = path.split('.');
  return function(obj) {
    let res = obj;

    // a.b.c
    segments.forEach(segment => {
      res = res[segment];
    })

    return res;
  }
}

// 中介，依赖的来源，俗称观察者
class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    this.getter = parsePath(expOrFn);
    this.cb = cb;
    this.value = this.get();
  }

  get(){
    window.target = this;
    const value = this.getter(this.vm, this.vm); // 读取一下为了，触发getter函数/setter函数
    window.target = undefined;

    return value;
  }

  update() {
    const oldValue = this.value;
    this.value = this.get();
    this.cb.call(this.vm, this.value, oldValue);
  }
}


// 订阅者
class Dep {
  constructor() {
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  remove(sub) {
    const index = this.subs.indexOf(sub);

    if (index) {
      this.subs.splice(index, 1);
    }
  }

  depend() {
    if (window.target) {
      this.addSub(window.target);
    }
  }

  notify() {
    this.subs.forEach(sub => sub.update())
  }
}

// getter/setter具体函数
function defineReactive(data, key, value) {
  if (typeof value === 'object') {
    new Observer(value);
  }

  let dep = new Dep();

  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      dep.depend();
      return value;
    },
    set(newVal) {
      if (value === newVal) return;
      value = newVal;
      dep.notify();
    }
  })

}

