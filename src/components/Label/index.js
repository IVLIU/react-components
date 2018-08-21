import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class Label extends PureComponent {
  render () {
    const { type, children, light,
      className, closable,
      maxWidth, style, ...others } = this.props
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
      ...style,
      maxWidth
    }
    return (
      <span className={classes}
        style={retStyle}
        {...others}
        title={typeof children === 'string' ? children : ''}>
        {children}
      </span>
    )
  }
}
Label.propTypes = {
  /** 标签类型 */
  type: PropTypes.string,
  /** 轻版label */
  light: PropTypes.bool,
  /** 最大宽度，超出时会将内容以省略号显示 */
  maxWidth: PropTypes.number
}
