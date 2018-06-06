import React, { Component } from 'react'
import {
  Table, Label, Icon,  Selector
} from '../../src/index'
import autobind from 'autobind-decorator';

const data = [
  {confidence_level: 3,
  confidence_level_desc: "高可信度",
  event:"",
  family:"Conficker",
  gangs: "",
  intel_source: "Threatbook",
  intel_type: "c2",
  intel_type_desc: "C2",
  ioc: "ldxavuu.cn",
  severity: 3}
]

export default class TableTest extends Component {
  constructor () {
    super()
    this.state = {
      defaultActiveKey: 0,
      descByFamily: {
        isFetching: true,
        dese: ''
      }
    }
  }
  @autobind
  aa() {
    console.log(999999)
    this.setState(
      {
        descByFamily: {
          isFetching: false,
          desc: "ddsee"
        }
      }
    )
  }
  @autobind
  hunc(hoverFunc, descByFamily) {
    return [
      {
        key: "ioc",
        title: "IOC或情报信息",
        render(item) {
          return <span className="color-error">{item}</span>;
        }
      },
      {
        key: "family",
        title: "威胁类型",
        render(item, row) {
          return 1
        }
      },
      {
        key: "severity",
        title: "严重程度",
        render(item) {
          return <span className="color-error">{item}</span>;
        }
      },
      {
        key: "confidence_level_desc",
        title: "可信度",
        render(item) {
          return <span className="color-error">{item}</span>;
        }
      },
      {
        key: "intel_source",
        title: "情报源",
        render(item) {
          return <span className="color-error">{item}</span>;
        }
      }
    ]
  }
  render () {
    const conlumns = this.hunc(this.aa, this.state.descByFamily)
    return (
      <Table columns={conlumns} data={data}/>
    )
  }
}
TableTest.propTypes = {}
