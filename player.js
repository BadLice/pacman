class Player
{
	constructor(x,y)
	{
		this.x=x;
		this.y=y;
		this.width = dim-5;
		this.col = color(0,255,255);
		this.direction = 0;
		this.speed=1

		this.maxRight=width;
		this.maxLeft=0;
		this.maxUp=0;
		this.maxDown=height;
	}

	draw()
	{
		fill(this.col);
		noStroke();
		rect(this.x,this.y,this.width,this.width);
	}

	update()
	{
		this.control();
		this.tileCollision();
		this.move();

	}

	move()
	{
		switch(this.direction)
		{
			//down
			case 0:
				if(this.y+this.width<=this.maxDown)
					this.y+=this.speed;
			break;

			//left
			case 1:
				if(this.x>=this.maxLeft)
					this.x-=this.speed;
			break;

			//up
			case 2:
				if(this.y>=this.maxUp)
					this.y-=this.speed;
			break;

			//rigth
			case 3:		
				if(this.x+this.width<=this.maxRight)
					this.x+=this.speed;
			break;
		}
	}

	control()
	{
		if(keyIsDown(UP_ARROW) )
			this.direction=2;
		if(keyIsDown(DOWN_ARROW))
			this.direction=0;
		if(keyIsDown(RIGHT_ARROW))
			this.direction=3;
		if(keyIsDown(LEFT_ARROW))
			this.direction=1;	
	}

	tileCollision()
	{
		var currRigthMax = width;
		var currLeftMax = 0;
		var currUpMax = 0;
		var currDownMax = height;

		for (var i = xdim - 1; i >= 0; i--)
		{
			for(var j = ydim - 1; j >= 0; j--)
			{		
				if(mapTiles[i][j] instanceof WallTile)
				{
					if((this.y >= mapTiles[i][j].y && this.y <= mapTiles[i][j].y+mapTiles[i][j].w)
					|| (this.y+this.width >= mapTiles[i][j].y && this.y+this.width <= mapTiles[i][j].y+mapTiles[i][j].w))
						{
							if(mapTiles[i][j].x>=this.x)
							{
								//rigth collision max
								if(mapTiles[i][j].x<currRigthMax)
								 	currRigthMax = mapTiles[i][j].x;
							}
							else
							{
								//left collision max
								if(mapTiles[i][j].x>currLeftMax)
									currLeftMax = mapTiles[i][j].x+mapTiles[i][j].w;
							}
						}

					if((this.x >= mapTiles[i][j].x && this.x <= mapTiles[i][j].x+mapTiles[i][j].w) 
					|| this.x+this.width >= mapTiles[i][j].x && this.x+this.width <= mapTiles[i][j].x+mapTiles[i][j].w)
					{
						if(mapTiles[i][j].y<=this.y)
						{
							//up collision max
							if(mapTiles[i][j].y>currUpMax)
								currUpMax = mapTiles[i][j].y+mapTiles[i][j].w;

						}
						else
						{
							//down collision max
							if(mapTiles[i][j].y<currDownMax)
								currDownMax = mapTiles[i][j].y

						}
					}
				}
				
			}
		}

		this.maxRight = currRigthMax;
		this.maxLeft =  currLeftMax;
		this.maxUp = currUpMax;
		this.maxDown = currDownMax;
	}
}