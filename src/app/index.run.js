(function() {
  'use strict';

  angular
    .module('textsimilarityUi')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
