## h5小游戏—英雄大战小怪兽

本项目是利用原生js实现的h5小游戏，在实现时使用了大量es6语法，对于es6语法不太熟悉的小伙伴可以先查阅相关资料了解一下

**demo**：[线上地址](https://yangyunhe369.github.io/h5-game-heroVSmonster/)

## 项目截图

![](images/screenshot1.png)

## 已完成功能：
- [x] 角色可以朝上下左右四个方向移动
- [x] 展示角色不同状态下对应动画（站立、移动、攻击、受伤、死亡...）
- [x] 角色之间相互攻击判定，及掉血机制
- [x] 每局游戏角色位置随机生成

## 待优化功能：
- [ ] 角色攻击判定较粗糙，不够精确
- [ ] 角色连续攻击判定有问题

## 下载源码

``` bash
git clone https://github.com/yangyunhe369/h5-game-heroVSmonster.git
```

## 目录结构

```
.
├─ index.html                   // 首页html
│  
├─ css                          // css样式资源文件
├─ images                       // 图片资源文件  
└─ js
   ├─ common.js                 // 公共方法
   ├─ scene.js                  // 游戏场景相关类
   ├─ game.js                   // 游戏主要运行逻辑
   └─ main.js                   // 游戏运行主函数
```

* common.js => 引入公共方法
* scene.js => 引入游戏场景素材相关类，包括角色类、动画类
* game.js => 引入游戏引擎
* main.js => 游戏运行主函数

## 说明

如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^

或者您可以 "follow" 一下，我会不断开源更多的有趣的项目

## 个人简介

作者：弦云孤赫(David Yang)

职业：web前端开发工程师

爱好：网游、音乐（吉他）

## 联系方式

QQ：314786482

微信：yangyunhe_yyh

坐标：四川成都

## License

[MIT](https://github.com/yangyunhe369/h5-game-heroVSmonster/blob/master/LICENSE)
