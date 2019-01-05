var tile;

tile = tile || {};

// ***** FUNÇÃO PARA EXIBIR VAGAS, QUARTOS E PESSOAS *****
function cont(){
    // ***** FUNÇÃO QUE CONTA PESSOAS *****
        //  VARIAVEL QUE CONTA QUANTOS QUADRADOS TEM
    TotalPessoaFalse = $(".MenuPessoas").find(".unstyled-list").find(".tile").length;
        // VARIAVEL QUE CONTA QUANTOS QUADRADOS DE CASAIS TEM
    TotalCasal = $(".MenuPessoas").find(".unstyled-list").find(".tile").find(".bg-casal").length
        // VARIAVEL QUE SOMA QUANTAS PESSOAS REALMENTE TEM
    TotalPessoa = TotalPessoaFalse + TotalCasal;

        // VARIAVEL QUE CONTA QUANTAS VAGAS ESTÃO OCUPADAS
    TotalPessoaOcupFalse = $(".MenuPessoas").find(".unstyled-list").find(".DesibleLi").length;
        // VARIAVEL QUE CONTA QUANTAS VAGAS FORAM OCUPADAS POR CASAL
    TotalPessoaOcupCasal = $(".MenuPessoas").find(".unstyled-list").find(".DesibleLi").find(".bg-casal").length;
        // VARIAVEL QUE SOMA CASAL COM VAGAS OCUPADAS
    TotalPessoaOcup = TotalPessoaOcupFalse + TotalPessoaOcupCasal;
        // VARIAVEL QUE SUBTRAI TOTAL DE PESSOAS COM VAGAS OCUPADAS
    TotalPessoaVaga = TotalPessoa - TotalPessoaOcup;
        // MOSTRA O RESULTADO
    $(".NumPessoas").text(TotalPessoaVaga + " Pessoa(s) ");
    // ***** FIM DA FUNÇÃO QUE CONTA PESSOAS *****

    // ***** FUNÇÃO QUE CONTA QUARTOS *****
    setTimeout(function(){
        // VARIAVEL QUE CONTA QUANTOS QUARTOS TEM
        Quartos = $(".wrapper--tiles").find(".alert-success").length;
        // VARIAVEL QUE CONTA QUANTOS QUARTOS OCUPADOS TEM
        QuartosComp1 = $(".wrapper--tiles").find(".alert-success").not(".d-none").length;
        // VARIAVEL QUE CONTA QUANTOS QUARTOS OCUPADOS POR CASAL TEM
        QuartosCasais = $(".wrapper--tiles").find(".alert-warning").not(".d-none").length;
        // VARIAVEL QUE SOMA QUARTOS OCUPADOS COM QUARTOS OCUPADOS POR CASAL
        QuartosCompletos = QuartosComp1 + QuartosCasais;
        // VARIAVEL QUE SUBTRAI A QUANTIDADE DE QUARTOS PELOS QUARTOS OCUPADOS
        QuartosVagos = Quartos - QuartosCompletos;
        // MOSTRA O RESULTADO
        $(".NumQuartos").text(QuartosVagos + " Quarto(s) ");               
    }, 51);    
    // ***** FIM DA FUNÇÃO QUE CONTA QUARTOS *****

    // ***** FUNÇÃO QUE CONTA VAGAS *****
    // ELE PRECISA DE ALGUNS MILESSEGUNDOS PRA FUNCIONAR
    setTimeout(function(){
        // VARIAVEL QUE CONTA QUANTAS VAGAS EXISTEM
        Vagas = $(".Quartos").find(".unstyled-list").find(".tile").length;
        // VARIAVEL QUE CONTA QUANTAS VAGAS ESTÃO OCUPADAS
        VagasOcupadas = $(".Quartos").find(".unstyled-list").find(".unassigned-tile").length;
        // VARIAVEL QUE SUBTRAI VAGAS E OCUPADAS
        VagasDisponiveis = Vagas - VagasOcupadas;
        // MOSTRA O RESULTADO
        $(".NumVagas").text(VagasDisponiveis + " Vaga(s) ");               
    }, 51);    
    // ***** FIM DA FUNÇÃO QUE CONTA VAGAS *****
}

// FUNÇÃO DE CONTAGEM EM PRIMEIRO FUNCIONAMENTO
cont();

// elements and cached DOM elements
tile.elements = {
    $containerTiles: $('.wrapper--tiles'),
    $containerSelTiles: $('.wrapper--assigned-tiles'),
    $containerunassignedTiles: $('.wrapper--unassigned-tiles'),
    dragSrcElement: null
};

tile.classes = {
    assigned: 'assigned-tile',
    unassigned: 'unassigned-tile',
    dragging: 'dragging',
    draggingOver: 'over'
};

