/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2017-12-15 11:00:11
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2017-12-26 11:31:01
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

/**
 * icon的基本封装
 */
export default class Icon extends Component {
  render () {
    const { link, className = '', ...others } = this.props
    const classes = classnames('icon', className)
    return (
      <svg className={classes} {...others}><use xlinkHref={link} /></svg>
    )
  }
}
Icon.propTypes = {
  /** svg的路径 */
  link: PropTypes.string.isRequired
}
