> 用于可描述标签，自动获取后端描述并显示

### 样式
![](http://oowxefv5q.bkt.clouddn.com/images/docs/desc-label.png)

### 使用方式

``` html
import DescLabel from '@common/DescLabel'

<DescLabel tag="标签名称" icon="可以设置你的图标" maxWidth="可以限制最大宽度" />
```

## DescLabelList
> 通过整个告警alert,依次打出标签，alert_type, gangs, event, family

### 样式
![](http://oowxefv5q.bkt.clouddn.com/images/docs/desc-label-list.png)

### 使用方式

``` html
import DescLabelList from '@common/DescLabel/list'

<DescLabelList alert={alert} />
```
