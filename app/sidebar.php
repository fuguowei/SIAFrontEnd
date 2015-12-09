<?php
session_start();

$service_ids = $_SESSION['service_ids'];

$dir = "entities";
$files = array_slice(scandir($dir), 2);
$file_names = array();

$count = 0;
foreach($service_ids as &$s_id){
	preg_match("/[A-Za-z_0-9 ]+-".$s_id.".xml/", $files[$count], $file_name);
	array_push($file_names, $file_name[0]);
	$count++;
}

foreach ($file_names as &$xml_file) {
	
	$data = simplexml_load_file($dir."/".$xml_file);
	$service_name = $data->getName();

	echo '<span onclick="accordion(this);" open="1">
			<img class="expanded" src="assets/images/expanded.png">
			<h3 class="service-name">'.$service_name.'</h3>
			</span>	
				<div class="menu-mask">
					<ul class="service-ops">';
	foreach ($data->entities->entity as $entity) {
		echo '<li><a>'.$entity.'</a></li>';
	}			
	echo "</ul></div>";
}


?>