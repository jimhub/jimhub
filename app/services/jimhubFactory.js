

(function() {

    var jimhubFactory = function($http) {

        var factory = {};

        factory.getNavBarItems = function() {
            return $http.get('/navbar');
        };

        factory.getBlogCategories = function() {
            return $http.get('/blogCategories');
        };
        
        factory.getBlogs = function(blogCat, blogID) {
            if(blogCat) {
                if(blogID) {
                    return $http.get('/blogs/'+blogCat+'/'+blogID);
                }
                else {
                    return $http.get('/blogs/'+blogCat);
                }
            }
            else {
                return $http.get('/blogs');
            }
        };

        return factory;
    }

    jimhubFactory.$inject = ['$http'];

    angular.module('jimhubApp')
        .factory('jimhubFactory', jimhubFactory);

}());

