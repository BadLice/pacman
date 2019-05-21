var mapTiles=[];
var precI=-1
var precJ=-1
var currentType = 0;
var typeNumbers = 5;

function setup()
{

	createCanvas(dim*xdim,dim*ydim);

	initMapTiles()
}

function draw()
{
	background(70);

	for(var i=0;i<xdim;i++)
	{
		stroke(0);
		fill(0);
		line(dim*i,0,dim*i,height);
	}

	for(var i=0;i<ydim;i++)
	{
		stroke(0);
		fill(0);
		line(0,dim*i,width,dim*i);
	}	

	mouseControl()
	drawTiles()

	if(keyIsDown(84)) //press 'T'
	{
		currentType++;
		console.log('type: '+currentType%typeNumbers)
	}
}

function mouseControl()
{
	if(mouseIsPressed)
	{
		if(precPressed)
			ok = false
		else
			ok = true
			
		precPressed = true

	}
	else
	{
		ok = true
		precPressed = false
	}

	switch(currentType % typeNumbers)
	{
		case 1:
		case 0:
			for (var i = xdim- 1; i >= 0; i--)
			{
				for (var j = ydim - 1; j >= 0; j--)
				{

					if(mapTiles[i][j].mouseControl())
						if(ok || (precI!=i || precJ!=j))
						{
							if(mapTiles[i][j] instanceof WallTile)
							mapTiles[i][j] = new EmptyTile(mapTiles[i][j].x,mapTiles[i][j].y)

							else
								mapTiles[i][j] = new WallTile(mapTiles[i][j].x,mapTiles[i][j].y)
							precJ=j
							precI=i
						}
				}
			}
			break;

		case 2:
			for (var i = xdim- 1; i >= 0; i--)
			{
				for (var j = ydim - 1; j >= 0; j--)
				{
					if(mapTiles[i][j].mouseControl())
					{
						
						if(mapTiles[i][j].type ==2)
							mapTiles[i][j] = new EmptyTile(mapTiles[i][j].x,mapTiles[i][j].y)
						if(mapTiles[i][j].type!=1)
						{
							console.log(mapTiles[i][j].type)
							mapTiles[i][j] = new FoodTile(mapTiles[i][j].x,mapTiles[i][j].y)
						}
						
					}

				}
			}
			break;
		case 3:
			for (var i = xdim- 1; i >= 0; i--)
				{
					for (var j = ydim - 1; j >= 0; j--)
					{
						if(mapTiles[i][j].mouseControl())
						{
							if(mapTiles[i][j].type == 3)
								mapTiles[i][j] = new EmptyTile(mapTiles[i][j].x,mapTiles[i][j].y)
							if(mapTiles[i][j].type!=1)
								mapTiles[i][j] = new PillowTile(mapTiles[i][j].x,mapTiles[i][j].y)
						}
					}
				}
			break;

		case 4:
			for (var i = xdim- 1; i >= 0; i--)
			{
				for (var j = ydim - 1; j >= 0; j--)
				{
					if(mapTiles[i][j].mouseControl())
					{
						if(mapTiles[i][j].type == 4)
							mapTiles[i][j] = new EmptyTile(mapTiles[i][j].x,mapTiles[i][j].y)
						else
							mapTiles[i][j] = new DoorTile(mapTiles[i][j].x,mapTiles[i][j].y)


					}
				}
			}
			break;
	}



	
}

function drawTiles()
{
	for (var i = xdim- 1; i >= 0; i--)
	{
		for (var j = ydim - 1; j >= 0; j--)
		{
			mapTiles[i][j].draw();
		}
	}
}


