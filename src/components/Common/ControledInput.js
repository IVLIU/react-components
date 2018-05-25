/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2018-01-18 17:51:37
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2018-05-16 19:34:47
 */
import React, { Component } from 'react'
import pureRender from 'pure-render-decorator'
import autobind from 'autobind-decorator'

const controledInput = (WrapComponent, mapDefaultToValue, MapValueToValue) => {
  @pureRender
  class RetComponent extends Component {
    constructor (props) {
      super(props)
      const { defaultValue } = props
      this.state = {
        value: mapDefaultToValue(defaultValue, props)
      }
    }
    componentWillReceiveProps (nextProps) {
      const { defaultValue } = this.props
      const { defaultValue: d } = nextProps
      if (d !== defaultValue) {
        this.setState({
          value: d
        })
      }
    }
    @autobind
    handleChange (value, ...others) {
      const { onChange } = this.props
      const ret = MapValueToValue(value, this.props, ...others)
      this.setState({
        value: ret
      })
      onChange && onChange(ret)
    }
    render () {
      let defaultProps = Object.assign({}, this.props)
      const props = {
        value: this.state.value,
        onChange: this.handleChange
      }

      if ('defaultValue' in defaultProps) {
        delete defaultProps.defaultValue
      }
      return <WrapComponent {...defaultProps} props={props} />
    }
  }
  return RetComponent
}

export default controledInput

export const controledInputDecorator = (mapDefaultToValue, MapValueToValue) => (WrapComponent) => {
  return controledInput(WrapComponent, mapDefaultToValue, MapValueToValue)
}
