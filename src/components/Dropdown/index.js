import React, { PureComponent, cloneElement } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

/**
 * 基本的Dropdown组件，可在其上针对业务逻辑进行封装
 */
export default class Dropdown extends PureComponent {
  state = {
    open: this.props.defaultOpen || false
  }
  componentWillMount = () => {
    setTimeout(() => {
      this.setState({
        open: this.props.defaultOpen || false
      })
    }, 0)
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
  handleWindowClick = (e) => {
    const { open } = this.state
    const wrap = this.wrap

    if (wrap.contains(e.target)) {
      return
    }
    if (open) {
      this.setState({
        open: false
      })
    }
  }
  close = () => {
    this.setState({
      open: false
    })
  }
  toggleShow = (e) => {
    e.stopPropagation()
    const { trigger } = this.props
    if (trigger !== 'click') {
      return
    }
    this.setState({
      open: !this.state.open
    })
  }
  onMouseEnter = () => {
    const { trigger } = this.props
    if (trigger !== 'hover') {
      return
    }
    this.setState({
      open: true
    })
  }
  onMouseLeave = () => {
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
        {cloneElement(overlay, {
          close: this.close
        })}
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
        ref={ wrap => { this.wrap = wrap }}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
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
  trigger: PropTypes.oneOf(['click', 'hover']),
  /** 是否默认展开 */
  defaultOpen: PropTypes.bool
}
