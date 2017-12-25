/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2017-12-07 17:12:42
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2017-12-25 17:37:46
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

/**
 * 最基本的Button组件，使用时请以此组件为基准
 */
export default class Button extends Component {
  render () {
    const { type, children, className, ...others } = this.props
    const classes = classNames(`btn btn-${type}`, className)
    return (
      <button className={classes} {...others}>{children}</button>
    )
  }
}
Button.displayName = 'Button'
Button.propTypes = {
  /** 按钮类型：默认类型, primary, secondary, cancel, link */
  type: PropTypes.string
}
