const path = require('path')
const fs = require('fs')
const join = p => path.join('./src/components/', p)
const resolve = p => path.resolve(__dirname, p)
const componentMap = component => {
  return Object.keys(component).map(key => {
    return component[key]
  })
}
const getCommonSetions = () => {
  const dir = fs.readdirSync(resolve('./doc/common'))
  return dir.map(item => {
    const p = resolve(`./doc/common/${item}`)
    return {
      name: item.split('.')[0],
      content: p
    }
  })
}
const baseComponents = {
  icon: join('Icon/index.js'),
  button: join('Button/index.js'),
  label: join('Label/index.js'),
  Loading: join('Loading/index.js'),
  Modal: join('Modal/index.js'),
  PageTitle: join('PageTitle/index.js'),
  switch: join('Switch/index.js')
}
const dataComponents = {
  alert: join('Alert/index.js'),
  popover: join('Popover/index.js'),
  box: join('Box/index.js'),
  table: join('Table/Base.js'),
  tab: join('Tab/Tab.js'),
  tabPanel: join('Tab/TabPanel.js'),
  code: join('Code/index.js'),
  Pagination: join('Pagination/index.js'),
  dropdown: join('Dropdown/index.js'),
  dropdownList: join('DropdownList/index.js'),
  dropdownInput: join('DropdownInput/index.js'),
  noResult: join('NoResult/index.js')
}
const formComponents = {
  input: join('Input/index.js'),
  multiInput: join('MultiInput/index.js'),
  select: join('Select/index.js'),
  DateRangePicker: join('TimePicker/DateRangePicker.js'),
  RangeBtn: join('TimePicker/RangeBtn.js'),
  radio: join('Radio/Radio.js'),
  radioGroup: join('Radio/RadioGroup.js'),
  radioBtn: join('Radio/RadioButton.js'),
  checkbox: join('Checkbox/Checkbox.js'),
  checkboxGroup: join('Checkbox/CheckboxGroup.js'),
  checkboxSelect: join('CheckBoxSelect/index.js'),
  fileUpload: join('FileUpload/index.js'),
  labelSelect: join('LabelSelect/index.js'),
  form: join('Form/Form.js'),
  formItem: join('Form/FormItem.js')
}
module.exports = {
  serverPort: 8080,
  sections: [{
    name: 'Startup',
    content: resolve('./doc/base.md')
  }, {
    name: 'ChangeLog',
    content: resolve('./doc/changeLog.md')
  }, {
    name: 'IconList',
    content: resolve('./doc/IconList.md')
  }, {
    name: 'Common',
    sections: getCommonSetions(),
    description: 'TDP业务通用组件'
  }, {
    name: 'General',
    components: () => componentMap(baseComponents),
    description: '基本通用组件'
  }, {
    name: 'DataDisplay',
    components: () => componentMap(dataComponents),
    description: '数据展示通用组件'
  }, {
    name: 'FormInput',
    components: () => componentMap(formComponents),
    description: '表单通用组件'
  }],
  showUsage: true,
  webpackConfig: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        },
        {
          test: /\.(sass|scss)$/,
          loaders: 'style-loader!css-loader!sass-loader'
        },
        {
          test: /\.svg$/,
          loaders: [
            {
              loader: 'file-loader'
            },
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true
              }
            },
            {
              loader: 'react-svg-loader',
              options: {
                svgo: {
                  plugins: [{ removeStyleElement: true }],
                  floatPrecision: 2
                }
              }
            }
          ],
          exclude: [
            resolve('./node_modules/'),
            resolve('./'),
            resolve('./src/images/svg/'),
            resolve('./src/flags/')
          ]
        },
        {
          test: /\.svg$/,
          loader: 'svg-sprite-loader',
          options: {
            runtimeCompat: true
          }
        }
      ]
    }
  },
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'doc/Wrapper')
  }
  // configureServer(app) {
  //   // `app` is the instance of the express server running Styleguidist
  //   app.get('/', (req, res) => {
  //     res.status(200).send({ response: 'Server invoked' })
  //   })
  // }
}
