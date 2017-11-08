/* by：弦云孤赫——David Yang
** github - https://github.com/yangyunhe369
*/
/**
 * 游戏引擎函数
 */
class Game {
  constructor (fps = 60) {
    let g = {
      actions: {},                                                  // 按键事件方法集，并在按键事件触发时调用对应方法
      keydowns: {},                                                 // 按键事件生成对象集
      state: 1,                                                     // 游戏状态值，初始默认为 1
      state_START: 1,                                               // 游戏初始化
      state_RUNNING: 2,                                             // 游戏开始
      state_STOP: 3,                                                // 游戏暂停
      state_GAMEOVER: 4,                                            // 游戏结束
      canvas: document.getElementById("canvas"),                    // canvas 元素
      context: document.getElementById("canvas").getContext("2d"),  // canvas 画布
      timer: null,                                                  // 轮询定时器
      fps: fps,                                                     // 动画帧数，默认 60
    }
    Object.assign(this, g)
  }
  // 绘制所有游戏素材
  drawAll (hero, monster) {
    let g = this
    // 清除画布
    g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
    // 绘制背景
    g.drawBg()
    // 绘制角色及角色血条
    g.drawImage(hero)
    g.drawBlood(hero.x, hero.y, hero.life, hero.type)
    g.drawImage(monster)
    g.drawBlood(monster.x, monster.y, monster.life, monster.type)
  }
  // 绘制游戏背景
  drawBg () {
    let img = imageFromPath(allImg.bg)
    this.context.drawImage(img, 0, 0)
  }
  /**
   * 绘制角色血条
   * x:  x轴坐标
   * y:  y轴坐标
   * life:  血量
   * type: 角色类型 => hero || monster
   * height:  血条高度
   * fillColor:  填充颜色
   * borderWidth:  边框宽度
   * borderColor:  边框颜色
   */
  drawBlood (x, y, life, type, fillColor, borderColor, borderWidth = 1, height = 15) {
    let cxt = this.context,
        width = 6 * life // 血量单位宽度 * 总血量

    // 根据角色类型不同，绘制不同颜色血条
    if (type === 'hero') {
      fillColor = 'red'
      borderColor = 'red'
    } else {
      fillColor = '#cc3f30'
      borderColor = '#cc3f30'
    }
    // 开始绘制血条
    cxt.beginPath()
    cxt.rect(x + 26, y - 20, width, height)

    cxt.lineWidth = borderWidth
    cxt.strokeStyle = borderColor
    cxt.fillStyle = fillColor

    cxt.fill()
    cxt.stroke()
  }
  /**
   * 绘制图片
   * obj: 绘制对象
   */
  drawImage (obj) {
    let state = obj.state,                            // 当前角色状态值
        stateName = obj.switchState(obj.state)        // 判断并获取当前动画对象名称
    if (obj.isFlipX) { // 是否水平翻转图像并绘制，true 翻转且角色朝右，false 不翻转且角色朝左
      let x = obj.x + obj.w / 2
      // 把当前状态的一份拷贝压入到一个保存图像状态的栈中
      this.context.save()
      this.context.translate(x, 0)
      this.context.scale(-1, 1)
      this.context.translate(-x, 0)
      this.context.drawImage(obj[stateName].img, obj.x, obj.y)
      // 从栈中弹出存储的图形状态并恢复 CanvasRenderingContext2D 对象的属性、剪切路径和变换矩阵的值
      this.context.restore()
    } else {
      this.context.drawImage(obj[stateName].img, obj.x, obj.y)
    }
  }
  // 游戏结束执行方法
  drawGameOver (hero, monster) {
    let info = ''   // 游戏结束提示信息
    if (hero.isDie) {
      info = '恭喜怪兽获得胜利'
    }
    if (monster.isDie) {
      info = '恭喜英雄获得胜利'
    }
    // 清除定时器
    clearInterval(this.timer)
    // 清除画布
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    // 绘制背景
    this.drawBg()
    this.context.fillStyle = 'red'
    this.context.font = '48px Microsoft YaHei'
    this.context.fillText(info, 308, 226)
  }
  // 注册事件
  registerAction (key, callback) {
    this.actions[key] = callback
  }
  // 设置逐帧动画
  setTimer (hero, monster) {
    let g = this
    // 事件集合
    let actions = Object.keys(g.actions)
    for (let i = 0; i < actions.length; i++) {
      let key = actions[i]
      if(g.keydowns[key]) {
        // 如果按键被按下，调用注册的action
        g.actions[key]()
      }
    }
    // 判断游戏状态并执行相应事件
    if (g.state === g.state_START){ // 游戏开始
      // 角色移动动画
      hero.move(g)
      monster.move(g)
      // 绘制所有游戏素材
      g.drawAll(hero, monster)

      // 绘制准备开始游戏标题
      g.context.fillStyle = 'red'
      g.context.font = '48px Microsoft YaHei'
      g.context.fillText('请按空格键开始游戏', 284, 226)
    } else if (g.state === g.state_RUNNING) { // 游戏运行
      // 角色移动动画
      hero.move(g)
      monster.move(g)
      // 绘制所有游戏素材 
      g.drawAll(hero, monster)
    } else if (g.state === g.state_STOP) { // 游戏暂停
      // 绘制所有游戏素材
      g.drawAll(hero, monster)

      // 绘制准备开始游戏标题
      g.context.fillStyle = 'red'
      g.context.font = '48px Microsoft YaHei'
      g.context.fillText('请按空格键开始游戏', 284, 226)
    } else if (g.state === g.state_GAMEOVER) { // 游戏结束
      // 绘制所有游戏素材
      g.drawAll(hero, monster)
      setTimeout(function () {
        // 绘制游戏结束标题
        g.drawGameOver(hero, monster)
      },500)
    }
  }
  /**
   * 注册按键移动事件
   * role: 注册角色对象
   * keyCode: 按键keyCode值
   * direction: 角色移动方向
   * [
   *  {role: hero, keyCode: '87', direction: 'up'},
   *  ...
   * ]
   */
  registerRoleMove (roleList) {
    let game = this
    for (let item of roleList) {
      game.registerAction(item.keyCode, function () {
        if (game.state === game.state_RUNNING && item.role.canMove) {
          // 设置当前角色朝向
          item.role.direction = item.direction
          // 判断是否需要翻转角色动画
          if (item.direction === 'left') {
            // 禁止翻转动画，同时角色朝左移动
            item.role.isFlipX = false
          } else if (item.direction === 'right') {
            // 翻转动画，同时角色朝右移动
            item.role.isFlipX = true
          }
          if (game.keydowns[item.keyCode] === 'down') {
            // 角色不处于受伤状态时才能移动
            if (item.role.state !== item.role.state_HURT) {
              // 执行奔跑动画
              item.role.animation(game, 'run')
            }
          } else if (game.keydowns[item.keyCode] === 'up') {
            // 取消奔跑动画
            game.keydowns[item.keyCode] = null
            item.role.animation(game, 'idle')
          }
        }
      })
    }
  }
  /**
   * 注册按键攻击事件
   * roList: [
   *   {
   *     role: 注册角色对象
   *     keyCode: 按键keyCode值
   *   }
   *   ...
   * ]
   */
  registerRoleAttack (roleList) {
    let game = this,                        // 当前游戏引擎类
        hero = roleList[0].role,            // hero 对象
        monster = roleList[1].role          // monster 对象
    for (let item of roleList) {
      let role = item.role.type  // 当前角色类型，hero || monster
      game.registerAction(item.keyCode, function () {
        if (game.state === game.state_RUNNING) {
          if (game.keydowns[item.keyCode] === 'down') {
            // 角色不处于受伤状态时才能攻击
            if (item.role.state !== item.role.state_HURT && item.role.state !== item.role.state_DIE) {  
              // 执行攻击动画
              item.role.animation(game, 'attack')
            }
            // 禁止左右移动
            item.role.canMove = false
          } else if (game.keydowns[item.keyCode] === 'up') {
            // 取消攻击动画
            if (item.role.attack.imgIdx === 7) { // 执行一次完整动画后停止
              // 将按键事件置为空
              game.keydowns[item.keyCode] = null
              item.role.animation(game, 'idle')
              // 检测 hero、monster 是否攻击成功
              if (role === 'hero') {
                game.checkAttack(role, hero, monster)
              } else {
                game.checkAttack(role, monster, hero)
              }
              // 允许左右移动
              item.role.canMove = true
            }
          }
        }
      })
    }
  }
  /**
   * 检测是否处于攻击范围
   * role1：当前执行攻击动作角色
   * role2：当前被攻击角色
   */
  collideAttack (role1, role2) {
    let r1 = role1,
        r2 = role2
    // 两个角色图片之间的中心点距离小与两站图片宽度之和的一半，即为可攻击
    if (Math.abs((role1.x + role1.w/2) - (role2.x + role2.w/2)) < (role1.w + role2.w - 80)/2 &&
      Math.abs((role1.y + role1.h/2) - (role2.y + role2.h/2)) < (role1.h + role2.h - 150)/2) {
      if (r1.isFlipX && r1.x < r2.x ||
          !r1.isFlipX && r1.x > r2.x) { // r1面向右侧，且r2在r1右侧时；r1面向左侧，且r2在r1左侧时
        return true
      }
    }
    return false
  }
  /**
   * 检测是否攻击成功
   * roleName：角色名称
   * role1：当前执行攻击动作角色
   * role2：当前被攻击角色
   */
  checkAttack (roleName, role1, role2) {
    let game = this
    // 处于角色攻击范围时，即可攻击
    if (game.collideAttack(role1, role2)) {
      if (role2.life === 1) { // 生命值为1时
        // 执行受伤动画
        role2.animation(game, 'die')
        // 禁止移动
        role2.canMove = false
        role2.life -= 1
        // 改变角色死亡状态
        role2.isDie = true
        setTimeout(function () {
          // 生命值为0时，游戏结束
          game.state = game.state_GAMEOVER
        }, 500)
      } else {
        // 执行受伤动画
        role2.animation(game, 'hurt')
        // 禁止移动
        role2.canMove = false
        role2.life -= 1
      }
    }
  }
  /**
   * 初始化函数
   * _main: 游戏入口函数对象
   */
  init (_main) {
    let g = this,
        hero = _main.hero,
        monster = _main.monster
    // 设置键盘按下及松开相关注册函数
    window.addEventListener('keydown', function (event) {
      g.keydowns[event.keyCode] = 'down'
    })
    window.addEventListener('keyup', function (event) {
      g.keydowns[event.keyCode] = 'up'
    })
    g.registerAction = function (key, callback) {
      g.actions[key] = callback
    }
    /**
     * 为 hero 和 monster 注册按键移动事件
     * hero 按键事件，对应 W、S、A、D
     * monster 按键事件，对应 up、down、left、right方向键
     */
    g.registerRoleMove([
      {role: hero, keyCode: '87', direction: 'up'},
      {role: hero, keyCode: '83', direction: 'down'},
      {role: hero, keyCode: '65', direction: 'left'},
      {role: hero, keyCode: '68', direction: 'right'},
      {role: monster, keyCode: '38', direction: 'up'},
      {role: monster, keyCode: '40', direction: 'down'},
      {role: monster, keyCode: '37', direction: 'left'},
      {role: monster, keyCode: '39', direction: 'right'},
    ])

    /**
     * 为 hero 和 monster 注册按键攻击事件
     */
    g.registerRoleAttack([
      {role: hero, keyCode: '75'},          // 注册 hero K 键攻击事件
      {role: monster, keyCode: '101'}       // 注册 monster 小键盘 5 键攻击事件
    ])

    // 设置轮询定时器
    g.timer = setInterval(function () {
      g.setTimer(hero, monster)
    }, 1000/g.fps)

    // 注册游戏全局按键控制事件
    window.addEventListener('keydown', function (event) {
      switch (event.keyCode) {
        // 注册空格键开始游戏事件
        case 32 :
          // 开始游戏
          g.state = g.state_RUNNING
          break
        // P 键暂停游戏事件
        case 80 :
          g.state = g.state_STOP
          break
      }
    })
  }
}