
(function () {

    angular.module('jimhubApp', ['ngRoute', 'ngAnimate'])

        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    controller: 'BlogsController',
                    templateUrl: 'app/views/blogView.html'
                })
                .otherwise( { redirectTo: '/' });
        });


}());
