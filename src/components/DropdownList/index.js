import React, { Component } from 'react'
import PropTypes from 'prop-types'
import pureRender from 'pure-render-decorator'
import DropDown from '../Dropdown'
import classNames from 'classnames'
import autobind from 'autobind-decorator'

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
    const { triggerItem, trigger, listItems, className, ...others } = this.props
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
  triggerItem: PropTypes.any,
  listItems: PropTypes.array,
  onChange: PropTypes.func,
  changeValue: PropTypes.bool
}
