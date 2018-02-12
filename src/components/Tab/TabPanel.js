import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class TabPanel extends Component {
  componentWillMount () {
    const { header, keys, addChildPanel } = this.props
    addChildPanel && addChildPanel({
      header,
      key: keys,
      context: this
    })
  }
  render () {
    const { children, active, className } = this.props
    const classes = classNames('tab-panel', className, {
      active
    })
    return (
      <div className={classes}>
        {children}
      </div>
    )
  }
}
TabPanel.propTypes = {
  /** 头部内容, 可以传入节点 */
  header: PropTypes.any,
  /** 特有的key */
  keys: PropTypes.string.isRequired,
  /** 是否active, 会被父组件自动传入，不用关心 */
  active: PropTypes.bool,
  /** 是否禁用 */
  disabled: PropTypes.bool
}
