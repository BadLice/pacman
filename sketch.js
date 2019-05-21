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
	background(51);
	for (var i = xdim - 1; i >= 0; i--) 
	{
		for (var j = ydim- 1; j >= 0; j--) 
		{
			mapTiles[i][j].draw();
		}
	}

	player.update();
	player.draw();

	blinky.update();
	blinky.draw();

	pinky.update();
	pinky.draw();

	inky.update();
	inky.draw();

	clyde.update();
	clyde.draw();

	
	
}


