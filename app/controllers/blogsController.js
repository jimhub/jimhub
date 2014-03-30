
(function() {

    var BlogsController = function($scope, jimhubFactory) {

        $scope.blogs = [];
        $scope.blogCategories = [];

        $scope.showNavBarSelector = false;

        function init() {
            jimhubFactory.getBlogCategories()
                .success(function(blogCategories) {
                    $scope.blogCategories = blogCategories;
                })
                .error(function(data, status, headers, config) {
                    console.error("No get blogCategories :( "+data+" "+status);
                });

            jimhubFactory.getBlogs()
                .success(function(blogs) {
                    $scope.blogs = blogs;
                })
                .error(function(data, status, headers, config) {
                    console.log("No get blogs :( "+data+" "+status);
                });
        }

        function selectCat(asd) {
            $scope.showNavBarSelector = true;
        }

        init();

    };

    // Parameter injection to avoid trouble from minification
    BlogsController.$inject = ['$scope', 'jimhubFactory'];

    angular.module('jimhubApp')
        .controller('BlogsController', BlogsController);

}());
