/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2017-12-04 19:40:52
 * @Last Modified by: zsj
 * @Last Modified time: 2018-07-25 10:18:59
 */
import React, { Component } from 'react'
import { Creatable } from 'react-select'
import MultiSelectValue from './MultiSelectValue'
import 'react-select/dist/react-select.css'
import PropTypes from 'prop-types'
import delIcon from '@/images/svg/del_icon.svg'
import classNames from 'classnames'
import autobind from 'autobind-decorator'

export default class MultiInput extends Component {
  constructor() {
    super()
    this.state = {
      value: []
    }
  }
  componentWillMount() {
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
  showPromptTxt(label) {
    return '"' + label + '"   逗号或回车结束'
  }
  @autobind
  handleChange(value) {
    const { onChange, disabled } = this.props
    if (disabled) {
      return
    }
    this.setState({
      value
    })
    onChange && onChange(value.map(item => item.value))
  }
  render() {
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
        onChange={this.handleChange}
      />
    )
  }
}
MultiInput.displayName = 'MultiInput'
MultiInput.propTypes = {
  /** 输入内容改变时的回调 */
  onChange: PropTypes.func,
  /** 默认值 */
  defaultValue: PropTypes.any,
  /** 是否Error, 自带error样式 */
  hasError: PropTypes.bool,
  /** placeholder */
  placeholder: PropTypes.string
}
