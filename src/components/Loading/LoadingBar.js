import React from 'react'
import PropTypes from 'prop-types'

export default function LoadingBar (props) {
  const { className, ...others } = props
  return (
    <div className={`loading-bar ${className}`} {...others}>
      <div className='loading-bar-background' />
      <div className='loading-bar-foreground' />
    </div>
  )
}

LoadingBar.propTypes = {
  className: PropTypes.string
}
