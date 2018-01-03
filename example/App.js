import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import {
  Button, Input, MultiInput, Select,
  Radio, Checkbox, Form, Modal,
  Code, Tab, Icon, Table, Label
} from '../src/index'
import iconText from '@/images/svg/alert.svg'
const RadioGroup = Radio.RadioGroup
const CheckboxGroup = Checkbox.CheckboxGroup
const FormItem = Form.Item
const TabPanel = Tab.TabPanel
const options = [{
  label: '111',
  value: '111'
}, {
  label: '222',
  value: '222'
}, {
  label: '333',
  value: '333'
}]
const field = {
  name: {
    value: '王卫新',
    validators: [{
      required: true
    }, {
      length: [0, 4]
    }]
  },
  sex: {
    value: 'male'
  },
  description: {
    value: '这是描述',
    validators: [{
      length: [0, 200]
    }]
  },
  phone: {
    value: '13022423521',
    validators: [{
      required: true
    }, {
      type: 'phone'
    }]
  },
  hobby: {
    value: 'football',
    options: [{
      label: '篮球',
      value: 'basketball'
    }, {
      label: '足球',
      value: 'football'
    }, {
      label: '乒乓球',
      value: 'pingpang'
    }]
  },
  emails: {
    value: ['11@qq.com'],
    validators: [{
      required: true
    }, {
      type: 'email'
    }]
  }
}
const code = {
  '@timestamp': '2017-12-27T19:38:39+08:00',
  'input_name': 'sensor_input',
  'input_type': 'sensor',
  'data': '10.10.169.184',
  'data_type': 'ip',
  'behave_uuid': 'sensor-1273069213273718',
  'input_uuid': '1514374719-sensor-93579900-80545624',
  'machine': '10.9.154.22',
  'time': 1514374719,
  'input_time': 1514374719,
  'related_ip': '10.10.169.184',
  'source_ip': '10.9.154.22',
  'event_type': 'net',
  'net': {
    'src_ip': '10.9.154.22',
    'src_port': 42065,
    'dest_ip': '10.10.169.184',
    'dest_port': 1514,
    'proto': 'UDP',
    'type': 'flow',
    'flow': {
      'app_proto': 'failed',
      'pkts_toserver': 1,
      'bytes_toserver': 478,
      'state': 'new'
    }
  }
}
const columns = [{
  key: 'labels',
  title: '1',
  render (items) {
    return (
      items.map(item => {
        return <Label className="table-label" light key={item.desc} type={item.type}>{item.desc}</Label>
      })
    )
  }
}, {
  key: 'type',
  title: '2',
  render (item) {
    return <span className="color-error">{item}</span>
  }
}, {
  key: 'times',
  title: '3'
}, {
  title: '操作',
  render (item, row, { expandShow }) {
    return <span>{expandShow ? '收起' : '展开'}</span>
  }
}]
export default class App extends Component {
  constructor () {
    super()
    this.state = {
      showModal: false,
      value: '222'
    }
  }
  handleChange (value) {
    console.log(value)
    this.setState({
      value
    })
  }
  expandRowRender () {
    return (
      <div>
        这是扩展的内容
        <p>可以各种自定义</p>
      </div>
    )
  }
  renderTable () {
    const tableData = [{
      ip: '87.101.12.12',
      labels: [{
        type: 'error',
        desc: 'IDC机房'
      }, {
        type: 'info',
        desc: '辣鸡邮件'
      }],
      type: '阻断',
      times: '32342342次'
    }, {
      ip: '87.101.12.12',
      labels: [{
        type: 'error',
        desc: 'IDC机房'
      }, {
        type: 'info',
        desc: '辣鸡邮件'
      }],
      type: '阻断',
      times: '32342342次'
    }, {
      ip: '87.101.12.12',
      labels: [{
        type: 'error',
        desc: 'IDC机房'
      }, {
        type: 'info',
        desc: '辣鸡邮件'
      }],
      type: '阻断',
      times: '32342342次'
    }, {
      ip: '87.101.12.12',
      labels: [{
        type: 'error',
        desc: 'IDC机房'
      }, {
        type: 'info',
        desc: '辣鸡邮件'
      }],
      type: '阻断',
      times: '32342342次'
    }]
    const tableData2 = tableData.slice(0).map(item => {
      return Object.assign({}, item, {
        children: [{
          ip: '87.101.12.12',
          labels: [{
            type: 'error',
            desc: 'IDC机房'
          }, {
            type: 'info',
            desc: '辣鸡邮件'
          }],
          type: '阻断',
          times: '32342342次'
        }, {
          ip: '87.101.12.12',
          labels: [{
            type: 'error',
            desc: 'IDC机房'
          }, {
            type: 'info',
            desc: '辣鸡邮件'
          }],
          type: '阻断',
          times: '32342342次'
        }]
      })
    })
    console.log(tableData2)
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-6">
            不带边框不带hover
            <Table columns={columns}
              hover={false}
              border={false}
              showHeader={false}
              lineHeight={30}
              data={tableData} />
          </div>
          <div className="col-6">
            带边框hover的普通table
            <Table columns={columns}
              data={tableData} />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            可展开的table
            <Table columns={columns}
              expandRowRender={this.expandRowRender}
              data={tableData} />
          </div>
          <div className="col-6">
            带子行的table
            <Table columns={columns}
              hasChild={true}
              // expandRowRender={this.expandRowRender}
              data={tableData2} />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            可展开带子行的table
            <Table columns={columns}
              hasChild={true}
              expandRowRender={this.expandRowRender}
              data={tableData2} />
          </div>
        </div>
      </div>
    )
  }
  Submit () {
    const res = this.refs.input.validateAndSubmit()
    console.log(res)
  }
  renderForm () {
    return (
      <Form data={field} ref="input">
        <div className="row mgb20">
          <FormItem label="姓名" field="name" placeholder="填写您的姓名">
            <Input/>
          </FormItem>
        </div>
        <div className="row mgb20">
          <FormItem label="性别" field="sex">
            <RadioGroup>
              <Radio label="男" value="male" />
              <Radio label="女" value="female" />
            </RadioGroup>
          </FormItem>
        </div>
        <div className="row mgb20">
          <FormItem label="爱好" field="hobby">
            <Select options={field.hobby.options}></Select>
          </FormItem>
        </div>
        <div className="row mgb20">
          <FormItem label="自我介绍" placeholder="填写您的姓名" field="description">
            <Input type="textarea" max="200"/>
          </FormItem>
        </div>
        <div className="row mgb20">
          <FormItem label="电话" placeholder="填写您的电话" field="phone">
            <Input />
          </FormItem>
        </div>
        <div className="row mgb20">
          <FormItem label="邮箱" placeholder="填写您的邮箱" field="emails">
            <MultiInput />
          </FormItem>
        </div>
        <Button onClick={this.Submit.bind(this)} type="secondary">提交</Button>
      </Form>
    )
  }
  showModal () {
    this.setState({
      showModal: true
    })
  }
  closeModal () {
    this.setState({
      showModal: false
    })
  }
  renderModal () {
    const { showModal } = this.state
    return (
      <div className="row mgb20">
        <button onClick={this.showModal.bind(this)} className="btn btn-secondary">
          点我显示Modal
        </button>
        <Modal isOpen={showModal} title="测试Modal"
          handleEnsure={this.closeModal.bind(this)}
          handleCancel={this.closeModal.bind(this)}
          contentLabel="TestModal">
          <div>
            这是Modal里面的内容
          </div>
        </Modal>
      </div>
    )
  }
  render () {
    const handleChange = this.handleChange.bind(this)
    const dfValue = { a: 1 }
    return (
      <div className="container" style={{width: '1200px'}}>
        <div className="row mgb20">
          <Button>按钮</Button>
          <Button type="primary" className="test">按钮</Button>
          <Button type="secondary">按钮</Button>
          <Button type="cancel">按钮</Button>
          <Button type="link">按钮</Button>
        </div>
        <p>input</p>
        <div className="row mgb20">
          <div className="col-6 mgb20"><Input onChange={handleChange} /></div>
          <div className="col-6 mgb20"><Input onChange={handleChange} defaultValue="默认值，disabled" disabled /></div>
          <div className="col-6 mgb20"><Input onChange={handleChange} hasError /></div>
          <div className="col-6 mgb20"><Input onChange={handleChange} type="textarea" /></div>
          <div className="col-6 mgb20"><Input onChange={handleChange} type="textarea" hasError /></div>
          <div className="col-6 mgb20"><Input onChange={handleChange} disabled defaultValue="默认值，disabled" type="textarea" /></div>
          <div className="col-6 mgb20"><Input onChange={handleChange} type="textarea" max="200" /></div>
          <div className="col-6 mgb20"><Input onChange={handleChange} type="textarea" max="200" hasError /></div>
          <div className="col-6 mgb20"><Input onChange={handleChange} type="textarea" max="200" disabled defaultValue="默认值，disabled" /></div>
          <div className="col-6 mgb20"><Input onChange={handleChange} value={this.state.value}/></div>
        </div>
        <p>multiInput</p>
        <div className="row mgb20">
          <div className="col-6 mgb20">
            <MultiInput onChange={handleChange} defaultValue={[]}></MultiInput>
          </div>
          <div className="col-6 mgb20">
            <MultiInput onChange={handleChange} hasError></MultiInput>
          </div>
          <div className="col-6 mgb20">
            <MultiInput onChange={handleChange} disabled defaultValue={['aaa']}></MultiInput>
          </div>
          <div className="col-6 mgb20">
            <MultiInput onChange={handleChange} disabled></MultiInput>
          </div>
        </div>
        <p>Select</p>
        <div className="row mgb20">
          <div className="col-6 mgb20">
            <Select onChange={handleChange} options={options} clearable={false} />
          </div>
          <div className="col-6 mgb20">
            <Select onChange={handleChange} options={options} multi />
          </div>
          <div className="col-6 mgb20">
            <Select onChange={handleChange} options={options} hasError />
          </div>
          <div className="col-6 mgb20">
            <Select onChange={handleChange} options={options} disabled />
          </div>
          <div className="col-6 mgb20">
            <Select onChange={handleChange} options={options} disabled defaultValue="111" />
          </div>
          <div className="col-6 mgb20">
            <Select onChange={handleChange} options={options} multi disabled defaultValue={['111', '222']} />
          </div>
        </div>
        <p>Radio</p>
        <div className="row mgb20">
          <div className="col-6 mgb20">
            <Radio label="选择1" name="a" value="1" onChange={handleChange} />
            <Radio label="选择2" name="a" value="2" defaultChecked onChange={handleChange} />
          </div>
          <div className="col-6 mgb20">
            <RadioGroup defaultValue={dfValue} onChange={handleChange}>
              <Radio label="选择1" value={dfValue} />
              <Radio label="选择2" value={{ a: 2 }} />
            </RadioGroup>
          </div>
        </div>
        <p>Checkbox</p>
        <div className="row mgb20">
          <div className="col-6 mgb20">
            <Checkbox label="选择1" name="a" value="1" onChange={handleChange} />
            <Checkbox label="选择2" name="a" value="2" defaultChecked onChange={handleChange} />
          </div>
          <div className="col-6 mgb20">
            <CheckboxGroup defaultValue={['2']} onChange={handleChange}>
              <Checkbox label="选择1" value="1" />
              <Checkbox label="选择2" value="2" />
            </CheckboxGroup>
          </div>
        </div>
        <p>Form</p>
        <div className="row mgb20">
          <div className="col-8">
            {
              this.renderForm()
            }
          </div>
        </div>
        { this.renderModal()}
        <div className="row mgb20">
          <Code data={code}/>
        </div>
        <div className="row mgb20">
          <Tab tabStyle={{ marginRight: '10px' }} activeStyle={{ borderRight: '1px solid red' }}>
            <TabPanel header="告警明细" keys="1">111</TabPanel>
            <TabPanel header={<div><Icon className="example-icons" link={iconText}/>可疑活动明细</div>} keys="2">222</TabPanel>
          </Tab>
        </div>
        <div className="row mgb20">
          <Tab>
            <TabPanel header="表格" keys="table">
              <Code data={code}></Code>
            </TabPanel>
            <TabPanel header="JSON" keys="json">
              <Code data={code} type="json"></Code>
            </TabPanel>
          </Tab>
        </div>
        {this.renderTable()}
      </div>
    )
  }
}
App.propTypes = {}
