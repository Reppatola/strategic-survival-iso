import Phaser from 'phaser';
import MapBuilder from '../world/MapBuilder.js';
import Player from '../entities/Player.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    // Карта (пол)
    this.map = new MapBuilder(this);

    // Игрок в центре карты
    const center = this.map.getCenter();
    this.player = new Player(this, center.x, center.y);
  }

  update(time, delta) {
    this.player.update(delta);
  }
}