/*
 * @Author: zsj
 * @Date: 2018-02-12 15:58:08
 * @Last Modified by: zsj
 * @Last Modified time: 2018-02-12 16:40:12
 */

import React, { Component } from 'react'
import { string } from 'prop-types'
import classNames from 'classnames'

/*
  每页的标题
 */
class PageTitle extends Component {
  static propTypes = {
    /** 唯一需要传入的属性 */
    name: string.isRequired
  }
  static defaultProps = {
    name: ''
  }
  render () {
    const { name, children } = this.props
    const classes = classNames('row page-max-title')
    return (
      <div className={classes}>
        {name}
        {children}
      </div>
    )
  }
}
PageTitle.displayName = 'PageTitle'

export default PageTitle
