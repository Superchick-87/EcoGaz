	/**
	 * Sert à trier des dates
	 * @param {variable issue du Json} a 
	 * @param {variable issue du Json} b 
	 * @returns les dates sont triées de la plus récente à la plus ancienne
	 */
		function SortTime(a,b){ 
			da=new Date(a.gas_day);
			db=new Date(b.gas_day);
			return (da>db)?1:-1;
		}

	/**
	 * Sert à supprimer des caractères dans une chaine
	 * @param {la date formatée} z 
	 * @returns la date sans l'année
	 */
	 function deleteLastChar(z) { 
		y = z.substring(0, z.length -4);
		return y;
	}

	function deleteLastCharH(z) { 
		y = z.substring(0, z.length -2);
		return y;
	}

	/**
	 * Sert à afficher un texte si ce texte = toto
	 * @param {string} x 
	 * @returns other string
	 */
		function remplaceLegend(x) {
			const p = x;
			if (x == 'Vert') {
				x = 'Consommation raisonnable';
				return x;
			}
			if (x == 'Jaune') {
				x = 'Consommation raisonnable';
				return x;
			}
			if (x == 'Orange') {
				x = 'Situation tendue du réseau de gaz';
				return x;
			}
			if (x == 'Rouge') {
				x = 'Situation très tendue du réseau de gaz';
				return x;
			}
		}

  var callBackSuccess = function(data) {
	  console.log("données api", data)
	  data.sort(SortTime);
	
	var element = document.getElementById('contain');

	element.innerHTML += 
	"<h5 id='state'></h5>"+
	"<mark class=''>Dernière mise à jour : "+deleteLastCharH((moment(data[0].record_timestamp).calendar()).replace(":", "h"))+"</mark>";

		for (i = data.length-5; i < data.length; i++) {
			element.innerHTML += 
			"<div class='cartouche color"+data[i].couleur_du_signal_fr+"'><h4>"
			+deleteLastChar(moment(data[i].gas_day).format('ll'))+
			"</h4><p class='infos'>"
			+remplaceLegend(data[i].couleur_du_signal_fr)+
			"</p></div>";
		}
}

window.onload = buttonClickGET();

function buttonClickGET(){
	var url = 'https://odre.opendatasoft.com/api/v2/catalog/datasets/signal-ecogaz/exports/json?limit=-1&offset=0&timezone=UTC';
	$.get(url, callBackSuccess).done(function() {
		})
		.fail(function() {
			alert ("erreur");
		})
		.always(function () {
		});
}

