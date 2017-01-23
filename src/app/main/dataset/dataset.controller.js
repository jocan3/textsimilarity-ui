(function() {
  'use strict';

  angular
    .module('textsimilarityUi')
    .controller('DatasetController', DatasetController);

  /** @ngInject */
  function DatasetController($timeout, webDevTec, toastr, databaseFactory,$stateParams) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1474842918032;
    vm.showToastr = showToastr;

    vm.documents = [];
    var currentDR;

    vm.gridOptions2 = {
      paginationPageSizes: [25, 50, 75],
      paginationPageSize: 25,
      data: vm.documents
    };

    activate();

    function activate() {
        databaseFactory.getDocumentsByDRId($stateParams.id).then(function(result){
            vm.gridOptions2.data = result;
            //console.log(vm.datasetRepresentations)
          });
          
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
})();
