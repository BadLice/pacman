class Player
{
	constructor(x,y)
	{
		this.tx=x;
		this.ty=y
		this.x=0;
		this.y=0;
		this.width = dim;
		this.col = color(255,255,0);
		this.direction = -1;
		this.nextDir = -1;

		this.timex = millis();
		this.timeLease = .2; //in seconds

		this.refreshDrawPosition();
	}

	refreshDrawPosition()
	{
		this.x=mapTiles[this.tx][this.ty].x;
		this.y=mapTiles[this.tx][this.ty].y;
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
		this.move();
		this.eat();

	}

	eat()
	{
		if(mapTiles[this.tx][this.ty] instanceof FoodTile)
			if(mapTiles[this.tx][this.ty].eaten == false)
				mapTiles[this.tx][this.ty].eaten = true;

	}

	collision(dir)
	{
		switch(dir)
		{
			//down
			case 0:
				if((mapTiles[this.tx][this.ty+1] instanceof WallTile))
					return true;
			break;

			//left
			case 1:
				if(this.tx>0)
					if((mapTiles[this.tx-1][this.ty] instanceof WallTile))
						return true;
			break;

			//up
			case 2:
				if((mapTiles[this.tx][this.ty-1] instanceof WallTile))
					return true;
			break;

			//rigth
			case 3:		
				if(this.tx<mapTiles.length-1)
					if((mapTiles[this.tx+1][this.ty] instanceof WallTile))
						return true;
			break;
		}
	}

	move()
	{
		var dir = -1;
		if(!this.collision(this.nextDir))
			this.direction = this.nextDir

		if(!this.collision(this.direction))
		{
			if(millis()-this.timex > this.timeLease*1000)
			{		

				this.timex = millis();
				switch(this.direction)
				{
					//down
					case 0:
						this.ty+=1;
					break;

					//left
					case 1:
						this.tx-=1;

						if(this.tx<0)
							this.tx = 29;
					break;

					//up
					case 2:
						this.ty-=1;
					break;

					//rigth
					case 3:		
						this.tx+=1;
						if(this.tx > 29)
							this.tx = 0;
					break;
				}

			}
		}
				this.refreshDrawPosition();
		
		
	}

	control()
	{
		if(keyIsDown(UP_ARROW) )
		{
			this.nextDir=2;
		}
		if(keyIsDown(DOWN_ARROW))
		{
			this.nextDir=0;
		}
		if(keyIsDown(RIGHT_ARROW))
		{
			this.nextDir=3;
		}
		if(keyIsDown(LEFT_ARROW))
		{
			this.nextDir=1;	
		}
	}
}