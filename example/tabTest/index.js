import React, { Component } from 'react'
import {
  Tab
} from '../../src/index'
const TabPanel = Tab.TabPanel

export default class TabTest extends Component {
  constructor () {
    super()
    this.state = {
      defaultActiveKey: 0,
      data: [
        {
          id: 11,
          title: "wrrrr"
        },
        {
          id: 555,
          title: "wrrrrssdu"
        }
      ]
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
    const {data} = this.state
    return (
      <div className="container" style={{width: '1200px'}}>
        <div className="row mgb20" onClick={this.changeActive}>
          <Tab  tabStyle={{ marginRight: '10px' }} activeStyle={{ borderRight: '1px solid red' }} defaultActiveKey="test">
            {/* {data.map((item, index) => {
              return (<TabPanel  header={item.title} keys={index}>111</TabPanel>)
            })} */}
            <TabPanel keys="test" >89999788888</TabPanel>
            <TabPanel keys="testload" defaultLoad><p>89999</p></TabPanel>
          </Tab>
        </div>
      </div>
    )
  }
}

