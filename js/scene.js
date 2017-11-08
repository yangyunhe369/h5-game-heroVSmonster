/* by：弦云孤赫——David Yang
** github - https://github.com/yangyunhe369
*/
/**
 * 动画类
 */
class Animation{
  constructor (type, action, fps) {
    let a = {
      type: type,                                        // 角色类型，hero || monster
      action: action,                                    // 根据传入动作生成不同动画对象数组
      images: [],                                        // 当前引入角色图片对象数组
      img: null,                                         // 当前显示角色图片
      imgIdx: 0,                                         // 当前角色图片序列号
      count: 0,                                          // 计数器，控制动画运行
      fps: fps,                                          // 角色动画运行速度系数，值越小，速度越快
    }
    Object.assign(this, a)
  }
  /**
   * 为角色不同动作创造动画序列
   */
  create () {
    let self = this
    if (self.type === 'hero') {
      for(let item of allImg.hero[self.action]){
        self.images.push(imageFromPath(item))
      }
    } else if (self.type === 'monster') {
      for(let item of allImg.monster[self.action]){
        self.images.push(imageFromPath(item))
      }
    }
  }
}
/**
 * 角色模型类
 */
class Role{
  constructor (_main, obj) {
    let h = {
      _main: _main,                                        // 游戏主函数对象
      type: obj.type,                                      // 角色类型，hero || monster
      x: obj.x,                                            // x 轴坐标
      y: obj.y,                                            // y 轴坐标
      w: obj.w,                                            // 角色图片宽度
      h: obj.h,                                            // 角色图片高度
      speedX: 3,                                           // 角色x轴移动速度
      speedY: 3,                                           // 角色y轴移动速度
      life: 8,                                             // 角色血量

      // animation: {  
      //   idle: null,                                        // 站立动画对象
      //   run: null,                                         // 奔跑动画对象
      //   attack: null,                                      // 攻击动画对象
      //   hurt: null,                                        // 受伤动画对象
      //   die: null,                                         // 死亡动画对象
      // },

      idle: null,                                          // 站立动画对象
      run: null,                                           // 奔跑动画对象
      attack: null,                                        // 攻击动画对象
      hurt: null,                                          // 受伤动画对象
      die: null,                                           // 死亡动画对象
      canMove: true,                                       // 能否移动
      isFlipX: false,                                      // 是否翻转画布绘制图片，用于绘制人物朝右动画
      isAttacking: false,                                  // 是否处于攻击状态
      isDie: false,                                        // 是否死亡，血量降为 0 即死亡
      direction: null,                                     // 角色朝向
      state: 1,                                            // 保存当前状态值，默认为 0
      state_IDLE: 1,                                       // 站立状态
      state_RUN: 2,                                        // 奔跑状态
      state_ATTACK: 3,                                     // 攻击状态
      state_HURT: 4,                                       // 受伤状态
      state_DIE: 5,                                        // 死亡状态
    }
    Object.assign(this, h)
  }
  /**
   * 初始化方法
   * 对角色的站位方向、状态、不同姿势动画序列进行初始化
   */
  init (info) {
    let self = this
    // 角色初始站位方向，状态
    info.type === 'hero' ? self.direction = 'right' : self.direction = 'left'
    // 是否翻转绘制角色，根据角色朝向判断
    self.isFlipX = self.direction === 'left' ? false : true
    // 角色默认状态值为1，站立状态
    self.state = 1
    // 角色站立
    self.idle = new Animation(self.type, 'idle', 8)
    self.idle.create()
    // 角色奔跑
    self.run = new Animation(self.type, 'run', 4.5),
    self.run.create()
    // 角色攻击
    self.attack = new Animation(self.type, 'attack', 4)
    self.attack.create()
    // 角色受伤
    self.hurt = new Animation(self.type, 'hurt', 4)
    self.hurt.create()
    // 角色死亡
    self.die = new Animation(self.type, 'die', 4)
    self.die.create()
  }
  /**
   * 判断角色状态并返回对应动画对象名称方法
   */
  switchState (state) {
    let self = this
    switch (state) {
      case self.state_IDLE:
        return 'idle'
      case self.state_RUN:
        return 'run'
      case self.state_ATTACK:
        return 'attack'
      case self.state_HURT:
        return 'hurt'
      case self.state_DIE:
        return 'die'
    }
  }
  /**
   * 角色运行动画切换方法
   * game: 游戏对象
   */
  move (game) {
    let self = this,
        stateName = self.switchState(self.state)
    // 累加动画计数器
    self[stateName].count += 1
    // 设置角色动画运行速度
    self[stateName].imgIdx = Math.floor(self[stateName].count / self[stateName].fps)
    // 一整套动画完成后重置动画计数器
    self[stateName].imgIdx === 7 ? self[stateName].count = 0 : self[stateName].count = self[stateName].count
    // 设置当前帧动画对象
    if (game.state !== game.state_STOP) { // 运动时，逐帧显示图片
      if (stateName === 'hurt' && self[stateName].imgIdx === 7) { // 受伤时，执行完一套动画切换为站立状态后允许移动
        // 角色状态改为站立状态
        self.state = self.state_IDLE
        self.canMove = true
      } else if (stateName === 'die' && self[stateName].imgIdx === 7) {
        // 游戏状态改为结束状态
        game.state = game.state_GAMEOVER
        self[stateName].img = self[stateName].images[7]
      } else {
        self[stateName].img = self[stateName].images[self[stateName].imgIdx]
      }
    } else { // 静止时，默认显示第一张图片
      self[stateName].img = self[stateName].images[0]
    }
  }
  /**
   * 执行动画方法
   * game => 游戏引擎对象
   * action => 动作类型
   *  -idle: 站立
   *  -run: 移动
   *  -attack: 攻击
   *  -hurt: 受伤
   */
  animation (game, action) {
    let self = this,
        direction = self.direction,           // 获取角色朝向
        canvas = self._main.game.canvas       // 获取 canvas 对象
    if (game.state === game.state_RUNNING) {
      switch (action) {
        case 'idle':
          self.state = self.state_IDLE
          break
        case 'run':
          self.state = self.state_RUN

          // 上下左右键移动事件，并做边界判断
          if (direction === 'up') { // 上
            if (self.y > 25) { // 大于上边界 + 血条高度
              self.y -= self.speedY
            }
          } else if (direction === 'down') { // 下
            if (self.y < canvas.height - self.h + 15) { // 大于下边界 - 图片高度 + 图片下侧空白部分
              self.y += self.speedY
            }
          } else if (direction === 'left') { // 左
            if (self.x > -10) { // 大于左边界 - 图片左侧空白部分
              self.x -= self.speedX
            }
          } else if (direction === 'right') { // 右
            if (self.x < canvas.width - self.w) { // 大于右边界 - 图片宽度 - 图片右侧空白部分
              self.x += self.speedX
            }
          }
          break
        case 'attack':
          self.state = self.state_ATTACK
          break
        case 'hurt':
          self.state = self.state_HURT
          break
        case 'die':
          self.state = self.state_DIE
          break
      }
    }
  }
}
