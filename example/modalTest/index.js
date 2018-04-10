/*
 * @Author: zsj
 * @Date: 2018-03-20 10:51:45
 * @Last Modified by: zsj
 * @Last Modified time: 2018-03-27 10:53:05
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
      current: 0
    }
  }
  static propTypes = {

  }
  static defaultProps = {

  }
  render () {
    return (
      <Modal appElement={document.querySelector('#app')} isOpen={true} title="测试Modal"
        contentLabel="TestModal">
        <div>
          这是Modal里面的内容
        </div>
      </Modal>
    )
  }
}
export default ModalTest