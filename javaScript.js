$(document).ready(function(){
    var color = "black";
    $('#colors input').on('click', function(){
        color = $(this).val();
        console.log(color);
    });
    
    $('#drawing-board div').not(".row").mousedown(function() {
        $(this).css("background-color", color);
        console.log(color);
    });
    $("#save").on("click", function(){
        html2canvas(document.querySelector("#drawing-board")).then(canvas => {
            var url = canvas.toDataURL();
            $("#newImg").attr("src", url);
            $('#download').attr("href", url);
        });
    });
    $("#clear").on("click", function(){
        $('#drawing-board div').not(".row").css("background-color", "white");
    });
});
