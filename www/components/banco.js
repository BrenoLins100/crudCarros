// This is a JavaScript file
// This is a JavaScript file
$(document).on("click","#btnCad", function(){
    var parametros = {
        "modelo": $("#modelo").val(),
        "cor": $("#cor").val(),
        "fabricante": $("#fabricante").val(),
        "ano": $("#ano").val(),
        "valor": $("#valor").val()
    };
     $.ajax({
        type:"post",
        url:"https://crud-carros-linss2.c9users.io/cadastrar.php",
        data: parametros,
        success: function(data){
          navigator.notification.alert(data);
          $("#modelo").val("");
          $("#cor").val("");
          $("#fabricante").val("");
          $("#ano").val("");
          $("#valor").val("");
        },
        error:function(data){
          navigator.notification.alert("erro: "+data);
        }
    });

});
$(document).on("click","#btnList", function(){
  $(location).attr("href","lista.html");
});

function preencheCarros(){
  $.ajax({
        type:"post",
        url:"https://crud-carros-linss2.c9users.io/listarcarros.php",
        dataType: "json",
        success: function(data){
          var itemlista = "";
          $.each(data.carros, function(i, dados){
              itemlista += "<option value='"+dados.codigo+"'>"+dados.modelo+"</option>";
          });
          $("#lista").html(itemlista);
        },
        error:function(data){
          navigator.notification.alert("erro: "+data);
        }
    });
}

  $(document).on("change", "#lista", function(){
    var codigoSelecionado = $("option:selected", ("#lista")).val();
    $.ajax({
    type:"get",
    url:"https://crud-carros-linss2.c9users.io/listar1carro.php",
    data:"codigo="+codigoSelecionado,
    dataType:"json",
    success: function(data){
      $.each(data.carros, function(i, dados){
      $("#codigo").val(dados.codigo), 
      $("#modelo").val(dados.modelo), 
      $("#cor").val(dados.cor),
      $("#fabricante").val(dados.fabricante),
      $("#ano").val(dados.ano),
      $("#valor").val(dados.valor)
      });
    },
	error: function(data){
		navigator.notification.alert("Erro: "+data);
	}
   });
});


$(document).on("click","#btnReturn", function(){
  $(location).attr("href","index.html");
});

$(document).on("click","#delete", function(){
    var codigoSelecionado = $("option:selected", ("#lista")).val();
    $.ajax({
      type:"get",
      url:"https://crud-carros-linss2.c9users.io/deletarcarro.php",
      data:"codigo="+codigoSelecionado,
       success: function(data){
            navigator.notification.alert(data);
            location.reload();
        },
        error:function(data){
          navigator.notification.alert("erro: "+data);
        }
    });
});
//botao alterar
$(document).on("click","#btnSalva", function(){
    var parametros = {
        "codigo": $("#codigo").val(),
        "modelo": $("#modelo").val(),
        "cor": $("#cor").val(),
        "fabricante": $("#fabricante").val(),
        "ano": $("#ano").val(),
        "valor": $("#valor").val()

    };
    $.ajax({
        type:"post",
        url:"https://crud-carros-linss2.c9users.io/alterar.php",
        data: parametros,
        success: function(data){
          navigator.notification.alert(data);
          location.reload();
        },
        error:function(data){
          navigator.notification.alert("erro: "+data);
        }
    });
});

$(document).on("click","#editar", function(){
    habilita();
});
$(document).on("click","#cancelar", function(){
   desabilita();
    $("#modelo").val("");
          $("#cor").val("");
          $("#fabricante").val("");
          $("#ano").val("");
          $("#valor").val("");
});
function desabilita(){
    $("#modelo").prop('readonly',true);
    $("#cor").prop('readonly',true);
    $("#fabricante").prop('readonly',true);
    $("#ano").prop('readonly',true);
    $("#valor").prop('readonly',true);
}
function habilita(){
      $("#modelo").prop('readonly',false);
    $("#cor").prop('readonly',false);
    $("#fabricante").prop('readonly',false);
    $("#ano").prop('readonly',false);
    $("#valor").prop('readonly',false);
}
