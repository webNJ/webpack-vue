const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin') 
const AutoDllPlugin = require('autodll-webpack-plugin') //第三方库打包插件

//配置别名
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  entry: {
    main: path.resolve(__dirname, '../src/main.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },{
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-laoder']
      },{
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      },{
        test: /\.vue$/,
        loader: 'vue-loader'
      },{
        test: /\.(css|less)$/,
        use: ['vue-style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  resolve: {
    //配置别名  用@代替src
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src')
    },
    //引入依赖时省略后缀
    extensions: ['*', '.js', '.json', '.vue']
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html')
    }),
    new AutoDllPlugin({ //打包时会检测变化
      inject: true,   //为true时自动把打包后的库插入到html
      debug: true,
      filename: '[name]_[hash].js', //打包后文件名称
      path: './dll',    //打包路径
      entry: {
        //需要打包的库名称，不需要写全路径，会自动查找node_modules
        vendor: ['vue', 'vue-router', 'vuex']
      }
    }),
    new webpack.optimize.SplitChunksPlugin()//默认提取公共代码
  ]
};


  
