import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Checkbox from '../Checkbox'
import DropDown from '../Dropdown'
import Icon from '../Icon'
import closeIcon from '@/images/svg/close.svg'
import Button from '../Button'
import Input from '../Input'

const { CheckboxGroup } = Checkbox

const Overlay = (props) => {
  const {options, title, onChange, close, onEnsure, defaultValue, withSearch, searchTxt, onSearch} = props
  return (
    <div className="checkbox-select-content">
      <h3 className="checkbox-select-content-title">{title}</h3>
      {
        withSearch
          ? <Input onChange={(val) => onSearch(val)} className="checkbox-select-search-input"/>
          : ''
      }
      <CheckboxGroup className="checkbox-select-content-checkbox"
        defaultValue={defaultValue}
        onChange={onChange}>
        {
          (withSearch && searchTxt.trim() !== '')
            ? options.filter((item) => item.label.includes(searchTxt)).map(item => <Checkbox label={item.label} value={item.value} />)
            : options.map(item => <Checkbox label={item.label} value={item.value} />)
        }
      </CheckboxGroup>
      <div className="checkbox-select-button-wrap">
        <Button type="link" className="left" onClick={() => onChange([])}>清除</Button>
        <Button type="link" onClick={close}>关闭</Button>
        <Button type="secondary" onClick={() => onEnsure(close)}>确定</Button>
      </div>
    </div>
  )
}
export default class CheckboxSelect extends PureComponent {
  static propTypes = {
    /** 选项列表，包含label, value字段 */
    options: PropTypes.array,
    /** 标题 */
    title: PropTypes.string,
    /** 默认值 */
    defaultValue: PropTypes.array,
    /** 回调事件 */
    onChange: PropTypes.func,
    /** 支持搜索 */
    withSearch: PropTypes.boolean,
    /** 删除回调 */
    onDelete: PropTypes.oneOfType([null, PropTypes.func])
  }
  static defaultProps = {
    withSearch: false,
    onDelete: null
  }
  state = {
    value: '',
    searchTxt: ''
  }
  componentWillMount = () => {
    const { defaultValue } = this.props
    if (defaultValue !== undefined) {
      this.setState({
        value: defaultValue
      })
    }
  }
  componentWillReceiveProps = (nextProps) => {
    const { defaultValue: nextDefault } = nextProps
    const { defaultValue } = this.props
    if (JSON.stringify(defaultValue) !== JSON.stringify(nextDefault)) {
      this.setState({
        value: nextDefault
      })
    }
  }
  handleEnsure = (close) => {
    const { onChange } = this.props
    const { value } = this.state
    onChange && onChange(value)
    close()
  }
  handleSearch = (val) => {
    this.setState({
      searchTxt: val
    })
  }
  handleChange = value => {
    this.setState({
      value
    })
  }
  handleDelete = (evt) => {
    evt.stopPropagation()
    this.props.onDelete()
  }
  renderOverlay () {
    const { options, title, withSearch } = this.props
    const { value, searchTxt } = this.state
    return <Overlay options={options}
      title={title}
      defaultValue={value}
      withSearch={withSearch}
      searchTxt={searchTxt}
      onSearch={this.handleSearch}
      onEnsure={this.handleEnsure}
      onChange={this.handleChange}/>
  }
  render () {
    const { title, className, options, defaultOpen, onDelete } = this.props
    const { value } = this.state
    const valueStr = options
      .filter(item => value.includes(item.value))
      .map(item => item.label)
      .join(',')
    const classes = classNames('checkbox-select-wrap', (onDelete ? className + ' can-delete' : className))
    return (
      <div className={classes}>
        <DropDown overlay={this.renderOverlay()} defaultOpen={defaultOpen}>
          <div className="checkbox-select-result">
            <span className="checkbox-select-result-label">{title}</span>
            <p className="checkbox-select-result-value" title={valueStr}>
              {valueStr}
            </p>
            { onDelete
              ? <Icon className="close-icon" link={closeIcon} onClick={this.handleDelete}/>
              : ''
            }
          </div>
        </DropDown>
      </div>
    )
  }
}
