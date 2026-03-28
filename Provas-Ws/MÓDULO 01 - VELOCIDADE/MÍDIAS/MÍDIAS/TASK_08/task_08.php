<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>

	<?php

	function insertFileData(){
		$file = fopen("contacts.json", "w");
		fwrite($file, json_encode([
			"operation" => "access",
			"access" => date("H:i:s")
		]));
		fclose($file);
	}

	insertFileData();

	?>

</body>
</html>