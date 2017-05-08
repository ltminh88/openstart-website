(function () {
  'use strict';

  angular
    .module('crawlers.services')
    .factory('CrawlersService', CrawlersService);

  CrawlersService.$inject = ['$resource', '$log'];

  function CrawlersService($resource, $log) {
    var Crawler = $resource('/api/crawlers/:crawlerId', {
      crawlerId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Crawler.prototype, {
      createOrUpdate: function () {
        var crawler = this;
        return createOrUpdate(crawler);
      }
    });

    return Crawler;

    function createOrUpdate(crawler) {
      if (crawler._id) {
        return crawler.$update(onSuccess, onError);
      } else {
        return crawler.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(crawler) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
