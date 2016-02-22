// var ForceDiagram = (function() {
//
//     var nodes = [];
//     var edges = [];
//     var height = 960;
//     var width = 960;
//
//     // async
//     function init()  {
//         $.getJSON(filePath, function(data) {
//
//             _.each(data.associationPair, function(i) {
//
//                 var node1 = i.strMainEntity;
//                 var node2 = i.strSlaveEntity;
//                 _addNode(node1, nodes);
//                 _addNode(node2, nodes);
//             });
//             _addLinks(nodes, data.associationPair, edges);
//             _render(nodes,edges);
//         });
//     }
//
//     function _render(nodeData, linkData) {
//         var charge = -120;
//         var linkDist = 60;
//         var nodeRadius = 8;
//
//         var color = d3.scale.category20();
//
//         var force = d3.layout.force()
//             .charge(charge)
//             .linkDistance(linkDist)
//             .size([width, height]);
//
//         var canvas = d3.select('.canvas')
//             .attr('width', width)
//             .attr('height', height);
//
//         force
//             .nodes(nodeData)
//             .links(linkData)
//             .start();
//
//         var links = canvas.selectAll('.links')
//             .data(linkData)
//             .enter()
//             .append("line")
//             .attr("class", "link");
//
//         var nodes = canvas.selectAll('.node')
//             .data(nodeData)
//             .enter()
//             .append('g')
//             .call(force.drag);
//
//         nodes
//             .append('circle')
//             .attr('class', 'node')
//             .attr('r', nodeRadius);
//
//         nodes
//             .append("text")
//             .attr("x", 12)
//             .attr("dy", ".35em")
//             .text(function(d) { return d.name; });
//
//         force.on("tick", function() {
//             links.attr("x1", function(d) { return d.source.x; })
//                 .attr("y1", function(d) { return d.source.y; })
//                 .attr("x2", function(d) { return d.target.x; })
//                 .attr("y2", function(d) { return d.target.y; });
//
//         nodes
//             .attr("transform", function(d) { return "translate(" + d.x + "," +  d.y + ")"; });
//         });
//     }
//
//     /**
//      * Adds an object element of the form {name: @name} to the specified array
//      * Ensures no duplicate elements are added
//      *
//      * @param {string} name name of elment to be added to nodeList
//      * @param {array} nodeList
//      */
//     function _addNode(name, nodeList) {
//         var found=false;
//         if(nodeList.length === 0) {
//             nodeList.push({name: name});
//         } else {
//             for(var i=0; i<nodeList.length; i++) {
//                 if(nodeList[i].name == name) {
//                     found=true;
//                     break;
//                 }
//             }
//             if(!found) {
//                 nodeList.push({name: name});
//             }
//         }
//     }
//
//     function _addLinks(nodes, map, linkList) {
//       _.each(map, function(j) {
//         var parent = {name: j.strMainEntity};
//         var child = {name: j.strSlaveEntity};
//         var nodeIndexes = [];
//
//         for(var i = 0; i < nodes.length; i++) {
//           if(_.isEqual(nodes[i], parent)) {
//             nodeIndexes.push(i);
//           } else if(_.isEqual(nodes[i], child)) {
//             nodeIndexes.unshift(i);
//           }
//         }
//         if(nodeIndexes.length === 0) {
//           throw new Error ('oops');
//         }
//         linkList.push({source: nodeIndexes[1], target: nodeIndexes[0]});
//         });
//     }
//
//     function getNodes() {
//         return nodes;
//     }
//
//     function getEdges() {
//         return edges;
//     }
//
//     return {
//         init: init,
//         nodes: getNodes,
//         edges: getEdges
//     };
// })();

