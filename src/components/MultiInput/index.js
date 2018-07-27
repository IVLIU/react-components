/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2017-12-04 19:40:52
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2018-07-26 19:56:18
 */
import React, { Component } from 'react'
import { Creatable } from 'react-select'
import MultiSelectValue from './MultiSelectValue'
import 'react-select/dist/react-select.css'
import PropTypes from 'prop-types'
import delIcon from '@/images/svg/del_icon.svg'
import classNames from 'classnames'
import ControledInput from '../Common/ControledInput'

@ControledInput(
  (defaultValue = []) => defaultValue,
  value => value.map(item => item.value)
)
export default class MultiInput extends Component {
  showPromptTxt(label) {
    return '"' + label + '"   逗号或回车结束'
  }
  handleChange = (value) => {
    const { props, disabled } = this.props
    if (disabled) {
      return
    }
    this.setState({
      value
    })
    props.onChange(value)
  }
  render() {
    const { placeholder, props, hasError, className, disabled } = this.props
    const { value } = props
    const classes = classNames('select', 'no-arrow', {
      error: hasError
    }, className)
    return (
      <Creatable
        className={classes}
        placeholder={placeholder}
        multi
        disabled={disabled}
        value={value.map(item => ({
          value: item,
          label: item
        }))}
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
