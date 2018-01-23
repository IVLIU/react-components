import React, { Component } from 'react'
import pureRender from 'pure-render-decorator'

@pureRender
export default class Item extends Component {
  render () {
    const { data } = this.props
    console.log('pure-render', data)
    return (
      <div>
        {data.value}{data.key}
      </div>
    )
  }
}
