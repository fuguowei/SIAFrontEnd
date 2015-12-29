$( "#ontology_button" ).click(function() {
  open_ontology_settings();
});

$( "#close_ontology" ).click(function() {
  close_ontology_settings();
});

$("#add_ontology").click(function() {
	$("#added_ontology_holder").append("<input class='ontology' placeholder='Ontology Name'></input>");
});

$("#done_ontology").click(function() {

	// Process Form Data from ontology settings and use ajax to submit
	close_ontology_settings();
	$("#added_ontology_holder").html("<input class='ontology' placeholder='Ontology Name'></input>");
});

function open_ontology_settings(){
	$("#ontology_settings").show();
	$("#ontology_settings").animate({opacity: 1}, 300);
}
function close_ontology_settings(){
	$("#ontology_settings").animate({opacity: 0}, 300, function(){
		$("#ontology_settings").hide();
	});
}

function remove_ontology(element){
	element.remove();
}