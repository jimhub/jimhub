<?php

//header('Content-Type: application/json');

require("dbconn.php");

if (mysqli_connect_errno())
{
	//echo "Failed to connect to MySQL: " . mysqli_connect_error();

	echo json_encode(array("error" => "MysqlConnection Error!"));
}
else {
	$a = $_POST["action"];

	if($a == "getCategories") {
		
		$sql = "SELECT displayName, link, bgImg FROM navbar ORDER BY displayOrder ASC";

		$result = mysqli_query($dbConn, $sql);

		echo rowsToJSON($result);
	}
	elseif($a == "getSubs") {
		$filterID = mysqli_real_escape_string($dbConn, $_POST["filterID"]);

		$sql = "SELECT displayName, filterID from categories WHERE categories.id in
				(SELECT subcatID FROM subcats, categories WHERE categories.filterID = '$filterID' and subcats.catID = categories.id) 
				ORDER BY displayName;";

		$result = mysqli_query($dbConn, $sql);

		echo rowsToJSON($result);
	}
}


mysqli_close($dbConn);


function rowsToJSON($result) {

	$rows = array();

	while($row = mysqli_fetch_assoc($result)) {
		$rows[] = $row;
	}

	return json_encode($rows);
}

?>