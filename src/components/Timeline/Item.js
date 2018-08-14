import React, { PureComponent } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

export default class TimelineItem extends PureComponent {
  static propTypes = {
    /** 点的内容 */
    dot: PropTypes.any,
    /** 左侧点的描述 */
    desc: PropTypes.any
  }

  render() {
    const { last, dot, desc, children, className } = this.props
    const classes = classNames({
      'timeline-item': true,
      last
    }, className)
    return (
      <li className={classes}>
        <div className="timeline-item-tail" />
        <div
          className="timeline-item-dot"
        >
          {dot}
        </div>
        {
          desc
            ? <div className="timeline-item-dot-desc">
              {desc}
            </div>
            : null
        }
        <div className="timeline-item-content">
          {children}
        </div>
      </li>
    )
  }
}
