/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2017-12-04 19:40:52
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2017-12-15 15:05:13
 */
import React, { Component } from 'react'
import { Creatable } from 'react-select'
import MultiSelectValue from './MultiSelectValue'
import 'react-select/dist/react-select.css'
import PropTypes from 'prop-types'
import delIcon from '@/images/svg/del_icon.svg'
import classNames from 'classnames'

export default class MultiINput extends Component {
  constructor () {
    super()
    this.state = {
      value: []
    }
  }
  componentWillMount () {
    const { defaultValue = [] } = this.props
    const options = defaultValue.length
      ? defaultValue.map(item => {
        return {
          value: item,
          label: item
        }
      })
      : []
    if (defaultValue.length) {
      this.setState({
        value: options
      })
    }
  }
  showPromptTxt (label) {
    return '"' + label + '"   逗号或回车结束'
  }
  handleChange (value) {
    const { onChange, disabled } = this.props
    if (disabled) {
      return
    }
    this.setState({
      value
    })
    onChange && onChange(value.map(item => item.value))
  }
  render () {
    const { placeholder, hasError, className, disabled } = this.props
    const { value } = this.state
    const classes = classNames('select', 'no-arrow', {
      error: hasError
    }, className)
    return (
      <Creatable
        className={classes}
        placeholder={placeholder}
        multi
        disabled={disabled}
        value={value}
        clearRenderer={() => <svg className="del-icon"><use xlinkHref={delIcon} /></svg>}
        arrowRenderer={() => null}
        valueComponent={d => <MultiSelectValue {...d} />}
        promptTextCreator={this.showPromptTxt}
        noResultsText=""
        onChange={this.handleChange.bind(this)}
      />
    )
  }
}
MultiINput.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  defaultValue: PropTypes.array,
  placeholder: PropTypes.string,
  hasError: PropTypes.bool
}
