(function() {
    'use strict';

    angular
        .module('home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'ArticlesService', 'ProjectsService'];

    function HomeController($scope, ArticlesService, ProjectsService) {
        var vm = this;

        vm.articles = ArticlesService.query();

        vm.env = 'tv';

        vm.currentSection = "game-div";
        vm.currentIndex = 0;
        //Section select

        $scope.$on('$viewContentLoaded', function(event) {
            console.log("viewContentLoaded");
        });
        $scope.$on('ngRepeatGamesSlideFinished', function() {});
    }
}());
