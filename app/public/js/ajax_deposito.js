$(document).ready( () => {     
    $('select[name=categoria]').click(function(){ 
        let categoria = $('select[name=categoria]').val();
        let select = $('select[name=modelo]');
        select.children('option').remove();
        $.ajax({ // ajax
            type: "POST",
            url: "/deposito/add_item/getModeloCategoria",
            data: { categoria : categoria }
        }).done( function(dados) {
            for(let i = 0; i < dados.length; i++ ) {
                select.append(`<option value="${dados[i].id}"> ${dados[i].nome_modelo} </option>`);
            }           
        });
    });
});