const path = require('path')
const join = p => path.join('./src/components/', p)
const resolve = p => path.resolve(__dirname, p)
const componentMap = component => {
  return Object.keys(component).map(key => {
    return component[key]
  })
}
const baseComponents = {
  icon: join('Icon/index.js'),
  button: join('Button/index.js'),
  label: join('Label/index.js'),
  Loading: join('Loading/index.js'),
  Modal: join('Modal/index.js'),
  PageTitle: join('PageTitle/index.js')
}
const dataComponents = {
  alert: join('Alert/index.js'),
  box: join('Box/index.js'),
  table: join('Table/Base.js'),
  tab: join('Tab/Tab.js'),
  tabPanel: join('Tab/TabPanel.js'),
  code: join('Code/index.js'),
  Pagination: join('Pagination/index.js'),
  dropdown: join('Dropdown/index.js'),
  dropdownList: join('DropdownList/index.js')
}
const formComponents = {
  input: join('Input/index.js'),
  multiInput: join('MultiInput/index.js'),
  select: join('Select/index.js'),
  radio: join('Radio/Radio.js'),
  radioGroup: join('Radio/RadioGroup.js'),
  radioBtn: join('Radio/RadioButton.js'),
  checkbox: join('Checkbox/Checkbox.js'),
  checkboxGroup: join('Checkbox/CheckboxGroup.js'),
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
    name: 'IconList',
    content: resolve('./doc/IconList.md')
  }, {
    name: 'General',
    components: () => componentMap(baseComponents)
  }, {
    name: 'DataDisplay',
    components: () => componentMap(dataComponents)
  }, {
    name: 'FormInput',
    components: () => componentMap(formComponents)
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
}
