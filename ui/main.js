console.log('Loaded!');
var input = $("wordInput").val();

$("input").on("keyup", name);
name();

function name(){
  $("#word").empty();
  var chars = $("input").val().split("");
  for (var i = 0; i < chars.length; i++){
    var inputLetter = chars[i].toLowerCase();
      var $elementLetter = $("<div>");
      $elementLetter.addClass("letter letter--" + inputLetter).appendTo("#word");
      for (j = 0; j < 15; j++){
        $("<div class='box'>").appendTo($elementLetter)
      }
  }
}