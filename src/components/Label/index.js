import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import pureRender from 'pure-render-decorator'
@pureRender
export default class Label extends Component {
  render () {
    const { type, children, light,
      className, closable,
      maxWidth, ...others } = this.props
    const classes = classNames(
      'label',
      `label-${type}`,
      {
        light,
        closable,
        'max-width': maxWidth
      },
      className
    )
    const retStyle = {
      maxWidth
    }
    return (
      <span className={classes}
        style={retStyle}
        {...others}>
        {children}
      </span>
    )
  }
}
Label.propTypes = {
  /** 标签类型 */
  type: PropTypes.string,
  /** 轻版label */
  light: PropTypes.bool
}
