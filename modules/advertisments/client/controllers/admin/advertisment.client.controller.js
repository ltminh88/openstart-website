(function () {
  'use strict';

  angular
    .module('advertisments.admin')
    .controller('AdvertismentsAdminController', AdvertismentsAdminController);

  AdvertismentsAdminController.$inject = ['$scope', '$state', '$window', 'advertismentResolve', 'Authentication', 'Notification'];

  function AdvertismentsAdminController($scope, $state, $window, advertisment, Authentication, Notification) {
    var vm = this;

    vm.advertisment = advertisment;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Advertisment
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.advertisment.$remove(function() {
          $state.go('admin.advertisments.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Advertisment deleted successfully!' });
        });
      }
    }

    // Save Advertisment
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.advertismentForm');
        return false;
      }

      // Create a new advertisment, or update the current instance
      vm.advertisment.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.advertisments.list'); // should we send the User to the list or the updated Advertisment's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Advertisment saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Advertisment save error!' });
      }
    }
  }
}());
