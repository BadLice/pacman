var mapGame;
var pxWidth = 5;
var player;
var mapTiles=[];

function setup()
{
	createCanvas(dim*xdim,dim*ydim);
	player = new Player(450,300);

	initMapTiles()
	importMap(mapJson)

}

function draw()
{
	background(51);
	player.update();
	player.draw();
	
	for (var i = xdim - 1; i >= 0; i--) 
	{
		for (var j = ydim- 1; j >= 0; j--) 
		{
			mapTiles[i][j].draw();
		}
	}
}


