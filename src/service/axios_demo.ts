import axios from 'axios'
// 这里直接导出的就是axios实例，里面有各种get，request方法

// get返回的是一个promise类型，promise是泛型类，可以传入泛型。鼠标放上去可以查看
axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
  console.log(res.data)
})
// http://httpbin.org/#/HTTP_Methods/get_get可以模拟很多请求
axios
  .get('http://httpbin.org/get', {
    params: {
      name: 'peiqi',
      age: 28
    }
  })
  .then((res) => {
    console.log(res.data)
  })
axios
  .post('http://httpbin.org/post', {
    data: {
      name: 'anduy',
      age: 38
    }
  })
  .then((res) => {
    console.log(res.data)
  })

// axios的基本配置，这是全局配置
axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 5000
// 也可以在config里面单独写配置
axios
  .get('/get', {
    params: {
      name: 'bore',
      age: 25
    },
    timeout: 2000,
    headers: {}
  })
  .then((res) => {
    console.log(res.data)
  })
// axios.all，一次发送多个请求，内部是用了promise.all
axios
  .all([
    axios.get('/get', { params: { test: 'test1' } }),
    axios.post('/post', { data: { test: 'test2' } })
  ])
  .then((res) => {
    // 这里的res是个结果数组
    console.log(res[0].data)
    console.log(res[1].data)
  })

// axios的拦截器，可以在发送前或者响应后做响应的拦截，例如发送前加token，或者加载loading组件；响应后直接返回data
// axios拦截器本质上就是函数，在函数里做你想做的操作
// 参数1，成功会执行的函数；参数2，失败会执行的函数
axios.interceptors.request.use(
  (config) => {
    console.log('请求成功的拦截')
    // 通过更改config的内容来达到想要的操作
    // config.params = {}
    return config
  },
  (err) => {
    console.log('请求失败')
    return err
  }
)
axios.interceptors.response.use(
  (res) => {
    // 可以直接return res.data把数据返回出去
    console.log('服务器响应成功的拦截')
    return res
  },
  (err) => {
    console.log('服务器响应失败')
    return err
  }
)
