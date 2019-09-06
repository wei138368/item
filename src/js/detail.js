

// 数据渲染

(function ($) {
    let $sid = location.search.split('=')[1];
    let sidarr = [];
    let numarr = [];
    $.ajax({
        url: "http://10.31.157.21/items/php/getdata.php",
        data: {
            sid: $sid
        },
        dataType: "json",
        success: function (d) {
            $('.spic img').attr('src', d.url);
            $('.bpic').attr('src', d.url);

            $('.detail-middle>h3').html(d.title);
            $('.rel-price').html(d.price);
            $('.price-part del i').html(+d.price + 100);
            $('.discuss>p').html(d.discuss);
            $('.sellnum>p').html(d.sellnum);
            let $smallpic = d.urls.split(',');
            let $htmlstr = ''
            $.each($smallpic, function (index, value) {
                $htmlstr += `
                <li>
                    <img src="${value}" />
                </li>
            `;
            });
            $('.goodslist').html($htmlstr);
        }
    });
    $('.jian').on('click', function () {
        let num = $(this).next('input').val()
        if (num > 1) {
            num--
        } else {
            num = 1
        }
        $(this).next('input').val(num)
    })
    $('.jia').on('click', function () {
        let num = $(this).prev('input').val()
        num++
        $(this).prev('input').val(num)
    })
    $('.add input').on('blur',function(){
        if($('.add input').val()==''){
            $('.add input').val(1)
        }
    })


    $('.buy').on('click', function () {
        alert('有钱吗你就买啊')
    })

    $('.incar').on('click', function () {
        if (!myobj.getcookie('check')){
            alert('请先登录')
            return false
        }
        let num = 0
        if (myobj.getcookie('cookieNum') && myobj.getcookie('cookieSid')) {
            sidarr = myobj.getcookie('cookieSid').split(',')
            numarr = myobj.getcookie('cookieNum').split(',')
        }
        if (sidarr.indexOf($sid) !== -1) {
            numarr[sidarr.indexOf($sid)] = +numarr[sidarr.indexOf($sid)] + parseInt($('.add input').val())
            myobj.addcookie('cookieNum', numarr.toString(), 10)
        } else {
            sidarr.push($sid);
            numarr.push(parseInt($('.add input').val()))
            myobj.addcookie('cookieSid', sidarr.toString(), 10)
            myobj.addcookie('cookieNum', numarr.toString(), 10)
            
        }
        $(numarr).each(function (index, value) {
            num += parseInt(value)
        })
        $('.shopcar i').html(num)
        alert('添加成功')
        $('.add input').val(1)

    })

})(jQuery);

// 放大镜
(function ($) {
    class scale {
        constructor() {
            this.wrap = $('.wrap');
            this.spic = $('.spic');
            this.bpic = $('.bpic');
            this.sf = $('.sf');
            this.bf = $('.bf');
            this.list = $('.list');
            this.num = 6
        }
        init() {
            this.hover();
            let w = this.spic.width() * this.bf.width() / this.bpic.width();
            $('.sf').width(w);
            let h = this.spic.height() * this.bf.height() / this.bpic.height();
            $('.sf').height(h)
            this.move()
            this.changePic()
        }
        hover() {
            this.spic.hover(function () {
                $('.bf,.sf').show()
            }, function () {
                $('.bf,.sf').hide()
            })
        }
        move() {
            let _this = this
            $(document).on('mousemove', function (ev) {
                var ev = ev || event;
                let l = ev.pageX - _this.sf.width() / 2;
                let t = ev.pageY - _this.sf.height() / 2;
                if (l <= _this.spic.offset().left) {
                    l = _this.spic.offset().left
                } else if (l >= _this.spic.offset().left + _this.spic.width() - _this.sf.width() + 1) {
                    l = _this.spic.offset().left + _this.spic.width() - _this.sf.width() + 1
                }
                if (t <= _this.spic.offset().top) {
                    t = _this.spic.offset().top
                } else if (t >= _this.spic.offset().top + _this.spic.height() - _this.sf.height() + 1) {
                    t = _this.spic.offset().top + _this.spic.height() - _this.sf.height() + 1
                }
                _this.sf.offset({ left: l, top: t })
                let p = _this.bpic.width() / _this.spic.width();
                let bl = (l - _this.spic.offset().left) * p
                let bt = (t - _this.spic.offset().top) * p
                _this.bpic.css({ 'left': -bl, 'top': -bt })
            })
        }
        changePic() {
            let _this = this
            $('.goodslist').on('mouseover', function (ev) {
                if (ev.target.nodeName == 'IMG') {
                    let $src = $(ev.target).attr('src');
                    let $a = $(ev.target).parent()
                    _this.spic.find('img').attr('src', $src)
                    _this.bpic.attr('src', $src)
                    $a.css({
                        borderColor: '#f40'
                    }).siblings().css({
                        borderColor: '#fff'
                    })
                }

            })
        }
    }
    new scale().init()
})(jQuery);

(function ($) {
    if (myobj.getcookie('check')) {
        let user = myobj.getcookie('check');
        $('.tuichu span').html(user + '，你好 ')
        $('#login').hide();
        $('.tuichu').css('display', 'inline-block');
        if (myobj.getcookie('cookieNum')) {
            let numarr = myobj.getcookie('cookieNum').split(',');
            let num = 0
            $(numarr).each(function (index, value) {
                num += parseInt(value)
            })
            $('.shopcar i').html(num)
        }
    }
    $('.tuichu a').on('click', function () {
        myobj.addcookie('check', '', -1)
        $('.tuichu').hide();
        $('#login').css('display', 'inline-block');
        $('.shopcar i').html(0)
    })


    $('.shopcar').on('click', function () {
        if (myobj.getcookie('check')) {
            location.href = 'shopcar.html'
        } else {
            alert('请先登录')
        }
    })
    

})(jQuery)







