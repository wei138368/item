// fixed
(function($){
    $(window).scroll(function(){
        if($(this).scrollTop()>200){
            $('.top-fix').show()
        }else{
            $('.top-fix').hide()
        }
    })
})(jQuery);


// 左边TAB切换
(function ($) {
    $('.left-tab-list li').hover(function () {
        $('.second-left-tab-list').show();
        $('.left-tab-part').hide()
        $('.left-tab-part').eq($(this).index()).show()
    }, function () {
        $('.second-left-tab-list').hover(function () {
            $('.second-left-tab-list').show();
        }, function () {
            $('.second-left-tab-list').hide();
        })
        $('.second-left-tab-list').hide();
    })
})(jQuery);


// 下边广告tab切换
(function ($) {
    let num = -1;
    let flag = true;
    let timer = setInterval(() => {
        if (flag) {
            num++
        } else {
            num--
        }
        let $div = $('.add-tab').find('div')
        $div.each(function (index, value) {
            $(value).animate({
                top: (index - num) * 77
            })
        })
        if (num === 0) {
            flag = true;
        } else if (num === 2) {
            flag = false;
        }
    }, 4000);
})(jQuery);



// 右侧tab切换1
(function ($) {
    let $li = $('.tab1-title').find('li');
    let $ul = $('.tab1-notic').find('ul');
    let timer = null
    $li.on('mouseover', function () {
        timer = setTimeout(() => {
            $(this).css({
                borderBottom: '2px solid #F40',
                fontWeight: 700
            }).siblings().css({
                borderBottom: 'none',
                fontWeight: 'normal'
            })
            $ul.eq($(this).index()).show().siblings().hide()
            
        }, 200);
    })
    $li.on('mouseout', function () {
        clearTimeout(timer)
    })
})(jQuery);


// 右侧tab切换2
(function ($) {
    let $li = $('.right-tab2-s')
    let $box = $('.tab2-box')
    let $span = $('.tab2-1 span')
    let $inner = $('.tab2-box>div')
    $span.each(function (index, value) {
        $(value).css({
            backgroundPosition: `0 -${index * 44}px`
        })
    })

    $li.on('mouseover', function () {
        $li.css({
            border: '1px solid #f4f4f4',
            borderLeftColor: 'transparent',
            borderTopColor: 'transparent'
        })
        $(this).css({
            borderColor: '#F40',
            borderBottomColor: '#fff'
        })
        $box.show().css({
            borderColor: '#F40'
        })
        $inner.hide();
        $inner.eq($(this).index()).show()
    })
    $('.tab2-box a').on('click', function () {
        $box.hide();
        $li.css({
            border: '1px solid #f4f4f4',
            borderLeftColor: 'transparent',
            borderTopColor: 'transparent'
        })
    })
})(jQuery);

//  轮播图111
(function ($) {
    class lunbo {
        constructor() {
            this.$oLi = $('.banner1 ol').find('li')
            this.$ul=$('.banner1 ul')
            this.num = 0;
            this.timer = null;
        }
        init() {
            let last = $('.banner1 ul li:last-child').clone()
            $('.banner1 ul li:first-child').clone().appendTo(this.$ul)
            last.prependTo($('.banner1 ul'));
            this.$ul.width($('.banner1 ul li:first-child').width() * $('.banner1 ul li').length);
            this.$ul.css({ left: -$('.banner1 ul li:first-child').width() });
            this.point()
            this.hover()
            this.right()
            this.left()
            this.timer = setInterval(function () {
                $('#banner1-right').click()
            }, 2000)
            
        }
        point() {
            let _this = this;
            this.$oLi.on('click', function () {
                _this.num = $(this).index()
                $(this).addClass('active').siblings().removeClass('active');
                $('.banner1 ul').animate({ left: -$('.banner1 ul li:first-child').width() * (_this.num + 1) });
            })
        }
        hover() {
            let _this = this
            $('.banner1').hover(function () {
                $('#banner1-left,#banner1-right').show()
                clearInterval(_this.timer)
            }, function () {
                $('#banner1-left,#banner1-right').hide()
                _this.timer = setInterval(function () {
                    $('#banner1-right').click()
                }, 2000)
            })
        }
        right() {
            let _this = this;
            $('#banner1-right').on('click', function () {
                _this.num++
                if (_this.num > 4) {
                    _this.$ul.animate({ left: -$('.banner1 ul li:first-child').width() * (_this.num + 1) }, 300, function () {
                    _this.$ul.css({ left: -$('.banner1 ul li:first-child').width() })
                    });
                    _this.num = 0
                    $(_this.$oLi).eq(_this.num).addClass('active').siblings().removeClass('active');
                } else {
                    _this.$ul.animate({ left: -$('.banner1 ul li:first-child').width() * (_this.num + 1) }, 300);
                    $(_this.$oLi).eq(_this.num).addClass('active').siblings().removeClass('active');
                }
            })
        }
        left() {
            let _this = this;
            $('#banner1-left').on('click', function () {
                _this.num--
                if (_this.num < 0) {
                    _this.$ul.animate({ left: -$('.banner1 ul li:first-child').width() * (_this.num + 1) }, 300, function () {
                        _this.$ul.css({ left: -$('.banner1 ul li:first-child').width() * ($('.banner1 ul li').length - 2) })
                    });
                    _this.num = 4
                    $(_this.$oLi).eq(_this.num).addClass('active').siblings().removeClass('active');
                } else {
                    _this.$ul.animate({ left: -$('.banner1 ul li:first-child').width() * (_this.num + 1) }, 300);
                    $(_this.$oLi).eq(_this.num).addClass('active').siblings().removeClass('active');
                }
            })
        }
    }
    new lunbo().init()
})(jQuery);




