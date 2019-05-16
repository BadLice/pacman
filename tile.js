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
		stroke(0)
		rect(this.x,this.y,this.w,this.w);
	}
}