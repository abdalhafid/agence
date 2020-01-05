<?php
	require("bd.php");
	$nomC=$_POST["nomC"];
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
	if($nomC && $prenom && $dn && $nt && $adrl && $sup && $prixl && $type && $som && $nb && $dst && $nq && $dd && $df)
	{
		echo "insrtion";
		mysqli_query($conn, "INSERT INTO clients VALUES ('','$nomC','$prenom','$dn','$nt')");
		mysqli_query($conn, "INSERT INTO communes VALUES('','$nb','$dst')");
		$id =mysqli_insert_id($conn);
		mysqli_query($conn, "INSERT INTO quarter VALUES('','$nq','$id')");
		mysqli_query($conn, "INSERT INTO type_logement VALUES('','$type','$som')");
		$idCq=mysqli_query($conn,"SELECT max(id) from clients");
		$idC = mysqli_fetch_assoc($idCq);
		$idC = $idC["max(id)"];
		$idqq=mysqli_query($conn,"SELECT max(id) from quarter");
		$idQ = mysqli_fetch_assoc($idqq);
		$idQ = $idQ["max(id)"];
		$idT=mysqli_query($conn,"SELECT max(id) from type_logement");
		$idTP = mysqli_fetch_assoc($idT);
		$idTP=$idTP["max(id)"];
		mysqli_query($conn, "INSERT INTO logements VALUES('','$adrl','$sup','$prixl','$idTP','$idQ')");
		$id=mysqli_insert_id($conn);
		mysqli_query($conn, "INSERT INTO locations VALUES('','$dd','$df','$idC','$id')");
	}else{
		echo "false";
	}
?>