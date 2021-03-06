var mapGame;
var pxWidth = 5;
var player;
var mapTiles=[];
var enemy;

function setup()
{
	createCanvas(dim*xdim,dim*ydim);

	initMapTiles()
	importMap(mapJson)

	player = new Player(14,24);

	blinky = new Blinky(14,11);
	pinky = new Pinky(16,15);
	inky = new Inky(14,15);
	clyde = new Clyde(12,15);
}

function draw()
{
	background(0);
	for (var i = xdim - 1; i >= 0; i--) 
	{
		for (var j = ydim- 1; j >= 0; j--) 
		{
			mapTiles[i][j].draw();
		}
	}


	blinky.update();
	blinky.draw();

	pinky.update();
	pinky.draw();

	inky.update();
	inky.draw();

	clyde.update();
	clyde.draw();

	player.draw();
	player.update();

	textSize(20);
	fill(255);
	stroke(255);
	text("Touch the edges of the screen to control pacman",10,20);
}


