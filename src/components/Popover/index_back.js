import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'

import { POSITION, TRIGGER } from './constant'
import Arrow from './arrow'
import autobind from 'autobind-decorator'

const halfHeight = (a, b) => b.height / 2 - a.height / 2
const halfWidth = (a, b) => b.width / 2 - a.width / 2
const hideStyle = {
  top: -9999,
  left: -9999
}

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
  static defaultProps = {
    trigger: TRIGGER.HOVER,
    position: POSITION.RIGHT
  }
  state = {
    show: false,
    styles: hideStyle
  }
  componentDidMount () {
    const { trigger } = this.props
    if (trigger === TRIGGER.CLICK) {
      window.addEventListener('click', this.hideContent)
    }
  }
  componentWillUnmount () {
    window.removeEventListener('click', this.hideContent)
  }
  getPositionStyle (style, targetStyles) {
    const { position } = this.props
    switch (position) {
      case POSITION.TOP:
        return {
          left: halfWidth(style, targetStyles),
          top: -style.height + 1,
          transformOrigin: 'center bottom'
        }
      case POSITION.BOTTOM:
        return {
          left: halfWidth(style, targetStyles),
          marginTop: -1
        }
      case POSITION.LEFT:
        return {
          left: -style.width + 1,
          top: halfHeight(style, targetStyles),
          transformOrigin: 'right center'
        }
      default:
        return {
          left: targetStyles.width - 1,
          top: halfHeight(style, targetStyles),
          transformOrigin: 'left center'
        }
    }
  }
  @autobind
  handleMouseEnter (e) {
    if (this.state.show) return
    this.showContent(e)
  }
  @autobind
  handleMouseLeave () {
    this.hideContent()
  }
  @autobind
  handleTargetClick (e) {
    const { show } = this.state
    e.stopPropagation()

    if (show) {
      this.hideContent()
    } else {
      this.showContent(e)
    }
  }
  showContent (e) {
    this.setState({
      show: true,
      styles: this.getContentStyles(e)
    })
  }
  @autobind
  hideContent () {
    this.setState({
      show: false,
      styles: hideStyle
    })
  }
  getContentStyles (e) {
    const content = findDOMNode(this.content)
    const styles = content.getBoundingClientRect()
    const targetStyles = e.target.getBoundingClientRect()
    const retStyles = this.getPositionStyle(styles, targetStyles)

    return Object.assign({}, retStyles, {
      width: styles.width,
      height: styles.height
    })
  }

  render () {
    const { content, target, children,
      trigger, className, position
    } = this.props
    const { styles, show } = this.state
    const classes = classNames('popover-wrap', className)
    const triggerEvents = trigger === TRIGGER.HOVER
      ? {
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave
      }
      : {
        onClick: this.handleTargetClick
      }
    return (
      <div className={classes} {...triggerEvents}>
        <div className="popover-trigger">
          {target || children}
        </div>
        <CSSTransition
          in={show}
          timeout={0}
          classNames="popover"
          transitionAppear={true}
        >
          <div className="popover-content-wrap" style={styles} ref={content => (this.content = content)}>
            <div className={`popover`}>
              <Arrow position={position} />
              <div className="popover-content">
                {content}
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    )
  }
}
