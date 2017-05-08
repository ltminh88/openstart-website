(function() {
    'use strict';

angular.module('core.admin').controller('SliderCtrl', function($scope) {
  $scope.cost = 40;
  $scope.range = {
    min: 30,
    max: 60
  };
  $scope.currencyFormatting = function(value) { 
    return"$"+value.toString();
  }
});

}());