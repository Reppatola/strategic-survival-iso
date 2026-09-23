import {
  TILE_W_EFF, TILE_H_EFF, SCALE,
  MAP_W, MAP_H, CENTER_X, CENTER_Y,
} from '../config.js';

export default class MapBuilder {
  constructor(scene) {
    this.scene = scene;
    this.buildFloor();
  }

  buildFloor() {
    for (let row = 0; row < MAP_H; row++) {
      for (let col = 0; col < MAP_W; col++) {
        const x = (col - row) * (TILE_W_EFF / 2) + CENTER_X;
        const y = (col + row) * (TILE_H_EFF / 2) + CENTER_Y;

        const tile = this.scene.add.image(x, y, 'floor');
        tile.setOrigin(0.5, 0.875);
        tile.setScale(SCALE);
        tile.setDepth(-1000);
      }
    }
  }

  // Возвращает мировые координаты центра карты
  getCenter() {
    return {
      x: CENTER_X,
      y: CENTER_Y + MAP_H * TILE_H_EFF / 2,
    };
  }
}