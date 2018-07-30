/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2018-01-18 17:51:37
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2018-07-30 17:21:03
 */
import React, { Component } from 'react'

export default (mapDefaultToValue, MapValueToValue) => (WrapComponent) =>
  class RetComponent extends Component {
    state = {
      value: mapDefaultToValue(this.props.defaultValue, this.props)
    }
    componentWillReceiveProps(nextProps) {
      const { defaultValue, reset } = this.props
      const { defaultValue: d } = nextProps
      if (d !== defaultValue || reset) {
        this.setState({
          value: d
        })
      }
    }
    handleChange = (value, ...others) => {
      const { onChange } = this.props
      const ret = MapValueToValue(value, this.props, ...others)
      this.setState({
        value: ret
      })
      onChange && onChange(ret)
    }
    render() {
      const { value } = this.state
      let defaultProps = Object.assign({}, this.props)
      const props = {
        value,
        onChange: this.handleChange
      }

      if ('defaultValue' in defaultProps) {
        delete defaultProps.defaultValue
      }
      return <WrapComponent {...defaultProps} props={props} />
    }
  }
