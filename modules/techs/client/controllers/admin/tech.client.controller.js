(function () {
  'use strict';

  angular
    .module('techs.admin')
    .controller('TechsAdminController', TechsAdminController);

  TechsAdminController.$inject = ['$scope', '$state', '$window', 'techResolve', 'Authentication', 'Notification'];

  function TechsAdminController($scope, $state, $window, tech, Authentication, Notification) {
    var vm = this;

    vm.tech = tech;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Tech
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.tech.$remove(function() {
          $state.go('admin.techs.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Tech deleted successfully!' });
        });
      }
    }

    // Save Tech
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.techForm');
        return false;
      }

      // Create a new tech, or update the current instance
      vm.tech.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.techs.list'); // should we send the User to the list or the updated Tech's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Tech saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Tech save error!' });
      }
    }
  }
}());
