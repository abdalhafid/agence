<?php
require("bd.php");
$query = mysqli_query($conn," SELECT id,nom FROM quarter;");
while($locations=mysqli_fetch_assoc($query))
$data[]=array("id"=>$locations["id"], "nom"=>$locations["nom"]);
echo json_encode($data);
?>