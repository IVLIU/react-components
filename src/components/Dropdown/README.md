#### 基本使用

``` js
const Box = require('../Box').default;
const Button = require('../Button').default;
const overlay = (
  <Box data={true} border title="这是盒子标题" contentHeight="200">
    这是一个小盒子
  </Box>
);
<Dropdown overlay={overlay} >
  <Button type="secondary">点我</Button>
</Dropdown>
```

#### 更改触发方式
使用trigger进行更改

``` js
const Box = require('../Box').default;
const Button = require('../Button').default;
const overlay = (
  <Box data={true} border title="这是盒子标题" contentHeight="200">
    这是一个小盒子
  </Box>
);
<Dropdown overlay={overlay} trigger="hover">
  <Button type="secondary">鼠标放在我上面</Button>
</Dropdown>
```