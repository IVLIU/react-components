import React, { Component } from 'react'
import PropTypes from 'prop-types'
import pureRender from 'pure-render-decorator'
import DropDown from '../Dropdown'
import classNames from 'classnames'
import autobind from 'autobind-decorator'

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
@pureRender
export default class DropdownList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      curValue: props.children
    }
  }

  componentWillMount () {
    this.setDefaultValue(this.props)
  }

  componentWillReceiveProps (nextProps) {
    const { defaultValue } = nextProps

    if (defaultValue !== this.props.defaultValue) {
      this.setDefaultValue(nextProps)
    }
  }

  setDefaultValue (props) {
    const { defaultValue, listItems } = props

    if (defaultValue || defaultValue === 0 || defaultValue === false) {
      const curValue = listItems.find(item => item.value === defaultValue)
      curValue && this.setState({
        curValue: curValue.label
      })
    }
  }

  @autobind
  handleChange (item, close) {
    const { onChange, changeValue } = this.props
    onChange && onChange(item.value)
    if (changeValue) {
      this.setState({
        curValue: item.label
      })
    }
    close()
  }
  renderOverlayList () {
    const { listItems, defaultValue } = this.props
    return <Overlay listItems={listItems} handleChange={this.handleChange} defaultValue={defaultValue}/>
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
  changeValue: PropTypes.bool,
  /** 默认值 */
  defaultValue: PropTypes.any
}
