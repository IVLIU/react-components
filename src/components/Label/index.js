import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class Label extends Component {
  render () {
    const { type, children, light, className } = this.props
    const classes = classNames(
      'label',
      `label-${type}`,
      {
        light
      },
      className
    )
    return (
      <span className={classes}>{children}</span>
    )
  }
}
Label.propTypes = {
  /** 标签类型 */
  type: PropTypes.string,
  /** 轻版label */
  light: PropTypes.bool
}
