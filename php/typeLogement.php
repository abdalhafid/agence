<?php
require("bd.php");
$query = mysqli_query($conn," SELECT * FROM type_logement;");
while($locations=mysqli_fetch_assoc($query))
$data[]=array("id"=>$locations["id"], "type"=>$locations["type"], "sf"=>$locations["sf"]);
echo json_encode($data);
?>