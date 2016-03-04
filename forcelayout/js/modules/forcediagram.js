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
            {name: "associationPair", lineStyle: "5, 5, 1, 5", y: 65 },
            {name: "exclusiveContainmentPair", lineStyle: "5, 1", y: 90},
            {name: "weakInclusiveContainmentPair", lineStyle: "0.9", y: 115},
            {name: "strongInclusiveContainmentPair", lineStyle: "15, 10, 5, 10", y: 140},
            {name: "optionalExclusiveContainmentPair", lineStyle: null, y: 165}

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

            _createLinks(data.optionalExclusiveContainmentPair, nodes, 'optionalExclusiveContainmentPair', links);
            _createLinks(data.associationPair, nodes, 'associationPair', links);
            _createLinks(data.exclusiveContainmentPair, nodes, 'exclusiveContainmentPair', links);
            _createLinks(data.weakInclusiveContainmentPair, nodes, 'weakInclusiveContainmentPair', links);
            _createLinks(data.strongInclusiveContainmentPair, nodes, 'strongInclusiveContainmentPair', links);
            _render(nodes, links);

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

        var svg = d3.select('svg')
        .attr('width', width)
        .attr('height', height);


        var outer = d3.select('.outer')
        //   .call(d3.behavior.zoom().on("zoom", rescale))
          .on("dblclick.zoom", null);

        var canvas = outer
        .append('svg:g')
          .on("mousedown", mousedown);

        canvas
            .append('rect')
            .attr('width', width)
            .attr('height', height)
            // .attr("fill", "none");
            .attr('fill', '#212F3D');

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
            // var drag = d3.behavior.drag()
            //     .origin(function(d) { return d; })
            //     .on("dragstart", dragstarted)
            //     .on("drag", dragged)
            //     .on("dragend", dragended);

        var nodes = canvas.selectAll('.node')
            .data(nodeData)
            .enter()
            .append('g');
            // .call(force.drag)
            // .call(drag)


        nodes
            .append('circle')
            .attr('class', 'node')
            .attr('r', nodeRadius)
            .attr('opacity', 0.8)
            .on('dblclick', function(d) { buildTree(d.name); });

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
            .domain([0, 3]) // inputs
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
            .tickPadding(8))
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

        function rescale() {
          trans=d3.event.translate;
          scale=d3.event.scale;

          canvas.attr("transform",
              "translate(" + trans + ")" + " scale(" + scale + ")");
        }

        function mousedown() {
          if (false/*!mousedown_node && !mousedown_link*/) {
            // allow panning if nothing is selected
            // canvas.call(d3.behavior.zoom().on("zoom"), rescale);

            return;
          }
        }

        function buildTree(rootNode) {
            var test = {
                name: rootNode,
                children: []
            };

            children = [];
            parents = [];
            console.log(rootNode);
            // console.log(force.links());
            // console.log(force.nodes());

            // find all connected links
            _.each(force.links(), function(i) {
                // get the Parents
                if(i.source.name === rootNode) {
                    // children.push({name: i.target.name, attributes: });
                    // test.children.push(i.target.name);
                }
                if(i.target.name === rootNode) {
                    parents.push(i.source.name);
                }


            });

            console.log(children, parents);

        }

    }


    function dragstarted(d) {
        d3.event.sourceEvent.stopPropagation();
        d3.select(this).classed("dragging", true);
    }

    function dragged(d) {
        d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
    }

    function dragended(d) {
        d3.select(this).classed("dragging", false);
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
