(function() {

    var NavBarController = function($scope, jimhubFactory) {

        $scope.blogCategories = [];

        $scope.showNavBarSelector = false;

        $scope.navBarSelectorPos = 0;
        $scope.navBarItemWidth = 0;

        $scope.slideMeNow = false;

        function init() {
            jimhubFactory.getBlogCategories()
                .success(function(blogCategories) {

                    var itemWidth = 800 / blogCategories.length;

                    for(var i=0; i < blogCategories.length; i++) {
                        if(blogCategories[i].link[0] != '#') {
                            blogCategories[i].target = "_blank";
                        }

                        blogCategories[i].xPos = itemWidth * i;
                    }

                    $scope.blogCategories = blogCategories;

                    $scope.navBarItemWidth = itemWidth;
                })
                .error(function(data, status, headers, config) {
                    console.error("No get blogCategories :( "+data+" "+status);
                });
        }

        $scope.selectCat = function(pos) {
            $scope.showNavBarSelector = true;
            $scope.navBarSelectorPos = pos;
            $scope.slideMeNow = true;
        }

        init();

    };

    // Parameter injection to avoid trouble from minification
    NavBarController.$inject = ['$scope', 'jimhubFactory'];

    angular.module('jimhubApp')
        .controller('NavBarController', NavBarController);

}());
