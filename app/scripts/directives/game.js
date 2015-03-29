'use strict';

var app = angular.module('skyscraper');

app.directive('game',['Hub', 'constants',
	function(Hub, constants){
		var ddo = {
			restrict: 'A',
			link: function(scope, element, attr){

				scope.gameStarted = false;

				scope.players = [];

				scope.hub = new Hub('skyscraperHub', {

					listeners:{
			            'start': function(symbols){
			            	scope.gameStarted = true;
			            	scope.currentCard = initSymbols(symbols);
			            	scope.$apply();
			            },
			            'setExtractedCard': function(symbols, players){
			            	scope.extractedCard = initSymbols(symbols);
			            	angular.forEach(players, function(p){
			            		var player = _.find(scope.players, function(pl){
			            			return pl.id === p.id;
			            		})
			            		player.points = p.points;
			            	})
			            	scope.$apply();
			            },
			            'gameOver': function(gameStats){
			            	scope.gameStarted = false;
		            		scope.$apply();
			            },
			            'setPlayers': function(players){
			            	scope.players = players;
			            	scope.$apply();
			            }
					},
					//server side methods
		        	methods: ['initGame', 'extractCard', 'cardMatched',  'startGame', 'addPlayer'],
		        	rootPath: constants.signalREndpoint
				});

                scope.startGame = function(){
                	scope.gameStarted = true;
                	scope.hub.startGame();
                	initGame();
                }

                scope.select = function(symbol){
                	if(_.contains(_.pluck(scope.currentCard,'value'), symbol.value) && !scope.gameOver){
                		scope.hub.cardMatched(_.pluck(scope.currentCard,'id'));
                		scope.currentCard = scope.extractedCard;
                	}
                }

                var initGame = function(){
                	scope.hub.initGame(8);
                	scope.hub.extractCard();
                }

                scope.$on('login', function(event, info){
                	scope.$apply(function(){
                		scope.currentPlayer = {displayName: info.displayName, imageUrl: info.image.url};
                		//scope.players.push(scope.currentPlayer);
	            		scope.login = true;
	            		scope.hub.addPlayer({displayName: info.displayName, imageUrl: info.image.url, id: info.id});
                	});
                });

                scope.$on('logout', function(){
            		scope.login = false;
            		scope.players = _.reject(scope.players, function(p){
            			return p.displayName = scope.currentPlayer.displayName;
            		});
                });

				var initSymbols = function(symbols){
					var symbolsArray = [];
					angular.forEach(symbols, function(symbol){
						if(symbol === 0){
							symbolsArray.push({value:'glyphicon-glass', id:symbol});
						}
						else if(symbol === 1){
							symbolsArray.push({value:'glyphicon-asterisk', id:symbol});
						}
						else if(symbol === 2){
							symbolsArray.push({value:'glyphicon-plus', id:symbol});
						}
						else if(symbol === 3){
							symbolsArray.push({value:'glyphicon-euro', id:symbol});
						}
						else if(symbol === 4){
							symbolsArray.push({value:'glyphicon-minus', id:symbol});
						}
						else if(symbol === 5){
							symbolsArray.push({value:'glyphicon-cloud', id:symbol});
						}
						else if(symbol === 6){
							symbolsArray.push({value:'glyphicon-envelope', id:symbol});
						}
						else if(symbol === 7){
							symbolsArray.push({value:'glyphicon-pencil', id:symbol});
						}
						else if(symbol === 8){
							symbolsArray.push({value:'glyphicon-music', id:symbol});
						}
						else if(symbol === 9){
							symbolsArray.push({value:'glyphicon-search', id:symbol});
						}
						else if(symbol === 10){
							symbolsArray.push({value:'glyphicon-heart', id:symbol});
						}
						else if(symbol === 11){
							symbolsArray.push({value:'glyphicon-star', id:symbol});
						}
						else if(symbol === 12){
							symbolsArray.push({value:'glyphicon-star-empty', id:symbol});
						}
						else if(symbol === 13){
							symbolsArray.push({value:'glyphicon-user', id:symbol});
						}
						else if(symbol === 14){
							symbolsArray.push({value:'glyphicon-film', id:symbol});
						}
						else if(symbol === 15){
							symbolsArray.push({value:'glyphicon-th-large', id:symbol});
						}
						else if(symbol === 16){
							symbolsArray.push({value:'glyphicon-th', id:symbol});
						}
						else if(symbol === 17){
							symbolsArray.push({value:'glyphicon-th-list', id:symbol});
						}
						else if(symbol === 18){
							symbolsArray.push({value:'glyphicon-ok', id:symbol});
						}
						else if(symbol === 19){
							symbolsArray.push({value:'glyphicon-remove', id:symbol});
						}
						else if(symbol === 20){
							symbolsArray.push({value:'glyphicon-zoom-in', id:symbol});
						}
						else if(symbol === 21){
							symbolsArray.push({value:'glyphicon-zoom-out', id:symbol});
						}
						else if(symbol === 22){
							symbolsArray.push({value:'glyphicon-off', id:symbol});
						}
						else if(symbol === 23){
							symbolsArray.push({value:'glyphicon-signal', id:symbol});
						}
						else if(symbol === 24){
							symbolsArray.push({value:'glyphicon-cog', id:symbol});
						}
						else if(symbol === 25){
							symbolsArray.push({value:'glyphicon-trash', id:symbol});
						}
						else if(symbol === 26){
							symbolsArray.push({value:'glyphicon-home', id:symbol});
						}
						else if(symbol === 27){
							symbolsArray.push({value:'glyphicon-file', id:symbol});
						}
						else if(symbol === 28){
							symbolsArray.push({value:'glyphicon-time', id:symbol});
						}
						else if(symbol === 29){
							symbolsArray.push({value:'glyphicon-road', id:symbol});
						}
						else if(symbol === 30){
							symbolsArray.push({value:'glyphicon-download-alt', id:symbol});
						}
						else if(symbol === 31){
							symbolsArray.push({value:'glyphicon-download', id:symbol});
						}
						else if(symbol === 32){
							symbolsArray.push({value:'glyphicon-upload', id:symbol});
						}
						else if(symbol === 33){
							symbolsArray.push({value:'glyphicon-inbox', id:symbol});
						}
						else if(symbol === 34){
							symbolsArray.push({value: 'glyphicon-play-circle', id:symbol});
						}
						else if(symbol === 35){
							symbolsArray.push( {value:'glyphicon-repeat', id:symbol});
						}
						else if(symbol === 36){
							symbolsArray.push( {value:'glyphicon-refresh', id:symbol});
						}
						else if(symbol === 37){
							symbolsArray.push( {value:'glyphicon-list-alt', id:symbol});
						}
						else if(symbol === 38){
							symbolsArray.push( {value:'glyphicon-lock', id:symbol});
						}
						else if(symbol === 39){
							symbolsArray.push( {value:'glyphicon-flag', id:symbol});
						}
						else if(symbol === 40){
							symbolsArray.push( {value:'glyphicon-headphones', id:symbol});
						}
						else if(symbol === 41){
							symbolsArray.push( {value:'glyphicon-volume-off', id:symbol});
						}
						else if(symbol === 42){
							symbolsArray.push( {value:'glyphicon-volume-down', id:symbol});
						}
						else if(symbol === 43){
							symbolsArray.push( {value:'glyphicon-volume-up', id:symbol});
						}
						else if(symbol === 44){
							symbolsArray.push( {value:'glyphicon-qrcode', id:symbol});
						}
						else if(symbol === 45){
							symbolsArray.push( {value:'glyphicon-barcode', id:symbol});
						}
						else if(symbol === 46){
							symbolsArray.push({value: 'glyphicon-tag', id:symbol});
						}
						else if(symbol === 47){
							symbolsArray.push( {value:'glyphicon-tags', id:symbol});
						}
						else if(symbol === 48){
							symbolsArray.push({value: 'glyphicon-book', id:symbol});
						}
						else if(symbol === 49){
							symbolsArray.push( {value:'glyphicon-bookmark', id:symbol});
						}
						else if(symbol === 50){
							symbolsArray.push({value:'glyphicon-fire', id:symbol});
						}
						else if(symbol === 51){
							symbolsArray.push( {value:'glyphicon-print', id:symbol});
						}
						else if(symbol === 52){
							symbolsArray.push( {value:'glyphicon-camera', id:symbol});
						}
						else if(symbol === 53){
							symbolsArray.push( {value:'glyphicon-font', id:symbol});
						}
						else if(symbol === 54){
							symbolsArray.push( {value:'glyphicon-bold', id:symbol});
						}
						else if(symbol === 55){
							symbolsArray.push( {value:'glyphicon-italic', id:symbol});
						}
						else if(symbol === 56){
							symbolsArray.push({value:'glyphicon-text-height', id:symbol});
						}
						else if(symbol === 57){
							symbolsArray.push({value:'glyphicon-text-width', id:symbol});
						}
						else{
							symbolsArray.push(''+symbol);
						}
					});
					return symbolsArray;
				}	
				
			}
		}
		return ddo;
}]);