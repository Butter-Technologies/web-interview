# Butter Web Challenge

欢迎来到Butter的网页端编程挑战题目！

### 1. 实施方案分析
下图是Butter上线产品中的供应商采购订单（Purchase Orders, 简称PO）管理页面。
请指出设计图中哪些部分可实现成组件的形式，并选中其中的两种简单描述一下实现思路和过程：

<img src="https://user-images.githubusercontent.com/9939724/129428343-43c0ee58-f33d-4cdb-9661-4d897819aa7d.png" width="800" />

- 本题主要考察工程师对整个设计图的划分能力和抽象能力，以及工程文档的文字表述能力。

#### 答题区域
 --- 

### 2. 代码实现
开始本题之前请提前注册一个[Figma](https://www.figma.com/signup)账号，以便查看设计图中组件的css属性。设计图中的Poppins字体[文件](Poppins.zip)已提供。

使用Vue按照下面的设计文档实现一个Vue组件：
#### 题目要求：
- 使用yarn创建一个vue项目
  - 实现语言可使用TypeScript或JavaScript（ES2015以上）。
- 创建vue组件（[设计图链接](https://www.figma.com/file/7jCwU2hDat2KSGPZH5bM7i/Butter-Interview-August?node-id=1%3A62)）
  - 点击Filter按钮展开下拉部分
  - 下拉部分分成三个区域
  - 第一个区域最多显示两行，多于两行可以滚动，并且需要让第三行漏出一点内容以便于让用户知道存在第三行
  - 第二个区域选中后要求添加到第一个区域，取消选中后从第一个区域删除（对应[data.json](data.json)中的route)
  - 第三个区域和第二个区域功能相同(对于[data.json](data.json)中的status）
  - 点击Clear按钮清除所有选择，点击Apply按钮会回调组件的一个回调属性返回选中的结果并关闭下拉框。点击下拉框的外部也关闭下拉框，并且不会回调返回选中的结果（即本次操作不会影响展开下拉框之前的选中状态）
- 使用vue的mock功能创建mock api
  - mock api尽量符合RESTful规范
  - mock api返回组件需要的数据（第二个区域和第三个区域的列表），数据见[data.json](data.json)。
- 创建一个页面，在这个页面中把这个组件和mock api结合起来，使用Filter组件对[data.json](data.json)中的数据进行筛选显示。[data.json](data.json)中的数据以表的形式显示在页面上。
- git需要创建`develop`和`main`两个分支，在`develop`分支中需要提交2到3次（需要用rebase的方式），然后提交PR并rebase and merge到`main`分支来最终完成项目。
- 请提交全部代码，并在下面答题区域提供本地安装及运行的指令。

#### 答题区域
