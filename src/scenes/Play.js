import Phaser from 'phaser';

export default class PlayScene extends Phaser.Scene {
  constructor () {
    super({
      key: 'play',
      physics: {
        arcade: {
          gravity: { y: 300 },
          debug: true
        }
      }
    });
  }

  create () {
    this.gameOver = false;
    this.score = 0;
    //  A simple background for our game
    this.bg = this.add.image(400, 300, 'sky');
    this.bg.setScrollFactor(0); // lås bakgrunden till kameran

    this.cloud = this.add.image(32, 96, 'clip');
    this.cloud.setScrollFactor(0.2); // scrolla framf. bakgrunden i annan ratio

    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    this.platforms.create(2000, 568, 'ground').setScale(20, 2).refreshBody(); // stort golv

    //  Now let's create some ledges
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');

    // The player and its settings
    this.player = this.add.sprite(
      0,
      0,
      'necromancer'
    )
    .setScale(2);

    this.playerContainer = this.add.container(100, 450);
    this.playerContainer.setSize(32, 32);
    this.physics.world.enable(this.playerContainer);
    this.playerContainer.add(this.player);
    // this.container.setDepth(3);

    //  Player physics properties. Give the little guy a slight bounce.
    this.playerContainer.body.setBounce(0.2);
    this.playerContainer.body.setCollideWorldBounds(false);

    this.knife = this.add.sprite(32, 0, 'knife').setScale(2);
    this.knife.angle = 90;
    this.playerContainer.add(this.knife);

    // kamera som följer spelaren på x
    this.camera = this.cameras.main;
    this.camera.setBounds(-1000, 0, 4000, 600); // lite random "värld-bounds"
    this.camera.startFollow(this.playerContainer);
    
    // this.anims.create({
    //   key: 'walk',
    //   frames: this.anims.generateFrameNames('cavedude', {
    //     frames: [
    //       'dude_walk_0',
    //       'dude_walk_1',
    //       'dude_walk_2',
    //       'dude_walk_3']
    //   }),
    //   frameRate: 10,
    //   repeat: -1
    // });

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNames('necromancer', {
        frames: [
          'necromancer_idle_anim_f0',
          'necromancer_idle_anim_f1',
          'necromancer_idle_anim_f2',
          'necromancer_idle_anim_f3']
      }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNames('necromancer', {
        frames: [
          'necromancer_run_anim_f0',
          'necromancer_run_anim_f1',
          'necromancer_run_anim_f2',
          'necromancer_run_anim_f3']
      }),
      frameRate: 10,
      repeat: -1
    });

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    this.stars = this.physics.add.group({
        key: 'star',
        repeat: 1,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    this.stars.children.iterate(function (child) {

        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    this.bombs = this.physics.add.group();

    //  The score
    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(this.playerContainer, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.collider(this.bombs, this.platforms);

    // //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(this.playerContainer, this.stars, this.collectStar, null, this);

    this.physics.add.collider(this.playerContainer, this.bombs, this.hitBomb, null, this);

    // this.scene.launch('pause');
    // // https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scenemanager/
    const esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    esc.on('down', () => {
      // this.scene.pause('play');
      // this.scene.setVisible(true, 'pause');
      // this.scene.moveUp('pause');
      this.scene.switch('pause');
    });

  }

  update () {

    if (this.gameOver)
    {
        return;
    }

    let speed = 400;

    if (this.scene.isVisible('pause')) {
      this.scene.setVisible(false, 'pause');
    }

    if (this.cursors.left.isDown)
    {
      this.playerContainer.body.setVelocityX(-speed);

      this.player.flipX = true;
      this.player.anims.play('run', true);
    }
    else if (this.cursors.right.isDown)
    {
      this.playerContainer.body.setVelocityX(speed);

      this.player.flipX = false;
      this.player.anims.play('run', true);
    }
    else
    {
      this.playerContainer.body.setVelocityX(0);

      // this.player.anims.stop();
      this.player.anims.play('idle', true);
    }

    if (this.cursors.up.isDown && this.playerContainer.body.touching.down)
    {
      this.playerContainer.body.setVelocityY(-330);
    }
  }

  collectStar (player, star)
  {
    star.disableBody(true, true);

      //  Add and update the score
      this.score += 10;
      this.scoreText.setText('Score: ' + this.score);

      if (this.stars.countActive(true) === 0)
      {
          //  A new batch of stars to collect
          this.stars.children.iterate(function (child) {

              child.enableBody(true, child.x, 0, true, true);

          });

          var x = (this.playerContainer.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

          var bomb = this.bombs.create(x, 16, 'bomb');
          bomb.setBounce(1);
          bomb.setCollideWorldBounds(true);
          bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
          bomb.allowGravity = false;

      }
    }

  hitBomb (player, bomb)
  {
      this.physics.pause();

      player.setTint(0xff0000);

      this.player.anims.stop();

      this.gameOver = true;
      this.scene.switch('end');
  }

  render () {
    this.game.debug.cameraInfo(this.game.camera, 32, 32);
    this.game.debug.spriteCoords(this.playerContainer, 32, 500);
  }
}
