(function () {
  'use strict';

  angular
    .module('projects.admin')
    .controller('ProjectsAdminController', ProjectsAdminController);

  ProjectsAdminController.$inject = ['$scope', '$state', '$window', 'projectResolve', 'Authentication', 'Notification'];

  function ProjectsAdminController($scope, $state, $window, project, Authentication, Notification) {
    var vm = this;

    vm.project = project;

    setDefaultData(project);

    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;



    $scope.crawlClient = function (){
      console.log("Craw url :" + vm.project.crawlurl);

      jQuery.ajax({
       url: vm.project.crawlurl,
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
        language: vm.project.language,
        singer: vm.project.singername,
        project: vm.project.title,
        urlmp3: vm.project.urlmp3
      }
      }).done(function(data, textStatus, jqXHR) {
        
        console.log(data);
        if (data.status == 1){
          vm.project.urlmp3 = data.newurl;
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
        language: vm.project.language,
        singer: vm.project.singername,
        project: vm.project.title,
        thumbnail: [vm.project.thumbnail]
      }
      }).done(function(data, textStatus, jqXHR) {
        
        console.log(data);
        if (data.status == 1){
          vm.project.thumbnail = data.images[0];
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
        language: vm.project.language,
        singer: vm.project.singername,
        project: vm.project.title,
        urlmp4: vm.project.urlmp4
      }
      }).done(function(data, textStatus, jqXHR) {
        
        console.log(data);
        if (data.status == 1){
          vm.project.urlmp4 = data.newurl;
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
      updateSlideshowImages(vm.project);
      jQuery.ajax({
       url: "/api/crawlers/save/slideshow",
       type: 'put',
       dataType: "json",
       data: {
        language: vm.project.language,
        singer: vm.project.singername,
        project: vm.project.title,
        slideshow: vm.project.slideshowImages
      }
      }).done(function(data, textStatus, jqXHR) {
        
        console.log(data);
        if (data.status == 1){
          //alert('Save slideshow successfully!');
          updateSlideshowImagesFromAjax(vm.project, data.images);
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
      updateSlideshowImages(vm.project);
    }
    $scope.convertSubtitle = function(){
      var startMarkOfDialogues = "[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text";
      var subtitleText = vm.project.subtitle;
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
      vm.project.lyricsproject = angular.toJson(newLines);
    }
    // Remove existing Project
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.project.$remove(function() {
          $state.go('admin.projects.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Project deleted successfully!' });
        });
      }
    }

    // Save Project
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.projectForm');
        return false;
      }

      // Create a new project, or update the current instance
      vm.project.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.projects.list'); // should we send the User to the list or the updated Project's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Project saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Project save error!' });
      }
    }

    //Other functions 

    function setDefaultData(project){
      updateSlideshowImages(project);
    }

    function updateSlideshowImagesFromAjax(project, images){
      project.slideshowImages = [];
      project.slideshow = "";
      for (var imgIndex = 0; imgIndex < images.length; imgIndex++){
        console.log("Add image slideshow : " + images[imgIndex]);
        project.slideshowImages.push(images[imgIndex]);
        if (imgIndex == 0){
          project.slideshow = images[imgIndex];
        } else {
          project.slideshow = project.slideshow +'\n'+ images[imgIndex];
        }
      }

      $scope.$apply();
    }
    function updateSlideshowImages(project){
      if ("undefined" === typeof project.slideshow){
      project.slideshowImages = [];
    } else {
      var images = project.slideshow.split("\n");
      project.slideshowImages = [];
      console.log("Split image slideshow to : " + images.length);
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
  }
}());
