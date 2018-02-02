
#### 基本使用

```js
const handleClick = () => {
  alert(1)
};
<Button onClick={handleClick}>点我</Button>
```

#### 5中基本样式

```js
<div>
  <Button>按钮</Button>
  <Button type="primary">按钮</Button>
  <Button type="secondary">按钮</Button>
  <Button type="cancel">按钮</Button>
  <Button type="link">按钮</Button>
</div>
```

#### 自定义样式

``` css
.btn-new {
  background-color: red;
  color: green;
}
```

```
<Button className="btn-new">特别丑的按钮</Button>
```
