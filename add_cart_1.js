//Definindo Array para os Id´s
var produtos = new Array();

//Clique no botao adicionar ao carrinho
$('.add-cart').click(function (e) {
    e.preventDefault();
   
    //Inserir no array os itens ja armazenados no storage
    produtos = [localStorage.getItem('produtos')];
    var produto = (this);
    
    
    console.log($(produto).parent()[0].firstElementChild.children[1].children[0].value);

    adicionarProduto(produtos, produto);

    //Atualizar o array de ID´s do LocalStorage
    localStorage.setItem('produtos', produtos);
    //Atualizar a quantidade do Icone do Carrinho
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

//Função para adicionar produtos no storage
function adicionarProduto(produtos, produto) {
    //Verifica se o array de ID está vazio
    if (produtos != '') {
        //Caso não esteja vazio, quebra separadamente pelos ID´s
        store = localStorage.getItem('produtos').split(',');
        //Seta uma variavel para verificar se foi encontrado algum id igual no array
        var idem = 0;
        //percorre o array e realiza a verificação de ID´s
        for (i = 0; i < store.length; i++) {
            //Verifica se a posição do Array é diferente de vazio
            if (store[i] != '') {
                //Verifica se o id informado é igual o Atual do array
                if (store[i] == produto.id) {
                    //Caso seja, atribui 1 a variavel de ID´s iguals e sai da execução
                    idem = 1;
                    return;
                }
            }
        }
        //Verificar se já não foi encontrado ID igual no array
        if (idem <= 0) {
            //Se não foi, adiciona o ID
            produtos.push(produto.id);
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
        //Caso esteja vazio - Adiciona o primeiro ID
        produtos.push(produto.id);
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

//Função que atualiza a quantidade de itens do carrinho
function iconCart() {
    var item = $('#icon-cart');
    var itens = item.text();
    storage = localStorage.getItem('produtos');

    //Verifica se o storage é diferente de vazio para realizar a divisão do conteudo
    if (storage != ',' && storage != '' && storage != null) {
        storage = storage.split(',').length;
    }

    //Verificar quantidades
    if (storage <= 1) {
        quantidade = 0;
    } else {
        quantidade = (storage - 1);
        $('.itens-cart-content').css('display', 'block');
        $('.itens-cart-content-empty').css('display', 'none');
    }

    //Escrever no HTML a quantidade de itens no carrinho
    if (quantidade > 1) {
        item.html(quantidade + ' itens');
    } else {
        item.html(quantidade + ' item');
    }
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

//Listar os ID´s na ação Hover do icone
function listarItens() {
    storage = localStorage.getItem('produtos');

    //Verifica se o storage é diferente de vazio para realizar a divisão do conteudo
    if (storage != ',' && storage != '' && storage != null) {   
        store = storage;
        storage = storage.split(',').length;
        
        if (storage >= 1) {
            store = store.split(',');


            for (i = 0; i < storage; i++) {
                if (store[i] != '') {
                    //$('#itens-store').append("<div class='row'><div class='col-lg-12 col-md-12 pad-10'><div class='col-lg-4 col-md-4'><img class='center-block mar-bottom-10  img-responsivo' src='https://images-submarino.b2w.io/produtos/01/00/item/124255/2/124255267_1GG.png' width='45'></div><div class='col-lg-8 col-md-8'><p class='font-12'> Cod - " + store[i] + " - Geladeira / Refrigerador 310 Litros Electrolux</p></div><div class='clearfix'></div><div class='linha mar-left-25 mar-right-25'></div></div></div>");
                    //$('#itens-store').append("<div class='row'><div class='col-lg-12 col-md-12 pad-10'><div class='col-lg-2 col-md-2'><img class='center-block mar-bottom-10  img-responsivo' src='https://images-submarino.b2w.io/produtos/01/00/item/124255/2/124255267_1GG.png' width='45'></div><div class='col-lg-8 col-md-8'><p class='font-12'> Cod - " + store[i] + " - Geladeira / Refrigerador 310 Litros Electrolux</p></div><div class='col-lg-2 col-md-2'><button class='btn btn-action remove-box' id='"+store[i]+"'><i class='fas fa-times font-15'></i> </button></div><div class='clearfix'></div><div class='linha mar-left-25 mar-right-25'></div></div></div>");
                    $('#itens-store').append(
                        "<div class='row'>"+
                            "<div class='col-lg-12 col-md-12 pad-10'>"+
                                "<div class='col-lg-4 col-md-4'>"+
                                    "<img class='center-block mar-bottom-10  img-responsivo' src='https://images-submarino.b2w.io/produtos/01/00/item/124255/2/124255267_1GG.png' width='45'>"+
                                "</div>"+
                                "<div class='col-lg-8 col-md-8'>"+
                                    "<p class='font-12'> Cod - " + store[i] + " - Geladeira / Refrigerador 310 Litros Electrolux</p>"+
                                "</div>"+
                                "<div class='clearfix'></div>"+
                                "<div class='linha mar-left-25 mar-right-25'></div>"+
                            "</div>"+
                        "</div>"
                    );
                }else {
                    $('#itnes-store').html('');
                }
            }
        }else {
            //$('#itens-store').html("<div class='row'><div class='col-lg-12 col-md-12 pad-10'><div class='col-lg-4 col-md-4'><img class='center-block mar-bottom-10  img-responsivo' src='https://images-submarino.b2w.io/produtos/01/00/item/124255/2/124255267_1GG.png' width='45'></div><div class='col-lg-8 col-md-8'><p class='font-12'> Cod - " + store[i] + " - Geladeira / Refrigerador 310 Litros Electrolux</p></div><div class='clearfix'></div><div class='linha mar-left-25 mar-right-25'></div></div></div>");
            //$('#itens-store').html("<div class='row'><div class='col-lg-12 col-md-12 pad-10'><div class='col-lg-2 col-md-2'><img class='center-block mar-bottom-10  img-responsivo' src='https://images-submarino.b2w.io/produtos/01/00/item/124255/2/124255267_1GG.png' width='45'></div><div class='col-lg-8 col-md-8'><p class='font-12'> Cod - " + store[i] + " - Geladeira / Refrigerador 310 Litros Electrolux</p></div><div class='col-lg-2 col-md-2'><button class='btn btn-action remove-box' id='"+store[i]+"'><i class='fas fa-times font-15'></i> </button></div><div class='clearfix'></div><div class='linha mar-left-25 mar-right-25'></div></div></div>");
            $('#itens-store').html(
                "<div class='row'>"+
                    "<div class='col-lg-12 col-md-12 pad-10'>"+
                        "<div class='col-lg-4 col-md-4'>"+
                            "<img class='center-block mar-bottom-10  img-responsivo' src='https://images-submarino.b2w.io/produtos/01/00/item/124255/2/124255267_1GG.png' width='45'>"+
                        "</div>"+
                        "<div class='col-lg-8 col-md-8'>"+
                            "<p class='font-12'> Cod - " + store[i] + " - Geladeira / Refrigerador 310 Litros Electrolux</p>"+
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

//Listar itens na página do carrinho de compras
function showCartItens() {
    storage = localStorage.getItem('produtos');

    //Verifica se o storage é diferente de vazio para realizar a divisão do conteudo
    if (storage != ',' && storage != '' && storage != null) {
        $('.content-cart-empty').css('display', 'none');
        store = storage;
        storage = storage.split(',').length;
        store = store.split(',');


        for (i = 0; i < storage; i++) {
            if (store[i] != '') {
                //Insere no carrinho de compras os produtos
                //$('.carrinho-itens-list').append("<div class='row'><div class='col-lg-12 col-md-12 pad-10'><div class='col-lg-4 col-md-4'><img class='center-block mar-bottom-10  img-responsivo' src='https://images-submarino.b2w.io/produtos/01/00/item/124255/2/124255267_1GG.png' width='45'></div><div class='col-lg-8 col-md-8'><p class='font-12'> Cod - " + store[i] + " - Geladeira / Refrigerador 310 Litros Electrolux</p></div><div class='clearfix'></div><div class='linha mar-left-25 mar-right-25'></div></div></div>");
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

function removeBox(){
    //item = (this);
    //console.log('item');
}

//Ao carregar a página executar a função para atualizar a quantidade
$(document).ready(function () {
    iconCart();
    listarItens();
    showCartItens();
})