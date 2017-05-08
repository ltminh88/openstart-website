(function () {
  'use strict';

  angular
    .module('advertisments.services')
    .factory('AdvertismentsService', AdvertismentsService);

  AdvertismentsService.$inject = ['$resource', '$log'];

  function AdvertismentsService($resource, $log) {
    var Advertisment = $resource('/api/advertisments/:advertismentId', {
      advertismentId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Advertisment.prototype, {
      createOrUpdate: function () {
        var advertisment = this;
        return createOrUpdate(advertisment);
      }
    });

    return Advertisment;

    function createOrUpdate(advertisment) {
      if (advertisment._id) {
        return advertisment.$update(onSuccess, onError);
      } else {
        return advertisment.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(advertisment) {
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
