import React, { Component, cloneElement, Children } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

/**
 * 选项卡组件
 */
export default class Tab extends Component {
  constructor () {
    super()
    this.addChildPanel = this.addChildPanel.bind(this)
    this.state = {
      children: [],
      defaultActiveKey: '',
      activeKey: ''
    }
  }
  componentWillMount () {
    const { defaultActiveKey, children } = this.props
    const activeKey = defaultActiveKey || children[0].props.keys
    this.setState({
      activeKey
    })
  }
  componentWillReceiveProps (nextProps) {
    const { defaultActiveKey } = nextProps
    if (!defaultActiveKey) {
      return
    }
    if (defaultActiveKey !== this.state.activeKey) {
      this.handleTabBarClick(defaultActiveKey)
    }
  }
  addChildPanel (child) {
    const { children } = this.state
    if (child.headerkey) {
      const tempChildren = children.map(({ header, key, context }) => {
        const { headerkey } = context.props
        if (headerkey && headerkey !== child.headerkey) {
          context.props.header = child.header
          header = child.header
        }
        return {
          header,
          key,
          context
        }
      })
      this.setState({
        children: tempChildren
      })
    } else {
      children.push(child)
      this.setState({
        children
      })
    }
  }
  handleTabBarClick (activeKey, disabled) {
    if (disabled) {
      return
    }
    this.setState({
      activeKey
    })
    this.props.onChange && this.props.onChange(activeKey)
  }
  renderHeader (children) {
    const { activeKey } = this.state
    const {
      tabStyle = {},
      activeStyle = {},
      tabClassName,
      activeClassName
    } = this.props
    return children.map(({ header, key, context }) => {
      const active = key === activeKey
      const disabled = context.props.disabled
      const classes = classNames('tab-header-item', {
        [tabClassName]: true,
        active,
        [activeClassName]: active,
        disabled
      })
      const styles = active
        ? Object.assign({}, tabStyle, activeStyle)
        : tabStyle
      return (
        <div
          className={classes}
          style={styles}
          onClick={() => this.handleTabBarClick(key, disabled)}
          key={key}
        >
          {header}
        </div>
      )
    })
  }
  isChildActive (child) {
    return child.props.keys === this.state.activeKey
  }
  render () {
    const { children, className } = this.props
    const { children: childPanels } = this.state
    const classes = classNames('tab-wrap', className)
    return (
      <div className={classes}>
        <div className="tab-header">{this.renderHeader(childPanels)}</div>
        <div className="tab-content">
          {Children.map(children, child => {
            const active = this.isChildActive(child)
            return cloneElement(child, {
              active,
              addChildPanel: this.addChildPanel
            })
          })}
        </div>
      </div>
    )
  }
}
Tab.propTypes = {
  /** 默认active的tab, 默认第一个展示 */
  defaultActiveKey: PropTypes.string,
  /** 切换tab时的回调 */
  onChange: PropTypes.func,
  /** 定制单个选项卡bar的样式 */
  tabStyle: PropTypes.object,
  /** 激活状态bar的样式 */
  activeStyle: PropTypes.object,
  /** 单独设置bar的className */
  tabClassName: PropTypes.string,
  /** 激活状态下bar的className */
  activeClassName: PropTypes.string
}
