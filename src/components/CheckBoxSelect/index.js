import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Checkbox from '../Checkbox'
import DropDown from '../Dropdown'
import Button from '../Button'

const { CheckboxGroup } = Checkbox

const Overlay = (props) => {
  const {options, title, onChange, close, onEnsure, defaultValue} = props
  return (
    <div className="checkbox-select-content">
      <h3 className="checkbox-select-content-title">{title}</h3>
      <CheckboxGroup className="checkbox-select-content-checkbox"
        defaultValue={defaultValue}
        onChange={onChange}>
        {
          options.map(item => <Checkbox label={item.label} value={item.value} />)
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
    onChange: PropTypes.func
  }
  state = {
    value: ''
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
  handleChange = value => {
    this.setState({
      value
    })
  }
  renderOverlay () {
    const { options, title } = this.props
    const { value } = this.state
    return <Overlay options={options}
      title={title}
      defaultValue={value}
      onEnsure={this.handleEnsure}
      onChange={this.handleChange}/>
  }
  render () {
    const { title, className, options, defaultOpen } = this.props
    const { value } = this.state
    const valueStr = options
      .filter(item => value.includes(item.value))
      .map(item => item.label)
      .join(',')
    const classes = classNames('checkbox-select-wrap', className)
    return (
      <div className={classes}>
        <DropDown overlay={this.renderOverlay()} defaultOpen={defaultOpen}>
          <div className="checkbox-select-result">
            <span className="checkbox-select-result-label">{title}</span>
            <p className="checkbox-select-result-value" title={valueStr}>
              {valueStr}
            </p>
          </div>
        </DropDown>
      </div>
    )
  }
}
