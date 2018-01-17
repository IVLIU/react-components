import React, { Component } from 'react'
import PropTypes from 'prop-types'
import pureRender from 'pure-render-decorator'
import DropDown from '../Dropdown'
import classNames from 'classnames'
import autobind from 'autobind-decorator'

/**
 * 在Dropdown组件上封装的list组件
 */
@pureRender
export default class DropdownList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      curValue: props.children
    }
  }
  @autobind
  handleChange (item) {
    const { onChange, changeValue } = this.props
    onChange && onChange(item.value)
    if (changeValue) {
      this.setState({
        curValue: item.label
      })
    }
  }
  renderOverlayList () {
    const { listItems } = this.props
    return (
      <ul className="dropdown-list-content">
        {
          listItems.map(item => {
            return (
              <li className="dropdown-list-item" onClick={() => this.handleChange(item)}>{item.label}</li>
            )
          })
        }
      </ul>
    )
  }

  render () {
    const { trigger, listItems, className, changeValue, ...others } = this.props
    const { curValue } = this.state
    const classes = classNames('dropdown-list', className)
    return (
      <DropDown
        trigger={trigger}
        className={classes}
        overlay={this.renderOverlayList()}
        {...others}>
        <div className="dropdown-tirgger-item">
          {curValue}
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
  changeValue: PropTypes.bool
}
