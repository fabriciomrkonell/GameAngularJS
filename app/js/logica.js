var app = angular.module('appGame', []);
app.controller('ctrlGame', function ($scope, $interval) {
	
	$scope.viewGame = false;
	$scope.pontos = [{'diametro' : 7, 'pontos' : 1}, {'diametro' : 10, 'pontos' : 2}, {'diametro' : 15, 'pontos' : 3}];
	$scope.barraAltura = "";
	$scope.barraLargura = "";
	$scope.jogadorPosicaoX = "";
	$scope.velocidadeJogador = "";
	$scope.pontosJogador = "";

	$scope.play = function(){
		$scope.viewGame = true;
		$scope.barraAltura = 10;
		$scope.barraLargura = 90;		
		$scope.pontosJogador = 0;
		$scope.jogadorPosicaoX = (canvas.width - $scope.barraLargura) / 2;
		$scope.velocidadeJogador = 20;
		
		canvas = document.getElementById("canvas");
		context = canvas.getContext("2d");				
		bolas = new Array(new $scope.tiro());
	
		document.addEventListener('keydown', $scope.movimento);
			
		$interval($scope.game, 30);
	};

	$scope.game = function(){				
		context.clearRect(0, 0, canvas.width, canvas.height);
				
		if(bolas.length <= 0) {
			bolas.push(new $scope.tiro());
		}
						
		bolas.forEach(function(b, index) {
			context.beginPath();
	        context.arc(b.bolaPosX, b.bolaPosY, b.bolaDiametro, 0, Math.PI * 2, true);
	        context.fill();
								
			if(b.bolaPosY >= 50 && bolas.length <= 2) {
				bolas.push(new $scope.tiro());
			}
					
			if(b.bolaPosY <= canvas.height) {
				b.bolaPosY += b.velocidadeBola;
			} else {
				bolas.splice(index, 1);
			}
							
			if((b.bolaPosX > $scope.jogadorPosicaoX && b.bolaPosX < $scope.jogadorPosicaoX + $scope.barraLargura) && b.bolaPosY >= canvas.height - $scope.barraAltura && b.colisao == false){
				$scope.pontosJogador += b.pontos;
				b.colisao = true;
			}
		});					        
		context.fillRect($scope.jogadorPosicaoX, canvas.height - $scope.barraAltura, $scope.barraLargura, $scope.barraAltura);		
	};

	$scope.tiro = function(){
		var index = Math.round(Math.random() * (3 - 1) + 1) - 1;
        this.bolaDiametro = $scope.pontos[index]['diametro'];
		this.pontos = $scope.pontos[index]['pontos'];
        this.bolaPosX = Math.random() * 600;
        this.bolaPosY = -10;
		this.velocidadeBola = Math.random() * (10 - 6) + 6;
		this.colisao = false;
	};
							
	$scope.movimento = function(e){
		if(e.keyCode == 37) {
			if($scope.jogadorPosicaoX > 0){
				$scope.jogadorPosicaoX -= $scope.velocidadeJogador;
			}
		}
			
		if(e.keyCode == 39) {
			if($scope.jogadorPosicaoX < (canvas.width - $scope.barraLargura)){
				$scope.jogadorPosicaoX += $scope.velocidadeJogador;
			}
		}
	};	
});				