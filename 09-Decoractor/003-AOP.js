/**
     * before：传入的fn是一个函数，fn先执行
     * after：传入的fn参数是一个函数，fn后执行
     */

 Function.prototype.before = function(fn) {
  const originalFn = this;

  return function(...args) {
    fn.apply(this, args);
    
    return originalFn.apply(this, args);
  }
}

Function.prototype.after = function(afterFn) {
  const originalFn = this;

  return function(...args) {
    const res = originalFn.apply(this, args);
    afterFn.apply(this, args);

    return res;
  }
}

