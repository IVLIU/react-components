import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import controledInput from '../Common/ControledInput'

class RangeBtn extends Component {
  render () {
    const {
      className,
      props: controled,
      disabled,
      options,
      ...others
    } = this.props
    const classes = classNames('radio-btn', disabled, className)
    const { value, onChange } = this.props.props
    return (
      <div className={classes} {...others}>
        {options.map(item => {
          const itemClasses = classNames('radio-btn-item', {
            active: item.value === value
          })
          return (
            <span
              key={`radio-btn-${item.value}`}
              className={itemClasses}
              onClick={() => !disabled && onChange(item)}
            >
              {item.label}
            </span>
          )
        })}
      </div>
    )
  }
}
RangeBtn.propTypes = {
  /** 选项列表，遵循各选项格式 包含label,value字段 */
  options: PropTypes.array,
  /** 默认值 */
  defaultValue: PropTypes.any,
  /** change回调 */
  onChange: PropTypes.func
}

const mapDefaultToValue = (defaultValue, { options = [] }) => {
  if (defaultValue === undefined) {
    return options[0] ? options[0].value : defaultValue
  }
  return defaultValue
}
const mapValuetoValue = item => item.value

export default controledInput(RangeBtn, mapDefaultToValue, mapValuetoValue)
