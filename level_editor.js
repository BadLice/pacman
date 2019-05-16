var mapTiles=[];
var precI=-1
var precJ=-1
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


