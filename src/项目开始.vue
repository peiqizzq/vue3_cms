<template>
  <div>
    <h2>项目开始</h2>
  </div>
</template>

<script lang="ts">
// vue create vue3_cms创建项目（会自动创建项目的文件夹），开发中一般对ts的支持选择Babel而不是tsc。因为babel可以做polyfill补丁，会对一些ts能用但浏览器不支持的api做补丁
// 选择eslint+prettier
// 创建好之后。看项目搭建.md
// 第一步，进行配置，对项目做规范，代码规范，git规范，eslint规范等
//    1.创建.editorconfig文件，对回车，tab，结尾是否换行等代码风格进行规范（不同电脑和不同IDE可能都会有差别，所以要规范）。
//      webstorm会自动读取，vscode要安装插件EditorConfig for VS Code读取
//    2.安装vscode的prettier插件，对前端代码进行格式化。vscode自身也有这个功能。
//      不用vscode插件就要用prettier包，安装在项目里npm install prettier -D,创建配置文件，配置我们的代码风格。
//      创建.preitterrc的配置文件和.prettierignore忽视格式化文件(告诉哪些文件不需要格式化)。规则最好不要和eslint冲突。
//          配置好之后安装VScode的prettier插件生效。貌似需要开启vscode的保存代码时格式化的选项（设置中开启1，Default Formatter；2.Format On Save,Format On Save Mode）（format on type每行结束enter就格式化）
//          或者用命令生效。在package.json创建脚本"prettier": "prettier --write ." ，执行之后将项目里面所有的需要格式化的文件都格式化.
//    3.配置eslint规范代码。我们选择了eslint+prettier的模式时就会自己安装prettier。最好安装vscode插件eslint，可以更快速。这样代码就需要符合eslintrc文件中extends属性的规范
//      要让eslint和prettier兼容，npm安装eslint-plugin-prettier eslint-config-prettier -D两个，eslint+prettier模式默认安装。
//      安装好之后去eslintrc文件中extends属性末尾加上'plugin:prettier/recommended'，这样就会覆盖前面相同的规则。最新版的vue cli已经默认加上了。
//    4.git提交规范，看是否符合eslint规范，并在提交前自动做exlint的fix。利用git Husky工具，可以触发commit的各个阶段。执行npx husky-init && npm install
//      执行npx husky-init && npm install等于进行了3个操作。1.安装husky；2.生成.husky文件夹和pre-commit文件，进行提交拦截操作，做完pre-commit才能提交；3.在package配置文件中添加prepare脚本
//      做完之后，去pre-commit中，把npm test改为npm run lint，让它去启动lint脚本(cli service中配好了--fix)规范一下代码。做完之后再开始提交操作（都是自动的）
//      commit的提交信息要规范，用npm install commitizen -D安装工具，进行初始化npx commitizen init cz-conventional-changelog --save-dev --save-exact。它会自动去package文件下的config属性中进行配置
//      之后运行npx cz，选择提交信息就行了(可以创建脚本commit，执行cz)。git log可以查看提交信息。
//      禁用commit提交。
//          npm i @commitlint/config-conventional @commitlint/cli -D。
//          创建commitlint.config.js文件，配置commitlint。
//          拦截commit message信息，使用husky生成commit-msg文件，验证提交信息npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
//      git提交时，要把package-lock.json也一起提交，这个文件记录了详细的依赖版本
//    5. .browserslistrc文件，适配哪些浏览器
//    6.TS配置文件，tsconfig.json，能不能用any，哪个es标准等。查看文档
//    7.shims-vue.d.ts代码 component -> defineComponent函数，从js角度来说这个函数没有意义，但是ts可以做类型推导类型限制，更加严谨；像props在函数定义里面都是有类型的。
//      // defineComponent最后导出的都是DefineComponent实例component
// 第二步，集成第三方库，如webpack等。vue 对webpack进行了配置，但是隐藏起来了，除了修改源码，也可以进行vue.config.js配置。需要进行module.exports进行导出，因为在nodejs下运行
//    1.创建vue.config.js文件(新版默认创建),要配置什么就去查 https://cli.vuejs.org/zh/config/#vue-config-js，查完写在defineConfig的对象中就行。webpack下面@默认是/src
//      eslint报警告，可以复制警告提示，在eslintrc文件中rules属性设置off关掉
//    2.使用路由，没安装(npm install vue-router，进入src/router文件夹，创建index.ts文件，编写路由)。vue-router每个函数都写了注解，按住ctrl进去可以看到。写好路由去mian.ts注册就可以使用了
//    3.使用vuex，没安装(npm install vuex，进入src/store文件夹，创建index.ts，编写vuex)。同样有注释，写好store后去main.ts注册就可以使用了。
//    4.使用element-plus，针对vue3的桌面端组件库。npm install element-plus -D。1.全局引用(所有组件全部打包，不管用没用)，2.按需引用，包小一点，麻烦一点。安装好后去main.js中注册使用，并导入css样式
//    5.使用axios，安装axios。创建service文件夹
//      补充：项目开发有3个环境，我们需要根据不同的环境来设置环境变量。开发环境，生产环境，测试环境
//      区分环境变量，手动、根据precess.env.NODE_ENV区分、写不同的环境变量配置文件。进service的req config文件
//      封装axios(方便后期切换第三方库，同时方便添加token等参数和共同特性)。进service下的index。
//      服务器返回的请求data给到axios，axios对data进行包装，再加上config、headers等属性，包装成res
//    6.打包好的文件如果想要查看，需要去vue.config.js文件里加入publicPath: './'。项目打包上线部署到服务器的时候不要写。
// 第三步，编写项目
//    1.引入normalize.css,npm安装/github下载。创建css文件夹，添加基础css等
//      将element-plus做国际化,设置成中文
//    2.编写页面login，分析ui界面，拆分组件。一般页面相关的组件放在view中，页面中的小组件拆到cpns中；业务相关的组件放到components文件夹中；公共ui的组件放到base-ui文件夹
//      一般每个组件的根div都给一个类。不同组件可以根据需要去element-plus查找，直接复制代码使用。
//      ps：defineComponent最后导出的都是DefineComponent实例component
//      编写loginpanel、loginaccount、loginphone界面，解决刷新问题，根据当前的路由路径将menu的active项改过来
//    3.编写login的登录逻辑，service中login实现网络请求接口，在vuex中实现登录action;实现跨域请求(vue.config中配置proxy)。去service文件夹中更改base环境。获取到token后通过mutation和本地保存
//      开始获取用户信息等。根据返回的信息创建对应的类型(java中叫javabean)，类型简单的可以用json to ts快速转换，复杂的不写数据类型，直接用any
//    4.配置路由到main页，没登陆由守卫跳到login页。
//      同时还要对在首页刷新，或者登录过后直接通过路径进到首页的操作进行初始化(main.ts中)。因为保存token，userInfo等信息都是在login里面进行的，别的页面没有获取信息的这一步操作。
//      可以用本地存储恢复，也可以存到store里面再恢复
//    5.开始编写main页。划分布局，划分好后可以去element-plus上查找合适的container,然后去注册对应要使用的组件。
//      把menus的组件放到component中，main只放主要的页面，同时基础公共组件放到baseui去。组件通过自己的index导出。
//      templata中使用别名要先加~。在后面竖栏菜单也可以去element-plus里面找，然后找到我们要用的el组件名称，通过动态去生成。
//    6.根据获取到的不同的用户菜单权限配置动态路由。拿到路由数组后去store的changeUserMenus操作中注册路由，并到nav-menus的面板给对应的10个组件添加点击事件
//      根据点击事件拿到对应的url去切换动态路由。同时把main的重定向定向到menu的第一项
//    7.配置main的header，去elementplus选择下拉菜单
//    8.封装高级组件，用el的layout布局，封装到baseui中导出使用。封装z2qForm，通过props传入item对象给z2q组件生成对应的form。可以直接把item对象绑定到组件上，这样传了什么属性就有什么属性。然后抽离出config文件
//      封装面包屑。做z2qform的数据绑定,给数据类型一个field用来v-model绑定数据用，通过解构v-model的props并watch发送emit达到不破坏单向数据流的双向绑定
//      tips:view-route应该是根据路由路径来显示的。单个页面的view-route就存在一个就行。
//           子页面中的view-route，因为路由路径前面有父组件的main路径，已经进入了父组件的里面，所以不会显示到父页面的view-route里面，显示在父组件内部的子组件的view-route中
//           父页面（/mian）显示在了App页面的view-route中；子页面content（/main/xxx/xxx）已经属于子路由，进入了main的里面(路由已经有了前缀/main)，所以显示在main页面上的view-route中。
//           在组件和路由路径之间形成了映射关系。/main路径映射了main.vue组件，子路径/main/xxx/xxx就可以在main.vue上的view-route展示。
//           经过测试，在一级路由test.vue界面上添加routeview占位，可以通过添加二级子路由,让子路由的组件显示在一级路由test.vue的routeview占位上。
//    9.拿到用户数据，搭建table。先写store模块存储userlist，再写service。拿到数据后编写table的baseui
//      注意表格数据config的名称和table表头名称对应。还可以封装index列和checkBox列，由外界决定显示与否
//      可以用app.config.globalProperties.xxx来增加全局的属性，比如添加$filters来格式化时间，$(表示全局)
//      用插槽来传入表的头部和尾部分页器等，同时把网络请求的代码抽到pagecontent中，让上级页面只用传user这样的字符串来配页面
//      对数据请求做处理，根据传过来的页面字符串，来请求不同的数据做页面。page页面只传胚子文件和页面名称，去store内部根据名称匹配url并发送请求
//    10.更新searchForm的逻辑，实现重置按钮，搜索按钮。pageSreach触发事件到user父组件，父组件调用pageContent子组件的函数重新请求数据。中间的逻辑抽到hooks中。
//      实现分页器的的功能，绑定pageInfo的信息和count数量到分页器上，监听分页器事件
//      给page-content添加剩余的动态插槽。动态插槽由user、goods等上层页面决定，实现goods页面。拿到需要动态设置的插槽的名称，在pagecontent里面做动态插槽。
//    11.实现menu页面，通过el-table的row-key，tree-props来实现
//      1.config文件，2.store增加menu信息和操作，3.config新增children等属性，4.table组件里面新增属性接收children，5.绑定eltable的属性。6.还可以类似的增加是否展示分页器等
//    12.用户按钮权限管理，根据不同的用户权限展示不用的按钮。
//      从服务器返回的数据中拿到权限，创建hooks根据权限显示按钮，在登录逻辑中调用函数拿到权限数组,再到pagecontent中使用
//    13.实现按钮功能，点击按钮->vuex->service
//      实现pagemodel组件，新增按钮的功能，使用elementplus的dialog组件，利用之前封装的z2qFrom组件来快速搭建，更改样式就可以
//      实现按钮功能，content组件中的按钮使用emit传递事件给user，uesr去做操作。具体的操作放到hooks中
//      做完响应式数据的处理如果有问题，可能不是代码的问题，热更新问题，重启一下服务
//      tips: 目前form内的双向绑定的方式不能触发响应式，在修改单个数据之后才能够触发后续响应式
export default {}
</script>

<style scoped></style>
