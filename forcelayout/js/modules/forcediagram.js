var ForceDiagram = (function() {

    var nodes = [];
    var edges = [];
    var height = 960;
    var width = 500;

    // async
    function init()  {
        $.getJSON('data/data.json', function(data) {
            _.each(data.coincidencePair, function(i) {
                var node1 = i.strMainEntity;
                var node2 = i.strSlaveEntity;
                _addNode(node1, nodes);
                _addNode(node2, nodes);
            });
            _addLinks(nodes, data.coincidencePair, edges);
            console.log(nodes);
            console.log(edges);
            _render(nodes,edges);
        });
    }

    function _render(nodes, links) {
        var width = 960,
            height = 500;

        var color = d3.scale.category20();

        var force = d3.layout.force()
            .charge(-120)
            .linkDistance(30)
            .size([width, height]);

        var canvas = d3.select('.canvas')
            .attr('width', width)
            .attr('height', height);

        force
            .nodes(nodes)
            .links(links)
            .start();

        var node = canvas.selectAll('.node')
            .data(nodes)
            .enter()
            .append('circle')
            .attr('class', 'node')
            .attr('r', 5);

        node.append("title")
            .text(function(d) { return d.name; });

        var link = canvas.selectAll('.links')
            .data(links)
            .enter()
            .append("line")
            .attr("class", "link");

        canvas.append("defs").selectAll("marker")
            .data(["end"])
            .enter().append("marker")
            .attr("id", function(d) { return d; })
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 25)
            .attr("refY", 0)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5 L10,0 L0, -5")
            .style("stroke", "#4679BD")
            .style("opacity", "0.6");

        force.on("tick", function() {
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node.attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
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

$(window).load(function() { console.log('start'); ForceDiagram.init(); });
