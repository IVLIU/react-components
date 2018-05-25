> 通过回车自动控制表单提交, 高阶组件

### 使用方式
- 直接使用decorator
- 提供handleEnsure方法

在该页面敲击回车时，会自动进行请求

``` html
@EnterEnsure
export class Condition extends Component {
  @autobind
  handleEnsure () {
    this.requestData()
  }
}
```