var helloApp = angular.module("helloApp", [ 'ngResource' ]);
helloApp.controller("HttpController", [ '$scope', '$resource',
		function($scope, $resource) {
			//
			// GET Action Method
			//
			var User = $resource('/user/:userId', {userId:'@userId'});
			User.get( {userId:25}, function(user){
				$scope.profile = user;
			})
			//
			// Query Action Method
			//
			var UserProfiles = $resource('/api/personas');
			UserProfiles.query(function(profiles){
				$scope.profiles = profiles;					
			});
		} ]);
			