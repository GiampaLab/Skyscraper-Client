'use strict';

var app = angular.module('skyscraper');

app.controller('hubController', ['$scope', 'Hub', 'shapeModelFactory', 
	function($scope, Hub, shapeModelFactory){

		var necromancer = new Resurrect();
		var Engine = Matter.Engine,
		    World = Matter.World,
		    Bodies = Matter.Bodies,
		    Body = Matter.Body,
		    MouseConstraint = Matter.MouseConstraint,
		    Common = Matter.Common,
		    RenderPixi = Matter.RenderPixi;

		$scope.shapeModel = shapeModelFactory;
		$scope.hub = new Hub('skyscraperHub', {

			listeners:{
				'updateShape': function (model) {
					updating = true;
	                $scope.shapeModel.left = model.left;
	                $scope.shapeModel.top = model.top;
	                $scope.$apply();
	                updating = false;
	             },
	            'updateBox': function(){
	            	addBox();
	            },
	            'updateCircle': function(){
	            	addCircle();
	            }
			},

			//server side methods
        	methods: ['updateModel', 'addBox', 'addCircle'],

        	rootPath: 'http://192.168.0.3:8099/signalr'
		});

		$scope.update = function(shapeModel){
			if(!updating){
				$scope.hub.updateModel(shapeModel);
			}
		}
		
		// create a Matter.js engine
		var engine = Engine.create(document.body, {
		  render: {
		    options: {
		    	render: RenderPixi,
		      showAngleIndicator: false,
		      showVelocity: false,
		      showCollisions: false,
		      wireframes: false
		    }
		  }
		});

		// add a mouse controlled constraint
		var mouseConstraint = MouseConstraint.create(engine);
		mouseConstraint.constraint.stiffness = 1;
		World.add(engine.world, mouseConstraint);

		// create two boxes and a ground
		
		var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true, friction:0.8});

		// add all of the bodies to the world
		World.add(engine.world, ground);

		var boxA = addBox();
		var boxB = addBox();

		// run the engine
		Engine.run(engine);

		$scope.addBox = function(){
			//var constraint = { x: -180, y: -100 };
			addBox();
			$scope.hub.addBox();
		}

		$scope.addCircle = function(){
			//var constraint = { x: -180, y: -100 };
			addCircle();
			$scope.hub.addCircle();
		}

		function addBox(){
			var box = Bodies.rectangle(450, 50, 80, 80, {density:10, friction: 0.5});
			World.add(engine.world, box);
		}
		function addCircle(){
			var circle = Bodies.circle(450, 50, Common.random(10, 20), { friction: 0.00001, restitution: 0.5, density: 0.001 });
			World.add(engine.world, circle);
		}
	}
]);