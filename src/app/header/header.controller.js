(function() {
    'use strict';

    angular
        .module('textsimilarityUi')
        .controller('HeaderController', HeaderController);

    /** @ngInject */
    function HeaderController($scope, $location) {
    	$scope.isActive = function (viewLocation) { 
	      return viewLocation === $location.path();
	    };

    }

})();