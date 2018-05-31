/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2017-12-07 17:12:42
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2018-05-28 10:55:04
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

/**
 * 最基本的Button组件，使用时请以此组件为基准
 */
export default class Button extends Component {
  render () {
    const { type, children, width, className, style = {}, ...others } = this.props
    const classes = classNames(`btn btn-${type}`, className)
    return (
      <button className={classes}
        style={{
          ...style,
          width: width + 'px'
        }} {...others}>{children}</button>
    )
  }
}
Button.displayName = 'Button'
Button.propTypes = {
  /** 按钮类型：默认类型, primary, secondary, cancel, link */
  type: PropTypes.string,
  /** 支持直接传宽度属性 */
  width: PropTypes.num
}
