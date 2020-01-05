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
$id = $_POST["id"];
if(($nomC || $prenom || $dn || $nt || $adrl || $sup || $prixl || $type || $som || $nb || $dst || $nq || $dd || $df) && ($table && $id))
{
	if($table == "locations"){
		mysqli_query($conn,"update locations set date_debut='$dd', date_fin='$df' where id='$id';");
		echo "ok";
	}elseif ($table == "clients") {
		mysqli_query($conn,"update clients set nom='$nomC', prenom='$prenom', date_naissance='$dn', numero_tel='$nt' where id='$id';");
		echo "ok";
	}elseif ($table == "logements") {
		mysqli_query($conn,"update logements set adresse='$adrl', superficie='$sup', loyer='$prixl' where id='$id';");
		echo "ok";
	}elseif ($table == "commune") {
		mysqli_query($conn,"update communes set nbr_habitants='$nb', distance ='$dst' where id='$id';");
		echo "ok";
	}elseif($table == "quarter"){
		mysqli_query($conn,"update quarter set nom='$nq' where id='$id';");
		echo "ok";
	}
}else{
	echo "no";
}
?>