$(document).ready(function(){
    var color = "black";
    $('#colors input').on('click', function(){
        color = $(this).val();
    });
    $("#drawing_board").on('mousedown', ".clickable", function(){
        $(this).css("background-color", color);
    });
    $("#save").on("click", function(){
        html2canvas(document.querySelector("#drawing_board")).then(canvas => {
            var url = canvas.toDataURL();
            $("#newImg").attr("src", url);
            $('#download').attr("href", url);
        });
    });
    $("#clear").on("click", function(){
        $('.clickable').css("background-color", "white");
    });
    let box_size = 15;
    let selectValues=[10,5];
    let xValue = selectValues[0];
    let yValue = selectValues[1];
    $("#box_size").on("change", function(){
        box_size = this.value.slice(0,-2);
        console.log(box_size);
        $(".clickable").css("height", box_size+"px");
        $(".clickable").css("width", box_size+"px");
        $(".row").css("height", box_size+"px");
        $(".row").css("min-width", xValue*box_size+"px");
        $("#drawing_board").css("min-width",(xValue*box_size+50)+"px");
        $("main").css("min-width",(xValue*box_size+100)+"px");
    });
    $('#grid_size').on('change', function() {
        $("#drawing_board").empty();
        
        selectValues=this.value.split("x");
        xValue = Number(selectValues[0]);
        yValue = Number(selectValues[1]);
        console.log(box_size);
        for(let i=0;i<=yValue;i++){
            $("#drawing_board").append("<div class='row'> </div>");
        };
        for (let j=0;j<=xValue;j++){
            $(".row").append("<div class='clickable'></div>");
        };
        $(".clickable").css("height", box_size+"px");
        $(".clickable").css("width", box_size+"px");
        $(".row").css("height", box_size+"px");
        $(".row").css("min-width", xValue*box_size+"px");
        $("#drawing_board").css("min-width",(xValue*box_size+50)+"px");
        $("main").css("min-width",(xValue*box_size+100)+"px");
        console.log(box_size);
      });
});
