(function () {
  'use strict';

  angular
    .module('members.admin')
    .controller('MembersAdminController', MembersAdminController);

  MembersAdminController.$inject = ['$scope', '$state', '$window', 'memberResolve', 'Authentication', 'Notification'];

  function MembersAdminController($scope, $state, $window, member, Authentication, Notification) {
    var vm = this;

    vm.member = member;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Member
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.member.$remove(function() {
          $state.go('admin.members.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Member deleted successfully!' });
        });
      }
    }

    // Save Member
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.memberForm');
        return false;
      }

      // Create a new member, or update the current instance
      vm.member.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.members.list'); // should we send the User to the list or the updated Member's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Member saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Member save error!' });
      }
    }
  }
}());
