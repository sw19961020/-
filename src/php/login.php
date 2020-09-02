<?php

    require_once('./connect.php');

    $data_username = $_REQUEST['username'];

    $data_password = $_REQUEST['password'];

    $sql = "select * from sw where username='{$data_username}'";

    $query = mysqli_query($con,$sql);

    if($query && $query->num_rows){

        $sql = "select * from sw where username='{$data_username}' and password='{$data_password}'";

        $query = mysqli_query($con,$sql);

        if($query && $query->num_rows){
            echo '{"code" : 1 , "message" : "登录成功"}';
        }
        else{
            echo '{"code" : 0 , "message" : "密码错误"}';
        }  
    }
    else{
        echo '{"code" : 0 , "message" : "用户名错误"}';
    }

    mysqli_close($con);
?>