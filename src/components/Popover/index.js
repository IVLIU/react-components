import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Tooltip from 'rc-tooltip'

export default class Popover extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    const { content, target, children,
      trigger, position
    } = this.props
    // const { styles, show } = this.state
    // const classes = classNames('popover-wrap', className)
    return (
      <Tooltip
        prefixCls="popover"
        animation="zoom"
        trigger={trigger}
        overlay={content}
        arrowContent={<div className="popover-arrow-inner"></div>}
        placement={position}
      >
        {target || children}
      </Tooltip>
    )
  }
}
