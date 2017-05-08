(function () {
  'use strict';

  angular
    .module('categorys.services')
    .factory('CategorysService', CategorysService);


  CategorysService.$inject = ['$resource', '$log'];

  function CategorysService($resource, $log) {
    var Category = $resource('/api/categorys/:categoryId', {
      categoryId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    
    angular.extend(Category.prototype, {
      createOrUpdate: function () {
        var Category = this;
        return createOrUpdate(Category);
      }
    });

    return Category;

    function createOrUpdate(GameCat) {
      if (Category._id) {
        return Category.$update(onSuccess, onError);
      } else {
        return Category.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(Category) {
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
