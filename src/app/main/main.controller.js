(function() {
  'use strict';

  angular
    .module('textsimilarityUi')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, databaseFactory) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1474842918032;
    vm.showToastr = showToastr;
    vm.getCSVFile = getCSVFile;

    vm.datasetRepresentations = [];
    vm.experiments = [];
    vm.processingItems = [];

    var currentDR;

    activate();

    function activate() {
      databaseFactory.getProcessingItems().then(function(items){
                  vm.processingItems = items;

                   databaseFactory.getDatasetRepresentations().then(function(result){
                      vm.datasetRepresentations = result;
                       databaseFactory.getExperiments().then(function(exp){
                          vm.experiments = exp;
                        });

                    });


      });


       
       
          
    }

    function getCSVFile(id){
        databaseFactory.getDocumentsByDRIdCSV(id);
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
