import Phaser from 'phaser';
import images from './../assets/*.png';

export default class BootScene extends Phaser.Scene {
  constructor () {
    super({ key: 'boot' });
  }

  preload () {
    var bg = this.add.rectangle(400, 300, 400, 30, 0x666666);
    var bar = this.add.rectangle(bg.x, bg.y, bg.width, bg.height, 0xffffff).setScale(0, 1);

    console.table(images);

    this.load.image('clip', [images.clip, images.normal]);
    this.load.image('sky', [images.sky, images.normal]);
    this.load.image('ground', [images.platform, images.normal]);
    this.load.image('star', [images.star, images.normal]);
    this.load.image('bomb', [images.bomb, images.normal]);
    this.load.image('knife', [images.knife, images.normal]);
    
    this.load.multiatlas(
      'cavedude',
      'assets/cavedude.json',
      'assets/');

    this.load.multiatlas(
      'necromancer',
      'assets/necromancer.json',
      'assets/');

    this.load.on('progress', function (progress) {
      bar.setScale(progress, 1);
    });
  }

  update () {
    this.scene.start('menu');
    // this.scene.start('play');
    // this.scene.remove();
  }
}