(function () {
  'use strict';

  angular
    .module('events.admin')
    .controller('EventsAdminController', EventsAdminController);

  EventsAdminController.$inject = ['$scope', '$state', '$window', 'eventResolve', 'Authentication', 'Notification'];

  function EventsAdminController($scope, $state, $window, event, Authentication, Notification) {
    var vm = this;

    vm.event = event;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Event
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.event.$remove(function() {
          $state.go('admin.events.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Event deleted successfully!' });
        });
      }
    }

    // Save Event
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.eventForm');
        return false;
      }

      // Create a new event, or update the current instance
      vm.event.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.events.list'); // should we send the User to the list or the updated Event's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Event saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Event save error!' });
      }
    }
  }
}());
