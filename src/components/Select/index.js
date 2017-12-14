import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import RSelect from 'react-select'
import MultiSelectValue from '../MultiInput/MultiSelectValue'
import delIcon from '@/images/svg/del_icon.svg'

export default class Select extends Component {
  constructor (props) {
    super(props)
    const { multi } = props
    this.state = {
      value: multi ? [] : ''
    }
  }
  componentWillMount () {
    const { defaultValue, options } = this.props

    if (!defaultValue && defaultValue !== 0) {
      return
    }

    if (Array.isArray(defaultValue)) {
      const ret = options.filter(item => defaultValue.indexOf(item.value) >= 0)
      this.setState({
        value: ret
      })
    } else {
      const ret = options.filter(item => item.value === defaultValue)
      this.setState({
        value: ret[0]
      })
    }
  }
  handleChange (value) {
    const { onChange, disabled } = this.props
    if (disabled) {
      return
    }
    this.setState({
      value
    })
    onChange && onChange(value)
  }

  render () {
    const { options, className, hasError, multi, disabled } = this.props
    const classes = classNames('select', {
      error: hasError,
      ...className
    })
    const config = {
      multi,
      disabled,
      valueComponent: d => <MultiSelectValue {...d} />
    }

    if (!multi) {
      delete config.valueComponent
    }
    return (
      <RSelect
        className={classes}
        value={this.state.value}
        options={options}
        {...config}
        clearRenderer={() => <svg className="del-icon"><use xlinkHref={delIcon} /></svg>}
        arrowRenderer={({ isOpen }) => <span className={`drop-down-icon ${isOpen ? 'up' : ''}`}></span>}
        onChange={this.handleChange.bind(this)}/>
    )
  }
}
Select.propTypes = {
  multi: PropTypes.bool,
  options: PropTypes.array
}
