import React, { Component } from 'react'
import PropTypes from 'prop-types'

let count = 0
export default class Checkbox extends Component {
  componentWillMount () {
    this.id = `checkbox-label-id-${++count}`
    this.checked = this.props.defaultChecked
  }
  componentDidMount () {
    const { onChildCheckBoxMounted } = this.props
    onChildCheckBoxMounted && onChildCheckBoxMounted(this)
  }
  handleChange (e) {
    const { onChange, value } = this.props
    this.checked = e.target.checked
    onChange && onChange(e, value, this)
  }
  render () {
    const { label, defaultChecked, name, value } = this.props
    return (
      <label htmlFor={this.id} className="checkbox-label">
        <input
          className="checkbox"
          type="checkbox"
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
Checkbox.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func
}
