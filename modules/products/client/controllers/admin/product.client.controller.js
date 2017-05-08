(function () {
  'use strict';

  angular
    .module('products.admin')
    .controller('ProductsAdminController', ProductsAdminController);

  ProductsAdminController.$inject = ['$scope', '$state', '$window', 'productResolve', 'Authentication', 'Notification'];

  function ProductsAdminController($scope, $state, $window, product, Authentication, Notification) {
    var vm = this;

    vm.product = product;

    setDefaultData(product);

    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;



    $scope.crawlClient = function (){
      console.log("Craw url :" + vm.product.crawlurl);

      jQuery.ajax({
       url: vm.product.crawlurl,
       type:'GET',
       dataType: "jsonp",
       xhrFields: {
          withCredentials: true
       }
      }).done(function(data, textStatus, jqXHR) {
        console.log("done");
        console.log(data);
      })
      .fail(function( jqXHR, textStatus, errorThrown) {
        //alert( "Crawl error: can not load the page" );
        //alert(textStatus + "," + errorThrown + "," + jqXHR.responseText);
        console.log("Error");
        console.log(jqXHR.responseText);
      })
      .always(function() {
        //alert( "Crawl complete" );
      });
 
    }

    $scope.crawlServer = function (){

    }

    $scope.uploadMp3 = function (){

    }

    $scope.uploadMp4 = function (){

    }


    $scope.saveMp3 = function (){
      jQuery.ajax({
       url: "/api/crawlers/save/mp3",
       type: 'put',
       dataType: "json",
       data: {
        language: vm.product.language,
        singer: vm.product.singername,
        product: vm.product.title,
        urlmp3: vm.product.urlmp3
      }
      }).done(function(data, textStatus, jqXHR) {
        
        console.log(data);
        if (data.status == 1){
          vm.product.urlmp3 = data.newurl;
          $scope.$apply();
        } else {
          alert('Save mp3 error:');
        }
      })
      .fail(function( jqXHR, textStatus, errorThrown) {
        console.log("Error" + jqXHR.responseText);
      })
      .always(function() {
      });
    }
    $scope.saveThumbnail = function (){
      jQuery.ajax({
       url: "/api/crawlers/save/thumbnail",
       type: 'put',
       dataType: "json",
       data: {
        language: vm.product.language,
        singer: vm.product.singername,
        product: vm.product.title,
        thumbnail: [vm.product.thumbnail]
      }
      }).done(function(data, textStatus, jqXHR) {
        
        console.log(data);
        if (data.status == 1){
          vm.product.thumbnail = data.images[0];
          $scope.$apply();
        } else {
          alert('Save thumbnail error:');
        }
      })
      .fail(function( jqXHR, textStatus, errorThrown) {
        console.log("Error" + jqXHR.responseText);
      })
      .always(function() {
      });
    }
    
    $scope.saveMp4 = function (){
      jQuery.ajax({
       url: "/api/crawlers/save/mp4",
       type: 'put',
       dataType: "json",
       data: {
        language: vm.product.language,
        singer: vm.product.singername,
        product: vm.product.title,
        urlmp4: vm.product.urlmp4
      }
      }).done(function(data, textStatus, jqXHR) {
        
        console.log(data);
        if (data.status == 1){
          vm.product.urlmp4 = data.newurl;
        } else {
          alert('Save mp4 error:');
        }
      })
      .fail(function( jqXHR, textStatus, errorThrown) {
        console.log("Error" + jqXHR.responseText);
      })
      .always(function() {
      });
    }

    $scope.saveAll = function (){

    }

    $scope.downloadMp3 = function (){
      
    }

    $scope.downloadMp4 = function (){

    }

    $scope.downloadAll = function (){

    }

    $scope.downloadSlideshow = function (){
      console.log("Save slideshow :");
      updateSlideshowImages(vm.product);
      jQuery.ajax({
       url: "/api/crawlers/save/slideshow",
       type: 'put',
       dataType: "json",
       data: {
        language: vm.product.language,
        singer: vm.product.singername,
        product: vm.product.title,
        slideshow: vm.product.slideshowImages
      }
      }).done(function(data, textStatus, jqXHR) {
        
        console.log(data);
        if (data.status == 1){
          //alert('Save slideshow successfully!');
          updateSlideshowImagesFromAjax(vm.product, data.images);
        } else {
          alert('Save slideshow error:');
        }
      })
      .fail(function( jqXHR, textStatus, errorThrown) {
        console.log("Error" + jqXHR.responseText);
      })
      .always(function() {
      });
    }

    $scope.updateSlideshow = function (){
      updateSlideshowImages(vm.product);
    }
    $scope.convertSubtitle = function(){
      var startMarkOfDialogues = "[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text";
      var subtitleText = vm.product.subtitle;
      var lines = subtitleText.split("\n");
      var newLines = [];
      for (var lineIndex = 0; lineIndex<lines.length; lineIndex++){
        var parts = lines[lineIndex].split(",");
        var timeStart = parts[1];
        var timeStartParts = timeStart.split(":");
        var t1_min = parseInt(timeStartParts[1]);
        var t1_sec = parseFloat(timeStartParts[2]);

        var timeEnd = parts[2];
        var timeEndParts = timeEnd.split(":");
        var t2_min = parseInt(timeEndParts[1]);
        var t2_sec = parseFloat(timeEndParts[2]);

        var text = parts[9];

        var syllables = text.split("{\\k");
        var lineTableFragments = [];
        var sylStart = 0.0;
        for (var sylIndex= 1; sylIndex<syllables.length; sylIndex++){
          var sylParts = syllables[sylIndex].split("}");
          var sylDuration = parseInt(sylParts[0]) /100.0;
          var sylText = sylParts[1];

          lineTableFragments.push([ parseFloat(sylStart.toFixed(3)), sylText]);
          sylStart+= sylDuration;
        }
        var lineTable = [t1_min*60+t1_sec, t2_min*60+t2_sec, lineTableFragments];
        newLines.push(lineTable);
      }
      //[[1.35,3.07,[[0,"What "],[0.07,"is "],[0.28,"love"]]]]
      var str = "";
      //for (var lineIndex = 0; lineIndex<newLines.length; lineIndex++){
      //}
      vm.product.lyricsproduct = angular.toJson(newLines);
    }
    // Remove existing Product
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.product.$remove(function() {
          $state.go('admin.products.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Product deleted successfully!' });
        });
      }
    }

    // Save Product
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.productForm');
        return false;
      }

      // Create a new product, or update the current instance
      vm.product.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.products.list'); // should we send the User to the list or the updated Product's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Product saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Product save error!' });
      }
    }

    //Other functions 

    function setDefaultData(product){
      updateSlideshowImages(product);
    }

    function updateSlideshowImagesFromAjax(product, images){
      product.slideshowImages = [];
      product.slideshow = "";
      for (var imgIndex = 0; imgIndex < images.length; imgIndex++){
        console.log("Add image slideshow : " + images[imgIndex]);
        product.slideshowImages.push(images[imgIndex]);
        if (imgIndex == 0){
          product.slideshow = images[imgIndex];
        } else {
          product.slideshow = product.slideshow +'\n'+ images[imgIndex];
        }
      }

      $scope.$apply();
    }
    function updateSlideshowImages(product){
      if ("undefined" === typeof product.slideshow){
      product.slideshowImages = [];
    } else {
      var images = product.slideshow.split("\n");
      product.slideshowImages = [];
      console.log("Split image slideshow to : " + images.length);
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
  }
}());
