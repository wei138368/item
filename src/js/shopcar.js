(function($){
class shop{
    constructor(){
        this.sidarr=[];
        this.numarr=[]
    }
    init(){
        let _this=this;
        this.cookie();
        $(this.sidarr).each(function (index, value) {
            _this.goodlist(_this.sidarr[index], _this.numarr);
        });
        this.jian()
        this.jia()
        this.gai()
        this.del()
        
        

    }
    cookie(){
        if (myobj.getcookie('cookieSid') && myobj.getcookie('cookieNum')) {
            $('.empty-cart').hide();
            this.sidarr = myobj.getcookie('cookieSid').split(','); 
            this.numarr = myobj.getcookie('cookieNum').split(','); 
        }else{
            $('.empty-cart').show();
        }
    }
    goodlist(sid,numarr){
        let _this=this
        $.ajax({
            url: "http://10.31.157.21/items/php/list.php",
            dataType: "json",
            success: function (data) {
                $(data).each(function (index, value) { 
                    let i=$.inArray(sid,_this.sidarr)
                    if(value.sid==sid){
                        let $obj=$('.goods-item').first().clone(true)
                        $obj.attr('sid',sid)
                        $obj.appendTo($('.item-list'));
                        $obj.show()
                        $obj.find($('.goods-pic img')).attr({'src':value.url})
                        $obj.find($('.goods-pic a')).attr({'href':'detail.html?sid='+value.sid})
                        $obj.find($('.goods-msg')).html(value.title)
                        $obj.find($('.b-price strong')).html(value.price)
                        $obj.find($('.quantity-form input')).val(_this.numarr[i]) 
                        $obj.find($('.b-sum strong')).html(value.price*_this.numarr[i])   
                    }
                });  
                _this.all()
                _this.choose()
                
                
            }
        });
        
    }
// 总价
    all(){
        let $sump=0;
        let $suma=0;
        $('.goods-item:visible').each(function (index, element) {
            if ($(element).find('.cart-checkbox input').prop('checked')) {
                $suma += parseInt($(element).find('.quantity-form').find('input').val());
                $sump += parseFloat($(element).find('.b-sum').find('strong').html());
            }
        });

        $('.amount-sum').find('em').html($suma);
        $('.allnum').html($suma);
        $('.totalprice').html('￥' + $sump.toFixed(2));

    }
// 全选
    choose(){
        let _this=this
        $('.allsel').on('click',function(){
            $('input[type="checkbox"]').prop('checked',$(this).prop('checked'))
            _this.all()
        })
        $('.goods-item[sid]').find('input').on('click',function () { 
            if ($('.goods-item[sid]').length ==$('.goods-item[sid]').find('input:checked').length) {
                $('.allsel').prop('checked', true);
            } else {
                $('.allsel').prop('checked', false);
            }
            _this.all(); 
        });
    }
// 加减
    jian(){
        let _this=this
        $('.quantity-down').on('click',function(ev){
            if($(ev.target).next('input').val()>1){
                let num=$(ev.target).next('input').val()
                num--
                $(ev.target).next('input').val(num)
                $(this).parents('.goods-item').find('.b-sum').find('strong').html(_this.singlegoodsprice($(this)))
                _this.all(); 
                _this.setcookie($(this))
            }else{
                $(ev.target).next('input').val(1)
            }
        })
    }


    jia(){
        let _this=this
        $('.quantity-add').on('click',function(ev){
            let num=$(ev.target).prev('input').val()
            num++
            $(ev.target).prev('input').val(num)
            $(this).parents('.goods-item').find('.b-sum').find('strong').html(_this.singlegoodsprice($(this)))
            _this.all(); 
            _this.setcookie($(this))
        })
    }

    gai(){
        let _this=this
       
        $('.quantity-form').find('input').on('blur',function(ev){
            let num=+$('.quantity-form').find('input').val();
            console.log(num)
            if(!num){
                num=1
                $('.quantity-form input').val(1)
            }
            $(this).parents('.goods-item').find('.b-sum').find('strong').html(_this.singlegoodsprice($(this)))
            _this.all(); 
            _this.setcookie($(this))
        })
    }
    

// 算价格
    singlegoodsprice(obj) {
        let $price = parseFloat(obj.parents('.goods-item').find('.b-price strong').html()); 
        let $acount = parseInt(obj.parents('.goods-item').find('.quantity-form input').val()); 
        return ($price * $acount).toFixed(2); 
    }

    setcookie(obj){
        let _this=this
        let $index = obj.parents('.goods-item').attr('sid'); 
        this.numarr[$.inArray($index, this.sidarr)] = obj.parents('.goods-item').find('.quantity-form input').val();
        myobj.addcookie('cookieNum', _this.numarr.toString(), 10);
    }


    // 删除
    del(){
        let _this=this
        $('.del').on('click',function(){
            if(confirm('确定要删除吗')){
                let $sid=$(this).parents('.goods-item').attr('sid')
                let $index=$.inArray($sid,_this.sidarr)
                _this.sidarr.splice($index, 1); 
                _this.numarr.splice($index, 1);
                myobj.addcookie('cookieSid', _this.sidarr.toString(), 10); 
                myobj.addcookie('cookieNum', _this.numarr.toString(), 10); 
                $(this).parents('.goods-item').remove();
                _this.all()
                if($('.goods-item[sid]').length==0){
                    $('.empty-cart').show();
                }
            }
        })
        $('.dels').on('click',function(){
                let $a=$('.goods-item[sid]').find('input:checked')
                $a.parents('.goods-item').find('.del').each(function(index,value){
                    value.click()
                })
            
        })
    }




}
new shop().init()
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