> 用于去除看起来不舒服的三元运算符

### 使用方式
``` html
<Item show={list && list.length} default="当没有值时的默认显示，如果没有，则不显示该组件">
  {list.map(item => item)}
</Item>
```