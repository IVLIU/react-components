/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2017-12-07 17:12:42
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2017-12-15 11:06:26
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class Button extends Component {
  render () {
    const {type, children, className, ...others} = this.props
    const classes = classNames(`btn btn-${type}`, className)
    return (
      <button className={classes} {...others}>{children}</button>
    )
  }
}

Button.propTypes = {
  type: PropTypes.string
}
