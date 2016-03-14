var width = 960,
  height = 960,
  legendInfo = [
      {name: "Association", lineStyle: "0.9", y: 115},
      {name: "Exclusive Containment (Mandatory)", lineStyle: null, y: 165},
      {name: "Inclusive Containment (Optional)", lineStyle: "5, 5, 1, 5", y: 65},
      {name: "Inclusive Containment (Mandatory)", lineStyle: "15, 10, 5, 10", y: 140},
      {name: "Exclusive Containment (Optional)", lineStyle: "5, 1", y: 90}
  ],
  filePath = "data/data.json",
  title = "Business Entity Data Model: FedEx OpenShipping Service",
  canvas,
  force,
  container,
  nodes = [],
  links = [],
  chargeDist = -100,
  linkDist = 50;

// *** Flags ***
var modal_open = false;
// *** end Flags ****

var zoom = d3.behavior.zoom().scaleExtent([1, 1]).on("zoom", zoom),
  noZoom = d3.behavior.zoom().scaleExtent([1,1]).on("zoom", null);

$.getJSON(filePath, function(data) {
  console.log("start");
  // populate nodes
  _.each(data.entities,function(item) {
    var obj = {name: item.name, attributes: item.attributes, compulsory: item.compulsory};
    nodes.push(obj);
  });

  console.log(nodes);

  createLinks(data.optionalExclusiveContainmentPair, nodes, 'optionalExclusiveContainmentPair', links);
  createLinks(data.associationPair, nodes, 'associationPair', links);
  createLinks(data.exclusiveContainmentPair, nodes, 'exclusiveContainmentPair', links);
  createLinks(data.weakInclusiveContainmentPair, nodes, 'weakInclusiveContainmentPair', links);
  createLinks(data.strongInclusiveContainmentPair, nodes, 'strongInclusiveContainmentPair', links);
  console.log(links);

  render_canvas();
  render_markers();
  render_force();
  render_legend(legendInfo);
  render_slider();
  render_title();
});

function render_canvas() {
  canvas = d3.select("body")
    .append("svg")
    .attr("class", "canvas")
    .attr("width", width)
    .attr("height", height)
    .call(zoom)
    .on("click", function() {
    });
}

function render_force() {
  container = canvas.append("g")
    .attr("class", "force-container");

  force = d3.layout.force()
    .size([width, height])
    .linkDistance(20)
    .charge(-100)
    .on("tick", tick)
    .nodes(nodes)
    .links(links)
    .start();

  var link = container.selectAll(".link")
    .data(force.links())
    .enter()
    .append("line")
    .attr("class", "link")
    .attr("stroke", "black")
    .style("stroke-width", 1)
    .attr("stroke-dasharray", function(d) {
      if(d.linkType === 'associationPair') {
          return "0.9";
      }
      else if (d.linkType === 'optionalExclusiveContainmentPair') {
          return "5, 1";
      }
      else if (d.linkType === 'weakInclusiveContainmentPair') {
          return "5, 5, 1, 5";
      }
      else if (d.linkType === 'strongInclusiveContainmentPair') {
          return "15, 10, 5, 10";
      }
    })
    .attr("marker-end", "url(#arrow-head)");

  var node = container.selectAll(".node")
    .data(force.nodes())
    .enter()
    .append("g")
    .attr("class", "node-container")
    .on("mousedown",
      function(d) {
        canvas.call(noZoom);
    })
    .on("mouseup",
      function() {
        canvas.call(zoom);
    })
    .on("dblclick", collect_data)
    .call(force.drag);

  node
    .append("circle")
    .attr("r", 6)
    .attr("class", "node")
    .attr("opacity", 0.75);

  node
    .append("text")
    .attr("x", 12)
    .attr("dy", ".35em")
    .text(function(d) { return d.name; })
    .style("font", "7px sans-serif");

  function tick() {
    link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

    node
      .attr("transform",
      function(d) { return "translate(" + d.x + "," +  d.y + ")"; });
  }
}

function collect_data(d) {
  var umlData = {children: [], parents: [], rootNode: null, links: []};

  umlData.rootNode = d;
  _.each(force.links(), function(i) {
    if(i.source.name === d.name) {
      console.log(i);
      umlData.parents.push(i.target);
      // link data
      umlData.links.push({source: d.name, target: i.target.name, linkType: i.linkType});
    }
    else if (i.target.name === d.name) {
      umlData.children.push(i.source);
      umlData.links.push({source: i.source.name, target: d.name, linkType: i.linkType});
    }
  });
  // console.log(umlData);

  create_modal();

  render_uml(umlData, 900, 750);

}

function render_legend(legendInfo) {
  var legendContainer = canvas.append("g")
    .attr("class", "legend-container");

  legendContainer.selectAll("line.legend-line")
    .data(legendInfo)
    .enter()
    .append("line")
    .attr("class", "legend-line")
    .attr("x1", 10)
    .attr("x2", 150)
    .attr("y1", function(d, i) { return d.y; })
    .attr("y2", function(d, i) { return d.y; })
    .attr("stroke-dasharray", function(d) { return d.lineStyle; })
    .attr("stroke-width", 2)
    .attr("stroke", "black");

  legendContainer.selectAll("text.legend-text")
    .data(legendInfo)
    .enter()
    .append("text")
    .attr("class", "legend-text")
    .attr("x", 10)
    .attr("y", function(d, i) { return d.y-5; })
    .text(function(d) { return d.name; })
    .style("font", "10px sans-serif");
}

