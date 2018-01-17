import React, { Component, cloneElement } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import autobind from 'autobind-decorator'
import pureRender from 'pure-render-decorator'

/**
 * 基本的Dropdown组件，可在其上针对业务逻辑进行封装
 */
@pureRender
export default class Dropdown extends Component {
  constructor () {
    super()
    this.state = {
      open: false
    }
  }
  componentDidMount () {
    const { trigger } = this.props
    if (trigger === 'click') {
      window.addEventListener('click', this.handleWindowClick)
    }
  }
  componentWillUnmount () {
    window.removeEventListener('click', this.handleWindowClick)
  }
  @autobind
  handleWindowClick (e) {
    const { open } = this.state
    const wrap = this.refs.wrap

    if (wrap.contains(e.target)) {
      return
    }
    if (open) {
      this.setState({
        open: false
      })
    }
  }
  @autobind
  toggleShow (e) {
    e.preventDefault()
    const { trigger } = this.props
    if (trigger !== 'click' && e.target === this.trigger) {
      return
    }
    this.setState({
      open: !this.state.open
    })
  }
  @autobind
  onMouseEnter () {
    const { trigger } = this.props
    if (trigger !== 'hover') {
      return
    }
    this.setState({
      open: true
    })
  }
  @autobind
  onMouseLeave () {
    const { trigger } = this.props
    if (trigger !== 'hover') {
      return
    }
    this.setState({
      open: false
    })
  }
  renderOverlay () {
    const { overlay } = this.props
    return (
      <div className="dropdown-overlay">
        {overlay}
      </div>
    )
  }
  render () {
    const { className, children, overlay, trigger, ...others } = this.props
    const { open } = this.state
    const classes = classNames('dropdown', className, {
      open,
      hover: trigger === 'hover'
    })
    return (
      <div className={classes}
        ref="wrap"
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={this.toggleShow}
        {...others}>
        {cloneElement(children, {
          ref: trigger => { this.trigger = trigger },
          onClick: this.toggleShow
        })}
        {this.renderOverlay(overlay)}
      </div>
    )
  }
}
Dropdown.defaultProps = {
  trigger: 'click'
}
Dropdown.propTypes = {
  /** dropdown展示的内容 */
  overlay: PropTypes.any,
  /** 触发展示的方式 */
  trigger: PropTypes.oneOf(['click', 'hover'])
}
