var canvas = document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");
		var x = canvas.width/2;
	    var y = canvas.height-30;
	    var color = false;
	    var dx = 2;
	    var dy = -2;
	    var ballRadius = 10;
	    var paddleHeight = 10;
	    var paddleWidth = 75;
	    var paddleX = (canvas.width - paddleWidth)/2; 
	    var rigthPressed = false;
	    var leftPressed = false;
	    var score = 0;
	    //variabkes para dibujar las paredes 
	    var brinckRowCount = 7;
	    var brinckColumnCount = 6;
	    var brinckWidth = 75;
	    var brinckHeight = 20;
	    var brinckPadding = 5;
	    var brinckOffsetTop = 30;
	    var brinckOffsetLeft = 30;

	    //asignacion de las paredes 
	    var bricks = [];
	    for (var c =  0; c < brinckColumnCount; c++) {
	    	bricks[c] = [];
	    	for (var r = 0; r < brinckRowCount; r++) {
	    		bricks[c][r] = {x:0, y:0, status: 1};
	    	}
	    }



	    document.addEventListener("keydown", keyDownHandler, false);
		document.addEventListener("keyup", keyUpHandler, false);
		document.addEventListener("mousemove", mouseHandler,false);

		function keyDownHandler(e){
			console.log(e.keyCode);
			if(e.keyCode == 39){
				rigthPressed = true;
			}
			else if (e.keyCode ==37) {
				leftPressed = true;
			}
		}

		function keyUpHandler(e) {
			if (e.keyCode == 39) {
				rigthPressed = false;
			}
			else if(e.keyCode == 37){
				leftPressed = false;
			}
		}

		function mouseHandler(e) {
			let relativeX = e.clientX -canvas.offsetLeft;
			if(relativeX > 0 && relativeX < canvas.width){
				paddleX = relativeX - paddleWidth/2;
			}
		}

		function colisionDetector() {
			for(c = 0; c<brinckColumnCount; c++){
				for(r=0; r<brinckRowCount; r++){
					let b = bricks[c][r];
					if (b.status == 1) {
						if(x > b.x && x <b.x + brinckWidth && y > b.y && y < b.y + brinckHeight){
							dy = -dy;
							b.status = 0;
							score = score +10;
							if (score == (brinckRowCount*brinckColumnCount)* 10) {

								canvas.style.display = 'none';
				    			win.style.display = 'block';
				    			setTimeout(function(){ alert("Felicidades crack !!!!!"); }, 100);
				    			setTimeout(function(){ document.location.reload(); }, 100);
							}

						}
					}

				}
			}
		}

		function drawScore() {
			ctx.font = "16px Arial";
			ctx.fillStyle = "#0095DD";
			ctx.fillText("Puntaje: "+score,8,20);
		}


		// dibujando un rectangulo rojo de 50pxss
		/*ctx.beginPath();
		ctx.rect(20,40,50,50);
		ctx.fillStyle = "#FF0000";
		ctx.fill();
		ctx.closePath();
		// dibujando un circulo verde de 20px de radio
		ctx.beginPath();
		ctx.arc(240, 160, 20, 0, Math.PI*2, false);
		ctx.fillStyle = "green";
		ctx.fill();
		ctx.closePath();
		//dibujando un rectangulo azul de 100px X 40px
		ctx.beginPath();
		ctx.rect(100,10,100,40);
		ctx.strokeStyle = "rgba(0,0,255,0.5)";
		ctx.stroke();
		ctx.closePath();
		//corazon
		ctx.beginPath();
	    ctx.moveTo(75,40);
	    ctx.bezierCurveTo(75,37,70,25,50,25);
	    ctx.bezierCurveTo(20,25,20,62.5,20,62.5);
	    ctx.bezierCurveTo(20,80,40,102,75,120);
	    ctx.bezierCurveTo(110,102,130,80,130,62.5);
	    ctx.bezierCurveTo(130,62.5,130,25,100,25);
	    ctx.bezierCurveTo(85,25,75,37,75,40);
	    ctx.fill();*/

	    function drawBall() {
		    ctx.beginPath();
		    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
		    ctx.fillStyle = '#EDAE49' //color ? "#0095DD": "#20D2DF";
		    ctx.fill();
		    ctx.closePath();

		}

		function drawPaddle(){
			ctx.beginPath();
			ctx.rect(paddleX, canvas.height - (paddleHeight), paddleWidth, paddleHeight);
			ctx.fillStyle = "#0095DD";
			ctx.fill();
			ctx.closePath;
		}

		function drawBricks() {
			for (c =0; c<brinckColumnCount; c++) {
				for(r=0; r<brinckRowCount; r++){
					if(bricks[c][r].status == 1){
						let brickX = (c*(brinckWidth+brinckPadding))+brinckOffsetLeft;
						let brickY = (r*(brinckHeight+brinckPadding))+brinckOffsetTop;
						bricks[c][r].x = brickX;
						bricks[c][r].y = brickY;
						ctx.beginPath();
						ctx.rect(brickX,brickY, brinckWidth, brinckHeight);
						ctx.fillStyle = "#0095DD";
						ctx.fill();
						ctx.closePath();
					}

				}
			}
		}


	    function draw(){
	    	ctx.clearRect(0, 0, canvas.width, canvas.height);
	    	drawBall();
	    	drawBricks();
	    	drawPaddle();
	    	colisionDetector();
	    	drawScore();

	    	if(x+dx > canvas.width-ballRadius  || x+dx < ballRadius ){
	    		dx = -dx;
	    	}
	    	if(y + dy < ballRadius){
	    		dy= -dy;
	    	} 
	    	else if(y+dy > canvas.height -ballRadius ){
	    		if (x > paddleX && x < paddleX + paddleWidth ) {
	    			dy = -dy;
	    			console.log(y+dy);
	    			console.log(canvas.height - (paddleHeight*3));
	    		}
	    		else{
	    			canvas.style.display = 'none';
	    			loser.style.display = 'block';
	    			setTimeout(function(){ alert("Fin del Juego"); }, 50);
	    			setTimeout(function(){ document.location.reload(); }, 50);
	    			//document.location.reload();
	    		}
	    	}
	    	x += dx;
	    	y += dy;
	    	//console.log(dx , dy);

	    	if(rigthPressed && paddleX < canvas.width - paddleWidth){
	    		paddleX += 7;
	    	}
	    	else if (leftPressed && paddleX > 0) {
	    		paddleX -= 7;
	    	}
	    	if (color) {
	    		color = false;
	    	}
	    	else
	    		color = true;

	    	request = requestAnimationFrame(draw);
	    	//console.log(color);

	    }

	 

	 	    start.addEventListener('click',() =>{
	 	    	draw();
	 	    	start.style.display = 'none';
	 	    	stopGame.style.display = 'block';
	    	
	    })
	 	    stopGame.addEventListener('click',()=>{
	 	    	cancelAnimationFrame(request);
	 	    	stopGame.style.display = 'none';
	 	    	start.style.display = 'block';
	 	    })


			