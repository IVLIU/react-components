import React, { Component, cloneElement } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import autobind from 'autobind-decorator'
import pureRender from 'pure-render-decorator'

@pureRender
export default class DropDown extends Component {
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
    if (e.target === this.trigger) {
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
DropDown.defaultProps = {
  trigger: 'click'
}
DropDown.propTypes = {
  overlay: PropTypes.any,
  trigger: PropTypes.string
}
