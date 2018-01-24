import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import pureRender from 'pure-render-decorator'
@pureRender
export default class Label extends Component {
  render () {
    const { type, children, light, className, closable, ...others } = this.props
    const classes = classNames(
      'label',
      `label-${type}`,
      {
        light,
        closable
      },
      className
    )
    return (
      <span className={classes} {...others}>{children}</span>
    )
  }
}
Label.propTypes = {
  /** 标签类型 */
  type: PropTypes.string,
  /** 轻版label */
  light: PropTypes.bool
}
