import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import autobind from 'autobind-decorator'

import Input from '../Input'
import Button from '../Button'
import { controledInputDecorator } from '../Common/ControledInput'

const mapDefaultToValue = v => ({ name: v })
const mapValueToValue = e => e.target.files[0]

@controledInputDecorator(mapDefaultToValue, mapValueToValue)
export default class componentName extends Component {
  static propTypes = {
    /** 事件回调 */
    onChange: PropTypes.func,
    /** 默认值 */
    defaultValue: PropTypes.any,
    /** 是否Error, 自带error样式 */
    hasError: PropTypes.bool
  }
  @autobind
  selectFiles () {
    this.input.click()
  }

  render () {
    const { hasError, className, props: controled, ...others } = this.props
    const classes = classNames('file-upload', className)
    const { onChange, value } = controled
    return (
      <div className={classes} {...others}>
        <input type="file" onChange={onChange}
          ref={input => (this.input = input)}
          className="file-upload-hide"/>
        <Input hasError={hasError} disabled defaultValue={value.name} className="file-upload-name"/>
        <Button type="secondary"
          className="file-upload-button"
          onClick={this.selectFiles}>选择上传文件</Button>
      </div>
    )
  }
}
