import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import autobind from 'autobind-decorator'
import Label from '../Label'

/**
 * 标签选择控件
 */
export default class LabelSelect extends Component {
  constructor (props) {
    super(props)
    const { defaultValue, multi, options } = props
    this.state = {
      value: defaultValue || multi ? [] : options[0].value
    }
  }
  componentWillReceiveProps (nextProps) {
    const { defaultValue, value } = nextProps
    const { defaultValue: curDefault } = this.props
    if (curDefault !== defaultValue) {
      this.setState({
        value: defaultValue
      })
      return
    }
    if (value !== undefined) {
      this.setState({
        value
      })
    }
  }
  isAllSelected (value) {
    const { options } = this.props
    return value.length === options.length
  }
  @autobind
  selectAll () {
    const { onChange } = this.props
    if (!this.props.multi) return
    this.setState({
      value: []
    })
    onChange && onChange([])
  }
  handleSelectChange (item) {
    const { multi, onChange } = this.props
    const { value } = this.state
    let ret = item.value

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
    this.setState({
      value: ret
    })
    // 全部选中， 和都没选是一样的
    if (this.isAllSelected(value)) {
      ret = []
    }
    onChange && onChange(ret)
  }
  render () {
    const { className, options, multi, showAll, locale, ...others } = this.props
    const classes = classNames('label-select', className)
    const { value } = this.state
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
  multi: true,
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
