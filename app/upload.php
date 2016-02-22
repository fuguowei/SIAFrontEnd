<?php
session_start();	
	/*
	Determines the file number in the directory
	*/
    function number_assign($directory){
    	$max = 0;

    	// Empty case
		if(is_dir_empty($directory)){
			$num = 1;
		}

		// Non-empty case
		else{
			foreach(glob($directory.'*.*') as $file) {
				$num = basename($file, ".wsdl");
				if ($num > $max){
					$max = $num;
				}
			}
			$num = $max + 1;
		}
		// Return the number 1 bigger than the max in the directory
		return $num;
    }

    /* 
    Checks if the directory is empty, 
    */
    function is_dir_empty($dir){
    	if(!is_readable($dir)) return NULL;
    	$handle = opendir($dir);
    	while(false !== ($entry = readdir($handle))){
    		if ($entry != "." && $entry != ".."){
    			return FALSE;
    		}
    	}
    	return TRUE;
    }

    $directory = "../data/WSDL/";
	$max = 0;

	$num = number_assign($directory);

    if ( 0 < $_FILES['file']['error'] ) {
        echo 'Error: ' . $_FILES['file']['error'] . '<br>';
    }
    else {
        move_uploaded_file($_FILES['file']['tmp_name'], $directory . $num . '.wsdl');
    }
    
    $service_id = $num;
    
    if(!isset($_SESSION['service_ids'])) {
        $_SESSION["service_ids"] = array();
    }
    
    array_push($_SESSION["service_ids"], $service_id);
 

	echo $_FILES['file']['name'];
?>
