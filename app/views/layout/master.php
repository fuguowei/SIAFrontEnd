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

			<span onclick="accordion(this);" open="1"><img class="expanded" src="assets/images/expanded.png"><h3 class="service-name">Fedex Services</h2></span>	
			<div class="menu-mask">
				<ul class="service-ops">
					<li class="selected"><a onclick="alert('Open Shipping');">Open Shipping</a></li>
					<li><a onclick="alert('Pickup Services');">Pickup Services</a></li>
					<li><a onclick="alert('Close Service');">Close Service</a></li>
					<li><a onclick="alert('Return Services');">Return Services</a></li>
					<li><a onclick="alert('General');">General</a></li>
					<li><a onclick="alert('Tracking and Visibility');">Tracking and Visibility</a></li>
					<li><a onclick="alert('Package Movement');">Package Movement</a></li>
				</ul>
			</div>

			<span onclick="accordion(this);" open="1"><img class="expanded" src="assets/images/expanded.png"><h3 class="service-name">UPS Services</h2></span>
			<div class="menu-mask">
				<ul class="service-ops">
					<li><a onclick="alert('Shipping');">Shipping</a></li>
					<li><a onclick="alert('Address Validation');">Address Validation</a></li>
					<li><a onclick="alert('Pickup');">Pickup</a></li>
					<li><a onclick="alert('Rating');">Rating</a></li>
					<li><a onclick="alert('Time in Transit');">Time in Transit</a></li>
					<li><a onclick="alert('Tracking');">Tracking</a></li>
				</ul>
			</div>
			<img src="assets/images/config.png" class="inline"><h2 class="sidebar-heading">System Configuration</h2>
			<br/>
			<h4 class="sidebar-subheading"><img src="assets/images/profile_icon.png" class="inline">Service Profile</h4>
			<br/>
			<h4 class="sidebar-subheading"><img src="assets/images/ontology_icon.png" class="inline">Ontology Settings</h4>

			<a href="#" id="help">Help</a>
		</div>

		<div id="content_wrap">
            <div id="mode_selector">
                <a>Heirarchial Structural View</a>
                <a>Business Object Data Model</a>
                <a id="new_service" onclick="uploadBox()">Add New Service</a>

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
		        <div id="black_bg" onclick="uploadBox()"></div>
				<div id="upload_success"></div>
            </div>
		</div>
	</div>
</body>

<!-- SCRIPTS -->
<script type="text/javascript" src="assets/js/sidebar.js"></script>
<script type="text/javascript" src="assets/js/upload.js"></script>
<!-- /////// -->

</body>
</html>