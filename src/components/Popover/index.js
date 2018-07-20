import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Tooltip from 'rc-tooltip'
import { POSITION, TRIGGER } from './constant'

export default class Popover extends Component {
  static propTypes = {
    /** popover的内容 */
    content: PropTypes.any,
    /** 触发popover的元素 */
    target: PropTypes.any,
    /** 触发方式 */
    trigger: PropTypes.oneOf(Object.keys(TRIGGER).map(key => TRIGGER[key])),
    /** popover内容的位置 */
    position: PropTypes.oneOf(Object.keys(POSITION).map(key => POSITION[key]))
  }
  state = {
    visible: false
  }
  handleVisibleChange = visible => {
    this.setState({
      visible
    })
  }
  componentWillReceiveProps = (nextProps) => {
    if (!nextProps.content) {
      this.setState({
        visible: false
      })
    }
  }
  render() {
    const { content, target, children,
      trigger, position
    } = this.props
    const { visible } = this.state
    return (
      <Tooltip
        prefixCls="popover"
        animation="zoom"
        trigger={trigger}
        overlay={content}
        visible={visible}
        onVisibleChange={this.handleVisibleChange}
        arrowContent={<div className="popover-arrow-inner"></div>}
        placement={position}
      >
        {target || children}
      </Tooltip>
    )
  }
}
