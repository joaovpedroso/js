//Atualiza os dados do carrinho
function atualizaCarrinho(){
    carrinho = $(".carrinho-itens");
    
    carrinho.each(function(){
        var carrinhoAtual = $(this); 

        //Selecionar o subTotal dos Itens
        var valorItem = carrinhoAtual.find('.subTotal');
        var valorTotal = carrinhoAtual.find('#totalCart');
        resultado = 0;

        valorItem.each(function(){
            tdAtual = $(this);
            
            //Remover R$ e . do valor do produto
            pegaValor = tdAtual[0].textContent.replace("R$","");
            pegaValor = pegaValor.replace(".","");
            
            pegaValor = parseFloat(pegaValor);
            resultado = parseFloat(resultado + pegaValor);
        });
        //Função que converte monetariamente para o local
        resultado = resultado.toLocaleString("pt-br",{ minimumFractionDigits: 2, currency:"BRL"});
        
        //console.log(resultado);
        $("#totalCart").html(resultado);
        //valorTotal.html("<span id='totalCart'>"+resultado+"</span>");

    });            
}


//Realiza o calcula dos produtos e atualiza o carrinho
function alteraValor(quantidade, valorUn, codItem){   
    
    //Calcular o valor do produto
    subTotal = quantidade*valorUn;
    
    //Selecionar o campo SubTotal referente ao item
    campoSubTotal = "#item"+codItem+"Sub";

    subTotal = subTotal.toLocaleString("pt-br", {style: "currency", currency:"BRL", symbol: "none"});
//    idItem = codItem+"Sub";
    
    //Inserir no SubTotal o valor Total do Item
    $(campoSubTotal).html(subTotal); 
    
    atualizaCarrinho();
}

//Função que é chamada quando se altera o valor do input de quantidade
function alteraQuantidade(){
    //Selecionar o input referente ao Item
    inputQuantidade = $(this);
    //Receber a quantidade informada no Input
    quantidade = inputQuantidade.val();

    //Selecionar o cod do item a ser alterado
    codItem = inputQuantidade[0].name;

    //Transforma o codigo em um ID
    itemUn = '#'+codItem+"Un";

    //Pega o valor unitário od produto
    valUnitario = $(itemUn).text();
    valUnitario = valUnitario.replace("R$", "");
    valUnitario = parseFloat(valUnitario);

    //Chama a função que realiza o calculo dos valores
    alteraValor(quantidade, valUnitario, codItem);
}

function btnMais(){
    //Seleciona o id referente ao botao
    id = $(this)[0].id;
    //Seleciona o input referente ao botao
    input = $("#item"+id+"Input");
    //Atrubui a inputValue o valor do input
    inputValue = input.val(); 
    //Verifica se o valor é menor que 1 ( Negativo )
    if( inputValue <= 1 ){
        inputValue = 1;
    }

    //Converte o valor para Inteiro
    inputValue = parseInt(inputValue);

    //Faz o calculo do Novo Valor
    changeTo = (inputValue+1);
    //Seleciona o Valor unitário do Item
    itemUn = '#item'+id+"Un";
    
    //Pega o valor unitário do produto
    valUnitario = parseFloat( $(itemUn).text() );
    //Atribui o novo valor ao campo INPUT
    $("#item"+id+"Input").val(changeTo);
        
    //Chama a função que altera o Valor do Subtotal dos Prods
    alteraValor(changeTo,valUnitario, id );
}

function btnMenos(){
    
    //Seleciona o id referente ao botao
    id = $(this)[0].id;
    //Seleciona o input referente ao botao
    input = $("#item"+id+"Input");
    //Atrubui a inputValue o valor do input
    inputValue = input.val(); 
    //Verifica se o valor é menor que 1 ( Negativo )
    if( inputValue <= 1 ){
        inputValue = 1;
    }

    //Converte o valor para Inteiro
    inputValue = parseInt(inputValue);

    //Faz o calculo do Novo Valor
    changeTo = (inputValue-1);

    //Seleciona o Valor unitário do Item
    itemUn = '#item'+id+"Un";
    //Pega o valor unitário do produto
    valUnitario = parseFloat( $(itemUn).text() );

    //Chama a função que altera o Valor do Subtotal dos Prods
    alteraValor(changeTo,valUnitario, id );
    atualizaCarrinho();
    //Atribui o novo valor ao campo INPUT
    $("#item"+id+"Input").val(changeTo);
}

//Remove um elemento do código após atualiza o carrinho
removeItem = function(event){
    event.preventDefault();

    //Seleciona qual o elemento que será removido e remove com a função remove
    $(this).parents('li').remove();

    //Atualiza o carrinho
    atualizaCarrinho();
};

//Executa as funções após serem acionadas
afterLoad = function(){

    //Executa a função de remover quando clicado no elemento com classe .remover
    $('.remover').click(removeItem);
    $(document).on('change', '.input-quantidade', alteraQuantidade);
    $(document).on('click', '.mais', btnMais );
    $(document).on('click', '.menos', btnMenos );
    //Atualiza o Carrinho
    atualizaCarrinho();

 };

//Executa o atributo afterLoad que executa as funções apos acionadas 
$(afterLoad);