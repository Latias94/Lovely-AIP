## 常用标签

### @public--对外接口，一般可以省略
### @private--内部接口，使用 "_" 可以省略
### @protected--受保护接口

```
/**
 * @public
 */
class MyClass {
    /**
     * @private
     */
    _method(){...}
    
    /**
     * @protected
     */
    add(){...}
}
```

### @deprecated--接口废弃，会显示在文档中

```
/**
 * @deprecated 使用 MyClassEx 替换
 */
class MyClass{...}
```

### @ignore--忽略接口，不会显示在文档中

```
/**
 * @ignore
 */
class MyClass{...}
```

### @version--标注版本号

```
/**
 * @version 0.0.1
 */
class MyClass{...}
```

### @todo--后期需要实现功能

```
/**
 * @todo 支持修改
 */
class MyClass{...}
```

### @extends--继承自，一般能自动识别

```
/**
 * @extends {SuperClass1}
 * @extends {SuperClass2}
 */
class MyClass extends mix(SuperClass1, SuperClass2) {...}
```

### @param--参数，支持对象

```
class App extends MFEComponent {
    /**
     * 初始化
     * @param {Object} props - 传入对象
     * @param {Number} props.foo - 描述
     * @param {String} props.bar - 描述
     */
    constructor(props){...}
}
```

### @return--返回值，支持对象

```
class MyClass {
    /**
     * @return {Object} 描述
     * @property {number} foo - 描述
     * @property {number} bar - 描述
     */
    method(){...}
}
```

### @type--类型定义

```
// 单个属性
class MyClass {
    constructor() {
        /** @type {number} */
        this.p = 123;
    
        /**
         * @type {Object}
         * @property {number} res.foo - 描述
         * @property {string} res.bar - 描述
         */
        this.res = {foo: 123, bar: "abc"};
    }
}

// get/set
class MyClass {
  /** @type {string} */
  get value() {}

  /** @type {string} */
  set value(v){}
}
```

### 类型语法

数组

```
/**
 * @param {number[]} param - 描述
 */
function myFunc(param){...}
```

并存类型

```
/**
 * @param {number|string} param - 描述
 */
function myFunc(param){...}
```
