var produtos = "";

//Ao clicar no botão adicionar ao carrinho
$('.add-cart').click(function (e) {
    e.preventDefault();
	
	//Array de produtos salvos - Vindo da função
	produtos = storageProdutosToArray();
	
	//Produto a ser adicionado
	var produto = (this);
	
	//Função que vai adicionar o produto ao array ( ARRAY DE PRODUTOS, PRODUTO A SER ADICIONADO ) 
	adicionarProduto(produtos, produto);
	
	
	//Atualizar o indice de Produtos do carrinho
	iconCart();
});

//Ao passar o mouse sobre o icone do carrinho
$('.cart').hover(
        function () {
            $('#itens-prev').addClass('show-box');
        },
        function () {
            $('#itens-prev').removeClass('show-box');
        }
);

//Adicionar o produto mo array e na sequencia adicionar ao JSON e Storage Local
function adicionarProduto(produtos, produto){
	
	//Inicializar arrays
	var codigo = [];
	var voltagem = [];
	var quantidade = [];
	
	//Definir uma voltagem e quantidade padrão - TESTES
	var volt = "110V";
	var qtd = 1;
	
	//Verificar se o array não esta vázio
	if( produtos.codigo.length > 0 ){
		
		//Varivel de verificação de codigo ja incluido no array
		var idem = 0;
		
		//percorrer o array para verificar se ja existe produto com o id
		for( i = 0; i <= produtos.codigo.length; i++ ){
			
			//Verificar se o código na posição I não é vazio - em branco
			if( produtos.codigo[i] != "" ){
				
				//Verifica se o codigo informado é igual ao do indice do array
				if( produtos.codigo[i] === produto.id ){
					//Caso seja igual ele retorna 1 na variavel de verificação
					idem = 1;
					return;
					
				} 
				
			}
			
		}
		
		//Realizar a validação na variavel de verificação
		if( idem === 0 ){
			
			//Se nao obteve codigo repetido - adiciona o produto ao array
			codigo.push(produto.id);
			voltagem.push(volt);
			quantidade.push(qtd);
			
			//Executar transformação dos dados em um array e adicionar no Storage Local
			arrayToJson(codigo, voltagem, quantidade);
			
			//Insere na div de itens do carrinho o produto
			$('#itens-store').append(
                "<div class='row'>"+
                    "<div class='col-lg-12 col-md-12 pad-10'>"+
                        "<div class='col-lg-4 col-md-4'>"+
                            "<img class='center-block mar-bottom-10  img-responsivo' src='https://images-submarino.b2w.io/produtos/01/00/item/124255/2/124255267_1GG.png' width='45'>"+
                        "</div>"+
                        "<div class='col-lg-8 col-md-8'>"+
                            "<p class='font-12'> Cod - " + produto.id + " - Geladeira / Refrigerador 310 Litros Electrolux</p>"+
                        "</div>"+
                        "<div class='clearfix'></div>"+
                        "<div class='linha mar-left-25 mar-right-25'></div>"+
                    "</div>"+
                "</div>"
            );
			
			//Executa a função que mostra o carrinho
			showBox();
		} 
		
	} else {
		//Se o array estiver vazio irá adicionar o primeiro produto
		codigo.push(produto.id);
		voltagem.push(volt);
		quantidade.push(qtd);
		
		//Executar transformação dos dados em um array e adicionar no Storage Local
		arrayToJson(codigo, voltagem, quantidade);
		
		//Inserir na div de itens do carrinho o produto
		$('#itens-store').append(
            "<div class='row'>"+
                "<div class='col-lg-12 col-md-12 pad-10'>"+
                    "<div class='col-lg-4 col-md-4'>"+
                        "<img class='center-block mar-bottom-10  img-responsivo' src='https://images-submarino.b2w.io/produtos/01/00/item/124255/2/124255267_1GG.png' width='45'>"+
                    "</div>"+
                    "<div class='col-lg-8 col-md-8'>"+
                        "<p class='font-12'> Cod - " + produto.id + " - Geladeira / Refrigerador 310 Litros Electrolux</p>"+
                    "</div>"+
                    "<div class='clearfix'></div>"+
                    "<div class='linha mar-left-25 mar-right-25'></div>"+
                "</div>"+
            "</div>"
        );
		
		//Executar função que mostra o carrinho
		showBox();
		$('#itens-prev').css('opacity','1');
	}	
	
}

