import React from 'react'
import PropTypes from 'prop-types'
import delIconCavity from '@/images/svg/del_icon_cavity.svg'
// import { Value } from '../../../build/dll/dll'
// import autobind from 'autobind-decorator'

export default class MultiSelectValue extends React.Component {
  render() {
    const { value, onRemove } = this.props
    const delIconStyle = {
      width: '14px',
      height: '14px',
      marginLeft: '5px',
      marginTop: '3px',
      fill: '#2d84e5'
    }
    return (
      <div className="multi-select-value">
        <span>{value.label || value.value}</span>
        <span onClick={() => onRemove(value)} style={{ cursor: 'pointer' }}>
          <svg style={delIconStyle}>
            <use xlinkHref={delIconCavity} />
          </svg>
        </span>
      </div>
    )
  }
}
MultiSelectValue.displayName = 'MultiSelectValue'
MultiSelectValue.propTypes = {
  value: PropTypes.object,
  onRemove: PropTypes.func
}
