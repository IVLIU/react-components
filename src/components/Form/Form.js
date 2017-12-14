import React, { Component } from 'react'
import PropTypes from 'prop-types'
import event from '../../lib/eventProxy'

export default class Form extends Component {
  constructor () {
    super()
    this.dataMap = {}
  }
  componentWillMount () {
    const { data } = this.props
    Object.keys(data).forEach(key => {
      this.dataMap[key] = {
        value: data[key].value,
        isOk: true
      }
    })

    event.on('form-field-change', ({key, config, context}) => {
      this.dataMap[key] = {
        value: config.value,
        isOk: config.isOk,
        context
      }
    })
  }
  validateAndSubmit () {
    const hasFalse = Object.keys(this.dataMap).some(key => {
      const item = this.dataMap[key]

      if (!item.isOk) {
        item.context.setState({
          hasError: true
        })
      }
      return !item.isOk
    })
    if (hasFalse) {
      return false
    }

    let ret = {}
    Object.keys(this.dataMap).forEach(key => {
      ret[key] = this.dataMap[key].value
    })
    return ret
  }
  render () {
    const { children } = this.props
    return (
      <div>
        {children}
      </div>
    )
  }
}
Form.propTypes = {
  handleSubmit: PropTypes.func,
  children: PropTypes.any,
  data: PropTypes.object
}
