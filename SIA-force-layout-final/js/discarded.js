function render_uml(data, width, height) {
  if(modal) {

    var block = 80;
    var center = (900 - 80) / 2;
    var heightPerAttribute = 20;
    var padding = 20;

    // var a = JSON.stringify(data)
    console.log("start uml");
    console.log(data);
    modal = canvas.select("g.modal-container");

    children = data.children;
    parents = data.parents;
    main = [data.rootNode];

    console.log("num children: " + children.length);
    console.log("num parents: " + parents.length);

    var main = modal.selectAll(".main-node")
      .data(main)
      .enter()
      .append("rect")
      .attr("width", 90)
      .attr("height", 100)
      .attr("x", center)
      .attr("y", height / 2)
      .attr("fill", "grey");

    var sub = modal.selectAll(".sub-elements")
      .data(children)
      .enter()
      .append("rect")
      .attr("x", function(d, i) { console.log(i); return (i * block + i * 20); })
      .attr("y", 10)
      .attr("width", 90)
      .attr("height", 200)
      .attr("fill", "none")
      .attr("stroke", "black");
  }
}
