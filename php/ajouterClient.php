<?php 
require("bd.php");
$nomC = $_POST["nomC"];
$prenom = $_POST["prenom"];
$dn = $_POST["dn"];
$nt = $_POST["nt"];
$adrl = $_POST["adrl"];
$sup = $_POST["sup"];
$prixl = $_POST["prixl"];
$type = $_POST["type"];
$som = $_POST["som"];
$nb = $_POST["nb"];
$dst = $_POST["dst"];
$nq = $_POST["nq"];
$dd = $_POST["dd"];
$df = $_POST["df"];
$table = $_POST["table"];
$id = $_POST['id'];
$id_client = $_POST["id_client"];
$id_logement = $_POST["id_logement"];
$id_quarter = $_POST["id_quarter"];
$id_commune = $_POST["id_commune"];
$id_t_l = $_POST["idtl"];
$nom = $_POST['nom'];
if(($nomC || $prenom || $dn || $nt || $adrl || $sup || $prixl || $type || $som || $nb || $dst || $nq || $dd || $df) && ($table ))
{
	if($table == "locations"){
		mysqli_query($conn,"INSERT INTO locations VALUES('$id','$dd','$df','$id_client','$id_logement') ON DUPLICATE KEY UPDATE date_debut = '$dd', date_fin='$df', id_client = '$id_client', id_logement='$id_logement';");
		echo "ok";
	}elseif ($table == "clients") {
		mysqli_query($conn,"INSERT INTO clients VALUES('$id','$nomC','$prenom','$dn','$nt') ON DUPLICATE KEY UPDATE nom='$nomC', prenom='$prenom', date_naissance='$dn',  numero_tel='$nt';");
		echo "ok";
	}elseif ($table == "logements") {
		mysqli_query($conn,"INSERT INTO type_logement VALUES('$id_t_l','$type','$som') ON DUPLICATE KEY UPDATE type='$type', sf='$som'");
		$query = mysqli_query($conn, "SELECT MAX(id) FROM type_logement");
		$id_type_logement = mysqli_fetch_assoc($query);
		$id_type_logement = $id_type_logement["MAX(id)"];
		mysqli_query($conn,"INSERT INTO logements VALUES('$id','$adrl','$sup','$prixl','$id_type_logement','$id_quarter') ON DUPLICATE KEY UPDATE adresse='$adrl', superficie='$sup', loyer='$prixl', id_type_logement='$id_type_logement', id_quarter='$id_quarter';");
		echo "ok";
	}elseif ($table == "commune") {
		mysqli_query($conn,"INSERT INTO  communes VALUES('$id','$nb','$dst','$nom') ON DUPLICATE KEY UPDATE nbr_habitants='$nb', distance='$dst', nom='$nom';");
		echo "ok";
	}elseif($table == "quarter"){
		mysqli_query($conn,"INSERT INTO quarter VALUES('$id','$nq','$id_commune') ON DUPLICATE KEY UPDATE nom='$nq',  id_commune='$ id_commune';");
		echo "ok";
	}
}else{
	echo "no";
}
?>