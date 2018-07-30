import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import DropDown from '../Dropdown'
import classNames from 'classnames'
import ControllInput from '../Common/ControledInput'
import { find } from 'lodash'

const Overlay = ({ close, listItems, handleChange, defaultValue }) => {
  return <ul className="dropdown-list-content">
    {
      listItems.map((item, index) => {
        if (item.value !== defaultValue) {
          return (
            <li className="dropdown-list-item"
              key={index}
              onClick={() => handleChange(item, close)}>
              {item.label}
            </li>
          )
        }
      })
    }
  </ul>
}
/**
 * 在Dropdown组件上封装的list组件
 */
@ControllInput(
  (defaultValue, props) => {
    const { listItems } = props
    const item = find(listItems, { value: defaultValue })
    return item ? item.value : ''
  },
  value => value
)
export default class DropdownList extends PureComponent {
  handleChange = (item, close) => {
    const { props } = this.props
    props.onChange && props.onChange(item.value)
    close()
  }
  renderOverlayList () {
    const { listItems, defaultValue } = this.props
    return <Overlay listItems={listItems} handleChange={this.handleChange} defaultValue={defaultValue}/>
  }

  render () {
    const { trigger, listItems, className, props, children, changeValue, ...others } = this.props
    const { value } = props
    const item = find(listItems, item => item.value === value)
    const label = changeValue
      ? item ? item.label : children
      : children
    const classes = classNames('dropdown-list', className)
    return (
      <DropDown
        trigger={trigger}
        className={classes}
        overlay={this.renderOverlayList()}
        {...others}>
        <div className="dropdown-tirgger-item">
          {label}
        </div>
      </DropDown>
    )
  }
}
DropdownList.propTypes = {
  /** 触发展示的方式 */
  trigger: PropTypes.oneOf(['click', 'hover']),
  /** 列表内容 */
  listItems: PropTypes.array,
  /** 点击内容的回调事件 */
  onChange: PropTypes.func,
  /** 值改变时，是否点击按钮的内容 */
  changeValue: PropTypes.bool,
  /** 默认值 */
  defaultValue: PropTypes.any
}
