(function () {
  'use strict';

  angular
    .module('crawlers.admin')
    .controller('CrawlersAdminController', CrawlersAdminController);

  CrawlersAdminController.$inject = ['$scope', '$state', '$window', 'crawlerResolve', 'Authentication', 'Notification'];

  function CrawlersAdminController($scope, $state, $window, crawler, Authentication, Notification) {
    var vm = this;

    vm.crawler = crawler;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Crawler
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.crawler.$remove(function() {
          $state.go('admin.crawlers.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Crawler deleted successfully!' });
        });
      }
    }

    // Save Crawler
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.crawlerForm');
        return false;
      }

      // Create a new crawler, or update the current instance
      vm.crawler.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.crawlers.list'); // should we send the User to the list or the updated Crawler's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Crawler saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Crawler save error!' });
      }
    }
  }
}());
