import React, { Component } from 'react'
import PropTypes from 'prop-types'
import jsonFormat from 'json-format'
import JSONPretty from 'react-json-pretty'

export default class Code extends Component {
  renderCodeTable (data) {
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
              <tr className="code-tr-content" key={index}>
                <td className="key">{item}</td>
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
    const { data, type, ...others } = this.props
    return (
      <div className="code-wrap" {...others}>
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
  type: ''
}
Code.propTypes = {
  data: PropTypes.object
}
