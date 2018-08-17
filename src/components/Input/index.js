import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Base from './Input'
import TextArea from './Textarea'
import TextAreaWithMax from './TextareaWithMax'

export default class Input extends Component {
  static propTypes = {
    /** 输入内容改变时的回调 */
    onChange: PropTypes.func,
    /** 默认值 */
    defaultValue: PropTypes.string,
    /** 是否显示搜索图标 */
    isSearch: PropTypes.bool,
    /** 主动修改组件值时候的值， @see controled input */
    value: PropTypes.string,
    /** 类型 */
    type: PropTypes.oneOf(['text', 'textarea']),
    /** 是否Error, 自带error样式 */
    hasError: PropTypes.bool,
    /** 当type为textarea时，设置max,则会显示当前输入的字数 */
    max: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])
  }
  static defaultProps = {
    type: 'text',
    isSearch: false
  }

  render() {
    const { type, max } = this.props
    const Comp = type === 'textarea'
      ? max ? TextAreaWithMax : TextArea
      : Base
    return <Comp {...this.props}/>
  }
}
