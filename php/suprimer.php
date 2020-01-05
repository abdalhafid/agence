<?php
require("bd.php");
$id = $_POST["id"];
$table = $_POST["table"];
$idtl = $_POST["idtl"];
echo $idtl;
if($table == "locations")
{
	$query = "DELETE FROM locations WHERE id ='$id'";
}elseif($table =="logements"){
	$query = "DELETE FROM logements WHERE id = '$id';";
	mysqli_query($conn, " DELETE FROM type_logement WHERE id = '$idtl';");
}elseif($table == "clients")
{
	$query = "DELETE FROM clients WHERE id = '$id'";
}elseif($table == "commune")
{
	$query = "DELETE FROM communes WHERE id= '$id'";
}elseif($table == "quarter")
{
	$query =  "DELETE FROM quarter WHERE id= '$id'";
}
mysqli_query($conn, $query);
?>