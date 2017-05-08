(function () {
	'use strict';

	angular
	.module('products', [
			"com.2fdevs.videogular",
			"com.2fdevs.videogular.plugins.controls"
			])
	.controller('ProductsController', ProductsController);

	ProductsController.$inject = ['$scope','$state', 'productResolve', 'Authentication'];

	function ProductsController($scope, $state, product, Authentication) {
		var vm = this;

		vm.product = product;
		vm.authentication = Authentication;

		setDefaultData(product);
		setupProductPlayer(vm, product);

		$state.current.onExit = function (){
			//console.log("onExit ");
			stopProductPlayer(vm, product);
			
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
  	function setDefaultData(product){
		if (product.urlmp4){
			product.hasvideo = true;
		} else {
			product.hasvideo = false;
		}

		if (product.hasvideo){

		} else {
  			updateSlideshowImages(product);
  		}
  	}

  	function updateSlideshowImages(product){
  		if ("undefined" === typeof product.slideshow){
		  product.slideshowImages = [];
		} else {
		  var images = product.slideshow.split("\n");
		  product.slideshowImages = [];
		  for (var imgIndex = 0; imgIndex < images.length; imgIndex++){
		  	console.log(images[imgIndex]);
			product.slideshowImages.push(images[imgIndex]);
		  }
		}
		/*
		//Convert slideshowImages back and forth
	    product.slideshowImages.$parsers.push(function textToArray(text){
	    	var arr = text.split("\n");
	    	return arr;
	    });

	    product.slideshowImages.$formatters.push(function arrayToText(arr){
	    	var str = "";
	    	for (var i=0; i < arr.length; i++){
	    		str = str + arr[i] + "\n";
	    	}
	    	return str;
	    });
	    */
  	}

	function setupProductPlayer(controller, product){
		var videoplayer = {
			sources: [
				{src: product.urlmp4, type: "video/mp4"}
			]
		};
		controller.videoplayer = videoplayer;



		var productPlayerOptions = {};
		productPlayerOptions.product = product;
		productPlayerOptions.timings = eval(product.lyricsproduct); // From string to array
		productPlayerOptions.musicPath = product.urlmp3;
		productPlayerOptions.productController = controller;
		//productPlayerOptions.slideshow = product.slideshow;
		if (!product.hasvideo){
			if ("undefined" === typeof product.slideshow || 
				"undefined" === typeof product.slideshowImages ||
				(!("undefined" === typeof product.slideshowImages) && product.slideshowImages.length == 0)){
				controller.slideshowImages = [];
				console.log("default Slideshow");
				for (var imageIndex = 0; imageIndex < 9; imageIndex++){
					controller.slideshowImages.push("/images/slideshow/img"+(imageIndex + 1)+".jpg");
				}
			} else {
				//console.log("has Slideshow");
				controller.slideshowImages = product.slideshowImages;
			}

			// Start up the music
			var productPlayer = new ProductPlayer(productPlayerOptions);
			productPlayer.initPlayer();
			productPlayer.setupControls();
			productPlayer.play();
			controller.productPlayer = productPlayer;
		}
	}

	function stopProductPlayer(controller, product){
		if (!product.hasvideo){
			if (controller.productPlayer){
				controller.productPlayer.clean();
			}
		}
	}
}());

