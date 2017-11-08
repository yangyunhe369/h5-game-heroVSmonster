/* by：弦云孤赫——David Yang
** github - https://github.com/yangyunhe369
*/
// 封装打印日志方法
const log = console.log.bind(console)
// 生成图片对象方法
const imageFromPath = function (src) {
  let img = new Image()
  img.src = './images/' + src
  return img
}
// 图片素材路径
const allImg = {
  bg: 'gameBg.jpg',
  hero: {
    idle: [ // 站立不动
      'hero-Idle/hero_Idle_0.png',
      'hero-Idle/hero_Idle_1.png',
      'hero-Idle/hero_Idle_2.png',
      'hero-Idle/hero_Idle_3.png',
      'hero-Idle/hero_Idle_4.png',
      'hero-Idle/hero_Idle_5.png',
      'hero-Idle/hero_Idle_6.png',
      'hero-Idle/hero_Idle_7.png',
    ],
    run: [ // 移动
      'hero-Run/hero_Run_0.png',
      'hero-Run/hero_Run_1.png',
      'hero-Run/hero_Run_2.png',
      'hero-Run/hero_Run_3.png',
      'hero-Run/hero_Run_4.png',
      'hero-Run/hero_Run_5.png',
      'hero-Run/hero_Run_6.png',
      'hero-Run/hero_Run_7.png',
    ],
    attack: [ // 攻击
      'hero-Attack/hero_Attack_0.png',
      'hero-Attack/hero_Attack_1.png',
      'hero-Attack/hero_Attack_2.png',
      'hero-Attack/hero_Attack_3.png',
      'hero-Attack/hero_Attack_4.png',
      'hero-Attack/hero_Attack_5.png',
      'hero-Attack/hero_Attack_6.png',
      'hero-Attack/hero_Attack_7.png',
    ],
    hurt: [ // 受伤
      'hero-Hurt/hero_Hurt_0.png',
      'hero-Hurt/hero_Hurt_1.png',
      'hero-Hurt/hero_Hurt_2.png',
      'hero-Hurt/hero_Hurt_3.png',
      'hero-Hurt/hero_Hurt_4.png',
      'hero-Hurt/hero_Hurt_5.png',
      'hero-Hurt/hero_Hurt_6.png',
      'hero-Hurt/hero_Hurt_7.png',
    ],
    die: [ // 死亡
      'hero-Die/hero_Die_0.png',
      'hero-Die/hero_Die_1.png',
      'hero-Die/hero_Die_2.png',
      'hero-Die/hero_Die_3.png',
      'hero-Die/hero_Die_4.png',
      'hero-Die/hero_Die_5.png',
      'hero-Die/hero_Die_6.png',
      'hero-Die/hero_Die_7.png',
    ],
  },
  monster: {
    idle: [ // 站立不动
      'monster-Idle/monster_Idle_0.png',
      'monster-Idle/monster_Idle_1.png',
      'monster-Idle/monster_Idle_2.png',
      'monster-Idle/monster_Idle_3.png',
      'monster-Idle/monster_Idle_4.png',
      'monster-Idle/monster_Idle_5.png',
      'monster-Idle/monster_Idle_6.png',
      'monster-Idle/monster_Idle_7.png',
    ],
    run: [ // 移动
      'monster-Run/monster_Run_0.png',
      'monster-Run/monster_Run_1.png',
      'monster-Run/monster_Run_2.png',
      'monster-Run/monster_Run_3.png',
      'monster-Run/monster_Run_4.png',
      'monster-Run/monster_Run_5.png',
      'monster-Run/monster_Run_6.png',
      'monster-Run/monster_Run_7.png',

    ],
    attack: [ // 攻击
      'monster-Attack/monster_Attack_0.png',
      'monster-Attack/monster_Attack_1.png',
      'monster-Attack/monster_Attack_2.png',
      'monster-Attack/monster_Attack_3.png',
      'monster-Attack/monster_Attack_4.png',
      'monster-Attack/monster_Attack_5.png',
      'monster-Attack/monster_Attack_6.png',
      'monster-Attack/monster_Attack_7.png',
    ],
    hurt: [ // 攻击
      'monster-Hurt/monster_Hurt_0.png',
      'monster-Hurt/monster_Hurt_1.png',
      'monster-Hurt/monster_Hurt_2.png',
      'monster-Hurt/monster_Hurt_3.png',
      'monster-Hurt/monster_Hurt_4.png',
      'monster-Hurt/monster_Hurt_5.png',
      'monster-Hurt/monster_Hurt_6.png',
      'monster-Hurt/monster_Hurt_7.png',
    ],
    die: [ // 死亡
      'monster-Die/monster_Die_0.png',
      'monster-Die/monster_Die_1.png',
      'monster-Die/monster_Die_2.png',
      'monster-Die/monster_Die_3.png',
      'monster-Die/monster_Die_4.png',
      'monster-Die/monster_Die_5.png',
      'monster-Die/monster_Die_6.png',
      'monster-Die/monster_Die_7.png',
    ],
  }
}
