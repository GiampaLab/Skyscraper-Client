'use strict';

var app = angular.module('skyscraper');

app.directive('draggable',['$document', 'shapeModelFactory',
	
	function($document, shapeModelFactory){
		
		var ddo = {

			scope:{
				callback: '&'
			},
			restrict: 'A',
			link: function(scope, element, attr){

				var moved = false;

				var startX = 0, startY = 0;
				// Send a maximum of 10 messages per second 
		        // (mouse movements trigger a lot of messages)
		        var messageFrequency = 30;
		        // Determine how often to send messages in
		        // time to abide by the messageFrequency
		        var updateRate = 1000 / messageFrequency;

				element.on('mousedown', function(event) {
			      // Prevent default dragging of selected content
			      event.preventDefault();
			      startX = event.pageX - shapeModelFactory.left;
			      startY = event.pageY - shapeModelFactory.top;
			      $document.on('mousemove', mousemove);
			      $document.on('mouseup', mouseup);
			    });

			    function mousemove(event) {
			    	shapeModelFactory.left = event.pageX - startX;
			    	shapeModelFactory.top = event.pageY - startY;
					element.css({
						top: shapeModelFactory.top + 'px',
						left:  shapeModelFactory.left + 'px'
					});
					scope.callback(
					{
						shapeModel:shapeModelFactory
		      		});
			    }

			    /*function update(){
			    	scope.callback(
					{
						shapeModel:shapeModelFactory
		      		});
		      		moved = false;
			    }*/

			    function mouseup() {
			      $document.off('mousemove', mousemove);
			      $document.off('mouseup', mouseup);
			    }

			    //setInterval(update, updateRate);
			}
		}

		return ddo;
	}
]);