import React, { Component, cloneElement, Children } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class Tab extends Component {
  constructor () {
    super()
    this.addChildPanel = this.addChildPanel.bind(this)
    this.state = {
      children: [],
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
  addChildPanel (child) {
    const { children } = this.state
    children.push(child)
    this.setState({
      children
    })
  }
  handleTabBarClick (activeKey) {
    this.setState({
      activeKey
    })
  }
  renderHeader (children) {
    const { activeKey } = this.state
    const { tabStyle = {}, activeStyle = {}, tabClassName, activeClassName } = this.props
    return (
      children.map(({ header, key }) => {
        const active = key === activeKey
        const classes = classNames('tab-header-item', {
          [tabClassName]: true,
          active,
          [activeClassName]: active
        })
        const styles = active ? Object.assign({}, tabStyle, activeStyle) : tabStyle
        return <div
          className={classes}
          style={styles}
          onClick={() => this.handleTabBarClick(key)}
          key={key}>
          {header}
        </div>
      })
    )
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
          {
            Children.map(children, child => {
              const active = this.isChildActive(child)
              return cloneElement(child, {
                active,
                addChildPanel: this.addChildPanel
              })
            })
          }
        </div>
      </div>
    )
  }
}
Tab.propTypes = {
  defaultActiveKey: PropTypes.string,
  onChange: PropTypes.func,
  tabStyle: PropTypes.object,
  activeStyle: PropTypes.object,
  tabClassName: PropTypes.string,
  activeClassName: PropTypes.string
}
