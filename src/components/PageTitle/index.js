/*
 * @Author: zsj
 * @Date: 2018-02-12 15:58:08
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2018-08-15 17:43:34
 */

import React, { Component } from 'react'
import { string } from 'prop-types'
import classNames from 'classnames'

/**
 * 页面头部标题
 */

class PageTitle extends Component {
  static propTypes = {
    /** 唯一需要传入的属性 */
    name: string.isRequired
  }
  static defaultProps = {
    name: ''
  }
  render() {
    const { name, children, className, style } = this.props
    const classes = classNames('row page-max-title', className)
    return (
      <div className={classes} style={style}>
        {children}
        {name}
      </div>
    )
  }
}
PageTitle.displayName = 'PageTitle'

export default PageTitle
