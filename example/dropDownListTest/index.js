/*
 * @Author: zsj
 * @Date: 2018-03-20 10:51:45
 * @Last Modified by: zsj
 * @Last Modified time: 2018-04-17 11:41:20
 */
// 模版测试文件
import React, { Component } from 'react'
import {
  DropdownList
} from '../../src/index'
import autobind from 'autobind-decorator';

const listItems = [
  {
    label: "未处理",
    value: 0
  },
  {
    label: "已处理",
    value: 4
  }
];
export default class DropdownListTest extends Component {
  constructor () {
    super()
    this.state = {
      defaultValue: 0
    }
  }
  static propTypes = {

  }
  static defaultProps = {
  }
  @autobind
  onChange() {
    this.setState((preState) => {
      return {
        defaultValue: preState.defaultValue === 0 ? 4 : 0
      }
    })
  }
  render () {
    const {defaultValue} = this.state
    return (
      <div className="container" style={{width: '1200px'}}>
        <DropdownList
        trigger="hover"
        defaultValue={defaultValue}
        onChange={this.onChange}
        listItems={listItems}
        changeValue/>
      </div>
    )
  }
}
