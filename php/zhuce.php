<?php
require "conn.php";

if(isset($_POST['phone'])){
    $phone=$_POST['phone'];
    $pass=sha1($_POST['password']);//加密
    //添加数据库
    $conn->query("insert register values(null,'$phone','$pass',NOW())");
    echo '1';
    //php的跳转
    // header('location:http://localhost/weizhongHTML1907/html1907second/day23/loginregisterwei/src/login.html');
    // header('location:http://localhost/items/src/register.html');

}





//检测用户名
 if(isset($_GET['checkphone'])){
    $phone=$_GET['checkphone'];
    //通过查询方式来测试是否存在用户名。
    $result=$conn->query("select * from register where phone='$phone'");
    if($result->fetch_assoc()){//存在
        echo '1';//1
    }else{//不存在
        echo '0';//空隙
    }

 }