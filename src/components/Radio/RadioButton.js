import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import classNames from 'classnames'
import controledInput from '../Common/ControledInput'

class RangeBtn extends Component {
  render () {
    const { className, props: controled, options, ...others } = this.props
    const classes = classNames('radio-btn', className)
    const { value, onChange } = this.props.props
    return (
      <div className={classes} {...others}>
        {
          options.map(item => {
            const itemClasses = classNames('radio-btn-item', {
              active: item.value === value
            })
            return (
              <span key={`radio-btn-${item.value}`}
                className={itemClasses}
                onClick={() => onChange(item)}>
                {item.label}
              </span>
            )
          })
        }
      </div>
    )
  }
}
RangeBtn.propTypes = {

}

const mapDefaultToValue = (defaultValue, {options = []}) => {
  if (defaultValue === undefined) {
    return options[0] ? options[0].value : defaultValue
  }
  return defaultValue
}
const mapValuetoValue = item => item.value

export default controledInput(RangeBtn, mapDefaultToValue, mapValuetoValue)
