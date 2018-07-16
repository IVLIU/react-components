/*
 * @Author: zsj
 * @Date: 2018-03-20 10:51:45
 * @Last Modified by: zsj
 * @Last Modified time: 2018-07-16 16:40:04
 */
// 模版测试文件
import React, { Component } from 'react'
import {
  Modal
} from '../../src/index'

class ModalTest extends Component {
  constructor () {
    super()
    this.state = {
      isOpen: true
    }
    this.toggle = this.toggle.bind(this)
  }
  static propTypes = {

  }
  static defaultProps = {

  }
  toggle() {
    this.setState({
      isOpen: false
    })
  }
  render () {
    return (
      <Modal appElement={document.querySelector('#app')} isOpen={this.state.isOpen} title="测试Modal"
        contentLabel="TestModal"
        handleCancel={this.toggle}>
        <div>
          这是Modal里面的内容
        </div>
      </Modal>
    )
  }
}
export default ModalTest