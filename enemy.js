class Enemy
{
	constructor(x,y)
	{
		this.ty=y;
		this.tx = x;
		this.x=0;
		this.y=0;
		this.width = dim;
		this.col = color(255,0,0);
		this.direction = -1;
		this.nextDir = -1;

		this.timex = millis();
		this.timeLease = .3; //in seconds

		this.refreshDrawPosition();
		this.path = [];
		this.target;
		this.scatterTarget = new Node(0,0);
		this.scatterMode = false;
		this.scatterTime = 0;
		this.timeLeaseDoubled = false;
		this.scatterTimeLease = 10; //in seconds

		this.updateTarget();
	}

	refreshDrawPosition()
	{
		this.x=mapTiles[this.tx][this.ty].x;
		this.y=mapTiles[this.tx][this.ty].y;
	}


	draw()
	{
		noStroke();
		if(this.scatterMode)
		{
			strokeWeight(5);
			stroke(0,0,200);
		}	
		fill(this.col);
		rect(this.x,this.y,this.width,this.width);

		strokeWeight(1);

		// print path
		for (var i = this.path.length - 1; i >= 0; i--)
		{
			stroke(0);
			fill(this.col);
			rect(this.path[i].tx*dim,this.path[i].ty*dim,15,15);


			// fill(255);
			// textSize(20);
			// text(this.path[i].Fcost,this.path[i].tx*dim,this.path[i].ty*dim+15)
		}
	}

	update()
	{
		if(this.scatterMode)
		{
			this.scatterModef();
		}
		else
		{
			if(this.dead)
			{
				this.deadMode()
			}
			else
			{
				this.resetSpeed();
				this.updateTarget()	
			}
		}

		this.Astar()
		this.move();
		this.refreshDrawPosition();
	}

	resetSpeed()
	{
		this.timeLease = .3;
	}

	scatterModef()
	{
		if(this.scatterTime == 0)
		{
			this.scatterTime = millis()
		}

		if(millis()-this.scatterTime>this.scatterTimeLease*1000)
		{
			this.disableScatterMode();
			return;
		}	

		this.target = this.scatterTarget;
		this.timeLease = 1;
		this.col = color(255);
	}

	disableScatterMode()
	{
		this.scatterMode=false;
		this.scatterTime = 0;
		this.col=color(this.defColor.levels[0],this.defColor.levels[1],this.defColor.levels[2]);
	}

	deadMode()
	{
		this.target = new Node(this.startPos.tx,this.startPos.ty);
		this.col = color(100);
		if (this.tx == this.startPos.tx && this.ty == this.startPos.ty)
		{
			this.disableScatterMode();
			this.dead=false;
			return;
		}
	}

	die()
	{
		this.disableScatterMode();
		this.dead = true;
		this.timeLease = .05;
	}

	move()
	{

		if(this.path.length!==0)
		{	
			if(this.path[this.path.length-1].ty == 15 && (this.path[this.path.length-1].tx <=6 || this.path[this.path.length-1].tx >= 23))
			{
				this.timeLeaseDoubled = true;
				this.timeLease *= 1.4;
			}
			else if(this.timeLeaseDoubled)
			{
				this.timeLeaseDoubled = false;
				this.timeLease /= 1.4;
			}
		}

		if(millis()-this.timex > this.timeLease*1000)
		{
			if(this.path.length!==0)
			{	
				this.tx = this.path[this.path.length-1].tx;
				this.ty = this.path[this.path.length-1].ty;
			}
			this.timex = millis();
		}
	}

	

	
	isInSet(closed,x,y)
	{
		for (var i = closed.length - 1; i >= 0; i--)
		{
			if(closed[i].tx == x && closed[i].ty == y)
			{
				return true;
			}
		}
		return false;
	}

	lowestFcostIndex(open)
	{
		var min = Infinity;
		var res;
		for (var i = open.length - 1; i >= 0; i--) 
		{
			if(open[i].Fcost<=min)
			{
				res = i;
				min = open[i].Fcost
			}
		}

		return res;
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

	reconstruct_path(start,current)
	{
		this.path = [];

		if(current.cameFrom === undefined)
			return;

		while (!(current.cameFrom.tx==start.tx && current.cameFrom.ty==start.ty ))
		{
			this.path.push(current)
			current = current.cameFrom;
		}

		this.path.push(current);
	}

	Astar()
	{
		var start = new Node(this.tx,this.ty);
		var open = []
		var closed = []
		open.push(start);

		start.heuristic(this.target)

		do
		{
			var lowestFcost = this.lowestFcostIndex(open);
			var current = open[lowestFcost];

			open.splice(lowestFcost,1);
			closed.push(current);

			if(this.target.tx == current.tx && this.target.ty == current.ty)
			{
				this.reconstruct_path(start,current);//path found
				return;
			}

			//for each neighbor of current node
			for(var j=0;j<3;j++)
			{
				for(var i=0;i<3;i++)
				{
					if(!(current.tx-1+i == current.tx && current.ty-1+j == current.ty)) //excepting current node
					{
						if(current.tx-1+i == current.tx || current.ty-1+j == current.ty) //no diagonal neighbours
						{

							if(current.tx-1+i>=0 && current.tx-1+i<xdim && current.ty-1+j>=0 && current.ty-1+j<ydim) //stay into edges of map
							{
								var nig = new Node(current.tx-1+i, current.ty-1+j,current)
							
								if(mapTiles[nig.tx][nig.ty].type != 1 && !this.isInSet(closed,nig.tx,nig.ty))//neighbor is not a wall and it's not in closed
								{
									var tentative_Gscore = current.Gscore + dist(current.tx,current.ty,nig.tx,nig.ty)
									if(!this.isInSet(open,nig.tx,nig.ty))
									{
										open.push(nig);
									}
									else
									{
										if(tentative_Gscore < nig.Gscore)
										{
											nig.cameFrom = current;
											nig.Gscore = tentative_Gscore;
											nig.heuristic(this.target);
										}

									}
								}
							}
							
						}
					}
				}	
			}

			// cosidering also portals as neighbours
			var nig = null;

			if(current.tx == 0 && current.ty == 15)
				nig = new Node(29,current.ty,current);

			if(current.tx == 29 && current.ty == 15)
				nig = new Node(0,current.ty,current);
			if(nig !== null)
			{
				if(mapTiles[nig.tx][nig.ty].type != 1 && !this.isInSet(closed,nig.tx,nig.ty))//neighbor is not a wall and it's not in closed
				{
					var tentative_Gscore = current.Gscore + dist(current.tx,current.ty,nig.tx,nig.ty)
					if(!this.isInSet(open,nig.tx,nig.ty))
					{
						open.push(nig);
					}
					else
					{
						if(tentative_Gscore < nig.Gscore)
						{
							nig.cameFrom = current;
							nig.Gscore = tentative_Gscore;
							nig.heuristic(this.target);
						}

					}
				}
			}
			

		} while(open.length !=0)//reached end
	}

	updateTarget()
	{
		this.target = new Node(player.tx,player.ty);
	}

	findNearestTarget()
	{
		var targetOk = false;
		var cycles = 0;

		while(!targetOk)
		{
			cycles++;
			if(cycles>100)
			{
				this.target= new Node(this.scatterTarget.tx,this.scatterTarget.ty);
				break;
			}
			for(var i=0;i<3 && !targetOk;i++)
			{
				for(var j=0;j<3 && !targetOk;j++)
				{
					if(this.target.tx-1+i >=0 && this.target.tx-1+i < xdim && this.target.ty-1+j>=0 && this.target.ty-1+j < ydim)
					{
						if(mapTiles[this.target.tx-1+i][this.target.ty-1+j].type==2 || mapTiles[this.target.tx-1+i][this.target.ty-1+j].type==3)
						{
							this.target = new Node(this.target.tx-1+i,this.target.ty-1+j);
							targetOk = true;
						}

					}
				}
			}

			if(!targetOk)
			{
				var randomOk = false;
				var cycles2 = 0;
				do
				{
					cycles2++;
					if(cycles2>100)
					{
						this.target = new Node(this.scatterTarget.tx,this.scatterTarget.ty);
						break;
					}
					var a = floor(random(0,3));
					var b = floor(random(0,3));

					if(this.target.tx-1+a >=0 && this.target.tx-1+a< xdim && this.target.ty-1+b>=0 && this.target.ty-1+b < ydim)
					{
						this.target = new Node(this.target.tx-1+a, this.target.ty-1+b);
						randomOk=true;					
					}

				}while(!randomOk);
			}
		}
	}

}

class Node
{
	constructor(x,y,cameFrom)
	{
		this.tx = x;
		this.ty = y;
		this.Gcost = Infinity;//distance from start
		this.Hcost = Infinity;//distance from target
		this.Fcost = this.Gcost+this.Hcost;
		this.cameFrom=cameFrom;
	}

	heuristic(target)
	{
		this.Hcost = dist(this.tx,this.ty,target.tx,target.ty);
		this.Fcost = this.Gcost+this.Hcost;
	}

	generic(start)
	{
		this.Gcost = dist(this.tx,this.ty,start.tx,start.ty)
		this.Fcost = this.Gcost+this.Hcost;
	}

}

class Blinky extends Enemy
{
	constructor()
	{
		super(14,11);
		this.defColor = color(255,0,0);
		this.startPos = new Node(15,15);
		this.col=color(this.defColor.levels[0],this.defColor.levels[1],this.defColor.levels[2]);
		this.scatterTarget = new Node(2,1);
	}

	updateTarget()
	{
		this.target = new Node(player.tx,player.ty);
		this.findNearestTarget();
	}
}

class Pinky extends Enemy
{
	constructor()
	{
		super(16,15);
		this.startPos = new Node(16,15);
		this.defColor = color(253, 175, 255);
		this.col=color(this.defColor.levels[0],this.defColor.levels[1],this.defColor.levels[2]);
		this.distance = 4;
		this.scatterTarget = new Node(27,1);
	}

	updateTarget()
	{
		switch(player.direction)
		{
			//down
			case 0:
				this.target = new Node(player.tx,player.ty+this.distance);
			break;

			//left
			case 1:
				this.target = new Node(player.tx-this.distance,player.ty);
			break;

			//up
			case 2:
				this.target = new Node(player.tx,player.ty-this.distance);
			break;

			//rigth
			case 3:		
				this.target = new Node(player.tx+this.distance,player.ty);
			break;

			default:
				this.target = new Node(player.tx,player.ty);
			break;
		}
		this.findNearestTarget();;
	}
}

class Inky extends Enemy
{
	constructor()
	{
		super(14,15);
		this.startPos = new Node(14,15);
		this.defColor=color(117, 252, 255);
		this.col=color(this.defColor.levels[0],this.defColor.levels[1],this.defColor.levels[2]);
		this.distance = 4;
		this.scatterTarget = new Node(2,30);
	}

	updateTarget()
	{		
		var horDist = 1;
		var vertDist = 1;
		this.target = new Node(this.tx,this.ty);

		switch(player.direction)
		{
			//down
			case 0:
				this.target = new Node(player.tx,player.ty+this.distance);
				// horDist = -1;
				// vertDist = -1;
			break;

			//left
			case 1:
				this.target = new Node(player.tx-this.distance,player.ty);
				// vertDist = -1;
				// horDist = -1;
			break;

			//up
			case 2:
				this.target = new Node(player.tx,player.ty-this.distance);
			break;

			//rigth
			case 3:		
				this.target = new Node(player.tx+this.distance,player.ty);
				// horDist = -1;
				// vertDist = -1;
			break;

			default:
				this.target = new Node(player.tx,player.ty);
			break;
		}

		vertDist *= (blinky.ty*dim - this.target.ty*dim)/3 ;
		horDist *= (blinky.tx*dim - this.target.tx*dim)/3 ;

		if(blinky.tx*dim+15 + horDist >= xdim*dim)
			horDist = xdim*dim - blinky.tx*dim+15;
		if(blinky.tx*dim+15 + horDist <= 0)
			horDist = - (blinky.tx*dim+15);
		if(blinky.ty*dim+15 + vertDist >= ydim*dim)
			vertDist = ydim*dim - blinky.ty*dim+15;
		if(blinky.ty*dim+15 + vertDist <= 0)
			vertDist = - (blinky.ty*dim+15);

		this.target = new Node(floor((this.target.tx*dim+15 - horDist)/dim),floor((this.target.ty*dim+15 - vertDist)/dim));

		this.findNearestTarget();

		// fill(255,255,255)
		// rect(this.target.tx*dim,this.target.ty*dim,15,15);		
	}
}

class Clyde extends Enemy
{
	constructor()
	{
		super(12,15);
		this.startPos = new Node(12,15);
		this.defColor=color(255, 173, 43);
		this.col=color(this.defColor.levels[0],this.defColor.levels[1],this.defColor.levels[2]);
		this.distance = 8;
		this.scatterTarget = new Node(27,30);

	}

	updateTarget()
	{
		switch(player.direction)
		{
			//down
			case 0:
				this.target = new Node(player.tx,player.ty+this.distance);
				// horDist = -1;
				// vertDist = -1;
			break;

			//left
			case 1:
				this.target = new Node(player.tx-this.distance,player.ty);
				// vertDist = -1;
				// horDist = -1;
			break;

			//up
			case 2:
				this.target = new Node(player.tx,player.ty-this.distance);
			break;

			//rigth
			case 3:		
				this.target = new Node(player.tx+this.distance,player.ty);
				// horDist = -1;
				// vertDist = -1;
			break;

			default:
				this.target = new Node(player.tx,player.ty);
			break;
		}

		this.findNearestTarget();
	}
}