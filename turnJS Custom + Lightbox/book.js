$(document).ready(function () {
    $("#flipbook").turn({
        width: '100%',
        height: 500,
        autoCenter: false
    });
    $("#flipbook").turn("zoom", 1);
//                $(".images-zoom").elevateZoom();

    $(".book-control-prev").addClass("hidden");
});

//Índice Personalizado
$(".indice-content-ul li").on("click", function () {
    page = $(this).data("number-pages");

    if (page == "1") {
        $(".book-control-prev").addClass("hidden");
    } else if (page == "48 ") {
        $(".book-control-next").addClass("hidden");
    } else {
        $(".book-control-prev").removeClass("hidden");
        $(".book-control-next").removeClass("hidden");
    }

    $("#flipbook").turn("page", page);
    hiddenIndice();

});

$("#indice").on("click", () => {
    indice = $("#indice-content");
    if (indice.hasClass("hidden")) {
        indice.removeClass("hidden");
    } else {
        indice.addClass("hidden");
    }
});

function hiddenIndice() {
    $("#indice-content").addClass("hidden");
}

//Setas de Controle
$(".book-control-next").on("click", function () {
    controlsBook("next");
});
$(".book-control-prev").on("click", function () {
    controlsBook("previous");
});

function controlsBook(direction) {
    $("#flipbook").turn(direction);
    acao = direction;
    pagina = $("#flipbook").turn("page");

    if (acao === "next" && pagina == "46") {
        $(".book-control-next").addClass("hidden");
        $(".book-control-prev").removeClass("hidden");
        $("#flipbook").turn(acao);
    } else if (acao === "previous" && pagina == "1") {
        $(".book-control-prev").addClass("hidden");
        $(".book-control-next").removeClass("hidden");
        $("#flipbook").turn(acao);
    } else {
        $(".book-control-prev").removeClass("hidden");
        $(".book-control-next").removeClass("hidden");
    }
}