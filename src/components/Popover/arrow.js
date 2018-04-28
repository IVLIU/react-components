import React, { Component } from 'react'
import { POSITION } from './constant'

const getArrowAngle = (position) => {
  switch (position) {
    case POSITION.TOP:
      return -90
    case POSITION.LEFT:
      return 180
    case POSITION.BOTTOM:
      return 90
    default:
      return 0
  }
}
export default class Arrow extends Component {
  render () {
    const { position } = this.props
    return (
      <span className={`popover-arrow popover-arrow-${position}`}>
        <svg viewBox="0 0 30 30" style={{ transform: `rotate(${getArrowAngle(position)}deg)` }}>
          <path className="popover-arrow-border" d="M8.11 6.302c1.015-.936 1.887-2.922 1.887-4.297v26c0-1.378-.868-3.357-1.888-4.297L.925 17.09c-1.237-1.14-1.233-3.034 0-4.17L8.11 6.302z"></path>
          <path className="popover-arrow-fill" d="M8.787 7.036c1.22-1.125 2.21-3.376 2.21-5.03V0v30-2.005c0-1.654-.983-3.9-2.21-5.03l-7.183-6.616c-.81-.746-.802-1.96 0-2.7l7.183-6.614z"></path>
        </svg>
      </span>
    )
  }
}
