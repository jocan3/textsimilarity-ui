(function() {
  'use strict';

  angular
    .module('textsimilarityUi')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('graph', {
        url: '/graph',
        templateUrl: 'app/graph/graph.html',
        controller: 'GraphController',
        controllerAs: 'vm'
      })
      .state('dataset', {
        url: '/dataset/:id',
        templateUrl: 'app/main/dataset/dataset.html',
        controller: 'DatasetController',
        controllerAs: 'vm'
      })
      .state('ldagraph', {
        url: '/ldagraph',
        templateUrl: 'app/graphLDA/graphLDA.html',
        controller: 'GraphLDAController',
        controllerAs: 'vm'
      });;

    $urlRouterProvider.otherwise('/');
  }

})();
