
(function () {

    angular.module('jimhubApp', ['ngRoute', 'ngAnimate'])

        .config(function ($routeProvider) {
            $routeProvider
                .when('/:blogCat/:blogID', {
                    controller: 'BlogsController',
                    templateUrl: 'app/views/blogView.html'
                })
                .when('/:blogCat', {
                    controller: 'BlogsController',
                    templateUrl: 'app/views/blogView.html'
                })
                .when('/', {
                    controller: 'BlogsController',
                    templateUrl: 'app/views/blogView.html'
                })
                .otherwise( { redirectTo: '/' });
        });


}());
