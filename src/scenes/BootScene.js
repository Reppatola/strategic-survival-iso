import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('floor', 'assets/iso/floor/floor.png');

    for (let dir = 0; dir < 8; dir++) {
      this.load.image(
        `hero_${dir}_idle`,
        `assets/iso/characters/male/Male_${dir}_Idle0.png`
      );

      for (let f = 0; f <= 9; f++) {
        this.load.image(
          `hero_${dir}_run_${f}`,
          `assets/iso/characters/male/Male_${dir}_Run${f}.png`
        );
      }
    }
  }

  create() {
    this.scene.start('Game');
  }
}