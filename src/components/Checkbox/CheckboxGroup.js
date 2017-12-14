import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

let id = 0
export default class CheckBoxGroup extends Component {
  componentWillMount () {
    const { name } = this.props
    this.name = name || `checkbox-group-name-${++id}`
    this.children = []
  }
  onMounted (child) {
    this.children.push(child)
  }
  handleChange (e, val, con) {
    const { onChange } = this.props
    const { children } = this
    const ret = children
      ? children.filter(child => child.checked).map(child => {
        return child.props.value
      })
      : []
    onChange && onChange(ret)
  }
  renderChildren () {
    const { children, defaultValue } = this.props
    return children
      ? children.map((child, index) => {
        return React.cloneElement(child, {
          onChange: this.handleChange.bind(this),
          defaultChecked: defaultValue.indexOf(child.props.value) >= 0,
          name: this.name,
          key: index,
          onChildCheckBoxMounted: this.onMounted.bind(this)
        })
      })
      : ''
  }
  render () {
    const { className } = this.props
    const classes = classNames('checkbox-group', {
      ...className
    })
    return (
      <div className={classes}>
        {
          this.renderChildren()
        }
      </div>
    )
  }
}
CheckBoxGroup.propTypes = {
  defaultValue: PropTypes.any,
  children: PropTypes.any
}
