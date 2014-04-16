
(function() {

    var BlogsController = function($scope, jimhubFactory, $routeParams) {

        $scope.blogs = [];
        
        function init() {
            jimhubFactory.getBlogs($routeParams.blogCat, $routeParams.blogID)
                .success(function(blogs) {
                    $scope.blogs = blogs;
                })
                .error(function(data, status, headers, config) {
                    console.log("No get blogs :( "+data+" "+status);
                });
        }

        init();

    };

    // Parameter injection to avoid trouble from minification
    BlogsController.$inject = ['$scope', 'jimhubFactory', '$routeParams'];

    angular.module('jimhubApp')
        .controller('BlogsController', BlogsController);

}());
