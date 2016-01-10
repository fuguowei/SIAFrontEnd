var ForceDiagram = (function() {

    var nodes = [];
    var edges = [];
    var height = 960;
    var width = 960;

    // async
    function init()  {
        $.getJSON('../data/OpenShip1.json', function(data) {
            _.each(data.associationPair, function(i) {
                var node1 = i.strMainEntity;
                var node2 = i.strSlaveEntity;
                _addNode(node1, nodes);
                _addNode(node2, nodes);
            });
            _addLinks(nodes, data.associationPair, edges);
            console.log(nodes);
            console.log(edges);
            _render(nodes,edges);
        });
    }

    function _render(nodeData, linkData) {
        var charge = -120;
        var linkDist = 60;
        var nodeRadius = 8;

        var color = d3.scale.category20();

        var force = d3.layout.force()
            .charge(charge)
            .linkDistance(linkDist)
            .size([width, height]);

        var canvas = d3.select('.canvas')
            .attr('width', width)
            .attr('height', height);

        force
            .nodes(nodeData)
            .links(linkData)
            .start();

        var links = canvas.selectAll('.links')
            .data(linkData)
            .enter()
            .append("line")
            .attr("class", "link");

        var nodes = canvas.selectAll('.node')
            .data(nodeData)
            .enter()
            .append('g')
            .call(force.drag);

        nodes
            .append('circle')
            .attr('class', 'node')
            .attr('r', nodeRadius);

        nodes
            .append("text")
            .attr("x", 12)
            .attr("dy", ".35em")
            .text(function(d) { return d.name; });

        force.on("tick", function() {
            links.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

        nodes
            .attr("transform", function(d) { return "translate(" + d.x + "," +  d.y + ")"; });
        });
    }

    /**
     * Adds an object element of the form {name: @name} to the specified array
     * Ensures no duplicate elements are added
     *
     * @param {string} name name of elment to be added to nodeList
     * @param {array} nodeList
     */
    function _addNode(name, nodeList) {
        var found=false;
        if(nodeList.length === 0) {
            nodeList.push({name: name});
        } else {
            for(var i=0; i<nodeList.length; i++) {
                if(nodeList[i].name == name) {
                    found=true;
                    break;
                }
            }
            if(!found) {
                nodeList.push({name: name});
            }
        }
    }

    function _addLinks(nodes, map, linkList) {
      _.each(map, function(j) {
        var parent = {name: j.strMainEntity};
        var child = {name: j.strSlaveEntity};
        var nodeIndexes = [];

        for(var i = 0; i < nodes.length; i++) {
          if(_.isEqual(nodes[i], parent)) {
            nodeIndexes.push(i);
          } else if(_.isEqual(nodes[i], child)) {
            nodeIndexes.unshift(i);
          }
        }
        if(nodeIndexes.length === 0) {
          throw new Error ('oops');
        }
        linkList.push({source: nodeIndexes[1], target: nodeIndexes[0]});
        });
        console.log(linkList);
    }

    function getNodes() {
        return nodes;
    }

    function getEdges() {
        return edges;
    }

    return {
        init: init,
        nodes: getNodes,
        edges: getEdges
    };
})();

var Force = (function() {
    var width = 1000,
        height =  1000,
        filePath = '',
        nodes = [],
        links = [],
        charge = -120,
        linkDist = 50,
        nodeRadius = 6;

    function _init() {
        console.log('start init');
        // if(filePath === null) {
        //     throw new Error ('filePath for data not set');
        // }
        $.getJSON(filePath, function(data) {
            console.log('test');
            console.log(data);
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
                console.log('found');
                instances++;
                index = i;
            }
        });
        return index;
    }

    function _render(nodeData, linkData) {

        var color = d3.scale.category20();

        var force = d3.layout.force()
            .charge(charge)
            .linkDistance(linkDist)
            .size([width, height]);

        var canvas = d3.select('.canvas')
            .attr('width', width)
            .attr('height', height);

        force
            .nodes(nodeData)
            .links(linkData)
            .start();

        var links = canvas.selectAll('.links')
            .data(linkData)
            .enter()
            .append("line")
            .attr("class", "link");

        var nodes = canvas.selectAll('.node')
            .data(nodeData)
            .enter()
            .append('g')
            .call(force.drag);

        nodes
            .append('circle')
            .attr('class', 'node')
            .attr('r', nodeRadius);

        nodes
            .append("text")
            .attr("x", 12)
            .attr("dy", ".35em")
            .text(function(d) { return d.name; });

        force.on("tick", function() {
            links.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

        nodes
            .attr("transform", function(d) { return "translate(" + d.x + "," +  d.y + ")"; });
        });
    }

    return {
        setData: _setData,
        getDimensions: _getDimensions,
        getFilePath: _getFilePath,
        init: _init
    };
})();

$(window).load(function() {
    console.log('starting force diagram');
    console.log('....');
    console.log('setting width, height and data file path...');
    Force.setData(1000, 1000, '../data/OpenShip1.json');
    console.log('init force diagram to DOM');
    Force.init();
});
