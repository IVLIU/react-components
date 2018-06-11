import React, { Component } from 'react'
import {
  Input
} from '../../src/index'

export default class InputTest extends Component {
  static propTypes = {}
  onChange(val) {
    console.log("val", val)
  }
  render () {
    return (
       <div className="container" style={{width: '1200px'}}>
        <Input onChange={this.onChange}/>
      </div>
    )
  }
}

