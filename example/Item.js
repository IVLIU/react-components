import React, { Component } from 'react'

export default class Item extends Component {
  render () {
    const { data } = this.props
    console.log('none', data)
    return (
      <div>
        {data.value + data.key}
      </div>
    )
  }
}
