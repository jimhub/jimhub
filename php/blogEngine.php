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
		
		$sql = "SELECT displayName, link, bgImg FROM categories ORDER BY displayOrder ASC";

		$result = mysqli_query($dbConn, $sql);

		$rows = array();

		while($row = mysqli_fetch_assoc($result)) {
			$rows[] = $row;
		}

		echo json_encode($rows);
	}
}


mysqli_close($dbConn);
?>