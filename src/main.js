import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  width: 960,
  height: 540,
  backgroundColor: '#1a1a1a',
  parent: 'app',
  scene: { preload, create },
};

const scene = new Phaser.Scene('IsoTest');

const TILE_W = 256;
const TILE_H = 128;
const MAP_W = 8;
const MAP_H = 8;
const SCALE = 0.4;
const TILE_W_EFF = TILE_W * SCALE;
const TILE_H_EFF = TILE_H * SCALE;
const CENTER_X = 480;
const CENTER_Y = 100;

function preload() {
  this.load.image('floor', 'assets/iso/floor/floor.png');
}

function create() {
  for (let row = 0; row < MAP_H; row++) {
    for (let col = 0; col < MAP_W; col++) {
      const x = (col - row) * (TILE_W_EFF / 2) + CENTER_X;
      const y = (col + row) * (TILE_H_EFF / 2) + CENTER_Y;

      const tile = this.add.image(x, y, 'floor');
      // ВАЖНО: тайл имеет пустое место сверху → ставим anchor в нижнюю часть
      tile.setOrigin(0.5, 0.875);
      tile.setScale(SCALE);
      tile.setDepth(y);
    }
  }
}

new Phaser.Game(config);