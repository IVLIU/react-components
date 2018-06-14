import React, { Component } from 'react'
import Checkbox from '../Checkbox'
import autobind from 'autobind-decorator'

// 多选
const SelectTable = WrapedComponent =>
  class SelectTable extends Component {
    constructor() {
      super()
      this.state = {
        selectedRows: []
      }
    }
    @autobind
    handleSelectAll(e) {
      const { data, handleSelectChanged } = this.props
      let ret = []
      if (e.checked) {
        ret = data.slice(0)
      }
      this.setState({
        selectedRows: ret
      })
      handleSelectChanged && handleSelectChanged(ret)
    }
    @autobind
    handleSelectRow(e, row) {
      const checked = e.checked
      const { selectedRows } = this.state
      const { handleSelectChanged } = this.props
      const index = selectedRows.indexOf(row)
      if (checked) {
        index < 0 && selectedRows.push(row)
      } else {
        index >= 0 && selectedRows.splice(index, 1)
      }
      this.setState({
        selectedRows
      })
      handleSelectChanged && handleSelectChanged(selectedRows)
    }
    addSelectHeader(columns, select) {
      if (!select) {
        return columns
      }
      const ret = columns.slice(0)
      const { selectedRows } = this.state
      ret.unshift({
        key: '',
        title: (
          <Checkbox
            label="全选"
            onChange={(e, v, target) => this.handleSelectAll(target)}
          />
        ),
        render: (item, row) => {
          return (
            <Checkbox
              checked={selectedRows.indexOf(row) >= 0}
              onChange={(e, v, target) => this.handleSelectRow(target, row)}
            />
          )
        },
        width: 80
      })
      return ret
    }

    render() {
      const { select, columns, ...others } = this.props
      const retColumns = this.addSelectHeader(columns, select)
      return (
        <WrapedComponent columns={retColumns} select={select} {...others} />
      )
    }
  }
export default SelectTable
