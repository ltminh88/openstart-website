(function () {
  'use strict';

  angular
    .module('members.services')
    .factory('MembersService', MembersService);

  MembersService.$inject = ['$resource', '$log'];

  function MembersService($resource, $log) {
    var Member = $resource('/api/members/:memberId', {
      memberId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Member.prototype, {
      createOrUpdate: function () {
        var member = this;
        return createOrUpdate(member);
      }
    });

    return Member;

    function createOrUpdate(member) {
      if (member._id) {
        return member.$update(onSuccess, onError);
      } else {
        return member.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(member) {
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
