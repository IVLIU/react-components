#### 基本使用

最基本的表格

``` js
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
}];
const columns = [{
  key: 'labels',
  title: '1',
  render (items) {
    return (
      items.map(item => {
        return <label key={item.desc} className="label label-info mgr10">{item.desc}</label>
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
  render (item, row) {
    return <span>现在还没有操作</span>
  }
}];
<BaseTable striped columns={columns} data={tableData} />
```

##### 特殊效果
- 不带边框
- 不带hover效果
- 不带头
- 行高30px

``` js
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
}];
const columns = [{
  key: 'labels',
  title: '1',
  render (items) {
    return (
      items.map(item => {
        return <label key={item.desc} className="label label-info mgr10">{item.desc}</label>
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
  render (item, row) {
    return <span>现在还没有操作</span>
  }
}];
<BaseTable columns={columns}
  background={false}
  hover={false}
  border={false}
  showHeader={false}
  lineHeight={30}
  data={tableData} />
```

##### 排序表格
- 配合后端进行排序
- 使用sortable控制某字段是否排序
- 需传入当前排序的sortKey和当前的顺序sortFlag
- 排序更改时会自动调用handleSortChange, 请求后端

``` js
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
}];
const columns = [{
  key: 'labels',
  title: '1',
  render (items) {
    return (
      items.map(item => {
        return <label key={item.desc} className="label label-info mgr10">{item.desc}</label>
      })
    )
  }
}, {
  key: 'type',
  title: '2',
  render (item) {
    return <span className="color-error">{item}</span>
  },
  sortable: true
}, {
  key: 'times',
  title: '3',
  sortable: true
}, {
  title: '操作',
  render (item, row) {
    return <span>现在还没有操作</span>
  }
}];
class ExampleTable extends React.Component {
  constructor () {
    this.state = {
      sortKey: '',
      sortFlag: ''
    }
  }
  handleSortChange (sortKey, sortFlag) {
    console.log('sortchanged:', sortKey, sortFlag)
    this.setState({
      sortKey,
      sortFlag
    })
  }
  render () {
    const { sortKey, sortFlag } = this.state
    return (
      <BaseTable
        striped
        columns={columns}
        sortKey={sortKey}
        sortFlag={sortFlag}
        handleSortChange={this.handleSortChange.bind(this)}
        data={tableData} />
    )
  }
}
<ExampleTable />
```

##### 可展开

- expandRowRender设置展开内容
- 带有展开的行会带有 has-expand class
- 在column的render会回传当前row是否展开，用于自定义操作状态
- defaultRenderExpand设置是否默认展开第一行

``` js
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
}];
const columns = [{
  key: 'labels',
  title: '1',
  render (items) {
    return (
      items.map(item => {
        return <label key={item.desc} className="label label-info mgr10">{item.desc}</label>
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
  render (item, row, {
    expandShow
  }) {
    return <span>{expandShow ? '收起' : '展开'}</span>
  }
}];
const expandRowRender = (row, index) => (
  <div>
    这是扩展的内容
    <p>这是第{index + 1}行的展开内容</p>
    <p>可以各种自定义</p>
  </div>
);
<BaseTable columns={columns}
  expandRowRender={expandRowRender}
  defaultRenderExpand
  data={tableData} />
```

##### 带有children的行

- 需要设置hasChild为true
- 设置每个data-item的children来展示他的子行
- 子行可以展开收起

``` js
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
  times: '32342342次',
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
  times: '32342342次',
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
}];
const columns = [{
  key: 'labels',
  title: '1',
  render (items) {
    return (
      items.map(item => {
        return <label key={item.desc} className="label label-info mgr10">{item.desc}</label>
      })
    )
  },
  align: 'left',
  width: '35%'
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
  render (item, row, {
    expandShow
  }) {
    return <span>{expandShow ? '收起' : '展开'}</span>
  }
}];
const expandRowRender = (row, index) => (
  <div>
    这是扩展的内容
    <p>这是第{index + 1}行的展开内容</p>
    <p>可以各种自定义</p>
  </div>
);
<BaseTable columns={columns}
  expandRowRender={expandRowRender}
  hasChild
  data={tableData} />
```

#### 单选表格
- 通过clickable设置每行可点击
- handleRowClick点击回调
- 不可与展开，子行的表格同时使用

``` js
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
}];
const columns = [{
  key: 'labels',
  title: '1',
  render (items) {
    return (
      items.map(item => {
        return <label key={item.desc} className="label label-info mgr10">{item.desc}</label>
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
  render (item, row) {
    return <span>现在还没有操作</span>
  }
}];
<BaseTable columns={columns}
  clickable
  striped
  handleRowClick={console.log}
  data={tableData} />
```

#### 多选表格
- 通过select属性设置表格可选择
- handleSelectChanged点击回调

``` js
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
}];
const columns = [{
  key: 'labels',
  title: '1',
  render (items) {
    return (
      items.map(item => {
        return <label key={item.desc} className="label label-info mgr10">{item.desc}</label>
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
  render (item, row) {
    return <span>现在还没有操作</span>
  }
}];
<BaseTable columns={columns}
  select
  striped
  handleSelectChanged={console.log}
  data={tableData} />
```