const path = require('path')
const join = p => path.join('./src/components/', p)
const resolve = p => path.resolve(__dirname, p)
const components = {
  icon: join('Icon/index.js'),
  button: join('Button/index.js'),
  input: join('Input/index.js'),
  multiInput: join('MultiInput/index.js'),
  select: join('Select/index.js'),
  radio: join('Radio/Radio.js'),
  radioGroup: join('Radio/RadioGroup.js'),
  checkbox: join('Checkbox/Checkbox.js'),
  checkboxGroup: join('Checkbox/CheckboxGroup.js'),
  form: join('Form/Form.js'),
  formItem: join('Form/FormItem.js')
}
module.exports = {
  components: () => {
    const ret = Object.keys(components).map(key => {
      return components[key]
    })
    return ret
  },
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
          test: /\.svg$/,
          loaders: [{
            loader: 'file-loader'
          }, {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }, {
            loader: 'react-svg-loader',
            options: {
              svgo: {
                plugins: [{ removeStyleElement: true }],
                floatPrecision: 2
              }
            }
          }],
          exclude: [resolve('./node_modules/'), resolve('./src/fonts/'), resolve('./src/images/svg/'), resolve('./src/flags/')]
        },
        {
          test: /\.svg$/,
          loader: 'svg-sprite-loader',
          options: {
            runtimeCompat: true
          },
          include: resolve('./src/images/svg/')
        }
      ]
    }
  },
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'doc/Wrapper')
  }
}