function render_slider() {
  var sliderContainer = canvas.append("g")
    .attr("class", "slider-container");

  var x = d3.scale.linear()
    .domain([0, 3]) // inputs
    .range([0, 200]) // outputs
    .clamp(true); // restrained to inputs

  sliderContainer
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

    // Functions

  function brushed() {
    var value = brush.extent()[0];
    canvas.call(noZoom);
    if (d3.event.sourceEvent) { // not a programmatic event
      value = x.invert(d3.mouse(this)[0]);
      brush.extent([value, value]);
    }
    handle.attr("cx", x(value));
  }

  function brushend() {
    var value = brush.extent()[0];
    canvas.call(zoom);

    var node = container.selectAll(".node")
      .attr("r", 6 + 6 * value/3.0);

    var text = container.selectAll(".node-container text")
      .style("font-size",  7 + 7 * value/3.0 + "px");

    console.dir(text);

    force.linkDistance(50 + 50 * value);
    force.charge(-100 + -100 * value);
    force.start();
  }
}

function render_title() {
  canvas
    .append("text")
    .attr("x", (width/2))
    .attr("y", 35)
    .attr("class", "business-entity-diagram-title")
    .attr("text-anchor", "middle")
    .text(title);
}

function render_markers() {
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
    .style("stroke", "#000");
}

function zoom() {
  container.attr("transform", "translate(" + d3.event.translate + ")");
}

function createLinks(linkData, nodes, linkType, links) {
    if(linkData.length === 0) {
      console.log("warning! - No Link data");
    }
    _.each(linkData, function(link) {
        var parent = {name: link.strMainEntity},
            child = {name: link.strSlaveEntity},
            nodeIndexes = [];

        var parentIndex = getNodeIndex(nodes, link.strMainEntity),
            childIndex = getNodeIndex(nodes, link.strSlaveEntity);

        links.push({source: parentIndex, target: childIndex, linkType: linkType});
    });
}

function getNodeIndex(nodes, nodeName) {
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

function create_modal() {
  var x = 40,
    y = 50,
    width = 900,
    height = 750;

  canvas
    .append("g")
    .attr("class", "modal-container")
    .attr("transform", "translate(" + x + "," + y + ")")
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "white")
    .attr("stroke", "grey");

  d3.select(".modal-container")
    .append("g")
    .attr("class", "close-container")
    .attr("transform", "translate(" + 5 + "," + 15 + ")")
    .style("border", "0.5px solid grey")
    .on("click", function() {
      close_modal();
    })
    .append("text")
    .text("Close");

  modal_open = true;

  canvas.call(noZoom);
}

function close_modal() {
  canvas.selectAll("g.modal-container").remove();
  modal_open = false;

  canvas.call(zoom);
}

function render_uml(data, width, height) {
  if(modal_open) {

    var linkData = [],
      nodeData = [],
      modal = canvas.select("g.modal-container");

    for(var i = 0; i < data.children.length; i++) {
      var obj = _.omit(data.children[i],["px", "py", "x", "y", "weight", "index"]);
      nodeData.push(obj);
    }

    for(var j = 0; j < data.parents.length; j++) {
      var obj1 = _.omit(data.parents[j],["px", "py", "x", "y", "weight", "index"]);
      nodeData.push(obj1);
    }

    main = _.omit(data.rootNode, ["px", "py", "x", "y", "weight", "index"]);
    nodeData.push(main);

    var nodes_attr_display = [];
    for(var k = 0; k < nodeData.length; k++) {
      nodes_attr_display.push(0);
    }

    console.log(nodes_attr_display);
    _.each(data.links, function(d) {
      // console.log(d);
      // console.log(d.source);
      // console.log(d.target);
      var source = getNodeIndex(nodeData, d.source);
      var target = getNodeIndex(nodeData, d.target);
      var linkType = d.linkType;

      linkData.push({source: source, target: target, linkType: linkType});
    });

    var force = d3.layout.force()
      .size([width, height])
      .linkDistance(400)
      .nodes(nodeData)
      .links(linkData)
      .charge(-800)
      .on("tick", tick);

    var nodes = modal.selectAll("g.node")
      .data(nodeData)
      .enter()
      .append("g")
      .attr("class", "modal-node")
      .call(force.drag)
      .on("click", function(d , i) {

        var thisContainer = (d3.select(this));

        if(nodes_attr_display[i] === 0) {
          nodes_attr_display[i] = 1;

          var a = thisContainer.selectAll("text.attributes")
            .data(d.attributes)
            .enter()
            .append("text")
            .attr("class", "attributes")
            .text(function(d) { return d.name + "[" + d.type +"]"; })
            .attr("y", function(d, i) { return -12 + i * -12; })
            .style("font", "10px sans-serif");
        } else if (nodes_attr_display === 1) {
            nodes_attr_display[i] = 0;
            thisContainer.selectAll("text.attributes").remove();
        }
      });

    var links = modal.selectAll("g.modal-link")
      .data(force.links())
      .enter()
      .append("line")
      .attr("class", "modal-link")
      .attr("stroke", "black")
      .style("stroke-width", 1)
      // .attr("marker-end", "url(#arrow-head)");
      .attr("stroke-dasharray", function(d) {
        if(d.linkType === 'associationPair') {
            return "0.9";
        }
        else if (d.linkType === 'optionalExclusiveContainmentPair') {
            return "5, 1";
        }
        else if (d.linkType === 'weakInclusiveContainmentPair') {
            return "5, 5, 1, 5";
        }
        else if (d.linkType === 'strongInclusiveContainmentPair') {
            return "15, 10, 5, 10";
        }
      })
      .attr("marker-end", "url(#arrow-head)");

    nodes
      .append("circle")
      .attr("r", 10)
      .attr("opacity", 0.75);

    nodes
      .append("text")
      .attr("x", 12)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; })
      .style("font", "12px sans-serif");

    force.start();
  }

  function tick() {
    links
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

    nodes
      .attr("transform",
      function(d) { return "translate(" + d.x + "," +  d.y + ")"; });
  }
}
