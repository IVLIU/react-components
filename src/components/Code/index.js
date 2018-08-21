import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import jsonFormat from 'json-format'
import JSONPretty from 'react-json-pretty'

/**
 * 针对代码块的统一封装，提供table,json两种格式
 */
export default class Code extends PureComponent {
  renderCodeTable (data) {
    const { labelWidth } = this.props
    return (<table className="code-table">
      <thead className="code-thead">
        <tr>
          <th className="key">KEY</th>
          <th className="value">VALUE</th>
        </tr>
      </thead>
      <tbody className="code-tbody">
        {
          Object.keys(data).map((item, index) => {
            return (
              <tr className="code-tr-content" key={item}>
                <td className="key" style={{ width: labelWidth }}>{item}</td>
                <td className="value">
                  {
                    typeof data[item] === 'string'
                      ? data[item]
                      : JSON.stringify(data[item])
                  }
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>)
  }
  renderJson (data) {
    try {
      const tmp = JSON.parse(data)
      data = jsonFormat(tmp)
    } catch (e) {
      console.log(e)
    }
    return <JSONPretty json={data} />
  }
  render () {
    const { data, type, className, style } = this.props
    const classes = classNames('code-wrap', className)
    return (
      <div className={classes} style={style}>
        {
          type === 'json'
            ? this.renderJson(JSON.stringify(data))
            : this.renderCodeTable(data)
        }
      </div>
    )
  }
}
Code.defaultProps = {
  type: 'table'
}
Code.propTypes = {
  /** 要展示的代码 */
  data: PropTypes.object,
  /** 展示的数据类型 */
  type: PropTypes.oneOf(['table', 'json']),
  /** 表格的标签宽度 */
  labelWidth: PropTypes.string
}
