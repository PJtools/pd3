import * as force from './force'

const pd3 = {};

// 设定pd3命名空间名称，并集合打包导出对象
pd3.force = force;

export default pd3

// 适配全局命名，当不适于模块开发时，亦可全局调用
window.pd3 = window.pd3 || pd3;
