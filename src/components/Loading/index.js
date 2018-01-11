import React from 'react'
import PropTypes from 'prop-types'
import Circle from './Loading'
import Bar from './LoadingBar'

export default function Loading (props) {
  const { type = 'default', ...others } = props

  switch (type) {
    case 'bar':
      return <Bar {...others} />
    default:
      return <Circle {...others}/>
  }
}
Loading.propTypes = {
  type: PropTypes.string
}
