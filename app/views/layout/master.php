<?php
session_start();
?>
<!doctype html>

<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Service Integration Accelerator</title>
	<link rel="stylesheet" href="assets/css/reset.css">
	<link rel="stylesheet" href="assets/css/styles.css">
	<link rel="stylesheet" href="assets/css/font-awesome.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	<link href='https://fonts.googleapis.com/css?family=Roboto:400,300' rel='stylesheet' type='text/css'>
	<!--[if lt IE 9]>
	<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
</head>

<body>
	<div id="page_master" class="center">
		<div id="sidebar">
			<h1>Service<br/>Integration<br/>Accelerator</h1>
			<p id="service_description">
				This tool synthesises the structural and behavioural interfaces of services, 
				and then normalises them for service adaptation in a sevice integration process 
				in the setting of global business networks.
			</p>

			<div id="services_container">
				
			</div>

				<img src="assets/images/config.png" class="inline"><h2 class="sidebar-heading">System Configuration</h2>
				<br/>
				<a class="sidebar-subheading"><img src="assets/images/profile_icon.png" class="inline">Service Profile</a>
				<br/>
				<a id="ontology_button" class="sidebar-subheading"><img src="assets/images/ontology_icon.png" class="inline">Ontology Settings</a>

				<a href="#" id="help">Help</a>

			</div>
		</div>

	<!-- OVERLAYS -->
    	<div id="black_bg" onclick="uploadBox()"></div>

		<!-- UPLOAD -->
		<div id="upload_box">
            <h1>Upload a File</h1>
            <p>Select and upload a WSDL file from your computer.</p>
            <form id="fileUpload" method="post" enctype="multipart/form-data">
			    <input id="fileselect" type="file" name="fileselect">
			</form>
			<div id="upload_bar_holder">
				<div id="upload_bar"></div>
			</div>
			<div id="upload_error"></div>
		</div>
		<div id="upload_success"></div>

		<!-- ONTOLOGY SETTINGS -->
        <div id="ontology_settings" class="ontology-settings">
        	<a id="close_ontology"></a>
        	<h1>Ontology Settings</h1>

        	<form>
	        	<select>
	        		<option>Select a service provider</option>
	        		<option>FedEx</option>
					<option>OpenShip</option>
					<option>Amazon</option>
	        	</select>
	        	<h3>Add Ontologies</h3>
	        	
	        	<div id="added_ontology_holder">
	        		<input type="text" id="ontology" placeholder="Ontology Name">
	        			<a onclick="remove_ontology();"></a>
	        		</input>
	        	</div>
	        	<a id="add_ontology" class="add-ontology-button">Create New Ontology</a>
	        	<a id="done_ontology" class="add-ontology-button done-button">Done</a>
        	</form>
        </div>

		<!-- CONTENT --> 

		<div id="content_wrap">
            <div id="mode_selector">
                <a>Heirarchial Structural View</a>
                <a>Business Object Data Model</a>
                <a id="new_service" onclick="uploadBox()">Add New Service</a>
            </div>
		</div>

	</div>
</body>

<!-- SCRIPTS -->
<script type="text/javascript" src="assets/js/sidebar.js"></script>
<script type="text/javascript" src="assets/js/home.js"></script>
<script type="text/javascript" src="assets/js/upload.js"></script>
<!-- /////// -->

</body>
</html>