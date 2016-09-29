var consoleError = console.error;
console.error = function () {
	var message = [].join.call(arguments, " ");
	$("#console").text(message);
	consoleError.apply(console, arguments);
};

var editor = CodeMirror.fromTextArea(document.getElementById("arduiCode"), {
    lineNumbers: true,
	mode: "text/x-c++src",
	theme: "monokai"
});

var editor2 = CodeMirror.fromTextArea(document.getElementById("duckyScript"), {
    lineNumbers: true,
	mode: "text/vbscript",
	theme: "monokai"
});

$(function() { // Wait for jQuery
  Duck = new Duckuino();

  $("#compileThis").click(function(e) {
  	  console.clear();
  	  $('#console').html('&nbsp;');
  	  editor.getDoc().setValue(Duck.compile(editor2.getValue()));
  });
});

// Download button
$("#download").click(function() {
	var payloadValue = editor.getValue();
	var payloadName = $("#payloadName").val();
	if(payloadValue == undefined || payloadValue == '' || payloadValue == 'Error, look at the console console...' || payloadName == '' || payloadName == undefined){
		alert("Download Error: The payload or payload name are empty!");
		return;
	}
  // create `a` element
  $("<a />", {
      // if supported , set name of file
      download: payloadName + ".ino",
      // set `href` to `objectURL` of `Blob` of `textarea` value
      href: URL.createObjectURL(
        new Blob([editor.getValue()], {
          type: "text/plain"
        }))
    })
    // append `a` element to `body`
    // call `click` on `DOM` element `a`
    .appendTo("body")[0].click();
    // remove appended `a` element after "Save File" dialog,
    // `window` regains `focus` 
    $(window).one("focus", function() {
      $("a").last().remove()
    })
})