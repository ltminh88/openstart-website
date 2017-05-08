(function () {
  'use strict';

  angular
    .module('techs.services')
    .factory('TechsService', TechsService);

  TechsService.$inject = ['$resource', '$log'];

  function TechsService($resource, $log) {
    var Tech = $resource('/api/techs/:techId', {
      techId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Tech.prototype, {
      createOrUpdate: function () {
        var tech = this;
        return createOrUpdate(tech);
      }
    });

    return Tech;

    function createOrUpdate(tech) {
      if (tech._id) {
        return tech.$update(onSuccess, onError);
      } else {
        return tech.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(tech) {
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
