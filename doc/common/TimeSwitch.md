> 时间控件

### 样式

![](https://i.screenshot.net/x5kw7sy)

### 使用方式

```html
import { TimePicker } from "@common/lib";
const { RangeBtn } = TimePicker;
const timeListAll = [
  {
    label: "24小时",
    value: "twenty_four_hours"
  },
  {
    label: "7天",
    value: "seven_days"
  },
  {
    label: "30天",
    value: "thirty_days"
  }
];
<RangeBtn
  options={timeListAll}
  defaultValue={timeRange.time_range}
  onChange={selectTimeRange}
/>;
```
