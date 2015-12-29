<?php
session_start();

if(!isset($_SESSION['service_ids'])) {
    echo '<div id="no_services_message">
					No services to show
					<a onclick="uploadBox()">Add a service</a>
				</div>';
}
else{
	$service_ids = $_SESSION['service_ids'];
	$dir = "../entities";
	$files = array_slice(scandir($dir), 2);
	$file_names = array();


	$count = 0;
	foreach($service_ids as &$s_id){
		while($count < count($files)){
			if (preg_match("/[A-Za-z_0-9 ]+-".$s_id.".operations/", $files[$count], $file_name)){
				array_push($file_names, $file_name[0]);
			}
		$count++;
		}
	}

	foreach ($file_names as &$file_name) {
		if ($fh = fopen($dir."/".$file_name, "r")) {
			$service_name = fgets($fh);

			echo '<span onclick="accordion(this);" open="1">
			<img class="expanded" src="assets/images/expanded.png">
			<h3 class="service-name">'.$service_name.'</h3>
			</span>	
				<div class="menu-mask">
					<ul class="service-ops">';
			
			while(! feof($fh))	
			{
				echo '<li><a>'.fgets($fh).'</a></li>';
			}
			echo "</ul></div>";
			
			fclose($fh);
		}
	}

}


?>