

(function() {

    var jimhubFactory = function($http) {

        var factory = {};

        factory.getBlogCategories = function() {
            return $http.get('/blogCategories');
        };

        factory.getBlogs = function() {
            return $http.get('/blogs');
        };

        return factory;
    }

    jimhubFactory.$inject = ['$http'];

    angular.module('jimhubApp')
        .factory('jimhubFactory', jimhubFactory);

}());

