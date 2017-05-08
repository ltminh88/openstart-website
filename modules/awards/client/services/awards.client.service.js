(function () {
  'use strict';

  angular
    .module('awards.services')
    .factory('AwardsService', AwardsService);

  AwardsService.$inject = ['$resource', '$log'];

  function AwardsService($resource, $log) {
    var Award = $resource('/api/awards/:awardId', {
      awardId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Award.prototype, {
      createOrUpdate: function () {
        var award = this;
        return createOrUpdate(award);
      }
    });

    return Award;

    function createOrUpdate(award) {
      if (award._id) {
        return award.$update(onSuccess, onError);
      } else {
        return award.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(award) {
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
