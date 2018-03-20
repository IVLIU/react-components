import React, { Component } from 'react'
import {
  Tab
} from '../../src/index'
const TabPanel = Tab.TabPanel

export default class TabTest extends Component {
  constructor () {
    super()
    this.state = {
      defaultActiveKey: 0
    }
    this.changeActive = this.changeActive.bind(this)
  }
  static propTypes = {}
  changeActive() {
    this.setState({
      defaultActiveKey: 1
    })
  }
  render () {
    return (
      <div className="container" style={{width: '1200px'}}>
        <div className="row mgb20" onClick={this.changeActive}>
          <Tab  tabStyle={{ marginRight: '10px' }} activeStyle={{ borderRight: '1px solid red' }}>
            <TabPanel  header="告警明细" keys="1">111</TabPanel>
            <TabPanel headerkey={this.state.defaultActiveKey+""} header={`可疑活动明细${this.state.defaultActiveKey}`} keys="2">222</TabPanel>
          </Tab>
        </div>
      </div>
    )
  }
}

