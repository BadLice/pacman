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
		ellipse(this.x+this.width/2,this.y+this.width/2,this.width,this.width);
	}

	update()
	{
		this.die();
		this.win();
		this.control();
		this.move();
		this.eat();
	}

	win()
	{
		var wins = true;
		for (var i = xdim - 1; i >= 0 && wins; i--)
		{

			for (var j = ydim- 1; j >= 0 && wins; j--)
			{
				if(mapTiles[i][j] instanceof FoodTile && !mapTiles[i][j].eaten)
					wins = false;
			}
		}

		if(wins)
		{
			textSize(72);
			fill(0,255,0);
			stroke(255);
			text("YOU WON!!",250,450);
			noLoop();
		}

	}

	die()
	{

		if(this.tx == blinky.tx && this.ty == blinky.ty && !blinky.scatterMode && !blinky.dead)
			this.gameOver();
		if(this.tx == pinky.tx && this.ty == pinky.ty && !pinky.scatterMode && !pinky.dead)
			this.gameOver();
		if(this.tx == inky.tx && this.ty == inky.ty && !inky.scatterMode && !inky.dead)
			this.gameOver();
		if(this.tx == clyde.tx && this.ty == clyde.ty && !clyde.scatterMode && !clyde.dead)
			this.gameOver();
	}

	gameOver()
	{
		textSize(72);
		fill(255,0,0);
		stroke(255);
		text("GAME OVER",240,450);
		noLoop();
	}

	eat()
	{
		if(mapTiles[this.tx][this.ty] instanceof PillowTile)
		{
			if(!mapTiles[this.tx][this.ty].eaten)
			{
				inky.scatterMode=true;
				blinky.scatterMode=true;
				clyde.scatterMode=true;
				pinky.scatterMode=true;
			}	
		}
		if(mapTiles[this.tx][this.ty] instanceof FoodTile)
			if(mapTiles[this.tx][this.ty].eaten == false)
				mapTiles[this.tx][this.ty].eaten = true;

		if(this.tx == blinky.tx && this.ty == blinky.ty && blinky.scatterMode)
			blinky.die();
		if(this.tx == pinky.tx && this.ty == pinky.ty && pinky.scatterMode)
			pinky.die();
		if(this.tx == inky.tx && this.ty == inky.ty && inky.scatterMode)
			inky.die();
		if(this.tx == clyde.tx && this.ty == clyde.ty && clyde.scatterMode)
			clyde.die();

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
		if(keyIsDown(UP_ARROW))
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

		if(mouseIsPressed)
		{
			if(mouseY<ydim*dim/3)
			{
				this.nextDir=2;
			}

			if(mouseY>ydim*dim/4)
			{
				this.nextDir=0;
			}

			if(mouseY>ydim*dim/3 && mouseY<ydim*dim/3*2)
			{
				if(mouseX<xdim*dim/2)
				{
					this.nextDir=1;
				}
				else
				{
					this.nextDir=3;
				}
			}
		}
	}
}