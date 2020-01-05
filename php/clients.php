<?php
require("bd.php");
$query = mysqli_query($conn," SELECT * FROM clients;");
while($locations=mysqli_fetch_assoc($query))
$data[]=array("id"=>$locations["id"], "nom"=>$locations["nom"], "prenom"=>$locations["prenom"], "date_naissance"=>$locations["date_naissance"], "numero_tel"=>$locations["numero_tel"]);
echo json_encode($data);
?>