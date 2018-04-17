/*
 * @Author: zsj
 * @Date: 2018-03-20 10:51:45
 * @Last Modified by: zsj
 * @Last Modified time: 2018-04-17 10:57:09
 */
// 模版测试文件
import React, { Component } from 'react'
import {
  Pagination
} from '../../src/index'

export default class PaginationTest extends Component {
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
      <div className="container" style={{width: '1200px'}}>
      </div>
    )
  }
}