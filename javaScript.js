$(document).ready(function(){
    let color = "black";
    let box_size = 15;
    let selectValues=[10,5];
    let xValue = selectValues[0];
    let yValue = selectValues[1];
    function boxSizing(box_size,xValue){
        $(".clickable").css("height", box_size+"px");
        $(".clickable").css("width", box_size+"px");
        $(".row").css("height", box_size+"px");
        $(".row").css("min-width", xValue*box_size+"px");
        $("#drawing_board").css("min-width",(xValue*box_size+50)+"px");
        $("main").css("min-width",(xValue*box_size+100)+"px");
    };
    function gridMaker(){
        for(let i=0;i<yValue;i++){
            $("#drawing_board").append("<div class='row"+i+"'> </div>");
        };
        for (let j=0;j<yValue;j++){
            for(let k=0;k<xValue;k++){
            
            $(".row"+j).append("<div class='clickable "+ j+k + "'></div>");
            //console.log("k: ", k);
            };   
        //console.log("j: ", j);
        };
        boxSizing(box_size,xValue);
    };
    gridMaker();

    $("#color_picker").on("change",function(){
        color=$("#color_picker").val();
        //console.log(color);
    });
    $('#colors input').on('click', function(){
        color = $(this).val();
    });
    
    $("#drawing_board").on('mousedown', ".clickable", function(){
        
        $(this).css("background-color", color);
        let row=Number($(this).parent().attr("class").slice(3));
        let clickedClassNumber =$(this).attr("class").slice(10);
        let firstNumber=clickedClassNumber.substring(0,1);
        let lastNumber=clickedClassNumber.substring(1);
        if(row>=10){
            firstNumber=clickedClassNumber.substring(0,2);
            lastNumber=clickedClassNumber.substring(2);
        }
        let targetClass=xValue-1-lastNumber;
        let target=("."+(firstNumber+targetClass));
        if($('#symetryToggle').is(':checked')){
            $(target).last().css("background-color", color);
        }
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
    $("#box_size").on("change", function(){
        box_size = this.value.slice(0,-2);
        //console.log(box_size);
        boxSizing(box_size,xValue);   
    });
    $('#grid_size').on('change', function() {
        $("#drawing_board").empty();
        selectValues=this.value.split("x");
        xValue = Number(selectValues[0]);
        yValue = Number(selectValues[1]);
        //console.log(box_size);
        gridMaker();
        boxSizing(box_size,xValue);
        //console.log(box_size);
        if($('#circle').is(':checked')){
            $(".clickable").css("border-radius", "50%");
        }else{
            $(".clickable").css("border-radius", "0");
        }
      });
    $("#circle").on("click", function(){
        $(".clickable").css("border-radius", "50%");
    });
    $("#square").on("click", function(){
        $(".clickable").css("border-radius", "0");
    });
});
