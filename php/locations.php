<?php
require("bd.php");
$query = mysqli_query($conn," SELECT locations.id,date_debut,date_fin,nom,prenom,logements.adresse FROM locations, clients,logements where clients.id=locations.id_client and locations.id_logement=logements.id;");
while($locations=mysqli_fetch_assoc($query))
$data[]=array("id"=>$locations["id"], "dd"=>$locations["date_debut"], "df"=>$locations["date_fin"], "nom"=>$locations["nom"], "prenom"=>$locations["prenom"], "adresse"=>$locations["adresse"]);
echo json_encode($data);
?>