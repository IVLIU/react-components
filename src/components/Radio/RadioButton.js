import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import controledInput from '../Common/ControledInput'
import _ from 'lodash'

const mapDefaultToValue = (defaultValue, { options = [] }) => {
  if (defaultValue === undefined) {
    return options[0] ? options[0].value : defaultValue
  }
  return defaultValue
}
const mapValuetoValue = item => item.value

@controledInput(mapDefaultToValue, mapValuetoValue)
export default class RadioButton extends Component {
  render () {
    const {
      className,
      props: controled,
      disabled,
      options,
      style
    } = this.props
    const classes = classNames('radio-btn', disabled, className)
    const { value, onChange } = controled
    return (
      <div className={classes} style={style}>
        {_.map(options, item => {
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
RadioButton.propTypes = {
  /** 选项列表，遵循各选项格式 包含label,value字段 */
  options: PropTypes.array,
  /** 默认值 */
  defaultValue: PropTypes.any,
  /** change回调 */
  onChange: PropTypes.func
}