//Converter o array em JSON e armazenar no Storage Local
function arrayToJson(codigo, voltagem, quantidade){
	
	//Definir o array a ser salvo com os dados do produto
	var prods = {codigo, voltagem, quantidade};
	
	//Converter o array PRODS em JSON e armazenar na variavel produtosJSON
	produtosJSON = JSON.stringify(prods);
	
	//Armazenar os dados no Storage local
	localStorage.setItem('produtos', produtosJSON);	
}

//Função responsável por converter os dados do Storage em array
function storageProdutosToArray(){
	
	//Retornar o array vindo do Storage em uma variavel
	return JSON.parse( localStorage.getItem('produtos') );
	
}

//Função para atualizar o índice
function iconCart(){
	
	//Definir variaveis
	var item = $('#icon-cart');
	
	//Indice do carrinho
	var itens = item.text;
	
	//Variavel que irá conter o array de produtos do Storage
	storage = storageProdutosToArray();
	
	//Verifica se o array não está vazio
	if( storage.codigo.length === 0 ){
		//Se estiver vazio o indice será vazio
		var quantidade = 0;
	}else {
		
		//Se retornar dados indice será alterado para a quantidade do array
		var quantidade = storage.codigo.length;
		
		//Mostrar os itens
		$('.itens-cart-content').css('display', 'block');
		
		//Ocultar a mensagem de carrinho vazio
        $('.itens-cart-content-empty').css('display', 'none');
		
	}
	
	//Verificar qual a quantidade de itens para personalizar o índice
	if( quantidade > 1 ){
		
		//Se conter mais que 1 item no carrinho - escrever no plural a quantidade
		item.html(quantidade + "itens");
				
	} else {
		
		//Caso tenha uma unidade - escrever no singular a quantidade
		item.html(quantidade + "item");
	}
	
}

//Função que mostrara e ocultará a div carrinho
function showBox(){
	
    var visible = $('#itens-prev').css('visibility');
    if (visible == 'hidden') {
        $('#itens-prev').removeClass('hidden-box');
        $('#itens-prev').addClass('show-box');
        window.setTimeout(function () {
            $('#itens-prev').removeClass('show-box');
            $('#itens-prev').addClass('hidden-box');
        }, 1000);
    } else {
        $('#itens-prev').removeClass('show-box');
        $('#itens-prev').addClass('hidden-box');
    }
}

//Listar os itens no hover do carrinho
function listarItens(){

	//Variavel que armazenará os dados do Store
	storage = storageProdutosToArray();
	
	//Verificar se contém itens no array
	if( storage.codigo.length > 0 ){
		
		if( storage.codigo.length >= 1 ){
			
			//Percorrer o array
			for( i = 1; i <= storage.codigo.length; i++ ){
				
				if( storage.codigo[i] != '' ){
					
					$('#itens-store').append(
                        "<div class='row'>"+
                            "<div class='col-lg-12 col-md-12 pad-10'>"+
                                "<div class='col-lg-4 col-md-4'>"+
                                    "<img class='center-block mar-bottom-10  img-responsivo' src='https://images-submarino.b2w.io/produtos/01/00/item/124255/2/124255267_1GG.png' width='45'>"+
                                "</div>"+
                                "<div class='col-lg-8 col-md-8'>"+
                                    "<p class='font-12'> Cod - " + storage.codigo[i] + " - Geladeira / Refrigerador 310 Litros Electrolux</p>"+
                                "</div>"+
                                "<div class='clearfix'></div>"+
                                "<div class='linha mar-left-25 mar-right-25'></div>"+
                            "</div>"+
                        "</div>"
                    );
					
				}
				
			}
			
			
		} else {
			
			$('#itens-store').html(
                "<div class='row'>"+
                    "<div class='col-lg-12 col-md-12 pad-10'>"+
                        "<div class='col-lg-4 col-md-4'>"+
                            "<img class='center-block mar-bottom-10  img-responsivo' src='https://images-submarino.b2w.io/produtos/01/00/item/124255/2/124255267_1GG.png' width='45'>"+
                        "</div>"+
                        "<div class='col-lg-8 col-md-8'>"+
                            "<p class='font-12'> Cod - " + storage.codigo[1] + " - Geladeira / Refrigerador 310 Litros Electrolux</p>"+
                        "</div>"+
                        "<div class='clearfix'></div>"+
                        "<div class='linha mar-left-25 mar-right-25'></div>"+
                    "</div>"+
                "</div>"
            );
			
		}
		
		
	} else {
	
		//Caso o array de itens seja vazio - Mostrar mensagem de carrinho vazio
		$('.itens-cart-content').css('display', 'none');
        $('.itens-cart-content-empty').css('display', 'block');
	
	}
	
}

