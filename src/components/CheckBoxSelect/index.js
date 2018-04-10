import React, { Component } from 'react'
import PropTypes from 'prop-types'
import pureRender from 'pure-render-decorator'
import autobind from 'autobind-decorator'
import classNames from 'classnames'

import Checkbox from '../Checkbox'
import DropDown from '../Dropdown'
import Button from '../Button'

const { CheckboxGroup } = Checkbox

const Overlay = ({options, title, onChange, close, onEnsure, defaultValue}) => (
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

@pureRender
export default class CheckboxSelect extends Component {
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
    value: []
  }
  componentWillMount () {
    const { defaultValue } = this.props
    defaultValue && this.setState({
      value: defaultValue
    })
  }
  componentWillReceiveProps = (nextProps) => {
    const { defaultValue } = this.props
    if (nextProps.defaultValue !== defaultValue) {
      nextProps.defaultValue && this.setState({
        value: nextProps.defaultValue
      })
    }
  }
  @autobind
  handleSelectChange (value) {
    this.setState({
      value
    })
  }
  @autobind
  handleEnsure (close) {
    const { onChange } = this.props
    onChange && onChange(this.state.value)
    close()
  }

  renderOverlay () {
    const { options, title } = this.props
    return <Overlay options={options}
      title={title}
      defaultValue={this.state.value}
      onEnsure={this.handleEnsure}
      onChange={this.handleSelectChange}/>
  }

  render () {
    const { title, className, options } = this.props
    const { value } = this.state
    const valueStr = options
      .filter(item => value.indexOf(item.value) > -1)
      .map(item => item.label)
      .join(',')
    const classes = classNames('checkbox-select-wrap', className)
    return (
      <div className={classes}>
        <DropDown overlay={this.renderOverlay()}>
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
