(function() {
  'use strict';

  angular
    .module('textsimilarityUi')
    .factory('databaseFactory', databaseFactory);

  /** @ngInject */
  function databaseFactory($log, $http) {
 // var apiHost = window.location.protocol + '//' + window.location.hostname + '/textsimilarity_dev-api';
  var apiHost = window.location.protocol + '//' + window.location.hostname + '/textsimilarity-api';
 // var apiHost = 'http://192.169.150.232/textsimilarity_dev-api';
   //var apiHost = 'http://192.169.150.232/textsimilarity-api'

    var service = {
      apiHost: apiHost,
      getDatasetRepresentations: getDatasetRepresentations,
      getExperiments:getExperiments,
      getDocumentsByDRId: getDocumentsByDRId,
      getDocumentsByDRIdCSV: getDocumentsByDRIdCSV,
      getExperimentResults: getExperimentResults,
      getProcessingItems: getProcessingItems,
      getLDAExperimentImputations: getLDAExperimentImputations,
      getLDAExperiments: getLDAExperiments

    };

    return service;

    function getDatasetRepresentations(){
      console.log('meh!')
      return $http.get(apiHost + '/datasetrepresentation')
        .then(getDatasetRepresentationsComplete)
        .catch(getDatasetRepresentationsFailed);

          function getDatasetRepresentationsComplete(response) {
            console.log(response);
            return response.data;
          }

          function getDatasetRepresentationsFailed(error) {
            console.log(error)
            $log.error('Failed for getDatasetRepresentations.\n' + angular.toJson(error.data, true));
          }
    }

    function getExperiments(){
      console.log('meh!')
      return $http.get(apiHost + '/experiment')
        .then(getExperimentComplete)
        .catch(getExperimentFailed);

          function getExperimentComplete(response) {
            console.log(response);
            return response.data;
          }

          function getExperimentFailed(error) {
            console.log(error)
            $log.error('Failed for getExperiment.\n' + angular.toJson(error.data, true));
          }
    }

    function getDocumentsByDRIdCSV(id){
      return $http.get(apiHost + '/getDocumentsByRepresentationIdCSV/'+id)
        .then(getDocumentsByDRIdCSVComplete)
        .catch(getDocumentsByDRIdCSVFailed);

          function getDocumentsByDRIdCSVComplete(response) {
            return response.data;
          }

          function getDocumentsByDRIdCSVFailed(error) {
            $log.error('Failed for getDatasetRepresentations.\n' + angular.toJson(error.data, true));
          }
    }

    function getDocumentsByDRId(id){
      return $http.get(apiHost + '/getDocumentsByRepresentationId/'+id)
        .then(getDocumentsByDRIdComplete)
        .catch(getDocumentsByDRIdFailed);

          function getDocumentsByDRIdComplete(response) {
            return response.data;
          }

          function getDocumentsByDRIdFailed(error) {
            $log.error('Failed for getDatasetRepresentations.\n' + angular.toJson(error.data, true));
          }
    }

    function getExperimentResults(id){
      return $http.get(apiHost + '/experimentResults')
        .then(getExperimentResultsComplete)
        .catch(getExperimentResultsFailed);

          function getExperimentResultsComplete(response) {
            return response.data;
          }

          function getExperimentResultsFailed(error) {
            $log.error('Failed for getExperimentResults.\n' + angular.toJson(error.data, true));
          }
    }

    function getProcessingItems(){
      return $http.get(apiHost + '/getProcessingItems')
        .then(getProcessingItemsSuccess)
        .catch(getProcessingItemsFailed);

          function getProcessingItemsSuccess(response) {
            return response.data;
          }

          function getProcessingItemsFailed(error) {
            $log.error('Failed for getProcessingItems.\n' + angular.toJson(error.data, true));
          }
    }

     function getLDAExperimentImputations(id){
      return $http.get(apiHost + '/LDAExperimentImputations/' + id)
        .then(getLDAExperimentImputationsSuccess)
        .catch(getLDAExperimentImputationsFailed);

          function getLDAExperimentImputationsSuccess(response) {
            return response.data;
          }

          function getLDAExperimentImputationsFailed(error) {
            $log.error('Failed for getProcessingItems.\n' + angular.toJson(error.data, true));
          }
    }

     function getLDAExperiments(){
      return $http.get(apiHost + '/LDAExperiments')
        .then(getLDAExperimentsSuccess)
        .catch(getLDAExperimentsFailed);

          function getLDAExperimentsSuccess(response) {
            return response.data;
          }

          function getLDAExperimentsFailed(error) {
            $log.error('Failed for getProcessingItems.\n' + angular.toJson(error.data, true));
          }
    }
     
  }
})();
