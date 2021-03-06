import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Input from '../Input'
import DropDown from '../Dropdown'
import Button from '../Button'

import Icon from '../Icon'
import closeIcon from '@/images/svg/close.svg'

const Overlay = ({title, onChange, close, onEnsure, defaultValue}) => (
  <div className="checkbox-select-content">
    <h3 className="checkbox-select-content-title">{title}</h3>
    <Input defaultValue={defaultValue}
      onChange={onChange}/>
    <div className="checkbox-select-button-wrap">
      <Button type="link" onClick={close}>关闭</Button>
      <Button type="secondary" onClick={() => onEnsure(close)}>确定</Button>
    </div>
  </div>
)

export default class DropdownInput extends PureComponent {
  static propTypes = {
    /** 标题 */
    title: PropTypes.string,
    /** 默认值 */
    defaultValue: PropTypes.array,
    /** 删除回调 */
    onDelete: PropTypes.oneOfType([null, PropTypes.func])
  }
  state = {
    value: '',
    resultValue: ''
  }
  componentWillMount () {
    const { defaultValue } = this.props
    defaultValue && this.setState({
      value: defaultValue,
      resultValue: defaultValue
    })
  }
  componentWillReceiveProps = (nextProps) => {
    const { defaultValue } = this.props
    if (nextProps.defaultValue !== defaultValue) {
      nextProps.defaultValue && this.setState({
        value: nextProps.defaultValue,
        resultValue: nextProps.defaultValue
      })
    }
  }
  handleSelectChange = (value) => {
    this.setState({
      value
    })
  }
  handleDelete = (evt) => {
    evt.stopPropagation()
    this.props.onDelete()
  }
  handleEnsure = (close) => {
    const { onChange } = this.props
    onChange && onChange(this.state.value)
    this.setState({
      resultValue: this.state.value
    })
    close()
  }

  renderOverlay () {
    const { title } = this.props
    return <Overlay
      title={title}
      defaultValue={this.state.value}
      onEnsure={this.handleEnsure}
      onChange={this.handleSelectChange}/>
  }

  render () {
    const { title, className, defaultOpen, onDelete, style } = this.props
    const { resultValue } = this.state
    const classes = classNames('checkbox-select-wrap', (onDelete ? className + ' can-delete' : className))
    return (
      <div className={classes} style={style}>
        <DropDown overlay={this.renderOverlay()} defaultOpen={defaultOpen}>
          <div className="checkbox-select-result">
            <span className="checkbox-select-result-label">{title}</span>
            <p className="checkbox-select-result-value" title={resultValue}>
              {resultValue}
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
