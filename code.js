$(function(){
    $("#color").change(function(){
        $("#paintcircle").css("background-color", $(this).val());
    });
    erase=0
    mouse={x:0,y:0};
    paint=0;
    var canvas=document.getElementById('canvas');
    var ctx=canvas.getContext('2d');
    ctx.lineWidth=3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    var container=$('.canvascontain')
    if(localStorage.getItem("imgCanvas") != null){
        var img = new Image();
        img.onload = function(){
        ctx.drawImage(img, 0, 0);   
        }
        img.src = localStorage.getItem("imgCanvas");
    };
    container.mousedown(function(e){
        paint=1;
        ctx.beginPath();
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        ctx.moveTo(mouse.x, mouse.y);
        

    })
    container.mousemove(function(e){
        if(paint==1){
            if(erase==0){
                ctx.strokeStyle=$('#color').val();
            
            }
            else if(erase==1){
                ctx.strokeStyle="white";
            }
            mouse.x=e.pageX-this.offsetLeft;
            mouse.y=e.pageY-this.offsetTop;
            ctx.lineTo(mouse.x,mouse.y);
            
            ctx.stroke();
            
        }
    })
    container.mouseup(function(){
        paint=0;
    })
    container.mouseleave(function(){
        paint=0;
    })
    $('#erase').click(function(){
        if(erase==0){
            erase=1;
            $('#erase').css('backgroundColor','red');
            $('#erase').css('color','white');
        }
        else if(erase==1){
            erase=0;
            $('#erase').css('backgroundColor','');
            $('#erase').css('color','');
        }
    })
    $("#reset").click(function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        erase=0;
        $('#erase').css('backgroundColor','');
        $('#erase').css('color','');

    });
    $("#save").click(function(){
        if(typeof(localStorage) != null){
              localStorage.setItem("imgCanvas", canvas.toDataURL());
              window.alert('Your drawing has been saved.') 
        }else{
            window.alert("Your browser does not support local storage!");   
        }
    });
    $('#slider').slider({
        min:3,
        max:30,
        slide:function(event,ui){
            $('#paintcircle').height(ui.value)
            $('#paintcircle').width(ui.value)
            ctx.lineWidth = ui.value;
        }
    })
})