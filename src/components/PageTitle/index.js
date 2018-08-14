/*
 * @Author: zsj
 * @Date: 2018-02-12 15:58:08
 * @Last Modified by: zsj
 * @Last Modified time: 2018-08-14 14:33:24
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
    const { name, children, className, ...others } = this.props
    const classes = classNames('row page-max-title', className)
    return (
      <div className={classes} {...others}>
        {children}
        {name}
      </div>
    )
  }
}
PageTitle.displayName = 'PageTitle'

export default PageTitle