tile.helpers = {

    handleDragStart: function(e) {
        var $draggedElement = $(this),
            dataTransfer = e.originalEvent.dataTransfer;

        // element being dragged is an unassigned tile or an assigned tile, allow transfer
        if ($draggedElement.hasClass(tile.classes.assigned) || $draggedElement.hasClass(tile.classes.unassigned)) {
            tile.elements.dragSrcElement = $draggedElement;
            $draggedElement.addClass(tile.classes.dragging);
            dataTransfer.setData('text', $draggedElement.attr('data-index'));
        } else {
            return false;
        }
    },

    handleDragEnter: function() {
        var $dropZoneElement = $(this);

        $dropZoneElement.addClass(tile.classes.draggingOver);

        return false;
    },

    handleDragOver: function(e) {
        var $dropZoneElement,
            dataTransfer = e.originalEvent.dataTransfer;

        if (e.preventDefault) {
            e.preventDefault();
        }

        if (e.currentTarget) {
            $dropZoneElement = $(e.currentTarget);

            if ($dropZoneElement.hasClass(tile.classes.unassigned)) {
                dataTransfer.dropEffect = 'none';
                $dropZoneElement.removeClass(tile.classes.draggingOver);
            } else {
                dataTransfer.dropEffect = 'move';
            }
        }
        return false;
    },

    handleDragLeave: function() {
        $(this).removeClass(tile.classes.draggingOver);
    },

    handleDrop: function(e) {
        var $droppedOnElement = $(this),
            index,
            dataIndexDropped,
            $temp;        

        if (e.stopPropagation) {
            e.stopPropagation();            
        }

        if (tile.elements.dragSrcElement && tile.elements.dragSrcElement !== $droppedOnElement) {
            index = e.originalEvent.dataTransfer.getData('text');
            $temp = $('.tile[data-index="' + index + '"]').clone(true, true);

            // ESSA VARIAVEL EMBAIXO PEGA O NÚMERO DO DATA INDEX DO QUARTO
            dataIndexDropped = $($droppedOnElement).html();

            if (!tile.elements.dragSrcElement.hasClass(tile.classes.unassigned)) {
                tile.elements.dragSrcElement[0].outerHTML = $droppedOnElement[0].outerHTML;
            }

            if (!$droppedOnElement.hasClass(tile.classes.assigned)) {
                /* SCRIPT RESPONSÁVEL POR FAZER SUMIR O QUADRADO COM OS NOMES. ESTÁ COMENTADO PORQUE QUERO QUE A PESSOA CONTINUE APARECENDO
                tile.elements.dragSrcElement.remove(); */
                // ABAIXO ELE COLOCA UMA CLASSE PRA DEIXAR A PESSOA UM POUCO APAGADA
                tile.elements.dragSrcElement.addClass("DesibleLi");
                // SCRIPT RESPONSÁVEL POR INFORMAR O QUARTO ONDE A PESSOA FOI COLOCADA
                tile.elements.dragSrcElement.append('<div class="InfQuarto"><h5 class="text-uppercase">Hospedado</h5>' + dataIndexDropped + '<button class="close cancHosp" type="button" aria-label="Close"><i class="fas fa-times-circle"></i></button></div>');
                
                
                // VARIAVEIS PARA SABER QUAL O TIPO DE PESSOA NO QUARTO
                ifcasal = tile.elements.dragSrcElement.find(".bg-casal").length;
                ifpresbitero = tile.elements.dragSrcElement.find(".bg-presbitero").length;
                ifmulher = tile.elements.dragSrcElement.find(".bg-mulher").length;
                ifhomem = tile.elements.dragSrcElement.find(".bg-homem").length;
                ifVazio = $droppedOnElement.parent().closest(".card-body").find(".alert-light");

                // ********** FUNÇÕES PADRONIZADAS **************

                    // FUNÇÃO PARA MODIFICAR OS ALERTS ACIMA DAS VAGAS
                    // OBS: INFELIZMENTE NÃO DEU PARA USAR ESSA FUNÇÃO EM TODOS OS MOMENTOS
                function ModificaAlert(NovoAlert){
                    // DEIXA TODOS OS ALERTS INVISIVEIS
                    $droppedOnElement.parent().closest(".card-body").find(".alert").addClass("d-none");
                    // DEIXA VISIVEL SOMENTE O ALERT QUE IMPORTA
                    $droppedOnElement.parent().closest(".card-body").find(NovoAlert).removeClass("d-none");
                }

                    // FUNÇÃO DE CANCELAR A HOSPEDAGEM DE UMA PESSOA
                function ResetarHospedagem(VagaQuarto,PessoaVaga){
                    // REMOVE UMA SERIE DE CLASS E ATRIBUTOS DA VAGA OCUPADA DO QUARTO
                    VagaQuarto.find(".card").remove();
                    VagaQuarto.html(dataIndexDropped);
                    VagaQuarto.attr("draggable","true");
                    VagaQuarto.removeClass("assigned-tile");
                    VagaQuarto.addClass("unassigned-tile");
                    // REMOVE UMA SERIE DE CLASS E ATRIBUTOS DA PESSOA QUE OCUPAVA A VAGA
                    PessoaVaga.attr("draggable","true");
                    PessoaVaga.removeClass("DesibleLi");
                    PessoaVaga.find(".InfQuarto").remove();
                }

                // FUNÇÃO DE CANCELAR A HOSPEDAGEM DE UMA PESSOA COM ALGUNS MILESEGUNDOS DE ATRASO
                function ResetarHospedagemMileseg(VagaQuarto,PessoaVaga){
                    // REMOVE UMA SERIE DE CLASS E ATRIBUTOS DA VAGA OCUPADA DO QUARTO                    
                    VagaQuarto.find(".card").remove();
                    // REMOVE UMA SERIE DE CLASS E ATRIBUTOS DA PESSOA QUE OCUPAVA A VAGA
                    PessoaVaga.removeClass("DesibleLi");
                    PessoaVaga.find(".InfQuarto").remove();
                    // OBS: AS FUNÇÕES ABAIXO PRECISAM DE UM PEQUENO ATRASO, POIS DEPENDE DE OUTRAS FUNÇÕES EM FUNCIONAMENTO PARA PEGAR A INFORMAÇÃO CORRETAMENTE.
                    setTimeout(function(){
                        // REMOVE UMA SERIE DE CLASS E ATRIBUTOS DA PESSOA QUE OCUPAVA A VAGA
                        VagaQuarto.html(dataIndexDropped);
                        VagaQuarto.attr("draggable","true");
                        VagaQuarto.removeClass("assigned-tile");
                        VagaQuarto.removeClass("unassigned-tile");
                        // REMOVE UMA SERIE DE CLASS E ATRIBUTOS DA PESSOA QUE OCUPAVA A VAGA
                        PessoaVaga.attr("draggable","true");
                    }, 50);
                }

                // ********** FIM DAS FUNÇÕES PADRONIZADAS **************

                // ELE MOSTRA O ALERT DE CASAL E CONSTROI TODA A FUNÇÃO DE EXCESSÃO
                if(ifcasal > 0 && !ifVazio.hasClass("d-none")){
                    ModificaAlert(".alert-warning");
                    // QUANDO É UM CASAL, ELE INCLUI A CLASS "ulCasal" P/ IMPEDIR OUTRAS PESSOAS
                    $droppedOnElement.parent().closest("ul").addClass("ulCasal");
                    $droppedOnElement.parent().closest("ul").find("li").addClass("unassigned-tile");

                    // CASO TENHA EXCESSÃO PARA FILHOS...
                    $(".Quartos .alert-warning .ExcFilhos").on( "click", function() {
                        $(this).prop( "checked", function() {
                            // ELE VERIFICA SE O INPUT ESTÁ CHECADO
                            if($(this).prop("checked") == false){
                                /* SE NÃO TIVER CHECADO ELE VAI EXPULSAR A PESSOA A MAIS QUE TIVER CASO ELA TENHA SIDO COLOCADA EM ALGUM MOMENTO EM QUE O CHECK ESTAVA TRUE... */
                                    // VARIAVEIS
                                        // QuartoOcupado VAI GUARDAR A li QUE TEM A PESSOA A MAIS
                                QuartoOcupado = $(this).parent().closest(".card-body").find(".ulCasal").find("li[draggable='false']").find(".card").not(".bg-casal").parent("li");
                                        // QuartoOcupado1 VAI CONTAR QUANTOS OCUPADOS EXCLUINDO O CASAL
                                QuartoOcupado1 = QuartoOcupado.length;
                                        // TodosQuartos VAI PEGAR TODAS AS VAGAS DO QUARTO OCUPADAS OU NÃO
                                TodosQuartos = $(this).parent().closest(".card-body").find(".ulCasal").find("li");
                                PessoaOcupando = tile.elements.dragSrcElement;

                                    // FUNÇÃO QUE OCUPA AS VAGAS QNDO É UM CASAL
                                TodosQuartos.addClass("unassigned-tile");
                                        // SE ELE ENCONTRAR ALGUÉM SEM SER O CASAL, RESETA
                                if(QuartoOcupado1 > 0){
                                    ResetarHospedagem(QuartoOcupado, PessoaOcupando);
                                }
                                
                            }else{
                                // SE TIVER CHECADO ELE LIBERA UM "li" PARA INCLUIR FILHO                                
                                $(this).parent().closest(".card-body").find(".ulCasal").find("li[draggable='true']:last()").removeClass("unassigned-tile");
                            }
                        });
                        // FUNÇÃO DE CONTAGEM ATUALIZANDO INFORMAÇÃO
                        cont();
                    });
                // ELE MOSTRA O ALERT DE PRESBITERO E COLOCA UM CLASS EXCLUSIVO
                }else if(ifpresbitero > 0 && !ifVazio.hasClass("d-none")) {
                    ModificaAlert(".alert-dark");
                    $droppedOnElement.parent().closest("ul").addClass("ulPresbitero");

                // ELE MOSTRA O ALERT DE MULHER E COLOCA UM CLASS EXCLUSIVO
                }else if(ifmulher > 0 && !ifVazio.hasClass("d-none")){
                    ModificaAlert(".alert-danger");
                    $droppedOnElement.parent().closest("ul").addClass("ulMulher");

                // ELE MOSTRA O ALERT DE HOMEM E COLOCA UM CLASS EXCLUSIVO
                }else if(ifhomem > 0 && !ifVazio.hasClass("d-none")){
                    ModificaAlert(".alert-primary");
                    $droppedOnElement.parent().closest("ul").addClass("ulHomem");                    
                }


                // ABAIXO ELE VAI COLOCAR O ALERT DE QUARTO COMPLETO CASO NÃO SEJA CASAL
                setTimeout(function(){
                    // VARIAVEL CONTA QUANTAS VAGAS ESTÃO OCUPADAS
                    lisCompletos = $temp.parent().closest("ul").find(".unassigned-tile").length;
                    // VARIAVEL CONTA QUANTAS VAGAS REALMENTE EXISTEM
                    todosLi = $temp.parent().closest("ul").find("li").length
                    // VARIAVEL QUE VERIFICA SE EXISTE CASAL NO QUARTO
                    ulCasal = $temp.parent().closest(".ulCasal").length;
                    // SE O QUARTO ESTIVER COMPLETO ENTÃO...
                    if(lisCompletos == todosLi){
                        // SE NÃO FOR CASAL ENTÃO...
                        if(ulCasal == 0){
                            // DEIXA INVISIVEL TODOS OS ALERTS
                            $temp.parent().closest(".card-body").find(".alert").addClass("d-none");
                            // FAZ APARECER O ALERTA DE QUARTO COMPLETO
                            $temp.parent().closest(".card-body").find(".alert-success").removeClass("d-none");
                        }                       
                    }
                }, 51);


                // ABAIXO ELE VAI DAR AS CONDIÇÕES PARA HOSPEDAGEM
                    // VARIAVEIS
                QuadradoQEntra = tile.elements.dragSrcElement;
                LiHospedeiro = $droppedOnElement;
                LiHospedeiro1 = $temp;

                // SE A PRIMEIRA ENTRADA FOR UM PRESBITERO OU HOMEM ELE VAI INCLUIR ESSA CLASS
                if(LiHospedeiro.parent().closest("ul").hasClass("ulPresbitero") == true || LiHospedeiro.parent().closest("ul").hasClass("ulHomem") == true){
                    // SE A SEGUNDA ENTRADA FOR UM SOLTEIRO OU UM PRESBITERO
                    
                    if(QuadradoQEntra.find(".card").hasClass("bg-presbitero") == true || QuadradoQEntra.find(".card").hasClass("bg-homem") == true){
                        // SE FOR PRESBITERO OU SOLTEIRO ELE VAI PERMITIR

                        // A FUNÇÃO ABAIXO VAI VERIFICAR SE TEM PRESBITEROS NO QUARTO
                        setTimeout(function(){
                            // VARIAVEL QUE GUARDA O NÚMERO DE VAGAS NO QUARTO
                            NumMaxVagas = LiHospedeiro1.parent().closest("ul").find("li").length;
                            // VARIAVEL QUE GUARDA O NÚMERO DE VAGAS OCUPADAS NO QUARTO
                            NumVagasOcupadas = LiHospedeiro1.parent().closest("ul").find(".unassigned-tile").length;
                            // SE O NÚMERO DE V. OCUPADAS FOR MENOR QUE O NÚMERO DE VAGAS...
                            // OBS: ISSO É IMPORTANTE PARA MUDAR O "ul" E O ALERT DE PRESB. E SOLT.
                            // SE TIVER AO MENOS UM PRESB. NO QUARTO ELE MUDA O ALERT PARA PRESB.
                            if(NumVagasOcupadas < NumMaxVagas){
                                // QUANTOS SOLTEIROS NO QUARTO
                                solt = LiHospedeiro1.parent().closest("ul").find("li").find(".bg-homem").length;
                                // QUANTOS PRESBITEROS NO QUARTO
                                presb = LiHospedeiro1.parent().closest("ul").find("li").find(".bg-presbitero").length;
                                // SE TIVER PRESBITERO NO QUARTO...
                                if(presb >= solt){
                                    // MUDA O CLASS DO "ul" PARA PRESBITERO
                                    LiHospedeiro1.parent().closest("ul").addClass("ulPresbitero");
                                    LiHospedeiro1.parent().closest("ul").removeClass("ulHomem");
                                }else{
                                    // SE NÃO MUDA O CLASS DO "ul" PARA SOLTEIRO
                                    LiHospedeiro1.parent().closest("ul").removeClass("ulPresbitero");
                                    LiHospedeiro1.parent().closest("ul").addClass("ulHomem");
                                }

                                // ELE DEIXA INVISIVEL TODOS OS ALERTS DO QUARTO
                                LiHospedeiro1.parent().closest(".card-body").find(".alert").addClass("d-none");

                                // SE TIVER COM "ul" DE SOLTEIRO...
                                if(LiHospedeiro1.parent().closest("ul").hasClass("ulHomem")){
                                    // APARECE O ALERT DE SOLTEIRO
                                    LiHospedeiro1.parent().closest(".card-body").find(".alert-primary").removeClass("d-none");
                                // SE TIVER COM "ul" DE PRESBITERO...
                                }else if(LiHospedeiro1.parent().closest("ul").hasClass("ulPresbitero")){
                                    // APARECE O ALERT DE PRESBITERO
                                    LiHospedeiro1.parent().closest(".card-body").find(".alert-dark").removeClass("d-none");
                                }
                            }
                        }, 51);
                                              
                    }else{
                        // SE FOR DIFERENTE ELE NÃO VAI PERMITIR A ENTRADA
                            /* OBS: TIVE QUE CRIAR UMA SEGUNDA FUNÇÃO DE RESETAR PQ ELE PRECISAVA DE MILESEGUNDOS PRA FUNCIONAR */
                        ResetarHospedagemMileseg(LiHospedeiro1,QuadradoQEntra);
                    }
                // SE A PRIMEIRA ENTRADA FOR UMA MULHER ELE VAI INCLUIR ESSA CLASS
                }else if(LiHospedeiro.parent().closest("ul").hasClass("ulMulher") == true){
                    // SE A SEGUNDA ENTRADA MULHER
                    if(QuadradoQEntra.find(".card").hasClass("bg-mulher") == true){
                        // SE FOR MULHER ELE VAI PERMITIR
                    }else{
                        // SE FOR DIFERENTE ELE NÃO VAI PERMITIR A ENTRADA                            
                        ResetarHospedagemMileseg(LiHospedeiro1,QuadradoQEntra);
                    }
                /* SE A PRIMEIRA ENTRADA FOR UM CASAL ELE VAI CRIAR ESSA DECISÃO PARA IMPEDIR A ENTRADA DE OUTRO CASAL */
                }else if(LiHospedeiro.parent().closest("ul").hasClass("ulCasal") == true){
                    // PARA FUNCIONAR ELE PRECISA DE ALGUNS MILESEGUNDOS
                    setTimeout(function(){
                        // ELE VERIFICA SE EXCESSÃO DE FILHOS ESTÁ CHECADO E SE JÁ TEM CASAL
                        if (LiHospedeiro1.parent().closest(".card-body").find(".alert-warning").find(".custom-control").find(".ExcFilhos").prop( "checked" ) == true && LiHospedeiro1.find(".card").hasClass("bg-casal")){
                            // CANCELA A HOSPEDAGEM
                            ResetarHospedagemMileseg(LiHospedeiro1,QuadradoQEntra);
                            LiHospedeiro1.removeClass("unassigned-tile");
                            // FUNÇÃO DE CONTAGEM ATUALIZANDO INFORMAÇÃO
                            cont();
                        }
                    }, 51);
                }
            }

            // ESSE SCRIPT ELIMINA O LI DA LISTA. DEIXEI COMENTADO PORQUE QUERO MANTE-LO
            //tile.elements.dragSrcElement[0].innerHTML = $droppedOnElement[0].innerHTML;

            if ($temp.hasClass(tile.classes.unassigned)) {
                // SE QUISER ARRASTAR O OBJETO E MANTE-LO ALTERAVEL É SÓ LIBERAR ESSA OPÇÃO
                //$temp.removeClass(tile.classes.unassigned).addClass(tile.classes.assigned);

                // O DE BAIXO SERVE PRA TRAVAR A DIV DEPOIS DE ARRASTADO
                $temp.addClass(tile.classes.assigned);
                // ABAIXO ELE COLOCA O BOTÃO DE CANCELAR HOSPEDAGEM NO QUADRADO DE VAGA INVISIVEL
                $($temp).prepend('<button class="cancHosp close d-none" type="button" aria-label="Close"><i class="fas fa-times-circle"></i></button>');
                // ABAIXO ELE SERVE PARA DEIXAR O BUTTON VISIVEL. 
                /* EU COLOQUEI ESSA FUNÇÃO PORQUE ESTAVA MUITO ESQUISITO APARECENDO UM BOTÃO SOZINHO QUANDO ELE TRAVAVA A ENTRADA NA VAGA.*/
                setTimeout(function(){
                    $($temp).find("button").removeClass("d-none");
                }, 51);


                /* %%%%%% FUNÇÕES QUE SERÃO CHAMADAS %%%%%% */
                function ZerarUlVaga(VagaQuarto){
                    // SE ELE FOR O PRIMEIRO DO QUARTO, PRECISA TIRAR A CLASS DO "ul" E ZERAR O ALERT.
                    $(VagaQuarto).parent().closest("ul").removeClass("ulCasal ulPresbitero ulMulher ulHomem");
                    // ZERANDO O ALERT                    
                    $(VagaQuarto).parent().closest(".card-body").find(".alert").addClass("d-none");
                    $(VagaQuarto).parent().closest(".card-body").find(".alert-light").removeClass("d-none");
                }

                function resetaho(VagaQuarto, PessoaVaga){
                    VagaOcupada = $(VagaQuarto).parent().closest("ul").find(".unassigned-tile").length;
                    NumMaxVagas = $(VagaQuarto).parent().closest("ul").find("li").length;
                    UlAtual = $(VagaQuarto).parent().closest("ul");
                    
                    // SE ELE FOR O ÚNICO DO QUARTO, PRECISA TIRAR A CLASS DO "ul" E ZERAR O ALERT.
                    if (VagaOcupada == 1){                        
                        ZerarUlVaga(VagaQuarto);
                    }
                    
                    // SE FOR UM "ul" DE MULHER...
                    if($(UlAtual).hasClass("ulMulher")){
                        // ELE VAI ABRIR O ALERT DE MULHER
                        $(VagaQuarto).parent().closest(".card-body").find(".alert").addClass("d-none");
                        $(VagaQuarto).parent().closest(".card-body").find(".alert-danger").removeClass("d-none");
                    }

                    // SE FOR UM ul DE PRESBITERO OU DE SOLTEIRO...
                    if($(UlAtual).hasClass("ulPresbitero") || $(UlAtual).hasClass("ulHomem")){
                        // ELE LEVAR UNS MILESEGUNDOS PARA CANCELAR E REFAZER A CONTA DE QNTOS FICARAM
                        setTimeout(function(){
                            solt = $(VagaQuarto).parent().closest("ul").find("li").find(".bg-homem").length;
                            presb = $(VagaQuarto).parent().closest("ul").find("li").find(".bg-presbitero").length;
                            // SE FICOU ALGUM PRESBITERO NO QUARTO ENTÃO...
                            if(presb >= solt){
                                $(UlAtual).removeClass("ulHomem");
                                $(UlAtual).addClass("ulPresbitero");
                            }else{                                
                                $(UlAtual).removeClass("ulPresbitero");
                                $(UlAtual).addClass("ulHomem");
                            }
                            // DEIXA TODOS OS ALERTS INVISIVEIS E REFAZ O CHAMADO DO ALERT
                            $(VagaQuarto).parent().closest(".card-body").find(".alert").addClass("d-none");
                            if($(UlAtual).hasClass("ulHomem")){
                                $(VagaQuarto).parent().closest(".card-body").find(".alert-primary").removeClass("d-none");
                            }else if($(UlAtual).hasClass("ulPresbitero")){
                                $(VagaQuarto).parent().closest(".card-body").find(".alert-dark").removeClass("d-none");
                            }
                        }, 51);

                    }

                    // SE FOR UMA "ul" DE CASAL...
                    if($(UlAtual).hasClass("ulCasal")){                        
                        // SE O CANCELAR HOSPEDAGEM FOR DE UMA "li" COM UM CARD BG-CASAL
                        if($(VagaQuarto).find(".bg-casal").length > 0){
                            // ELE VAI VERIFICAR SE NÃO TEM NENHUM FILHO HOSPEDADO TAMBÉM
                            $(UlAtual).find("li").find(".card").each(function() {
                                // SE SOBRAR ALGUM CARD QUE NÃO É O ESPOSO...
                                if(!$(this).hasClass("bg-casal")){
                                    // ELE VAI CLICAR AUTOMATICAMENTE O CANCELAR DO CARD
                                    $(this).parent().closest("li").find(".cancHosp").click();
                                }
                            });
                            // ELE VAI UNCHECK O INPUT DE EXCESSÃO DE FILHOS
                            $(VagaQuarto).parent().closest(".card-body").find(".alert-warning").find(".custom-checkbox").find("input").attr("checked", false);
                            // ELE VAI DEIXAR TODOS OS ALERTS INVISIVEL
                            $(VagaQuarto).parent().closest(".card-body").find(".alert").addClass("d-none");
                            // E FAZER O ALERT DE VAZIO APARECER
                            $(VagaQuarto).parent().closest(".card-body").find(".alert-light").removeClass("d-none");
                            // VAI REMOVER AS SEGUINTES CLASS
                            $(UlAtual).find("li").removeClass("unassigned-tile");
                            $(UlAtual).removeClass("ulCasal");
                        }
                    }

                    ResetarHospedagem(VagaQuarto, PessoaVaga);
                    VagaQuarto.removeClass("unassigned-tile"); 
                }

                // QUANDO CLICAR NO BOTÃO DE CANCELAR HOSPEDAGEM DENTRO DO QUARTO...
                $($temp.find(".cancHosp")).on( "click", function() {
                    PessoaHospedada = $('.tile[data-index="' + index + '"]');
                    VagaOcupada = $(this).parent().closest(".tile");

                    // FUNÇÃO QUE FAZ O CANCELAMENTO DA HOSPEDAGEM
                    resetaho(VagaOcupada, PessoaHospedada);
                    // FUNÇÃO DE CONTAGEM ATUALIZANDO INFORMAÇÃO
                    cont();
                });

                $temp.attr("data-index", $droppedOnElement.attr("data-index"));

                // QUANDO CLICAR NO BOTÃO DE CANCELAR HOSPEDAGEM NA PESSOA...
                $($(tile.elements.dragSrcElement).find(".InfQuarto").find(".cancHosp")).on( "click", function() {
                    PessoaHospedada = $(this).parent().closest(".tile");
                    VagaOcupada = $temp;

                    // FUNÇÃO QUE FAZ O CANCELAMENTO DA HOSPEDAGEM
                    resetaho(VagaOcupada, PessoaHospedada);
                    // FUNÇÃO DE CONTAGEM ATUALIZANDO INFORMAÇÃO
                    cont();
                });

                
            }

            $temp.insertAfter($droppedOnElement);
            $droppedOnElement.remove();

            $('.' + tile.classes.draggingOver).removeClass(tile.classes.draggingOver);            
            $('.' + tile.classes.dragging).attr("draggable","false");
            $('.' + tile.classes.dragging).removeClass(tile.classes.dragging);
            // FUNÇÃO DE CONTAGEM ATUALIZANDO INFORMAÇÃO
            cont();

        }

        if (tile.elements.dragSrcElement === null) {
            tile.helpers.handleDragLeave($droppedOnElement);
        }

        return false;
    },

    handleDragEnd: function(elements, classesToRemove) {
        elements.removeClass(classesToRemove);        
    }


};

