(function () {
	'use strict';

	angular
	.module('projects', [
			"com.2fdevs.videogular",
			"com.2fdevs.videogular.plugins.controls"
			])
	.controller('ProjectsController', ProjectsController);

	ProjectsController.$inject = ['$scope','$state', 'projectResolve', 'Authentication'];

	function ProjectsController($scope, $state, project, Authentication) {
		var vm = this;

		vm.project = project;
		vm.authentication = Authentication;

		setDefaultData(project);
		setupProjectPlayer(vm, project);

		$state.current.onExit = function (){
			//console.log("onExit ");
			stopProjectPlayer(vm, project);
			
		};

		$scope.backToHome = function (){
			$state.go("home");
		};

		setupNavigation($scope);
	}
	
	function setupNavigation($scope){
		jQuery("#btnBack").click(function (){
			$scope.backToHome();
		});

		//Keyboard
		if (window.tvKeyboard){
	    } else {
	      var tvKeyboard = new TvKeyboardController();
	      window.tvKeyboard = tvKeyboard;
	      tvKeyboard.setup();
	    }
		
		window.tvKeyboard.on(window.tvKeyboard.KEYCODE.ESC, function (){
	      $scope.backToHome();
	    });

	    window.tvKeyboard.on(window.tvKeyboard.KEYCODE.BACK, function (){
	      $scope.backToHome();
	    });
	}
  	function setDefaultData(project){
		if (project.urlmp4){
			project.hasvideo = true;
		} else {
			project.hasvideo = false;
		}

		if (project.hasvideo){

		} else {
  			updateSlideshowImages(project);
  		}
  	}

  	function updateSlideshowImages(project){
  		if ("undefined" === typeof project.slideshow){
		  project.slideshowImages = [];
		} else {
		  var images = project.slideshow.split("\n");
		  project.slideshowImages = [];
		  for (var imgIndex = 0; imgIndex < images.length; imgIndex++){
		  	console.log(images[imgIndex]);
			project.slideshowImages.push(images[imgIndex]);
		  }
		}
		/*
		//Convert slideshowImages back and forth
	    project.slideshowImages.$parsers.push(function textToArray(text){
	    	var arr = text.split("\n");
	    	return arr;
	    });

	    project.slideshowImages.$formatters.push(function arrayToText(arr){
	    	var str = "";
	    	for (var i=0; i < arr.length; i++){
	    		str = str + arr[i] + "\n";
	    	}
	    	return str;
	    });
	    */
  	}

	function setupProjectPlayer(controller, project){
		var videoplayer = {
			sources: [
				{src: project.urlmp4, type: "video/mp4"}
			]
		};
		controller.videoplayer = videoplayer;



		var projectPlayerOptions = {};
		projectPlayerOptions.project = project;
		projectPlayerOptions.timings = eval(project.lyricsproject); // From string to array
		projectPlayerOptions.musicPath = project.urlmp3;
		projectPlayerOptions.projectController = controller;
		//projectPlayerOptions.slideshow = project.slideshow;
		if (!project.hasvideo){
			if ("undefined" === typeof project.slideshow || 
				"undefined" === typeof project.slideshowImages ||
				(!("undefined" === typeof project.slideshowImages) && project.slideshowImages.length == 0)){
				controller.slideshowImages = [];
				console.log("default Slideshow");
				for (var imageIndex = 0; imageIndex < 9; imageIndex++){
					controller.slideshowImages.push("/images/slideshow/img"+(imageIndex + 1)+".jpg");
				}
			} else {
				//console.log("has Slideshow");
				controller.slideshowImages = project.slideshowImages;
			}

			// Start up the music
			var projectPlayer = new ProjectPlayer(projectPlayerOptions);
			projectPlayer.initPlayer();
			projectPlayer.setupControls();
			projectPlayer.play();
			controller.projectPlayer = projectPlayer;
		}
	}

	function stopProjectPlayer(controller, project){
		if (!project.hasvideo){
			if (controller.projectPlayer){
				controller.projectPlayer.clean();
			}
		}
	}
}());

