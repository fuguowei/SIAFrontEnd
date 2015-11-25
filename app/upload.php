<?php
	
	/*
	Determines the file number in the directory
	*/
    function number_assign($directory){
    	$max = 0;

    	// Empty case
		if(is_dir_empty($directory.'/')){
			$num = 1;
		}

		// Non-empty case
		else{
			foreach(glob($directory.'/*.*') as $file) {
				$num = basename($file, ".jpg");
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

    $directory = "WSDL";
	$max = 0;

	$num = number_assign($directory);

    if ( 0 < $_FILES['file']['error'] ) {
        echo 'Error: ' . $_FILES['file']['error'] . '<br>';
    }
    else {
        move_uploaded_file($_FILES['file']['tmp_name'], 'WSDL/' . $num . '.jpg');
    }

    $file_loc = 'WSDL/' . $num . '.jpg';
    $cookie_name = 'file_loc';
    setcookie($cookie_name, $file_loc);
	echo $_FILES['file']['name'];
?>