//  轮播图222
(function ($) {
    class lunbo {
        constructor() {
            this.$foot = $('.banner2-foot').find('li')
            this.$ul=$('.banner2-inner ul')
            this.num = 0;
            this.timer = null;
        }
        init() {
            let last = $('.banner2-inner ul li:last-child').clone()
            $('.banner2-inner ul li:first-child').clone().appendTo(this.$ul)
            last.prependTo($('.banner2-inner ul'));
            this.$ul.width($('.banner2-inner ul li:first-child').width() * $('.banner2-inner ul li').length);
            this.$ul.css({ left: -$('.banner2-inner ul li:first-child').width() });
            this.point()
            this.hover()
            this.right()
            this.left()
            this.timer = setInterval(function () {
                $('#banner2-right').click()
            }, 2500)
        }
        point() {
            let _this = this;
            this.$foot.on('click', function () {
                _this.num = $(this).index()
                $(this).addClass('select').siblings().removeClass('select');
                $('.banner2-inner ul').animate({ left: -$('.banner2-inner ul li:first-child').width() * (_this.num + 1) });
                $('.banner2-head i').html(_this.num+1)
            })
        }
        hover() {
            let _this = this
            $('.banner2').hover(function () {
                $('#banner2-left,#banner2-right').show()
                clearInterval(_this.timer)
            }, function () {
                $('#banner2-left,#banner2-right').hide()
                _this.timer = setInterval(function () {
                    $('#banner2-right').click()
                }, 2500)
            })
        }
        right() {
            let _this = this;
            $('#banner2-right').on('click', function () {
                _this.num++
                if (_this.num > 5) {
                    _this.$ul.animate({ left: -$('.banner2-inner ul li:first-child').width() * (_this.num + 1) }, 300, function () {
                    _this.$ul.css({ left: -$('.banner2-inner ul li:first-child').width() })
                    });
                    _this.num = 0
                    $(_this.$foot).eq(_this.num).addClass('select').siblings().removeClass('select');
                } else {
                    _this.$ul.animate({ left: -$('.banner2-inner ul li:first-child').width() * (_this.num + 1) }, 300);
                    $(_this.$foot).eq(_this.num).addClass('select').siblings().removeClass('select');
                }
                $('.banner2-head i').html(_this.num+1)
            })
        }
        left() {
            let _this = this;
            $('#banner2-left').on('click', function () {
                _this.num--
                if (_this.num < 0) {
                    _this.$ul.animate({ left: -$('.banner2-inner ul li:first-child').width() * (_this.num + 1) }, 300, function () {
                        _this.$ul.css({ left: -$('.banner2-inner ul li:first-child').width() * ($('.banner2-inner ul li').length - 2) })
                    });
                    _this.num = 5
                    $(_this.$foot).eq(_this.num).addClass('select').siblings().removeClass('select');
                } else {
                    _this.$ul.animate({ left: -$('.banner2-inner ul li:first-child').width() * (_this.num + 1) }, 300);
                    $(_this.$foot).eq(_this.num).addClass('select').siblings().removeClass('select');
                }
                $('.banner2-head i').html(_this.num+1)
            })
        }
    }
    new lunbo().init()
})(jQuery);


//渲染
(function($){
    $.ajax({
        url:'http://10.31.157.21/items/php/list.php',
        dataType:'json'
    }).done(function(data){
        let $strhtml='<ul>';
        $.each(data,function(index,value){
            $strhtml+=`
            <li>
            <a href="detail.html?sid=${value.sid}"><img src="${value.url}" alt=""></a>
            <p>${value.title}</p>
            <div>评论${value.discuss}</div>
            <a href="#"><em>￥</em><span>${value.price}</span></a>
            <a class="right" href="#"><i>月销${value.sellnum}笔</i></a>
        </li>
            `;
        });
        $strhtml+='</ul>';
        $('.hot-list').html($strhtml);
    })
})(jQuery);

(function($){
    let user=myobj.getcookie('check');
    if(myobj.getcookie('check')){       
        $('.tuichu span').html(user+'，你好 ')
        $('#login').hide();
        $('.tuichu').css('display','inline-block');
        $('.member-top>span').html('Hi! '+user);
        $('.tb-tu img').attr('src','https://wwc.alicdn.com/avatar/getAvatar.do?userNick=wei138368&width=50&height=50&type=sns&_input_charset=UTF-8')
        $('.member-ft').hide()
        $('.ft-login').show()
        if (myobj.getcookie('cookieNum')) {
            let numarr = myobj.getcookie('cookieNum').split(',');
            let num = 0
            $(numarr).each(function (index, value) {
                num += parseInt(value)
            })
            $('.shopcar i').html(num)
        }
    }
    $('.tuichu a').on('click',function(){
        myobj.addcookie('check','',-1)
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
    $(window).on('scroll',function(){
       if($(document).scrollTop()>550){
        $(".floor").css({
            position:'fixed',
            top:'55px'
        })
       }else{
        $(".floor").css({
            position:'absolute',
            top:'595px'
        })
       }
       $('main>div').each(function(index,value){
        if($('html').scrollTop()>=$(value).offset().top-80 && $('html').scrollTop()<=$(value).offset().top+$(value).height()+20){
            $('.floor li').eq(index).addClass('hover').siblings().removeClass('hover')
        }
        
       })   
    })
    $('.floor li').on('click',function(){
        if($(this).index()<3){
            $('html').animate({scrollTop:$('main>div').eq($(this).index()).offset().top-58})
        }else if($(this).index()==5){
            $('html').animate({scrollTop:0})
        }
    })
})(jQuery);





