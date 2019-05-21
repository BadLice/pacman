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

	player = new Player(13,11);
	blinky = new Blinky(16,3);

	// pinky = new Pinky(16,28);
	inky = new Inky(3,29);
}

function draw()
{
	background(51);
	player.update();
	player.draw();

	blinky.update();
	blinky.draw();

	// pinky.update();
	// pinky.draw();

	inky.update();
	inky.draw();

	
	for (var i = xdim - 1; i >= 0; i--) 
	{
		for (var j = ydim- 1; j >= 0; j--) 
		{
			mapTiles[i][j].draw();
		}
	}
}


