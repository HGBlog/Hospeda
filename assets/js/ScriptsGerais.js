
/* DESABILITAR OS CAMPOS DE DATA E HORA DO COMPLEMENTO DO EVENTO */
$(document).ready(function() {
	$('#CheckUnicoEventCasa').change(function() {
		if($(this).is(":checked")) {
			$( "#inputDataAte" ).prop( "disabled", true );
			$( "#inputDataAte" ).val("00/00/0000");
			$( "#inputHoraAte" ).prop( "disabled", true );
			$( "#inputHoraAte" ).val("00:00");
		}
		else{
			$( "#inputDataAte" ).prop( "disabled", false );
			$( "#inputHoraAte" ).prop( "disabled", false );
		}                                          
	});
});

/* CHECKBOX ESTILIZADO COMO UM BOTÃO. ESSA FUNÇÃO DA AÇÃO AO BOTÃO */
$( ".btn-group-toggle .btn" ).click(function() {
	$(this).button("toggle");
});

// ALERTA TEMPORÁRIO
$(document).ready(function(){
	$(".alertTemp").hide();
	setTimeout(function(){
		$(".alertTemp").fadeIn( "slow" );
	}, 3000);
	setTimeout(function(){
		$(".alertTemp").fadeOut( "slow" );
	}, 8000);
	
});


