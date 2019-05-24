class EmptyTile //type 0
{
	constructor(x,y)
	{
		this.x = x;
		this.y = y;
		this.w = 30;
		this.type = 0;
	}

	draw()
	{

	}

	//level editor functions
	mouseControl()
	{
		return (mouseX>this.x && mouseX<=this.x+this.w
			&& mouseY>= this.y && mouseY < this.y+this.w && mouseIsPressed);

	}

	isPointInto(x,y)
	{
		return (x>this.x && x<=this.x+this.w
			&& y>= this.y && y < this.y+this.w);
	}
}

class FoodTile extends EmptyTile //type 2
{
	constructor(x,y)
	{
		super(x,y);
		this.col = color(255,255,0);
		this.type = 2;
		this.eaten = false

	}

	draw()
	{
		if(!this.eaten)
		{
			stroke(0);
			fill(this.col);
			rect(this.x+12.5,this.y+12.5,5,5);
		}
	}
}


class PillowTile extends FoodTile //type 3
{
	constructor(x,y)
	{
		super(x,y);
		this.type = 3;
		this.buf = false;
		this.timex = 0;
		this.timeLease = 1; //in seconds
	}

	draw()
	{
		if(!this.eaten)
		{
			stroke(0);
			fill(this.col);
			
			if(millis()-this.timex > this.timeLease*1000)
			{
				this.timex=millis();
				this.buf = !this.buf;
			}

			if(this.buf)
				rect(this.x+7.5,this.y+7.5,15,15);
			else
				rect(this.x+5,this.y+5,20,20);
		}
	}
}

class WallTile extends EmptyTile //type 1
{
	constructor(x,y)
	{
		super(x,y);
		this.col = color(0,0,255);
		this.type = 1;
	}

	draw()
	{
		fill(this.col);
		noStroke();
		rect(this.x,this.y,this.w,this.w);
	}
}

class DoorTile extends WallTile //type 4
{
	constructor(x,y)
	{
		super(x,y);
		this.col = color(200);
		this.type = 4;
	}

	draw()
	{
		fill(this.col);
		noStroke();
		rect(this.x,this.y,this.w,this.w);
	}
}