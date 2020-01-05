$(document).ready(function(){
	var idt;
	var idtl;
	var dialog = $("#dialog").html();
	function dialogContent() {
		this.infoClient = $("#infoClient").html();
	    this.infoLogement = $("#infoLogement").html();
		this.infoLocation = $("#infoLocation").html();
		this.infoTypeLogement = $("#infoTypeLogement").html();
		this.infoCommune = $("#infoCommune").html();
		this.infoQuarter = $("#infoQuarter").html();
		this.bouton = $("#bouton").html();
	}
	
	var Content =new  dialogContent();

	$("#ok").click(function(){
		var item = $("#lestpanel").text()
		var type=$(".dialog-title").text();
		type=type.substr(0,7);
		if(type == "Ajouter"){
			ajouter(item);
		}else{
			ajouter(item,idt);
		}
		
	})
	

	function sendData(url,data,fun)
	{
		$.ajax({
			url:url,
			type:"post",
			data:data,
			success : fun
		})
	}

	function resteDialog()
	{
		$("#formuliare").find(".outer").find("input").each(function(){
			$(this).val("");
		})

		$("#dialog .modal-dialog .modal-content .dialog-body .form #formuliare .outer .panel .panel-heading .panel-title").each(function(){
				$(this).parentsUntil("#formuliare").show();
		})
	}
	//ajouter client
	function ajouter(table,id)
	{
		//information client
		var nomC = $("#nomClient").val();
		var prenom = $("#prenomClient").val();
		var dn = $("#dn").val();
		var nt = $("#nt").val();

		//information logement
		var adrl = $("#adrl").val();
		var sup = $("#sup").val();
		var prixl = $("#prixl").val();
		var type = $("#type").val();
		var som = $("#som").val()
		var id_quarter = $(".id_quarter").val();
		//information information commune
		var nb = $("#nb").val();
		var dst = $("#dst").val();
		var n_commune = $("#n_commune").val();
		// information de quarter
		var nq = $("#nq").val();
		var id_commune = $(".id_commune").val();

		//information de location
		var dd = $("#dd").val();
		var df = $("#df").val();
		var id_logement = $(".id_logement").val();
		var id_client = $(".id_client").val();

		var item = table;
		var ID = id;
		var data = {};
		if(item == "logements"){
			data = {adrl:adrl, sup:sup, prixl:prixl, type:type, som:som, table:item, id_quarter:id_quarter, id:ID, idtl:idtl};
		}else if(item == "commune"){
			data = {nb:nb, dst:dst, table:item, nom:n_commune, id:ID};
		}else if(item == "quarter"){
			data = {nq:nq, id_commune:id_commune, table:item, id:ID};
		}else if(item == "locations"){
			data = {dd:dd, df:df, id_logement:id_logement, id_client:id_client,table:item, id:ID};
		}else if(item == "clients"){
			data = {nomC:nomC, prenom:prenom, dn:dn, nt:nt, table:item, id:ID};
		}
		if(nomC!="" || prenom!="" || dn!="" || nt!="" || adrl!="" || sup!="" || prixl!="" || type!="" || som!="" || nb!="" || dst!="" || nq!="" || dd!="" || df!="")
		{
			sendData("php/ajouterClient.php",data, function(result){
					if(result == "ok")
						{
							alert(result);
							$("#dialog").modal("toggle");
							
							if(item == "locations"){
								locations();
							}else if(item == "clients"){
								clients();
							}else if(item == "logements"){
								logements();
							}else if(item =="commune"){
								communes();
							}else if(item == "quarter"){
								quarter();
							}
						}else
						{
							$(".error").remove();
							$("#ok").after("<span class='error'>messag:" + result+"</span>");
						}
			})
		}
	}


	//pour modéfier le dialog 
	function preparechamps(){


		var item = $("#lestpanel").text();
		$("#formuliare").find(".outer").each(function(){
			$(this).show();
		})
		if(item == "logements"){
			v = "infoLogement"
		}else if(item == "commune"){
			v = "infoCommune";
		}else if(item == "quarter"){
			v = "infoQuarter";
		}else if(item == "locations"){
			v = "infoLocation";
		}else if(item == "clients"){
			v = "infoClient"
		}
		$("#formuliare").find(".outer").each(function(){
			if($(this).attr("id")!=v)
			{
				$(this).hide();
			}else{
				if(v == "infoLocation")
				{
					$(".id_client").remove();
					$(".id_logement").remove();
					$("#df").after("<select class='id_client form-control'><option>aucune client</option></select>");
					$.ajax({
						url:"php/clients.php",
						type:"post",
						dataType:"json",
						success :function (res)
						{
							$(".id_client").html("");
							$.each(res, function(key,val){
								$(".id_client").append("<option value="+val.id+">"+val.id+":	"+val.nom+"	"+val.prenom+"</option>");
							})
						}
					})
					$("#df").after("<select class='id_logement form-control'><option>aucune logement</option></select>");
					$.ajax({
						url:"php/logements.php",
						type:"post",
						dataType:"json",
						success :function (res)
						{
							$(".id_logement").html("");
							$.each(res, function(key,val){
								$(".id_logement").append("<option value="+val.id+">"+val.id+":	"+val.adresse+"	"+val.type+"	"+val.quarter+"</option>");
							})
						}
					})
				}else if(v == "infoLogement")
				{
					$(".id_quarter").remove();
					$("#som").after("<select class='id_quarter form-control'><option>aucune quarter</option></select>");
					$.ajax({
						url:"php/quarter.php",
						type:"post",
						dataType:"json",
						success :function (res)
						{
							$(".id_quarter").html("");
							$.each(res, function(key,val){
								$(".id_quarter").append("<option value="+val.id+">"+val.id+":	"+val.nom+"</option>");
							})
						}
					})
				}else if(v == "infoQuarter")
				{
					$(".id_commune").remove();
					$("#nq").after("<select class='id_commune form-control'><option>aucune quarter</option></select>");
					$.ajax({
						url:"php/communes.php",
						type:"post",
						dataType:"json",
						success :function (res)
						{
							$(".id_commune").html("");
							$.each(res, function(key,val){
								$(".id_commune").append("<option value="+val.id+">"+val.nom+"</option>");
							})
						}
					})
				}
			}
		})
	}

	$("#ajouter").click(function(){
		resteDialog()
		preparechamps()
		var item = $("#lestpanel").text();
		$(".dialog-title").text("Ajouter "+item);
	})
	//mise a jour des données 
	function modifier(){
		$(".val").click(function(){
			resteDialog();
			preparechamps();
			idtl1=$(this).attr("idtl");
			$(".suprimer").remove();
			var item = $("#lestpanel").text();
			var v;
			var n=1;
			if(item == "logements"){
				v = "information de logment";
			}else if(item == "commune"){
				v = "information de commune";
			}else if(item == "quarter"){
				v = "information de quarter";
			}else if(item == "locations"){
				v = "information de loaction";
			}else if(item == "clients"){
				v = "information de client";
			}
			var data =[];
			i=0;
			$(this).find("td").each(function(){
				data[i] = $(this).text();
				i=i+1;
			})
			id= data[0];
			$("#dialog .modal-dialog .modal-content .dialog-body .form #formuliare .outer .panel .panel-heading .panel-title").each(function(){
				var panel = $(this).text();
				if(panel != v){
					$(this).parentsUntil("#formuliare").hide();
				}else{
					$(this).parentsUntil("#formuliare").find(".panel-body input").each(function(){
						$(this).val(data[n]);
						n=n+1;
					})
				}
			})
			$(".dialog-title").html("modifier les information de "+item);
			$("#ok").text("conformé les modification");
			$("#ok").after("<br><button type='button' class='btn btn-info btn-lg form-control suprimer'>suprimer</button>")
			idt=id;
			$(".suprimer").click(function(){
				var tablename = $("#lestpanel").text();
				var data ={table:tablename, id:idt};
				if(tablename == "logements")
				{
					data = {table:tablename, id:idt, idtl:idtl1};
				}
				$.ajax({
					url:"php/suprimer.php",
					type:"post",
					data:data,
					success : function(res){
						alert(res)
						if(item == "locations"){
							locations();
						}else if(item == "clients"){
							clients();
						}else if(item == "logements"){
							logements();
						}else if(item =="commune"){
							communes();
						}else if(item == "quarter"){
							quarter();
						}
						$("#dialog").modal("toggle");
					}
				})
			})
			/*$("#ok").attr("id","ok1");
			$("#ok1").click(function(){
				var nomC = $("#nomClient").val();
				var prenom = $("#prenomClient").val();
				var dn = $("#dn").val();
				var nt = $("#nt").val();
				var adrl = $("#adrl").val();
				var sup = $("#sup").val();
				var prixl = $("#prixl").val();
				var type = $("#type").val();
				var som = $("#som").val();
				var nb = $("#nb").val();
				var dst = $("#dst").val();
				var nq = $("#nq").val();
				var dd = $("#dd").val();
				var df = $("#df").val();
				if(nomC!="" || prenom!="" || dn!="" || nt!="" || adrl!="" || sup!="" || prixl!="" || type!="" || som!="" || nb!="" || dst!="" || nq!="" || dd!="" || df!="")
				{
					$.ajax({
						url:"php/modifier.php",
						type:"post",
						data:{nomC:nomC, prenom:prenom, dn:dn, nt:nt, adrl:adrl, sup:sup, prixl:prixl, type:type, som:som, nb:nb, dst:dst, nq:nq, dd:dd, df:df, table:item, id:id},
						success:function(result){
							if(result == "ok")
							{
								if(item == "logements"){
									logements();
								}else if(item == "commune"){
									communes();
								}else if(item == "quarter"){
									quarter();
								}else if(item == "locations"){
									locations();
								}else if(item == "clients"){
									clients();
								}
								$("#dialog").modal("toggle");
							}else{
								$("#ok").after("vous paramatre n'est pas valide ");
							}
						}
					})
				}
			})*/
			$("#dialog").modal("toggle");
		})
	}

	// pour afficher les locations
	function locations(){
		$.ajax({
			url:"php/locations.php",
			type:"post",
			dataType:"json",
			success:function(result){
				$(".table").html("<tr class='th'><td>numéro de location</td><td>date de début</td><td>date de fin</td><td>nom de client</td><td>prenom de client</td><td>addresse de logements</td></tr>");
				$.each(result,function(key,val){
					$(".table").append("<tr class='val'><td>"+val.id+"</td><td>"+val.dd+"</td><td>"+val.df+"</td><td>"+val.nom+"</td><td>"+val.prenom+"</td><td>"+val.adresse+"</td></tr>");
				});
				modifier();
			}
		})
	}




	// pour afficher les clients
	function clients(){
		$.ajax({
			url:"php/clients.php",
			type:"post",
			dataType:"json",
			success:function(result){
				$(".table").html("<tr class='th'><td>numéro de clients</td><td>nom</td><td>prenom</td><td>date de naissance</td><td>numéro de téléphone</td></tr>");
				$.each(result,function(key,val){
					$(".table").append("<tr class='val'><td>"+val.id+"</td><td>"+val.nom+"</td><td>"+val.prenom+"</td><td>"+val.date_naissance+"</td><td>"+val.numero_tel+"</td></tr>");
				});
				modifier();
			}
		})
	}





	// pour afficher les logements
	function logements(){
		$.ajax({
			url:"php/logements.php",
			type:"post",
			dataType:"json",
			success:function(result){
				$(".table").html("<tr class='th'><td>numéro de logements</td><td>adresse</td><td>superficie</td><td>loyer</td><td>type</td><td>somme forfaitaire</td><td>quarter</td></tr>");
				$.each(result,function(key,val){
					$(".table").append("<tr class='val' idtl="+val.idtl+"><td>"+val.id+"</td><td>"+val.adresse+"</td><td>"+val.superficie+"</td><td>"+val.loyer+"</td><td >"+val.type+"</td><td>"+val.sf+"</td><td>"+val.quarter+"</td></tr>");
				});
				modifier();
			}
		})
	}





	// pour afficher les communes 
	function communes(){
		$.ajax({
			url:"php/communes.php",
			type:"post",
			dataType:"json",
			success:function(result){
				$(".table").html("<tr class='th'><td>numéro de commune</td><td>comune</td><td>nombre d'habitances</td><td>la distance</td></tr>");
				$.each(result,function(key,val){
					$(".table").append("<tr class='val'><td>"+val.id+"</td><td>"+val.nom+"</td><td>"+val.nbr+"</td><td>"+val.distance+"</td></tr>");
				});
				modifier();
			}
		})
	}





	// pour afficher les quarter
	function quarter(){
		$.ajax({
			url:"php/quarter.php",
			type:"post",
			dataType:"json",
			success:function(result){
				$(".table").html("<tr class='th'><td>numéro de quarter</td><td>nom</td></tr>");
				$.each(result,function(key,val){
					$(".table").append("<tr class='val'><td>"+val.id+"</td><td>"+val.nom+"</td></tr>");
				});
				modifier();
			}
		})
	}






	// pour afficher les type_logements
	function typeLogement(){
		$.ajax({
			url:"php/typeLogement.php",
			type:"post",
			dataType:"json",
			success:function(result){
				$(".table").html("<tr class='th'><td>le numéro de type </td><td>le type </td><td>le somme forfaitaire</td></tr>");
				$.each(result,function(key,val){
					$(".table").append("<tr class='val'><td>"+val.id+"</td><td>"+val.type+"</td><td>"+val.sf+"</td></tr>");
				});
				modifier();
			}
		})
	}


	locations();
	//pour afficher le tableau correspondante au la séléction de l'uitilisateur 
	$("#item").change(function(){
		item=$("#item").val();
		$(".table").html("");
		$("#lestpanel").text(item)
		$("#ajouter").text("Ajouter "+item);
		$(".dialog-title").text("Ajouter "+item);
		if(item == "locations"){
			locations();
		}else if(item == "clients"){
			clients();
		}else if(item == "logements"){
			logements();
		}else if(item =="commune"){
			communes();
		}else if(item == "quarter"){
			quarter();
		}
	})
	
	
})