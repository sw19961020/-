define(['jquery'] ,function($){
    function res(options){
        var $options = Object.assign({
            username : '',
            password : ''
        },options);

        console.log($options);
        $.ajax({
            url : '../../php/login.php',
            data : {'username' : $options.username , 'password' : $options.password } ,
            // data : $options ,
            dataType: "json",
            success(res){
                var obj = res;
                if(obj.code){
                    alert(obj.message);
                    console.log(res);
                    window.location.href = '../../view/index.html';
                }
                else{
                    console.log(res);
                    alert(obj.message);
                }
            }
        });
    }
    return res;
})