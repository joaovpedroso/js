var produtos = [];

/*
function addProduto(codigo){
	
	produtos.push({'codigo': codigo});
	var myJsonString = JSON.stringify(produtos);
	
	localStorage.setItem('produtos', myJsonString);
}
function getProdutos(){
	console.log( localStorage.getItem('produtos') );
}
*/
/* --------------------------------------------------------------------------------- */

function adicionarProduto(produto){
	
	produtos = getStorage();
	var idem = 0;
	
	if( produtos != ''){
		
		for( i = 0; i <= produtos.length; i++ ){
				
			if( produtos[i].codigo != ''){
				
				if( produtos[i].codigo == produto.id ){
				
					idem = 1;
					return;
				
				} 
				
			} 
				
		}
		
		if( idem <= 0 ){
			
			produtos.push( {'codigo': produto.id} );
			add(produtos);
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
            showBox();
		}
		
		
	} else {
		
		produtos.push({'codigo': produto.id});
		add(produtos);
		
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
		
		showBox();
		$('#itens-prev').css('opacity', '1');
	}
}

function add(produtos){
	localStorage.setItem('produtos', JSON.stringify(produtos));
}

function getStorage(){
	return JSON.parse(localStorage.getItem('produtos'));
}

//Mostrar e ocultar o box
function showBox() {
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

function iconCart(){
	var item = $('#icon-cart');
	var itens = item.text();
	
	storage = getStorage();
	
	if( storage.length <= 1 ){
		quantidade = 0;
	}else {
		quantidade = ( storage.length - 1 );
		$('.itens-cart-content').css('display', 'block');
        $('.itens-cart-content-empty').css('display', 'none');
	}
	
	if( quantidade > 1 ){
		item.html(quantidade+' itens');
	}else{
		item.html(quantidade+' item');
	}
}

function listarItens(){
	
	storage = getStorage();
	if( storage.length > 0 ){
		
		if( storage.length >= 1 ){
			
			for( i = -; i <= storage.length; i++ ){
				
				if( storage[i].codigo != '' ){
					
					$('#itens-store').append(
						"<div class='row'>"+
							"<div class='col-lg-12 col-md-12 pad-10'>"+
								"<div class='col-lg-4 col-md-4'>"+
									"<img class='center-block mar-bottom-10  img-responsivo' src='https://images-submarino.b2w.io/produtos/01/00/item/124255/2/124255267_1GG.png' width='45'>"+
								"</div>"+
								"<div class='col-lg-8 col-md-8'>"+
									"<p class='font-12'> Cod - " + storage[i].codigo + " - Geladeira / Refrigerador 310 Litros Electrolux</p>"+
								"</div>"+
								"<div class='clearfix'></div>"+
								"<div class='linha mar-left-25 mar-right-25'></div>"+
							"</div>"+
						"</div>"
					);
					
				} else {
					
					$('#itens-store').html('');
					
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
                            "<p class='font-12'> Cod - " + storage[0] + " - Geladeira / Refrigerador 310 Litros Electrolux</p>"+
                        "</div>"+
                        "<div class='clearfix'></div>"+
                        "<div class='linha mar-left-25 mar-right-25'></div>"+
                    "</div>"+
                "</div>"
            );
			
		}
		
	} else {
		
		$('.itens-cart-content').css('display', 'none');
        $('.itens-cart-content-empty').css('display', 'block');
		
	}
	
}

function showBox(){
	var visible = $('#itens-prev').css('visibility');
	if( visible == 'hidden' ){
		
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

function showCartItens() {
	
	storage = getStorage();
	if( storage.length > 1 ){
		
		$('.content-cart-empty').css('display', 'none');
		
		for( i = 0; i <= storage.length; i++ ){
			
			if( storage[i].codigo != '' ){
				
				$('.carrinho-itens-list').append('\
                    <li class="container carrinho-itens-linha pad-top-15" id="item' + store[i] + '">'+
                        '<div class="col-md-1 pull-left mar-top-10 mar-bottom-15 text-center" align="center">'+
                            '<img src="http://static.gazinatacado.com.br/thumb/011508000302500.jpg" class="img-responsive">'+
                            '<p class="pad-top-5 carrinho-itens-linha-cod">Cod. ' + store[i] + '</p>'+
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
                                        '<button type="button" class="btn btn-default btn-number menos" id="' + store[i] + '" disabled="">-</button>'+
                                    '</span>'+
                                    '<input type="number" name="item' + store[i] + '" id="item' + store[i] + 'Input" class="input-quantidade form-control input-number pad-top-5" min="1" max="99" value="1">'+
                                    '<span class="input-group-btn">'+
                                        '<button type="button" class="btn btn-default btn-number mais" id="' + store[i] + '">+</button>'+
                                    '</span>'+
                                '</div>'+
                            '</div>'+
                            '<p class="pad-top-5 carrinho-itens-linha-remover">'+
                                '<a href="" id="item' + store[i] + 'Remover" class="remover">Remover</a>'+
                            '</p>'+
                        '</div>'+
                        '<div class="col-md-2 col-xs-6 pull-left mar-top-10 mar-bottom-15 text-center">'+
                            '<label class="carrinho-itens-label">Preço Unitário</label>'+
                            '<p><span id="item' + store[i] + 'Un" class="unitario">899</span> Pts</p>'+
                        '</div>'+
                        '<div class="col-md-2 col-xs-6 pull-left mar-top-10 mar-bottom-10 text-center">'+
                            '<label class="carrinho-itens-label">Sub Total</label>'+
                            '<span id="item' + store[i] + 'Sub" class="subTotal">899</span>'+
                            'Pts'+
                        '</div>'+
                    '</li>'
                );
				
			}
			
		}
		
	} else {
		
		$('.content-cart').css('display', 'none');
        $('.content-cart-empty').css('display', 'block');
		
	}
	
}






$('.add-cart').click(function(e){
	e.preventDefault();
	
	//Inserir na variavel os itens ja armazenados no storage
	produtos = getStorage();
	
	//Selecionar o elemento que realizou a ação
	var produto = (this);
	
	adicionarProduto(produto);
	
	//Atualizar o array de ID´s do LocalStorage
	add(produtos);
	
	//Atualizar a quantidade do Icone do Carrinho
    iconCart();
	
});

$('.cart').hover(
        function () {
            $('#itens-prev').removeClass('hidden-box');
            $('#itens-prev').addClass('show-box');
        },
        function () {
            $('#itens-prev').removeClass('show-box');
            $('#itens-prev').addClass('hidden-box');
        }
);

//Ao carregar a página executar a função para atualizar a quantidade
$(document).ready(function () {
    iconCart();
    listarItens();
    showCartItens();
})

