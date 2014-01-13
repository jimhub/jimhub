game = new Phaser.Game(800, 300, Phaser.CANVAS, 'header', { preload: preload, create: create, update: update });

function preload() {
    game.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/tiles.png', 32, 32);
    game.load.image('bg', 'assets/skybg.png');

    game.stage.backgroundColor = 'rgba(0, 0, 0, 0)';
}

var map;
var layer;
var cursors;
var sprite;
var emitter;

function create() {

    //  A Tilemap object just holds the data needed to describe the map (i.e. the json exported from Tiled, or the CSV exported from elsewhere).
    //  You can add your own data or manipulate the data (swap tiles around, etc) but in order to display it you need to create a TilemapLayer.
    game.add.sprite(0, 0, 'bg');

    map = game.add.tilemap('level1');

    map.addTilesetImage('tiles', 'tiles');

    layer = map.createLayer(0);

    //  Basically this sets EVERY SINGLE tile to fully collide on all faces
    //map.setCollisionByExclusion([7, 32, 35, 36, 47]);

    // layer.debug = true;

    // create rock layer
    map.createLayer(1);

    // create decoration layer
    map.createLayer(2);

    layer.resizeWorld();

    /*sprite = game.add.sprite(450, 80, 'phaser');
    sprite.anchor.setTo(0.5, 0.5);
    sprite.angle = 5;

    game.camera.follow(sprite);
    // game.camera.deadzone = new Phaser.Rectangle(160, 160, layer.renderWidth-320, layer.renderHeight-320);

    cursors = game.input.keyboard.createCursorKeys();
    */
}

function update() {

    /*game.physics.collide(sprite, layer);
    game.physics.collide(emitter, layer);

    sprite.body.velocity.x = 0;
    sprite.body.velocity.y = 0;

    if (cursors.up.isDown)
    {
        sprite.body.velocity.y = -150;
    }
    else if (cursors.down.isDown)
    {
        sprite.body.velocity.y = 150;
    }

    if (cursors.left.isDown)
    {
        sprite.body.velocity.x = -150;
        sprite.scale.x = -1;
    }
    else if (cursors.right.isDown)
    {
        sprite.body.velocity.x = 150;
        sprite.scale.x = 1;
    }
    */
}