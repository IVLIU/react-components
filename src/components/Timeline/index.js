import React, { PureComponent, Children } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Item from './Item'

class Timeline extends PureComponent {
  static propTypes = {
    /** 是否包含描述 */
    hasDesc: PropTypes.bool
  }

  render() {
    const { children, hasDesc, className, style } = this.props
    const classes = classNames({
      'timeline': true,
      'has-desc': hasDesc
    }, className)
    const items = Children.map(children, (ele, idx) =>
      React.cloneElement(ele, {
        last: idx === (Children.count(children) - 1)
      })
    )
    return (
      <ul className={classes} style={style}>
        {items}
      </ul>
    )
  }
}

Timeline.Item = Item

export default Timeline
