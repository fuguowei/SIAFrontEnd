$.getJSON('../data/OpenShip1.json', function(data) {
    console.log(data);

    var nodes = [];
    var links = [];

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

    //_render(nodes, links);
    /**
     * TEST OUTPUT
     */
    //console.log(entityNames);
    console.log(links);
    console.log(nodes);
});


/**
 * TEST FUNC
 */
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
    var charge = -120;
    var linkDist = 50;
    var nodeRadius = 6;
    var width = 1080;
    var height = 800;

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
