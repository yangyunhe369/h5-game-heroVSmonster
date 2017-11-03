/**
 * 游戏运行主函数
 */
let _main = {
  hero: null,                               // hero 实例对象
  hero_info: {                              // hero 初始化参数
    type: 'hero',                           // 角色类型
    x: 40,                                  // x轴坐标
    y: 350,                                 // y轴坐标
    w: 100,                                 // 图片宽度
    h: 109,                                 // 图片高度
  },
  monster: null,                            // monster 实例对象
  monster_info: {                           // monster 初始化参数
    type: 'monster',                        // 角色类型  
    x: 140,                                 // monster x轴坐标
    y: 350,                                 // monster y轴坐标
    w: 100,                                 // 图片宽度
    h: 113,                                 // 图片高度
  },
  game: null,                               // 游戏引擎对象
  rollPostion: function () {                // 随机角色坐标位置
    let self = this,
        canvas = document.getElementById('canvas'),
        hero = self.hero_info,
        monster = self.monster_info
    // 随机生成 hero 坐标，在左半区域随机
    hero.x = Math.random() * (canvas.width / 2 - hero.w) + 0
    hero.y = Math.random() * (canvas.height - hero.h) + 0
    // 随机生成 monster 坐标，在右半区域随机
    monster.x = Math.random() * (canvas.width / 2 - monster.w) + canvas.width / 2
    monster.y = Math.random() * (canvas.height - monster.h) + 0
  },
  start: function () {                      // 游戏主程序
    let self = this
    // 随机生成英雄，monster 坐标
    self.rollPostion()

    // 创建 hero 类
    self.hero = new Role(self, self.hero_info)
    // 创建 hero 动画序列
    self.hero.init(self.hero_info)

    // 创建 monster 类
    self.monster = new Role(self, self.monster_info)
    // 创建 monster 动画序列
    self.monster.init(self.monster_info)

    // 创建游戏引擎类
    self.game = new Game(60)
    self.game.init(self)
  }
}
_main.start()