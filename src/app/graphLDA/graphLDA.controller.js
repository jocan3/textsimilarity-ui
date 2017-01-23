(function() {
    'use strict';

    angular
        .module('textsimilarityUi')
        .controller('GraphLDAController', GraphLDAController);

    /** @ngInject */
    function GraphLDAController($timeout, webDevTec, toastr, databaseFactory) {
        var vm = this;

        vm.awesomeThings = [];
        vm.classAnimation = '';
        vm.creationDate = 1474842918032;
        vm.showToastr = showToastr;
        vm.getExperimentResults = getExperimentResults;
        vm.nextExperiment = nextExperiment;
        vm.isActive = function (viewLocation) { 
                        console.log($location.path());
                        return viewLocation === $location.path();
                      };

      
        activate();

        function activate() {
            databaseFactory.getLDAExperiments().then(function(result) {
                  vm.LDAExperiments = result;
                });
        }

        function nextExperiment(){
          if (vm.selectedExperiment == 0 || vm.selectedExperiment == vm.LDAExperiments[vm.LDAExperiments.length-1].id){
            vm.selectedIndex = 0;
            vm.selectedExperiment = vm.LDAExperiments[vm.selectedIndex].id;
          }else{
            ++vm.selectedIndex;
            vm.selectedExperiment = vm.LDAExperiments[vm.selectedIndex].id;
          }
          getExperimentResults();
        }


        function getExperimentResults(){
          console.log("changes!");
          if (vm.selectedExperiment != ""){
            databaseFactory.getLDAExperimentImputations(vm.selectedExperiment).then(function(data){
              console.log(data);
              vm.experimentResults = data;
              resetGraph();
            });
          }
        }


        function resetGraph(){
                    var svg = d3.select("#graphLdaDiv");
                    svg.selectAll("*").remove();
                    draw(vm.experimentResults);
        }

        function draw(data){
              var margin = {top: 20, right: 20, bottom: 30, left: 40},
                  width = 960 - margin.left - margin.right,
                  height = 500 - margin.top - margin.bottom;

              /* 
               * value accessor - returns the value to encode for a given data object.
               * scale - maps value to a visual display encoding, such as a pixel position.
               * map function - maps from data value to display value
               * axis - sets up axis
               */ 

              // setup x 
              var xValue = function(d) { return d.expectedClass;}, // data -> value
                  xScale = d3.scaleLinear().range([0, width]), // value -> display
                  xMap = function(d) { return xScale(xValue(d));}, // data -> display
                  xAxis = d3.axisBottom().scale(xScale);

              // setup y
              var yValue = function(d) { return d.imputedClass;}, // data -> value
                  yScale = d3.scaleLinear().range([height, 0]), // value -> display
                  yMap = function(d) { return yScale(yValue(d));}, // data -> display
                  yAxis = d3.axisLeft().scale(yScale);

              // setup fill color
              var cValue = function(d) { return d.expectedClassLabel;},
                  color =  d3.scaleOrdinal(d3.schemeCategory20b);

              // add the graph canvas to the body of the webpage
              var svg = d3.select("#graphLdaDiv").append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                .append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


                // change string (from data) into number format
                data.forEach(function(d) {
                  d.expectedClass = +d.expectedClass;
                  d.imputedClass = +d.imputedClass;
              //    console.log(d);
                });

                // don't want dots overlapping axis, so add in buffer to data domain
                xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
                yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

                // x-axis
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis)
                  .append("text")
                    .attr("class", "label")
                    .attr("x", width)
                    .attr("y", -6)
                    .style("text-anchor", "end")
                    .text("Expected");

                // y-axis
                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis)
                  .append("text")
                    .attr("class", "label")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text("Imputed");

                // draw dots
                svg.selectAll(".dot")
                    .data(data)
                  .enter().append("circle")
                    .attr("class", "dot")
                    .attr("r", 3.5)
                    .attr("cx", xMap)
                    .attr("cy", yMap)
                    .style("fill", function(d) { return color(cValue(d));});

                // draw legend
                var legend = svg.selectAll(".legend")
                    .data(color.domain())
                  .enter().append("g")
                    .attr("class", "legend")
                    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

                // draw legend colored rectangles
                legend.append("rect")
                    .attr("x", width - 18)
                    .attr("width", 18)
                    .attr("height", 18)
                    .style("fill", color);

                // draw legend text
                legend.append("text")
                    .attr("x", width - 24)
                    .attr("y", 9)
                    .attr("dy", ".35em")
                    .style("text-anchor", "end")
                    .text(function(d) { return d;})

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