/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2017-12-07 17:12:42
 * @Last Modified by:   wangweixin@threatbook.cn
 * @Last Modified time: 2017-12-07 17:12:42
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Button extends Component {
  render () {
    const {type, children, ...others} = this.props
    return (
      <button className={`btn btn-${type}`} {...others}>{children}</button>
    )
  }
}

Button.propTypes = {
  type: PropTypes.string
}
