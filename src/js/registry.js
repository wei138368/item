(function ($) {
    let phoneFlag=false
    let reg = /^[1][\d]{10}$/;
    $('.userphone').on('input', function () {
        let $phone = +$('.userphone').val();
        $('.e-first').show();
        if (reg.test($phone)) {
            $.ajax({
                url: "http://10.31.157.21/items/php/zhuce.php",
                data: {
                    checkphone: $phone
                },
                dataType: "json",
                success: function (data) {
                    if (data == 1) {
                        $('.e-first').find('span').html('❌')
                        $('.e-first').css({ right: '40px', color: '#ff3f13' })
                        $('.e-first').find('i').html('该手机号码已经注册过')
                        phoneFlag=false
                    } else {
                        $('.e-first').css({ right: '110px', color: '#6bc827' })
                        $('.e-first').find('span').html('✔')
                        $('.e-first').find('i').html('输入正确')
                        phoneFlag=true
                    }
                }
            });
        } else {
            $('.e-first').css({ right: '60px', color: '#ff3f13' })
            $('.e-first').find('i').html('手机号码格式错误')
            phoneFlag=false
        }

    })
    setInterval(()=>{
        if(phoneFlag){
            $('.next').removeClass('buok');
        }else{
            $('.next').addClass('buok');
        }
    },500)
    $('.next').on('click', function () {
        if (!$('.next').hasClass('buok')) {
            $('.step1').hide()
            $('.step2').show()
            $('.s2').addClass('active').siblings().removeClass('active')
        }
    })

    // 第二步
    let num = 0;
    let passFlag = false;
    let repassFlag = false;
    $('.password').on('focus', function () {
        $('.e-mima').show();
        if ($('.password').val().length < 6) {
            $('.e-mima i').html('密码不能低于6位数')
            $('.e-mima span').html('❌');
            $('.e-mima').css({ color: '#ff3f13', right: '125px' })
        }
        $('.password').on('input', function () {
            num = 0;
            if ($('.password').val().match(/[a-z0-9]/)) {
                num++
            }
            if ($('.password').val().match(/[A-Z]/)) {
                num++
            }
            if ($('.password').val().match(/[\W_]/)) {
                num++
            }
            switch (num) {
                case 0: $('.e-mima i').html('密码不能低于6位数');
                    $('.e-mima span').html('❌');
                    $('.e-mima').css({ color: '#ff3f13', right: '125px' }); break;
                case 1: $('.e-mima i').html('密码强度弱');
                    $('.e-mima span').html('❌');
                    $('.e-mima').css({ color: '#ff3f13', right: '160px' }); break;
                case 2: $('.e-mima i').html('密码强度中')
                    $('.e-mima span').html('√');
                    passFlag = true
                    $('.e-mima').css({ color: '#orange', right: '160px' }); break;
                case 3: $('.e-mima i').html('密码强度强')
                    $('.e-mima span').html('√');
                    $('.e-mima').css({ color: '#6bc827', right: '160px' }); break;
            }
        })

    })
    $('.password').on('blur', function () {
        if ($('.password').val().length < 6) {
            $('.e-mima i').html('密码不能低于6位数')
            $('.e-mima span').html('❌');
            $('.e-mima').css({ color: '#ff3f13', right: '125px' })
            passFlag = false
        } else {
            if (num == 2 || num == 3) {
                $('.e-mima span').html('√')
                $('.e-mima').css({ color: '#6bc827', right: '160px' });
                passFlag = true
                $('.repass').focus()
            } else if (num == 1) {
                $('.e-mima i').html('密码强度太弱，请重新设置')
                $('.e-mima span').html('❌');
                $('.e-mima').css({ color: '#ff3f13', right: '85px' })
                passFlag = false
            } else if (num == 0) {
                $('.e-mima i').html('密码不能为空')
                $('.e-mima span').html('❌');
                $('.e-mima').css({ color: '#ff3f13', right: '160px' });
                passFlag = false
            }
        }
    })


    // 密码确认
    $('.repass').on('focus', function () {
        $('.e-remima').show();
        if ($('.repass').val() == '') {
            $('.e-remima span').html('❌');
            $('.e-remima i').html('请再次输入密码')
            $('.e-remima').css({ color: '#ff3f13', right: '125px' });
        } else {
            if ($('.repass').val() == $('.password').val()) {
                $('.e-remima span').html('√')
                $('.e-remima i').html('输入正确 ')
                $('.e-remima').css({ color: '#6bc827', right: '160px' });
                repassFlag = true;
            } else {
                $('.e-remima i').html('输入有误')
                $('.e-remima span').html('❌');
                $('.e-remima').css({ color: '#ff3f13', right: '160px' });
            }
        }
        $('.repass').on('input', function () {
            if ($('.repass').val().length < 6) {
                $('.e-remima i').html('密码有误')
                $('.e-remima span').html('❌');
                $('.e-remima').css({ color: '#ff3f13', right: '160px' });
            } else {
                if ($('.repass').val() == $('.password').val()) {
                    $('.e-remima span').html('√')
                    $('.e-remima i').html('输入正确 ')
                    $('.e-remima').css({ color: '#6bc827', right: '160px' });
                    repassFlag = true;
                } else {
                    $('.e-remima i').html('输入有误')
                    $('.e-remima span').html('❌');
                    $('.e-remima').css({ color: '#ff3f13', right: '160px' });
                }
            }
        })
    })
    $('.repass').on('blur', function () {
        if ($('.repass').val().length < 6) {
            $('.e-remima i').html('密码有误')
            $('.e-remima span').html('❌');
            $('.e-remima').css({ color: '#ff3f13', right: '160px' });
            repassFlag = false;
        } else {
            if ($('.repass').val() == $('.password').val()) {
                $('.e-remima span').html('√')
                $('.e-remima').css({ color: '#6bc827', right: '160px' });
                repassFlag = true;
            } else {
                $('.e-remima i').html('输入有误')
                $('.e-remima span').html('❌');
                $('.e-remima').css({ color: '#ff3f13', right: '160px' });
                repassFlag = false;
            }
        }
    })
    setInterval(() => {
        if (passFlag && repassFlag) {
            $('.submit').removeClass('buok');
        } else {
            $('.submit').addClass('buok');
        }
    }, 500);
    $('.submit').on('click', function () {
        if (!$('.submit').hasClass('buok')) {
            $.ajax({
                type: "post",
                url: "http://10.31.157.21/items/php/zhuce.php",
                data: {
                    phone: $('.userphone').val(),
                    password: $('.password').val()
                },
                success: function (data) {
                    $('.step2').hide()
                    $('.step3').show()
                    $('.s3').addClass('active').siblings().removeClass('active');
                    let time=5;
                    setInterval(()=>{
                        time--
                        $('.jump').html(time)
                        if(time<1){
                            location.href='login.html'
                        }
                    },1000)
                }
            });
        }
    })

    $('.shopcar').on('click',function(){
        if(myobj.getcookie('check')){
            location.href='shopcar.html'
        }else{
            alert('请先登录')
        }
    })

})(jQuery);



(function($){
    if(myobj.getcookie('check')){
        let user=myobj.getcookie('check');
        $('.tuichu span').html(user+'，你好 ')
        $('#login').hide();
        $('.tuichu').css('display','inline-block');
    }
    $('.tuichu a').on('click',function(){
        myobj.addcookie('check','',-1)
        $('.tuichu').hide();
        $('#login').css('display','inline-block');
    })
})(jQuery)