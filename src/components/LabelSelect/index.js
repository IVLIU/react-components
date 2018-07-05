import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import autobind from 'autobind-decorator'
import Label from '../Label'
import { controledInputDecorator } from '../Common/ControledInput'

const mapDefaultToValue = (v, { options, multi }) => {
  return v || (multi ? [] : options[0] ? '' : options[0].value)
}
const mapValueToValue = v => v
/**
 * 标签选择控件
 */
@controledInputDecorator(mapDefaultToValue, mapValueToValue)
export default class LabelSelect extends Component {
  isAllSelected (value) {
    const { options } = this.props
    return value.length === options.length
  }
  @autobind
  selectAll () {
    const { multi, props, disabled } = this.props
    if (!multi || disabled) return
    props.onChange([])
  }
  handleSelectChange (item) {
    const { multi, props, disabled } = this.props
    const { value, onChange } = props
    let ret = item.value
    if (disabled) return

    if (multi) {
      const index = value.indexOf(ret)
      const hasValue = index >= 0
      if (hasValue) {
        value.splice(index, 1)
      } else {
        value.push(ret)
      }
      ret = value
    } else {
      if (ret === value) {
        return
      }
    }
    // 全部选中， 和都没选是一样的
    if (this.isAllSelected(value)) {
      ret = []
    }
    onChange && onChange(ret)
  }
  render () {
    const { className, disabled, options, props, multi, showAll, locale, ...others } = this.props
    const classes = classNames({
      'label-select': true,
      disabled
    }, className)
    const { value } = props
    const isAllActive = multi && !value.length
    return (
      <div className={classes} {...others}>
        {
          showAll && multi
            ? <Label className="label-select-item"
              onClick={this.selectAll}
              key="all"
              type={isAllActive ? 'info' : ''}>
              {locale === 'zh_CN' ? '全部' : 'All'}
            </Label>
            : ''
        }
        {
          options.map(item => {
            const active = multi
              ? value.indexOf(item.value) >= 0
              : value === item.value
            const type = active ? 'info' : ''
            return <Label
              key={item.value}
              type={type}
              closable={active && multi}
              onClick={() => this.handleSelectChange(item)}
              className="label-select-item">
              {item.label}
            </Label>
          })
        }
      </div>
    )
  }
}
LabelSelect.defaultProps = {
  showAll: true,
  multi: false,
  locale: 'zh_CN'
}
LabelSelect.propTypes = {
  /** 值改变时的回调 */
  onChange: PropTypes.func,
  /** 选项列表, 遵循各种选项的格式 { value, label } */
  options: PropTypes.array,
  /** 是否多选 */
  multi: PropTypes.bool,
  /** 是否自动展示 “全部” 标签 */
  showAll: PropTypes.bool,
  /** 国际化 */
  locale: PropTypes.string
}
