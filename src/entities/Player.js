import { SCALE, PLAYER_SPEED } from '../config.js';

export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;
    this.speed = PLAYER_SPEED;
    this.facing = 0;
    this.frame = 0;
    this.animTimer = 0;
    this.frameDuration = 70;

    this.sprite = scene.add.image(x, y, 'hero_0_idle');
    this.sprite.setOrigin(0.5, 0.9);
    this.sprite.setScale(SCALE);
    this.sprite.setDepth(y);

    this.cursors = scene.input.keyboard.createCursorKeys();
    this.wasd = scene.input.keyboard.addKeys('W,A,S,D');

    // === РЕЖИМ ТЕСТА: клавиши 1..8 → Male_0..Male_7 ===
    scene.input.keyboard.on('keydown', (event) => {
      const keys = ['DIGIT1','DIGIT2','DIGIT3','DIGIT4','DIGIT5','DIGIT6','DIGIT7','DIGIT8'];
      const idx = keys.indexOf(event.code);
      if (idx !== -1) {
        this.sprite.setTexture(`hero_${idx}_idle`);
        console.log(`Тест: показан Male_${idx}_Idle0`);
      }
    });
  }

  update(delta) {
    const dt = delta / 1000;

    let vx = 0;
    let vy = 0;

    if (this.wasd.A.isDown || this.cursors.left.isDown)  vx -= 1;
    if (this.wasd.D.isDown || this.cursors.right.isDown) vx += 1;
    if (this.wasd.W.isDown || this.cursors.up.isDown)    vy -= 1;
    if (this.wasd.S.isDown || this.cursors.down.isDown)  vy += 1;

    if (vx === 0 && vy === 0) {
      this.sprite.setTexture(`hero_${this.facing}_idle`);
      this.frame = 0;
      this.animTimer = 0;
      return;
    }

    const len = Math.hypot(vx, vy);
    vx /= len;
    vy /= len;

    this.sprite.x += vx * this.speed * dt;
    this.sprite.y += vy * this.speed * dt;
    this.sprite.setDepth(this.sprite.y);

    // Направление 0..7
    const angle = Math.atan2(vy, vx);
    const octant = Math.round(angle / (Math.PI / 4));
    this.facing = (octant + 1 + 8) % 8;

    // Анимация
    this.animTimer += delta;
    if (this.animTimer >= this.frameDuration) {
      this.animTimer -= this.frameDuration;
      this.frame = (this.frame + 1) % 10;
    }

    this.sprite.setTexture(`hero_${this.facing}_run_${this.frame}`);
  }
}