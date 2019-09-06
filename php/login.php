<?php

require "conn.php";

if(isset($_POST['phone']) && isset($_POST['password'])){
    $phone=$_POST['phone'];
    $password=sha1($_POST['password']);
    $result=$conn->query("select * from register where phone='$phone' and password='$password' ");
    if($result->fetch_assoc()){//匹配成功
        echo 1;
    }else{
        echo 0;
    }

}