#### 基本使用

``` js
const Button = require('../Button').default;
class BaseModal extends React.Component {
  constructor () {
    super()
    this.state = {
      showModal: false
    }
  }
  showModal () {
    this.setState({
      showModal: true
    })
  }
  closeModal () {
    this.setState({
      showModal: false
    })
  }
  render () {
    const { showModal } = this.state
    return (
      <div className="row mgb20">
        <Button onClick={this.showModal.bind(this)} type="secondary">
          点我显示Modal
        </Button>
        <Modal appElement={document.querySelector('#app')} isOpen={showModal} title="测试Modal"
          handleEnsure={this.closeModal.bind(this)}
          handleCancel={this.closeModal.bind(this)}
          contentLabel="TestModal">
          <div>
            这是Modal里面的内容
          </div>
        </Modal>
      </div>
    )
  }
};
<BaseModal/>
```