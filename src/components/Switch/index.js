import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { controledInputDecorator } from '../Common/ControledInput'

const defaultMap = [{
  label: '关闭',
  value: false
}, {
  label: '开启',
  value: true
}]

@controledInputDecorator(
  v => v,
  v => v
)
export default class Switch extends PureComponent {
  static propTypes = {
    /** 开关对应的Item和值 */
    itemMap: PropTypes.obj
  }
  render () {
    const { props, itemMap = defaultMap, className, disabled } = this.props
    const { value = true, onChange } = props
    const classes = classNames('switch', className, {
      active: value,
      disabled
    })
    return (
      <div className={classes}>
        {
          itemMap.map(item => {
            const itemClasses = classNames('switch-item', {
              active: item.value === value
            })
            return <span key={item.label}
              onClick={() => !disabled && onChange(item.value)}
              className={itemClasses}>
              {item.label}
            </span>
          })
        }
      </div>
    )
  }
}
