define(['jquery'] ,function($){
    function response_res(options){
        var $options = Object.assign({
            username : '',
            password : ''
        },options);

        $.ajax({
            url : '/api2/login.php',        //-->http://localhost/api2/login.php
            data : {'username' : $options.username , 'password' : $options.password } ,
            // data : $options ,
            dataType: "json",
            success(res){
                var obj = res;
                if(obj.code){
                    alert(obj.message);
                    console.log(res);
                    window.location.href = '/view/index.html';
                }
                else{
                    console.log(res);
                    alert(obj.message);
                }
            }
        });
    }
    return response_res;
})