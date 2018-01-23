import React, { Component } from 'react'
import Item from './Item'
import PureFunction from './pureItem'
import PureRender from './ItemWithPurerender'
import autobind from 'autobind-decorator'
let i = 0
const data = { value: 1, key: '这是单独的Item' }
export default class App extends Component {
  constructor () {
    super()
    this.state = {
      list: []
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleClick () {
    const { list } = this.state
    const index = ++i
    list.push({
      key: index,
      value: index
    })
    this.setState({
      list
    })
  }
  handleChange () {
    console.log(1)
  }
  @autobind
  handleChange2 () {

  }
  render () {
    const { list } = this.state
    return (
      <div>
        普通组件
        <Item data={data}/>
        纯函数
        <PureFunction data={data} />
        使用pureRender
        <PureRender data={data} />
        <PureRender data={data} onChange={this.handleClick.bind(this)} />
        <PureRender data={data} onChange={this.handleChange} />
        <PureRender data={data} onChange={this.handleChange2} />
        list1
        {
          list.map(item => <Item data={item} />)
        }
        list2
        {
          list.map(item => <PureFunction data={item} />)
        }
        list3
        {
          list.map(item => <PureRender data={item} />)
        }
        list4
        {
          list.map(item => <Item key={'base' + item.key} data={item} />)
        }
        list5
        {
          list.map(item => <PureFunction key={'func' + item.key} data={item} />)
        }
        list6
        {
          list.map(item => <PureRender key={'pure' + item.key} data={item} />)
        }
        <button onClick={this.handleClick.bind(this)}>点我</button>
      </div>
    )
  }
}
