(function () {
  'use strict';

  angular
    .module('pages.services')
    .factory('PagesService', PagesService);

  PagesService.$inject = ['$resource', '$log'];

  function PagesService($resource, $log) {
    var Page = $resource('/api/pages/:pageId', {
      pageId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Page.prototype, {
      createOrUpdate: function () {
        var page = this;
        return createOrUpdate(page);
      }
    });

    return Page;

    function createOrUpdate(page) {
      if (page._id) {
        return page.$update(onSuccess, onError);
      } else {
        return page.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(page) {
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
