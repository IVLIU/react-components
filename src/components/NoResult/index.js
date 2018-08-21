import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class NoResult extends Component {
  static propTypes = {
    /** 无数据时的描述 */
    desc: PropTypes.string
  }
  static defaultProps = {
    desc: '暂无数据'
  }

  render () {
    const { desc, className, style } = this.props
    const classes = classNames('no-result', className)
    return (
      <div className={classes} style={style}>
        {desc}
      </div>
    )
  }
}
