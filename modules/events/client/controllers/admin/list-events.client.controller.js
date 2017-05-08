(function () {
  'use strict';

  angular
    .module('events.admin')
    .controller('EventsAdminListController', EventsAdminListController);

  EventsAdminListController.$inject = ['EventsService'];

  function EventsAdminListController(EventsService) {
    var vm = this;

    vm.events = EventsService.query();
  }
}());
