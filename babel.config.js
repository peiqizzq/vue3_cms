module.exports = {
  plugins: [
    // [
    //   'import',
    //   {
    //     libraryName: 'element-plus',
    //     style: 'css',
    //     customStyleName: (name) => {
    //       return `element-plus/theme-chalk/${name}.css`
    //     }
    //     // customName: (name) => {
    //     //   return `element-plus/lib/index/${name}`
    //     // }
    //     // customName: (name) => {
    //     //   console.log(name)
    //     //   let nameList = name.split('-')
    //     //   let slength = '-item'.length
    //     //   let nlength = String(name).length
    //     //   //对item结尾组件处理
    //     //   if (nameList.length && nameList.includes('item')) {
    //     //     return `element-plus/lib/components/${name.slice(
    //     //       3,
    //     //       nlength - slength
    //     //     )}`
    //     //   }
    //     //   return `element-plus/lib/components/${name.slice(3)}`
    //     // }
    //   }
    // ]
  ],
  presets: ['@vue/cli-plugin-babel/preset']
}
// 当我们在libraryName的库中引用东西的时候，还需要引用customStyleName(名称)这个东西
