var aliens = [[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1]];
var alienX = 10;
var alienY = 50;
var bulletX = 50;
var bulletY = 565;
var playerX = 250;
var bulletFired = false; 
var alienSpeedX = 1;
var alienXR = 610;
var alienXL = alienX;
var alienSpaceX = 60;
var alienSpaceY = 70;
var alienYcounter = 0 ;
var text = true;
var shipImage;
var pBulletImage;
var alienImage;
var alienImages;
var myScore = 0;
var alienBulletX;
var alienBulletY; 
var alienBulletFired = false;
var lives = 3;
var aliensAlive = true;
var shootFreq = 1000; // how frequent the aliens shoot
var alienBulletSpeed = 5;
var bulletX1 = 50;
var bulletY1 = 565;
var	powerUpX = 400;
var powerUpY = 400;
var powerUp = false;

function setup() {
	var canvas = createCanvas(700,600);
	canvas.parent("canvasContainer");
	background(0);
	shipImage = loadImage("Ship.png");
	ship = createSprite(playerX + 15, 575);
	ship.addImage("normal", shipImage);
	alienImage = loadImage("alien.png");
	alienImages = loadImage("A.jpg");
	

}


function intersect(bulletX, bulletY, alienX, alienY) {
	if ((bulletX > alienX - 20) && (bulletX < alienX + 20) && (bulletY > alienY - 20) && (bulletY < alienY + 20)){
		return 1;
	}
	else {
		return 0;
	}
}




function draw() {
	background(0);
	rect(playerX, 565, 30, 30);
	textSize(32);
	fill(255);
	text("Score", 10, 30);
	text(myScore, 125, 30);
	text("Lives", 500, 30);
	text(lives, 600, 30);
	aliensAlive = false;

	//rect(powerUpX, powerUpY, 30, 30);
	





	alienX = alienX + alienSpeedX; // Boundaries!!!!
	alienXL = alienXL + alienSpeedX;
	alienXR = alienXR + alienSpeedX;

	//Counts the amount of time aliens hit walls and moves them down
	var shipImage;
	if ((alienXR > 740) || (alienXL < 10)){
		alienSpeedX = alienSpeedX * -1;
		alienYcounter = alienYcounter + 1;
	}
	//Counts the amount of time aliens hit walls and moves them down
	if ((alienYcounter % 5 == 0) && (alienYcounter != 0)){
		alienY = alienY + .1;
	}
	/*Draws the aliens */
	for (i = 0; i < aliens.length; i++){
		for (j = 0; j < aliens[i].length; j++){
			
			if (aliens[i][j] == 1) {
				ellipse(alienX + (i * alienSpaceX), alienY + (j * alienSpaceY), 30,30);
				image(alienImage, alienX - 20 + (i * alienSpaceX), alienY - 20 + (j * alienSpaceY));
				aliensAlive = true;
				//image(alienImages, alienX - 20 + (i * alienSpaceX), alienY - 20 + (j * alienSpaceY));

				var random = Math.floor((Math.random() * shootFreq) + 1); // random # from 1 to 5000
				if (random == 1 && alienBulletFired == false) {
					alienBulletX = alienX + (i * alienSpaceX);
					alienBulletY = alienY + (j * alienSpaceY);
					alienBulletFired = true;
				}




			}
			// Check to see if player's bullet hits an alien
			if ( (aliens[i][j] == 1) && (intersect(bulletX, bulletY, alienX + i * alienSpaceX, alienY + j * alienSpaceY)) ){
				aliens[i][j] = 0;
				bulletFired = false;
				bulletY = 565;
				myScore = myScore + 10;
				console.log(myScore);

			}

			if (intersect(bulletX, bulletY, powerUpX, powerUpY)){
				bulletX1 = playerX - 5;
				rect(bulletX1, bulletY1, 5, 10);

			}
			

			
			// if ( (aliens[i][j] == 1) && (intersect(bulletX1, bulletY1, alienX + i * alienSpaceX, alienY + j * alienSpaceY))){
			// 	aliens[i][j] = 0;
			// 	powerUp = false;
			// 	bulletY1 = 565;
			// 	myScore = myScore + 10;
			// }
			
			// Check to see if alien's bullet hits the player
			if (intersect(alienBulletX, alienBulletY, playerX, 550)){
				console.log("You have been hit");
				alienBulletFired == false;
				lives = lives - 1;
				if (aliens[0][0] == 1);
					alienBulletX = 800
					alienBulletY = alienY + (0 * alienSpaceY);
			}
		}
	}
	/*Player Moving Keys*/
	if (keyIsDown(65)== true) {
		playerX = playerX - 5;
		ship.position.x = playerX + 15;
	}
	if (keyIsDown(68)== true) {
		playerX = playerX + 5;
		ship.position.x = playerX + 15;
	}

	if (keyIsDown(87)== true){
		if (bulletFired == false){
			bulletX = playerX + 15;
			bulletFired = true;
			
	
		}


	}

	function touchMoved(){
		playerX = playerX + 5;
		ship.position.x = playerX + 15;
	}

	if (bulletFired == true) { /*Players Bullet*/
		rect(bulletX - 5, bulletY, 5, 10);
		bulletY = bulletY - 10;
		
		if (bulletY < 0) {
			bulletFired = false;
			bulletY = 565;
		}
		
	}
	
	
	// Aliens Bullet
	if (alienBulletFired){
		rect(alienBulletX, alienBulletY, 5, 10);
		alienBulletY = alienBulletY + alienBulletSpeed;

		if (alienBulletY > 600) {
			alienBulletFired = false;
		}
	}


	//Player Lives

	if (lives < 1){
		background(255,0,0);
		fill(0);
		textSize(32);
		text("Game Over", 260, 300);
		removeSprite(ship);


	}

	
	if (!aliensAlive){
		for (i = 0; i < aliens.length; i++){
			for (j = 0; j < aliens[i].length; j++){
				aliens[i][j] = 1;


			}
		}
		aliensAlive = true;
		lives = lives + 1;
		alienY = 50;
		alienBulletSpeed = alienBulletSpeed + 3; //increases the bullet of the alien
		shootFreq = shootFreq - 80;// increases the rate at which aliens fire 
		if (lives > 2){
			myScore = myScore + 100;// adds 100 score to the player if his lives is above two each round
		}
	}

	
		



	drawSprites();
	}
	/*
	additions to the game 
	weapon system
	hp system aaaaa
	blink when hit
	*/	
// for power up to work set powerUp to true at first and then make wat ever the player hits turn it to false
// set second bullet counter to only depend on cieling and aliens hit