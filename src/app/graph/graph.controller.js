(function() {
    'use strict';

    angular
        .module('textsimilarityUi')
        .controller('GraphController', GraphController);

    /** @ngInject */
    function GraphController($timeout, webDevTec, toastr, databaseFactory) {
        var vm = this;

        vm.awesomeThings = [];
        vm.classAnimation = '';
        vm.creationDate = 1474842918032;
        vm.showToastr = showToastr;

        vm.experimentResults = [];
        vm.experiments = [];

        vm.dataSetOptions = [];
        vm.algorithmOptions = [];
        vm.metricOptions = [];
        vm.trainTestOptions = [];

        vm.dataSet = "";
        vm.alpha = "";
        vm.algorithm = "";
        vm.metric = "";
        vm.trainTest = "";

        vm.resetGraph = resetGraph;

        vm.isActive = function (viewLocation) { 
                        console.log($location.path());
                        return viewLocation === $location.path();
                      };

            //Reuters 005-006 words vector with TF-IDF. Algorithm: KNN (bagging). Metric: Cosine. K=1. Train=75% Test=25%.


        var currentDR;


         var svg = d3.select("svg"),
            margin = {
                top: 20,
                right: 20,
                bottom: 30,
                left: 50
            },
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom,
            g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        var x = d3.scaleLinear()
            .rangeRound([0, width]);

        var y = d3.scaleLinear()
            .rangeRound([height, 0]);

        var line = d3.line()
            .x(function(d) {
                return x(d.k);
            })
            .y(function(d) {
                return y(d.accuracy);
            });

        var div = d3.select("body").append("div") 
                .attr("class", "tooltip")       
                .style("opacity", 0);


        activate();

        function activate() {
            databaseFactory.getExperimentResults().then(function(result) {
                  vm.experimentResults = result;
                  parseExperimentDescription().then(resetGraph());
                });
        }

        function resetGraph(){
                    if (vm.dataSet.indexOf("LDA") === -1){
                      vm.alpha = "";
                    }else{
                      if (vm.alpha === ""){
                        vm.alpha = vm.alphaOptions[0];
                      }
                    }

                    svg.selectAll("*").remove();
                    div.transition()    
                          .duration(500)    
                          .style("opacity", 0); 
                    svg = d3.select("svg"),
                          margin = {
                              top: 20,
                              right: 20,
                              bottom: 30,
                              left: 50
                          },
                          width = +svg.attr("width") - margin.left - margin.right,
                          height = +svg.attr("height") - margin.top - margin.bottom,
                          g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                    draw(
                      vm.experimentResults.filter(function (el) {
                          return el.dataset == vm.dataSet
                          && el.alpha == vm.alpha
                          && el.metric == vm.metric
                          && el.algorithm == vm.algorithm
                          && el.train_test == vm.trainTest;
                        })
                      );
        }

        function draw(data){
              x.domain(d3.extent(data, function(d) {
                  return d.k;
              }));
              y.domain(d3.extent(data, function(d) {
                  return d.accuracy;
              }));

              g.append("g")
                  .attr("class", "axis axis--x")
                  .attr("transform", "translate(0," + height + ")")
                  .call(d3.axisBottom(x))
                  .append("text")
                  .attr("fill", "#000")
                  .attr("x", 6)
                  .attr("dx", "0.71em")
                  .style("text-anchor", "end")
                  .text("K");

              g.append("g")
                  .attr("class", "axis axis--y")
                  .call(d3.axisLeft(y))
                  .append("text")
                  .attr("fill", "#000")
                  .attr("transform", "rotate(-90)")
                  .attr("y", 6)
                  .attr("dy", "0.71em")
                  .style("text-anchor", "end")
                  .text("Accuracy");

              g.append("path")
                  .datum(data)
                  .attr("class", "line")
                  .attr("d", line);

              // Add the scatterplot
              g.selectAll("dot")  
                  .data(data)     
              .enter().append("circle")               
                  .attr("r", 5)   
                  .attr("cx", function(d) { return x(d.k); })     
                  .attr("cy", function(d) { return y(d.accuracy); })   
                  .on("click", function(d) { 
                      div.transition()    
                          .duration(500)    
                          .style("opacity", 0);    
                      div.transition()    
                          .duration(200)    
                          .style("opacity", .9);    
                      div .html(d.description + ". Accuracy=" + d.accuracy)  
                          .style("left", (d3.event.pageX) + "px")   
                          .style("top", (d3.event.pageY - 28) + "px");  
                      });

        }

        function parseExperimentDescription(){
          var dataSetOptions = {};
          var algorithmOptions = {};
          var metricOptions = {};
          var trainTestOptions = {};
          var alphaOptions = {};
          var i = 0;
          for (i = 0; i < vm.experimentResults.length; ++i){
            var tempArray = vm.experimentResults[i].description.split(".");

            if (tempArray[0].indexOf("LDA") !== -1){
              vm.experimentResults[i].alpha = tempArray[0].split("Alpha:")[1].substr(0,2);
              alphaOptions[vm.experimentResults[i].alpha] = vm.experimentResults[i].alpha;
              tempArray[0] = tempArray[0].replace(" Alpha:"+ vm.experimentResults[i].alpha,"");
            }else{
              vm.experimentResults[i].alpha = "";
            }

            vm.experimentResults[i].dataset = tempArray[0].split("Train:")[0].trim();            
            dataSetOptions[vm.experimentResults[i].dataset] = vm.experimentResults[i].dataset; 

            vm.experimentResults[i].algorithm = tempArray[1].replace(" Algorithm: ","");
            algorithmOptions[vm.experimentResults[i].algorithm] = vm.experimentResults[i].algorithm; 

            vm.experimentResults[i].metric = tempArray[2].replace(" Metric: ","");
            metricOptions[vm.experimentResults[i].metric] = vm.experimentResults[i].metric; 

            vm.experimentResults[i].k = parseInt(tempArray[3].replace(" K=",""));
            
            vm.experimentResults[i].train_test = tempArray[4];
            trainTestOptions[vm.experimentResults[i].train_test] = vm.experimentResults[i].train_test; 

            //Reuters 005-006 words vector with TF-IDF. Algorithm: KNN (bagging). Metric: Cosine. K=1. Train=75% Test=25%.
          }

          vm.dataSetOptions = Object.keys(dataSetOptions);
          vm.dataSet = vm.dataSetOptions[0];
          vm.algorithmOptions = Object.keys(algorithmOptions);
          vm.algorithm = vm.algorithmOptions[0];
          vm.metricOptions = Object.keys(metricOptions);
          vm.metric = vm.metricOptions[0];
          vm.trainTestOptions = Object.keys(trainTestOptions);
          vm.trainTest = vm.trainTestOptions[0];
          vm.alphaOptions = Object.keys(alphaOptions);
          vm.alpha = "";
 
          return Promise.resolve();
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