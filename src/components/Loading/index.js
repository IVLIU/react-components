import React from 'react'
import PropTypes from 'prop-types'
import Circle from './Loading'
import Bar from './LoadingBar'
import Box from './LoadingBox'

export default function Loading (props) {
  const { type = 'default', ...others } = props

  switch (type) {
    case 'bar':
      return <Bar {...others} />
    case 'box':
      return <Box {...others} />
    default:
      return <Circle {...others}/>
  }
}
Loading.propTypes = {
  type: PropTypes.string
}
