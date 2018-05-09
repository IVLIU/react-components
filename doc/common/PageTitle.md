> 每个模块页面的Title，该组件定义为业务逻辑组件

### 样式
![](http://oowxefv5q.bkt.clouddn.com/images/docs/page-title.png)

### 使用方式
``` html
<PageTitle name="告警主机">
  <!-- 用于填充其他内容 -->
  <div styleName="time-range-wrap">
    <label styleName="label">时间 ：</label>
    <RangeBtn defaultValue={condition.occ_time_range} value={condition.occ_time_range} styleName="time-range-select" onChange={this.handleTimeChange} />
  </div>
</PageTitle>
```