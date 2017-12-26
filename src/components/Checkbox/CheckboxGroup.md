#### 基本使用
一组Checkbox, 自动包含值，name,onchange等维护,
注：当值为object时，若想设置默认值，则应用该值的引用
``` js
const dfValue = {
  a: 1
};
<div className="col-6 mgb20">
  <CheckboxGroup defaultValue={[dfValue]} onChange={console.log}>
    <Checkbox label="选择1" value={dfValue} />
    <Checkbox label="选择2" value={{ a: 2 }} />
  </CheckboxGroup>
</div>
```

#### 禁用状态

``` js
const dfValue = {
  a: 1
};
<div className="col-6 mgb20">
  <CheckboxGroup defaultValue={[dfValue]} disabled onChange={console.log}>
    <Checkbox label="选择1" value={dfValue} />
    <Checkbox label="选择2" value={{ a: 2 }} />
  </CheckboxGroup>
</div>
```