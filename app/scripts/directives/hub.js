'use strict';

var app = angular.module('skyscraper');

app.directive('init',['Hub', 'constants',
	function(Hub, constants){
		var ddo = {
			restrict: 'A',
			link: function(scope, element, attr){

				scope.hub = new Hub('skyscraperHub', {

					listeners:{
			            'start': function(symbols){
			            	scope.symbols = initSymbols(symbols);
			            	scope.$apply();
			            },
			            'updateCircle': function(){
			            	addCircle();
			            }
					},
					//server side methods
		        	methods: ['initGame'],
		        	rootPath: constants.signalREndpoint
				});
				scope.hub.connection.start()
                    .done(function () {
                    	scope.hub.initGame(8);
                    });
				var initSymbols = function(symbols){
					var symbolsArray = [];
					angular.forEach(symbols, function(symbol){
						if(symbol === 0){
							symbolsArray.push('glyphicon-glass');
						}
						else if(symbol === 1){
							symbolsArray.push('glyphicon-asterisk');
						}
						else if(symbol === 2){
							symbolsArray.push('glyphicon-plus');
						}
						else if(symbol === 3){
							symbolsArray.push('glyphicon-euro');
						}
						else if(symbol === 4){
							symbolsArray.push('glyphicon-minus');
						}
						else if(symbol === 5){
							symbolsArray.push('glyphicon-cloud');
						}
						else if(symbol === 6){
							symbolsArray.push('glyphicon-envelope');
						}
						else if(symbol === 7){
							symbolsArray.push('glyphicon-pencil');
						}
						else if(symbol === 8){
							symbolsArray.push('glyphicon-music');
						}
						else if(symbol === 9){
							symbolsArray.push('glyphicon-search');
						}
						else if(symbol === 10){
							symbolsArray.push('glyphicon-heart');
						}
						else if(symbol === 11){
							symbolsArray.push('glyphicon-star');
						}
						else if(symbol === 12){
							symbolsArray.push('glyphicon-star-empty');
						}
						else if(symbol === 13){
							symbolsArray.push('glyphicon-user');
						}
						else if(symbol === 14){
							symbolsArray.push('glyphicon-film');
						}
						else if(symbol === 15){
							symbolsArray.push('glyphicon-th-large');
						}
						else if(symbol === 16){
							symbolsArray.push('glyphicon-th');
						}
						else if(symbol === 17){
							symbolsArray.push('glyphicon-th-list');
						}
						else if(symbol === 18){
							symbolsArray.push('glyphicon-ok');
						}
						else if(symbol === 19){
							symbolsArray.push('glyphicon-remove');
						}
						else if(symbol === 20){
							symbolsArray.push('glyphicon-zoom-in');
						}
						else if(symbol === 21){
							symbolsArray.push('glyphicon-zoom-out');
						}
						else if(symbol === 22){
							symbolsArray.push('glyphicon-off');
						}
						else if(symbol === 23){
							symbolsArray.push('glyphicon-signal');
						}
						else if(symbol === 24){
							symbolsArray.push('glyphicon-cog');
						}
						else if(symbol === 25){
							symbolsArray.push('glyphicon-trash');
						}
						else if(symbol === 26){
							symbolsArray.push('glyphicon-home');
						}
						else if(symbol === 27){
							symbolsArray.push('glyphicon-file');
						}
						else if(symbol === 28){
							symbolsArray.push('glyphicon-time');
						}
						else if(symbol === 29){
							symbolsArray.push('glyphicon-road');
						}
						else if(symbol === 30){
							symbolsArray.push('glyphicon-download-alt');
						}
						else if(symbol === 31){
							symbolsArray.push('glyphicon-download');
						}
						else if(symbol === 32){
							symbolsArray.push('glyphicon-upload');
						}
						else if(symbol === 33){
							symbolsArray.push('glyphicon-inbox');
						}
						else if(symbol === 34){
							symbolsArray.push( 'glyphicon-play-circle');
						}
						else if(symbol === 35){
							symbolsArray.push( 'glyphicon-repeat');
						}
						else if(symbol === 36){
							symbolsArray.push( 'glyphicon-refresh');
						}
						else if(symbol === 37){
							symbolsArray.push( 'glyphicon-list-alt');
						}
						else if(symbol === 38){
							symbolsArray.push( 'glyphicon-lock');
						}
						else if(symbol === 39){
							symbolsArray.push( 'glyphicon-flag');
						}
						else if(symbol === 40){
							symbolsArray.push( 'glyphicon-headphones');
						}
						else if(symbol === 41){
							symbolsArray.push( 'glyphicon-volume-off');
						}
						else if(symbol === 42){
							symbolsArray.push( 'glyphicon-volume-down');
						}
						else if(symbol === 43){
							symbolsArray.push( 'glyphicon-volume-up');
						}
						else if(symbol === 44){
							symbolsArray.push( 'glyphicon-qrcode');
						}
						else if(symbol === 45){
							symbolsArray.push( 'glyphicon-barcode');
						}
						else if(symbol === 46){
							symbolsArray.push( 'glyphicon-tag');
						}
						else if(symbol === 47){
							symbolsArray.push( 'glyphicon-tags');
						}
						else if(symbol === 48){
							symbolsArray.push( 'glyphicon-book');
						}
						else if(symbol === 49){
							symbolsArray.push( 'glyphicon-bookmark');
						}
						else if(symbol === 50){
							symbolsArray.push('glyphicon-fire');
						}
						else if(symbol === 51){
							symbolsArray.push( 'glyphicon-print');
						}
						else if(symbol === 52){
							symbolsArray.push( 'glyphicon-camera');
						}
						else if(symbol === 53){
							symbolsArray.push( 'glyphicon-font');
						}
						else if(symbol === 54){
							symbolsArray.push( 'glyphicon-bold');
						}
						else if(symbol === 55){
							symbolsArray.push( 'glyphicon-italic');
						}
						else if(symbol === 56){
							symbolsArray.push('glyphicon-text-height');
						}
						else if(symbol === 57){
							symbolsArray.push('glyphicon-text-width');
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