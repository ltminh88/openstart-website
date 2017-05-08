(function () {
  'use strict';

  angular
    .module('awards.admin')
    .controller('AwardsAdminController', AwardsAdminController);

  AwardsAdminController.$inject = ['$scope', '$state', '$window', 'awardResolve', 'Authentication', 'Notification'];

  function AwardsAdminController($scope, $state, $window, award, Authentication, Notification) {
    var vm = this;

    vm.award = award;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Award
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.award.$remove(function() {
          $state.go('admin.awards.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Award deleted successfully!' });
        });
      }
    }

    // Save Award
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.awardForm');
        return false;
      }

      // Create a new award, or update the current instance
      vm.award.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.awards.list'); // should we send the User to the list or the updated Award's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Award saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Award save error!' });
      }
    }
  }
}());
