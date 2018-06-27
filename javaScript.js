$(document).ready(function(){
    let color = "black";
    let box_size = 15;
    let selectValues=[10,5];
    let xValue = selectValues[0];
    let yValue = selectValues[1];
    
    function boxSizing(box_size,xValue){
        $(".clickable").css("height", box_size+"px");
        $(".clickable").css("width", box_size+"px");
        $("#drawing_board").css("min-width",(xValue*box_size+50)+"px");
        $("#renderedImage").css("min-width",(xValue*box_size+50)+"px");
        $("main").css("min-width",(xValue*box_size+100)+"px");
        $('div[class*="row"]').css("height", box_size+"px");
        $('div[class*="row"]').css("min-width", xValue*box_size+"px");
    };
    function gridMaker(){
        $("#drawing_board").empty();
        for(let i=0;i<yValue;i++){
            $("#drawing_board").append("<div class='row"+i+"'> </div>"); 
        };
        for (let j=0;j<yValue;j++){
            for(let k=0;k<xValue;k++){
            $(".row"+j).append("<div class='clickable "+ j+k + "'></div>");
            };   
        };
        boxSizing(box_size,xValue);
        
    };
    
    gridMaker();
  
    $("#color_picker").on("change",function(){
        color=$("#color_picker").val();
        
    });
    $('#colors input').on('click', function(){
        color = $(this).val();
        console.log(color);
        $("#color_picker").val(color);
        $("#colors input").css("border-radius","0%");
        $(this).css("border-radius", "40%");
    });
    
    $("#drawing_board").on('mousedown touchstart', ".clickable", function(){
        let down=true;
        
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
            if (row<10){
                $(target).first().css("background-color", color);
            }else{
                $(target).last().css("background-color", color);
            }
        };    
        $("#drawing_board").on('mouseup touchend', ".clickable", function(){
            down=false;
        });
        $("#drawing_board").on('mousemove', ".clickable",function(){
            if(down==true) {
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
                    if(row<10){
                        $(target).first().css("background-color", color);
                    }else{
                        $(target).last().css("background-color", color);
                    }
                };
            };  
        });
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
        boxSizing(box_size,xValue);   
    });
    $('#grid_size').on('change', function() {
        selectValues=this.value.split("x");
        xValue = Number(selectValues[0]);
        yValue = Number(selectValues[1]);

        gridMaker();
        boxSizing(box_size,xValue);

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
    $("#settingsButton").on("click",function(){
        
        if($("#settings").css("left")=="0px"){
            $("#settingsButton").animate({rotation: 0},{
                duration: 500,
                step: function(now, fx) {
                $(this).css({"transform": "rotate("+now+"deg)"});}
            });
            $("#settings").animate({left: '-250px'});
            
        }else{ 
            $("#settingsButton").animate({rotation: 360},{
                duration: 500,
                step: function(now, fx) {
                $(this).css({"transform": "rotate("+now+"deg)"});}
            });
            $("#settings").animate({left: '0px'});}
    });
});
