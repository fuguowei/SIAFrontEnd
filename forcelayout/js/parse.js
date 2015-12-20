var nodes = [];
var linkList = [];

/**/
function init() {
    $.getJSON('data/data.json', function(data) {
        _.each(data.coincidencePair, function(i) {

            var node1 = i.strMainEntity;
            var node2 = i.strSlaveEntity;

            addNode(node1, nodes);
            addNode(node2, nodes);
        });
        console.log(nodes);
        addLinks(nodes, data.coincidencePair, linkList);
        console.log(linkList);

    });
}



/**
 * Adds an object element of the form {name: @name} to the specified array
 * Ensures no duplicate elements are added
 *
 * @param {string} name name of elment to be added to nodeList
 * @param {array} nodeList
 */
function addNode(name, nodeList) {
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

/**
 *
 *
 *
 */
function addLinks(nodes, map, linkList) {

  _.each(map, function(j) {
    var parent = {name: j.strMainEntity};
    console.log(parent);
    var child = {name: j.strSlaveEntity};
    console.log(child);
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
    // add it to the linkList
    linkList.push({source: nodeIndexes[1], target: nodeIndexes[0]});

    });
}
/**
 *
 *
 * @param {string} name
 * @return {int} index of node with name or false for failed
 */
function getIndex(nameParent, nodeList) {
  var item = {name: name};

  nodeList.findIndex(function(element, index) {
    if(_.isEqual(element, item)) {
      return index;
    }
  });
  return false;
}

// test data
var map = [
    {
        parent: 'a',
        child: 'd'
    },
    {
        parent: 'b',
        child: 'c'
    },
    {
        parent: 'c',
        child: 'a'
    }
];

var nodes = [
    {name: 'a'},
    {name: 'b'},
    {name: 'c'},
    {name: 'd'}
];
