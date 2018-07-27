import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Checkbox from '../Checkbox'
import DropDown from '../Dropdown'
import Button from '../Button'
import ControledInput from '../Common/ControledInput'

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

@ControledInput(
  v => v,
  v => v
)
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
  handleEnsure = (close) => {
    const { onChange, value } = this.props.props
    onChange && onChange(value)
    close()
  }
  renderOverlay () {
    const { options, title, props } = this.props
    const { onChange, value } = props
    return <Overlay options={options}
      title={title}
      defaultValue={value}
      onEnsure={this.handleEnsure}
      onChange={onChange}/>
  }
  render () {
    const { title, className, options, props, defaultOpen } = this.props
    const { value } = props
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
