requirejs.config({    
    paths:{    
        "jquery" : "../lib/jquery-3.4.1.min"      
    }     
});

define(['jquery', './modules/login_in'],function($,res){

    $('body').attr('class','text-center');
    $('#all').css('display','block');
    $('span').css('display','block');
    var $down= $('#sw');
    $down.on('click',function(){
        var $name = $('#inputEmail').val();
        var $pass = $('#inputPassword').val();    
        res({
            username : $name , 
            password : $pass
        })    
    })
})
