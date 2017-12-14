import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

let id = 0
export default class RadioGroup extends Component {
  componentWillMount () {
    const { name } = this.props
    this.name = name || `radio-group-name-${++id}`
  }
  handleChange (e, value) {
    const { onChange } = this.props
    onChange && onChange(value)
  }
  render () {
    const { defaultValue, children, className } = this.props
    const classes = classNames('adio-group', {
      ...className
    })
    return (
      <div className={classes}>
        {
          children
            ? children.map((child, index) => {
              return React.cloneElement(child, {
                onChange: this.handleChange.bind(this),
                defaultChecked: defaultValue === child.props.value,
                name: this.name,
                key: index
              })
            })
            : ''
        }
      </div>
    )
  }
}
RadioGroup.propTypes = {
  defaultValue: PropTypes.any,
  children: PropTypes.any
}
