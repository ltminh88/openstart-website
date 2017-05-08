(function () {
  'use strict';

  angular
    .module('categorys.admin')
    .controller('CategorysAdminController', CategorysAdminController);

  CategorysAdminController.$inject = ['$scope', '$state', '$window', 'gameResolve', 'Authentication', 'Notification'];
  function CategorysAdminController($scope, $state, $window, category, Authentication, Notification) {
    var vm = this;

    vm.category = category;

    setDefaultData(category);

    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing GameCat
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.category.$remove(function() {
          $state.go('admin.category.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> GameCat deleted successfully!' });
        });
      }
    }

    // Save GameCat
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.gameForm');
        return false;
      }

      vm.category.slideshow = {
        duration: 200,
        images: []
      };

      console.log("Add images from slide");
      for (var imgIndex = 0; imgIndex < vm.category.slideshowImages.length; imgIndex++){
        vm.category.slideshow.images.push({
          src: vm.category.slideshowImages[imgIndex]
        });
      }
      // Create a new category, or update the current instance
      vm.category.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.category.list'); // should we send the User to the list or the updated GameCat's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> GameCat saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> GameCat save error!' });
      }
    }
  }
}());
