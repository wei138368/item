(function($){
    $('.name input').val(myobj.getcookie('user'))
    $('.denglu').on('click',function(){
        $.ajax({
            type: "post",
            url: "http://10.31.157.21/items/php/login.php",
            data: {
                phone:$('.name input').val(),
                password:$('.password input').val()
            },
            success: function (data) {
                if(+data){
                    if($('.remember input').prop('checked')){
                        myobj.addcookie('user',$('.name input').val(),10)
                    }else{
                        myobj.addcookie('user','',-1)
                    }
                    myobj.addcookie('check',$('.name input').val())
                    location.href='index.html';
                }else{
                    
                    alert('账号密码有误')
                }
                
            }
        });
    })






})(jQuery)