/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2017-12-15 11:00:11
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2018-08-21 15:34:05
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

/**
 * icon的基本封装
 */
export default class Icon extends Component {
  render() {
    const { link, className = '', style, ...others } = this.props
    const classes = classnames('icon', className)
    return (
      <svg className={classes} {...others} style={style}>
        <use xlinkHref={link} />
      </svg>
    )
  }
}
Icon.propTypes = {
  /** svg的路径 */
  link: PropTypes.string.isRequired
}
