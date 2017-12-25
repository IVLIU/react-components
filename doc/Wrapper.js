import React, { Component } from 'react'
import { IntlProvider } from 'react-intl'
import '../dist/static/css/lib.css'
import './example.css'
export default class Wrapper extends Component {
  render () {
    return (
      <IntlProvider locale="en">
        {this.props.children}
      </IntlProvider>
    )
  }
}
