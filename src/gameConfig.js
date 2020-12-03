import Phaser from 'phaser';
import BootScene from './scenes/Boot';
import PlayScene from './scenes/Play';
import MenuScene from './scenes/Menu';
import EndScene from './scenes/End';
import PauseScene from './scenes/Pause';

export default {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  title: 'Exempel med parcel',
  banner: { text: 'white', background: ['#FD7400', '#FFE11A', '#BEDB39', '#1F8A70', '#004358'] },
  scene: [BootScene, MenuScene, PlayScene, EndScene, PauseScene]
};