//Listar itens dentro do UL do carrinho de compras - Pagina carrinho.php
function showCartItens(){
	
	//Variavel que armazenará o array dos produtos
	storage = storageProdutosToArray();
	
	//Verificar se contém itens no array
	if( storage.codigo.length > 0 ){
		
		//Percorrer o array e listar os itens
		for( i = 1; i <= storage.codigo.length; i++ ){
			
			//Verificar se o codigo é´vazio caso não seja liste o produto
			if( storage.codigo[i] === '' ){
				
				$('.carrinho-itens-list').append('\
                    <li class="container carrinho-itens-linha pad-top-15" id="item' + storage.codigo[i] + '">'+
                        '<div class="col-md-1 pull-left mar-top-10 mar-bottom-15 text-center" align="center">'+
                            '<img src="http://static.gazinatacado.com.br/thumb/011508000302500.jpg" class="img-responsive">'+
                            '<p class="pad-top-5 carrinho-itens-linha-cod">Cod. ' + storage.codigo[i] + '</p>'+
                        '</div>'+
                        '<div class="col-md-4 pull-left mar-top-10 mar-bottom-15 text-center">'+
                            '<label class="carrinho-itens-label">Descrição</label>'+
                            '<p>Geladeira / Refrigerador Brastemp Frost Free 342 Litros</p>'+
                        '</div>'+
                        '<div class="col-md-2 col-xs-12 pull-left mar-top-10 mar-bottom-15 text-center">'+
                            '<div class="form-group">'+
                                '<label class="carrinho-itens-label">Quantidade</label>'+
                                '<div class="input-group group-quantidade pad-left-15">'+
                                    '<span class="input-group-btn">'+
                                        '<button type="button" class="btn btn-default btn-number menos" id="' + storage.codigo[i] + '" disabled="">-</button>'+
                                    '</span>'+
                                    '<input type="number" name="item' + storage.codigo[i] + '" id="item' + storage.codigo[i] + 'Input" class="input-quantidade form-control input-number pad-top-5" min="1" max="99" value="1">'+
                                    '<span class="input-group-btn">'+
                                        '<button type="button" class="btn btn-default btn-number mais" id="' + storage.codigo[i] + '">+</button>'+
                                    '</span>'+
                                '</div>'+
                            '</div>'+
                            '<p class="pad-top-5 carrinho-itens-linha-remover">'+
                                '<a href="" id="item' + storage.codigo[i] + 'Remover" class="remover">Remover</a>'+
                            '</p>'+
                        '</div>'+
                        '<div class="col-md-2 col-xs-6 pull-left mar-top-10 mar-bottom-15 text-center">'+
                            '<label class="carrinho-itens-label">Preço Unitário</label>'+
                            '<p><span id="item' + storage.codigo[i] + 'Un" class="unitario">899</span> Pts</p>'+
                        '</div>'+
                        '<div class="col-md-2 col-xs-6 pull-left mar-top-10 mar-bottom-10 text-center">'+
                            '<label class="carrinho-itens-label">Sub Total</label>'+
                            '<span id="item' + storage.codigo[i] + 'Sub" class="subTotal">899</span>'+
                            'Pts'+
                        '</div>'+
                    '</li>'
                );
				
			} 
			
		}
		
		
	} else {
		//Caso o array seja vazio mostrar mensagem de carrinho vazio
		$('.content-cart').css('display', 'none');
        $('.content-cart-empty').css('display', 'block');
		
	}
	
}