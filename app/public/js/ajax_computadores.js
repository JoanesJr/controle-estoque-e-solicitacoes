$(document).ready( () => {
    $('select[name=localizacao]').click( ()=> {
       let localizacao = $('select[name=localizacao').val();
       let setor = $('select[name=setor]');

       setor.children('option').remove();
       $.ajax( {
           type: 'post',
           url : '/computadores/setores/get',
           data : {localizacao : localizacao}
       }).done( dados => {
           console.log(dados)
           for(let i = 0; i < dados.length; i++) {
            setor.append(`<option value=${dados[i].id}>${dados[i].nome}</option>`);

           }
       });
    });
});