(function() {
    'use strict';
    angular
        .module('core')
        .directive('onFinishRender', OnFinishRenderDirective)

    OnFinishRenderDirective.$inject = ['$timeout'];

    function OnFinishRenderDirective($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                //console.log("OnFinishRenderDirective");
                if (scope.$last === true) {
                    $timeout(function() {
                        scope.$emit(attr.onFinishRender, element);
                    });
                }
            }
        }
    };
}());
