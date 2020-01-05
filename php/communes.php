<?php
require("bd.php");
$query = mysqli_query($conn," SELECT * FROM communes;");
while($locations=mysqli_fetch_assoc($query))
$data[]=array("id"=>$locations["id"], "nbr"=>$locations["nbr_habitants"], "distance"=>$locations["distance"], "nom"=>$locations["nom"]);
echo json_encode($data);
?>