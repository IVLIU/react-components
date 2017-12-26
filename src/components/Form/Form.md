#### 基本使用

##### 数据和验证规则

准备基本的数据格式、默认值、及校验规则

``` css
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
};
```

#### 集成各种表单组件成整个表单

1. 将各种表单组件放入FormItem内，表单组件需可接收onChange事件
2. 数据更改时，将自动触发其onChange修改你定义的数据
3. 根据传入的validator进行校验， 校验失败，将注入hasError
4. 使用实例.validateAndSubmit方法进行最终校验，并获取最终的值

注意，此处由于文档工具的限制，引入方式会有所不同,

请点击提交，并打开控制台查看输入结果

``` js
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
};
const Input = require('../Input').default;
const Radio = require('../Radio/Radio.js').default;
const RadioGroup = require('../Radio/RadioGroup.js').default;
const Select = require('../Select').default;
const MultiInput = require('../MultiInput').default;
const Button = require('../Button').default;

class FormDatas extends React.Component {
  handleSubmit () {
    const ret = this.refs.form.validateAndSubmit()
    console.log(ret)
  }
  render () {
    return (
      <Form data={field} ref="form" style={{ width: '400px' }}>
        <div className="row">
          <FormItem label="姓名" field="name" placeholder="填写您的姓名" defaultValue={field.name.value} validators={field.name.validators}>
            <Input/>
          </FormItem>
        </div>
        <div className="row mgb20">
          <FormItem label="性别" field="sex" defaultValue={field.sex.value}>
            <RadioGroup className="example-sex">
              <Radio label="男" value="male" />
              <Radio label="女" value="female" />
            </RadioGroup>
          </FormItem>
        </div>
        <div className="row mgb20">
          <FormItem label="爱好" field="hobby" defaultValue={field.hobby.value}>
            <Select options={field.hobby.options}></Select>
          </FormItem>
        </div>
        <div className="row mgb20">
          <FormItem label="电话" placeholder="填写您的电话" field="phone" defaultValue={field.phone.value} validators={field.phone.validators}>
            <Input />
          </FormItem>
        </div>
        <div className="row mgb20">
          <FormItem label="邮箱" placeholder="填写您的邮箱" field="emails" defaultValue={field.emails.value} validators={field.emails.validators}>
            <MultiInput />
          </FormItem>
        </div>
        <Button className="example-btn-submit" onClick={this.handleSubmit.bind(this)} type="secondary">提交</Button>
      </Form>
    )
  }
}
<FormDatas />
```

#### Validators
在Form/validators.js中进行维护，可直接在其中进行添加

- required bool 必填，表单会自动填充*号
- length array [0, 10] 长度区间
- type 定义好的验证格式
  - phone 手机号
  - email
  - id
  - url 