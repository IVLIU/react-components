#### 基本使用

最基本的多选，单选，打开控制台看输出的值

```js
/** 是否是多选 */
multi: PropTypes.bool,
/**
 * 选项
 * {
 *   label: '标签',
 *   value: '值'
 * }
 */
options: PropTypes.array,
/** 错误状态 */
hasError: PropTypes.bool,
/** disabled状态 */
disabled: PropTypes.bool,
/** 是否可清空 */
clearable: PropTypes.bool,
/** 默认值 */
/** defaultValue: 选项中的value的值，当multi多选的时候，可以传一个数组 */
defaultValue: PropTypes.any,
/** change回调 */
onChange: PropTypes.func,
/** 可选主题颜色 default, white */
theme: PropTypes.string
```

```js
const options = [
  {
    label: "111",
    value: "111"
  },
  {
    label: "222",
    value: "222"
  },
  {
    label: "333",
    value: "333"
  }
];
<div>
  <p>单选</p>
  <div className="row">
    <div className="col-6">
      <Select onChange={console.log} options={options} clearable={false} />
    </div>
  </div>
  <p>多选</p>
  <div className="row">
    <div className="col-6 mgb20">
      <Select onChange={console.log} options={options} multi />
    </div>
  </div>
</div>;
```

#### 各种状态

禁用状态和错误状态

```js
const options = [
  {
    label: "111",
    value: "111"
  },
  {
    label: "222",
    value: "222"
  },
  {
    label: "333",
    value: "333"
  }
];

<div className="row">
  <div className="col-6 mgb20">
    <Select onChange={console.log} options={options} hasError />
  </div>
  <div className="col-6 mgb20">
    <Select onChange={console.log} options={options} disabled />
  </div>
</div>;
```

#### 默认值

为组件设置默认值

```js
const options = [
  {
    label: "111",
    value: "111"
  },
  {
    label: "222",
    value: "222"
  },
  {
    label: "333",
    value: "333"
  }
];

<div>
  <div className="row">
    <div className="col-6 mgb20">
      <Select
        onChange={console.log}
        options={options}
        disabled
        defaultValue="111"
      />
    </div>
  </div>
  <div className="row">
    <div className="col-6 mgb20">
      <Select
        onChange={console.log}
        options={options}
        multi
        disabled
        defaultValue={["111", "222"]}
      />
    </div>
  </div>
</div>;
```
