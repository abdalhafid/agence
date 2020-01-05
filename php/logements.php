<?php
require("bd.php");
$query = mysqli_query($conn," SELECT logements.id,adresse,superficie,loyer,type_logement.type,type_logement.id as idtl, type_logement.sf, quarter.nom FROM quarter, type_logement,logements where type_logement.id=logements.id_type_logement and quarter.id=logements.id_quarter;");
while($locations=mysqli_fetch_assoc($query))
$data[]=array("id"=>$locations["id"], "adresse"=>$locations["adresse"], "superficie"=>$locations["superficie"], "loyer"=>$locations["loyer"], "type"=>$locations["type"], "sf"=>$locations["sf"], "quarter"=>$locations["nom"], "idtl"=>$locations["idtl"]);
echo json_encode($data);
?>