$(function() {
    // Attaches drag events
    tile.elements.$containerTiles.on('dragstart', '.tile', tile.helpers.handleDragStart)
        .on('dragenter', '.tile', tile.helpers.handleDragEnter)
        .on('dragover', '.tile', tile.helpers.handleDragOver)
        .on('dragleave', '.tile', tile.helpers.handleDragLeave)
        .on('drop', '.tile', tile.helpers.handleDrop)
        .on('dragend', '.tile', function(e) {
            var tiles = tile.elements.$containerTiles.find('.tile'),
                classesToRemove = tile.classes.dragging + ' ' + tile.classes.draggingOver;

            tile.helpers.handleDragEnd(tiles, classesToRemove);            
        });
});

// ******* FUNÇÃO DE FILTRAGEM *******
$(function() {

    // ESSA FUNÇÃO SERVE PARA ANULAR A FUNÇÃO DO INPUT DE FILTRO
    $("#SelFiltroVisual").on( "click", function() {
        // VARIAVEL
        SelTodas = $(".MenuPessoas").find(".wrapper--unassigned-tiles").find(".tile").find(".card").parent().closest(".tile");
        // SE CLICAR NO SELECT FILTRO ENTÃO ELE VAI APAGAR O Q FOI ESCRITO NO INPUT
        $("#InputFiltroVisual").prop("value",null);
        // VAI REMOVER O ATRIBUTO STYLE DENTRO DO "li.tile"
        // OBS: POR ISSO NÃO COLOCAR STYLE DENTRO DO "li.tile" USAR CLASS
        SelTodas.removeAttr("style");
    });

    // SE HOUVER ALGUMA MUDANÇA NO SELECT DE FILTRO ENTÃO...
    $("#SelFiltroVisual").change(function() {
        // VARIAVEIS DE CARA TIPO
        SelTodas = $(".MenuPessoas").find(".wrapper--unassigned-tiles").find(".tile");
        SelPresb = $(".MenuPessoas").find(".wrapper--unassigned-tiles").find(".tile").find(".bg-presbitero").parent().closest(".tile");
        SelHomem = $(".MenuPessoas").find(".wrapper--unassigned-tiles").find(".tile").find(".bg-homem").find(".pCarisma:contains('Carisma Primitivo')").parent().closest(".tile");
        SelSemin = $(".MenuPessoas").find(".wrapper--unassigned-tiles").find(".tile").find(".bg-homem").find(".pCarisma:contains('Seminarista')").parent().closest(".tile");
        SelMulher = $(".MenuPessoas").find(".wrapper--unassigned-tiles").find(".tile").find(".bg-mulher").parent().closest(".tile");
        SelCasal = $(".MenuPessoas").find(".wrapper--unassigned-tiles").find(".tile").find(".bg-casal").parent().closest(".tile");
        SelSemHosp = $(".MenuPessoas").find(".wrapper--unassigned-tiles").find(".DesibleLi");
        SelComHosp = $(".MenuPessoas").find(".wrapper--unassigned-tiles").find(".tile").not(".DesibleLi");
        
        // SE ESCOLHER TODOS DO SELECT...
        if($("#SelFiltroVisual option:checked").attr("value") == 0){
            
            // DEIXAR TODOS VISIVEIS
            SelTodas.removeClass("d-none");
            vazio();            

        // SE ESCOLHER CASAIS...
        }else if($("#SelFiltroVisual option:checked").attr("value") == 1){
            
            SelTodas.addClass("d-none");
            SelCasal.removeClass("d-none");
            vazio();

        // SE ESCOLHER PRESBITERO...
        }else if($("#SelFiltroVisual option:checked").attr("value") == 2){
            
            SelTodas.addClass("d-none");
            SelPresb.removeClass("d-none");
            vazio();

        // SE ESCOLHER MULHER...
        }else if($("#SelFiltroVisual option:checked").attr("value") == 3){
            
            SelTodas.addClass("d-none");
            SelMulher.removeClass("d-none");
            vazio();

        // SE ESCOLHER HOMEM...
        }else if($("#SelFiltroVisual option:checked").attr("value") == 4){
            
            SelTodas.addClass("d-none");
            SelHomem.removeClass("d-none");
            vazio();

        }else if($("#SelFiltroVisual option:checked").attr("value") == 5){
            
            SelTodas.addClass("d-none");
            SelSemin.removeClass("d-none");
            vazio();

        }else if($("#SelFiltroVisual option:checked").attr("value") == 6){
            
            SelTodas.addClass("d-none");
            SelComHosp.removeClass("d-none");
            vazio();

        }else if($("#SelFiltroVisual option:checked").attr("value") == 7){
            
            SelTodas.addClass("d-none");
            SelSemHosp.removeClass("d-none");
            vazio();

        }

        function vazio(){
            TodasHidden = $(".MenuPessoas").find(".wrapper--unassigned-tiles").find(".tile").not(".d-none").length
            if( TodasHidden == 0 ){
                $(".MenuPessoas").find(".wrapper--unassigned-tiles").append('<li class="Vazio"><div class="alert alert-danger" role="alert"><i class="far fa-frown"></i><p>Não foi encontrado nenhum resultado!!!</p></div></li>');
            }else{
                $(".Vazio").remove();
            }
        }
        
    });

    // FUNÇÃO QUE VAI ANULAR AS FUNÇÕES DO SELECT DE FILTRO
    // QUANDO O INPUT FOR CLICADO ENTÃO...
    $("#InputFiltroVisual").on( "click", function() {
        // VARIAVEIS
        SelTodas = $(".MenuPessoas").find(".wrapper--unassigned-tiles").find(".tile").find(".card").parent().closest(".tile");
        // RETIRA A CLASS QUE DEIXA INVISIVEL
        SelTodas.removeClass("d-none");
        // VAI REMOVER O ATRIBUTO STYLE DENTRO DO "li.tile"
        // OBS: POR ISSO NÃO COLOCAR STYLE DENTRO DO "li.tile" USAR CLASS
        SelTodas.removeAttr("style");
        // ELE VAI RESETAR O SELECT DE FILTRO PARA USAR SOMENTE AS DECISÕES DO INPUT
        $("#SelFiltroVisual").find("option[value='0']").prop("selected",true);
    });
    // FUNÇÃO QUE PESQUISA PESSOA POR NOME
    // QUANDO ESCREVER ALGO DENTRO DO INPUT ENTÃO...
    $("#InputFiltroVisual").on("keyup", function() {
        // VARIAVEIS
        InputEscrito = $(this).val().toLowerCase();
        // ELE VAI ENCONTRAR A PESSOA QUE TEM LETRAS OU PALAVRAS QUE ESTÁ NO INPUT
        $(".MenuPessoas").find(".wrapper--unassigned-tiles").find(".tile").filter(function() {
            // QUANDO ELE ENCONTRAR OS QUE TEM ELE VAI COLOCAR UM "style("display: none")" NOS QUE NÃO TEM
            $(this).toggle($(this).find(".pNome").text().toLowerCase().indexOf(InputEscrito) > -1);
        });
    });
});