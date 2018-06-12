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
            
            $(".row"+j).append("<div class='clickable' id='div"+ j+k + "'></div>");
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
        //testing symetry
        let clickedDivId = $(this).attr("id");
        let row=Number($(this).parent().attr("class").slice(3));
        let divIdNumber = Number(clickedDivId.slice(4));
        let slicedId=clickedDivId.slice(0,4);
        if(row>=10){
            slicedId=clickedDivId.slice(0,5);
            divIdNumber=Number(clickedDivId.slice(5));}
        // slicedId+divIdNumber is div id of clicked element
        let targetId=xValue-1-divIdNumber;
        console.log("first part: ",slicedId," second part: ",divIdNumber, " target id: ", targetId);
        if($('#symetryToggle').is(':checked')){
        $("#"+slicedId+targetId).css("background-color", color);}
        
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
