import React, { Component } from 'react'
import PropTypes from 'prop-types'

let count = 0
export default class Radio extends Component {
  componentWillMount () {
    this.id = `radio-label-id-${++count}`
  }
  handleChange (e) {
    const { onChange, value } = this.props
    onChange && onChange(e, value)
  }
  render () {
    const { label, defaultChecked, name, value } = this.props
    return (
      <label htmlFor={this.id} className="radio-label">
        <input
          className="radio"
          type="radio"
          id={this.id}
          defaultChecked={defaultChecked}
          name={name}
          value={value}
          onChange={this.handleChange.bind(this)} />
        {label}
      </label>
    )
  }
}
Radio.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func
}