var Force = (function() {
    var width = 1200,
        height =  1000,
        filePath = '',
        nodes = [],
        links = [],
        charge = -100,
        linkDist = 50,
        nodeRadius = 6,
        title = "Business Entity Data Model: FedEx OpenShipping Service",
        legendInfo = [
            {name: "associationPair", lineStyle: "5, 5, 1, 5", y: 55 },
            {name: "exclusiveContainmentPair", lineStyle: "5, 1", y: 80},
            {name: "weakInclusiveContainmentPair", lineStyle: "0.9", y: 105},
            {name: "strongInclusiveContainmentPair", lineStyle: "15, 10, 5, 10", y: 130}
        ],
        force;

    function _init() {
        console.log('start init');
        // if(filePath === null) {
        //     throw new Error ('filePath for data not set');
        // }
        $.getJSON(filePath, function(data) {
            /**
             * TEST VARS
             */
            var entityNames = [];

            _.each(data.entities,function(item) {
                var obj = {name: item.name, attributes: item.attributes, compulsory: item.compulsory};
                nodes.push(obj);

                // check for duplicates in entities
                if(!_exists(entityNames, item.name)) {
                    entityNames.push(item.name);
                    // console.log(item.name);
                } else {
                    console.log('dupe found');
                }
            });


            _createLinks(data.associationPair, nodes, 'associationPair', links);
            _createLinks(data.exclusiveContainmentPair, nodes, 'exclusiveContainmentPair', links);
            _createLinks(data.weakInclusiveContainmentPair, nodes, 'weakInclusiveContainmentPair', links);
            _createLinks(data.strongInclusiveContainmentPair, nodes, 'strongInclusiveContainmentPair', links);
            _render(nodes, links);
            /**
             * TEST OUTPUT
             */
            //console.log(entityNames);
            // console.log(links);
            // console.log(nodes);
            // setTimeout(function() {
            //     // console.log(force.linkDistance());
            //     force.linkDistance(force.linkDistance() * 2.5);
            //     force.charge(force.charge() * 2.5);
            //
            //     force.start();
            //     console.log('grow');
            // }, 6000);





        });
    }

    function _setData(widthInput, heightInput, filePathInput) {
        width = widthInput;
        height = heightInput;
        filePath = filePathInput;
    }

    function _getFilePath() {
        return filePath;
    }

    function _getDimensions() {
        return {width: width, height: height};
    }

    function _exists(list, name) {
        return _.contains(list, name);
    }

    function _createLinks(linkData, nodes, linkType, links) {
        if(linkData.length === 0) {

        }
        _.each(linkData, function(link) {
            var parent = {name: link.strMainEntity},
                child = {name: link.strSlaveEntity},
                nodeIndexes = [];

            var parentIndex = _getNodeIndex(nodes, link.strMainEntity),
                childIndex = _getNodeIndex(nodes, link.strSlaveEntity);

            links.push({source: parentIndex, target: childIndex, linkType: linkType});
        });
    }

    function _getNodeIndex(nodes, nodeName) {
        var index =  null;
        var instances = 0;
        _.each(nodes, function(node, i) {
            if(node.name === nodeName) {
                instances++;
                index = i;
            }
        });
        return index;
    }

    function _render(nodeData, linkData) {

        var color = d3.scale.category20();

        force = d3.layout.force()
            .charge(charge)
            .linkDistance(linkDist)
            .size([width, height]);

        var canvas = d3.select('.canvas')
            .attr('width', width)
            .attr('height', height);

        canvas
            .append("text")
            .attr("x", (width/2))
            .attr("y", 35)
            .attr("class", "business-entity-diagram-title")
            .attr("text-anchor", "middle")
            .text(title);

        canvas
            .append("defs")
            .append("marker")
            .attr("id", "arrow-head")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 22)
            .attr("refY", 0)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
          .append("path")
            .attr("d", "M0,-5L10,0L0,5 L10,0 L0, -5")
            .style("stroke", "#FFF");

            // .attr("fill", "#FFF");
        var legend = canvas.append("g")
            .attr("class", "legend");



        var legendLines = legend.selectAll("line.legend-line")
            .data(legendInfo)
            .enter()
            .append("line")
            .attr("class", "legend-line")
            .attr("x1", 10)
            .attr("x2", 150)
            .attr("y1", function(d, i) { return d.y; })
            .attr("y2", function(d, i) { return d.y; })
            .attr("stroke-dasharray", function(d) { return d.lineStyle; });

        var legendText = legend.selectAll("text.legend-text")
            .data(legendInfo)
            .enter()
            .append("text")
            .attr("class", "legend-text")
            .attr("x", 10)
            .attr("y", function(d, i) { return d.y-5; })
            .text(function(d) { return d.name; });


        force
            .nodes(nodeData)
            .links(linkData)
            .start();

        var links = canvas.selectAll('.links')
            .data(linkData)
            .enter()
            .append("line")
            .attr("class", "link")
            .attr("stroke-dasharray", function(d) {
                if(d.linkType === 'associationPair') {
                    return "5, 5, 1, 5";
                }
                else if (d.linkType === 'exclusiveContainmentPair') {
                    return "5, 1";
                }
                else if (d.linkType === 'weakInclusiveContainmentPair') {
                    return "0.9";
                }
                else if (d.linkType === 'strongInclusiveContainmentPair') {
                    return "15, 10, 5, 10";
                }
            })
            .attr("marker-end", "url(#arrow-head)");
            // .style("stroke", function(d) {
            //     if(d.linkType === 'associationPair') {
            //         return "red";
            //     }
            //     else if (d.linkType === 'exclusiveContainmentPair') {
            //         return "blue";
            //     }
            //     else if (d.linkType === 'weakInclusiveContainmentPair') {
            //         return "green";
            //     }
            //     else if (d.linkType === 'strongInclusiveContainmentPair') {
            //         return "#666";
            //     }
            // });

        var nodes = canvas.selectAll('.node')
            .data(nodeData)
            .enter()
            .append('g')
            .call(force.drag)
            .on('click', function(d) { console.log(d); });

        nodes
            .append('circle')
            .attr('class', 'node')
            .attr('r', nodeRadius)
            .attr('opacity', 0.8);

        nodes
            .append("text")
            .attr("x", 12)
            .attr("dy", ".35em")
            .text(function(d) { return d.name; });

        force.on("tick", function() {
            links.attr("x2", function(d) { return d.source.x; })
                .attr("y2", function(d) { return d.source.y; })
                .attr("x1", function(d) { return d.target.x; })
                .attr("y1", function(d) { return d.target.y; });



        nodes
            .attr("transform", function(d) { return "translate(" + d.x + "," +  d.y + ")"; });
        });

        // brush
        var x = d3.scale.linear()
            .domain([0, 2.5]) // inputs
            .range([0, 200]) // outputs
            .clamp(true); // restrained to inputs

        canvas
        .append("g")
        .attr("class", "slider-container")
        .attr("transform", "translate(15," + 10 + ")")
        .append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + 10 + ")")
        .call(d3.svg.axis()
            .scale(x)
            .orient("bottom")
            // .tickFormat(function(d) { return d + "%"; })
            .tickSize(0)
            .tickPadding(10))
        .select(".domain")
        .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "halo");

        var brush = d3.svg.brush()
            .x(x)
            .extent([0, 0])
            .on("brush", brushed)
            .on("brushend", brushend);

        var slider = d3.select(".slider-container").append("g")
            .attr("class", "slider")
            .call(brush);

        var handle = slider.append("circle")
            .attr("class", "handle")
            .attr("transform", "translate(0," + 10 + ")")
            .attr("r", 9);


        slider
            .selectAll(".extent,.resize")
            .remove();

        function brushend() {
            var value = brush.extent()[0];
            force.linkDistance(linkDist + linkDist * value);
            force.charge(charge + charge * value);
            force.start();
        }

        function brushed() {
          var value = brush.extent()[0];

          if (d3.event.sourceEvent) { // not a programmatic event
            value = x.invert(d3.mouse(this)[0]);
            brush.extent([value, value]);
          }
          handle.attr("cx", x(value));
        }


    }

    function _test() {
        console.log(force);
    }

    return {
        setData: _setData,
        getDimensions: _getDimensions,
        getFilePath: _getFilePath,
        init: _init,
        nodes: nodes,
        links: links
    };
})();

$(window).load(function() {
    console.log('starting force diagram');
    console.log('....');
    console.log('setting width, height and data file path...');
    Force.setData(1200, 1000, '../data/OpenShip1.json');
    console.log('init force diagram to DOM');
    Force.init();
    // $("g.slider").mouseup(function(e) {
    //     console.log('hello');
    // });
});
