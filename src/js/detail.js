requirejs.config({    
    paths:{    
        "jquery" : "../lib/jquery-3.4.1.min"      
    }     
});

define(['jquery','../api/server','modules/banner' , 'modules/cartStorage'],function($,{getBannerData_detail,getPhoneData,getPadData,getBookData},initBanner,{addLocationStorage}){
    getBannerData_detail().then((res)=>{
        initBanner(res);
    });

    var type = location.search.match(/type=([^&]+)/)[1];
    var id = location.search.match(/id=([^&]+)/)[1];
    var $shop = $('#shop');

    if( type == 'phone' ){
        getPhoneData().then((res)=>{
            shopList($shop,res)
        });
    }
    else if( type == 'pad' ){
        getPadData().then((res)=>{
            shopList($shop,res)
        });
    }
    else if( type == 'book' ){
        getBookData().then((res)=>{
            shopList($shop,res)
        });
    }

    function shopList($elem,res){      //渲染页面
        var index = -1;
                // res.goodsInfo.map((v,i,a)=>{
                //     return `<img src="${v}" alt="">`;
                // }).join('')
        function data(){
            res.goods_list.map((v,i,a)=>{
                if(v.goodsId == id){
                    index = i;
                }
            }).join()
        }
        data();
        var tmp2 =`
            <h3>-- 商品详情 --</h3>
            ${res.goods_list[index].goodsInfo.map((v,i,a)=>{
                    return `<img src="${v}" alt="">`;
                }).join('')
            }
         `; 

        var $tmp =  res.goods_list.map((v,i,a)=>{
                    if(v.goodsId == id){
                        return `
                                <div class="box">
                                    <article><img src="${v.photoLarge}"></article>
                                    <div id="d_img">
                                        <span></span>
                                        <img src="${v.photoNormal || v.goodsImg}" class="l">
                                    </div>
                                    <div class="r d_r">
                                        <h2>${v.goodsName}</h2>
                                        <h3>价格:<span>￥${v.goodsPrice}</span></h3>
                                        <p id="color_p">选择颜色:${v.chooseColor == undefined ? '<i>无可选颜色</i>' : v.chooseColor.map((v,i,a)=>{
                                            return `
                                                    <span class="cor">${v}</span>
                                                    `;
                                        }).join('') }</p>                                        
                                        <div class="bot">
                                            <div class="bot_l l">
                                                <input type="text" class="l" id="num_cart">
                                                <button id="add" class="l">+</button>
                                                <button id="unadd" class="l">-</button>
                                            </div>
                                            <div class="bot_r l">
                                                <button id="add_cart">加入购物车</button>
                                                <button id="buy"><a href="./cart.html" target="_blank">立即下单</a></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
            
                                `;
                    }
                }).join('');
        
        $elem.html($tmp);        
        $('#detailGoods').html(tmp2);

        btn_cli();
        btn_cart();
        changeLarge();
        addCartFn(res);
    }

    function btn_cli(){            //增加与减少数量
        var $btn_add = $('#add');
        var $btn_unadd = $('#unadd');
        var $int = $('#num_cart');
        var $int_value = $int.val();
        if(!$int_value){
            $int.val(1);
        }
        $btn_add.on('click',function(){
            $int_value = $int.val();
            if(!$int_value){
                $int.val(1);
            }
            $int.val(parseInt($int_value) + 1);
        });
        $btn_unadd.on('click',function(){
            var $int_value = $int.val();
            if($int_value <= 1){
                $int.val(1);
            }
            else{
                $int.val($int_value - 1);
            }
        });
        $int.on('input',function(){
            if(!Number($int.val())){
               $int.val('');
            }
        });
        $int.on('blur',function(){
            if( !Number($int.val())){
                $int.val(1);
            }
        })
    }

    function btn_cart(){      //加入购物车与购买和选中颜色
        var $btn_cor = $('.cor');
        $btn_cor.on('click',function(){
            var $this = $(this);
            $btn_cor.attr('class','');
            $this.attr('class','active');
        })
    }

    function changeLarge(){         //放大镜
        var $d_img = $('#d_img');
        var $span = $('#d_img span');
        var $l_immg = $('.box article');
        var $lar_img = $('.box article img');
        var L ;
        var T ; 
        $span.hide();
        $l_immg.hide();
        $d_img.mouseover(function(){
            $span.show();
            $l_immg.show();
        })
        $d_img.mouseout(function(){
            $span.hide();
            $l_immg.hide();
        })
        $d_img.on('mousemove',function(ev){
            L = ev.pageX - $d_img.offset().left; 
            T = ev.pageY - $d_img.offset().top;
            if( T < $span.outerHeight()/2 ){
                T = $span.outerHeight()/2;
            }
            else if( T > $d_img.outerHeight() - $span.outerHeight()/2 ){
                T = $d_img.outerHeight() - $span.outerHeight()/2;
            }
            if( L < $span.outerWidth()/2 ){
                L = $span.outerWidth()/2 ;
            }
            else if( L > $d_img.outerWidth() - $span.outerWidth()/2 ){
                L = $d_img.outerWidth() - $span.outerWidth()/2;
            }
            $span.css({
                left : L - $span.outerWidth()/2 ,
                top : T - $span.outerHeight()/2
            })
            $lar_img.css({
                left : -(L - $span.outerWidth()/2)  * ($lar_img.outerWidth() / $d_img.outerWidth()),
                top : -(T - $span.outerHeight()/2)  * ($lar_img.outerHeight() / $d_img.outerHeight())
            })
        })
    }
    function addCartFn(res){   //添加购物车功能
        var $add_cart = $('#add_cart');
        var index;
        var $res = (res.goods_list).map((v,i,a)=>{
            if(v.goodsId == id){
                index = i;
                return v;
            }
        })[index];
        console.log($res)
        $add_cart.click(function(){
            var $num_cart = $('#num_cart');
            var $color_span = $('#color_p').find('span').filter('.active');
            var data = {
                goodsImg: $res.photoNormal,
                goodsChecked : false,
                goodsId : $res.goodsId,
                goodsColor: $res.chooseColor[$color_span.index()],
                goodsName : $res.goodsName,
                goodsPrice: Number($res.goodsPrice),
                goodsNumber: Number($num_cart.val())
            };
            addLocationStorage(data,function(){
                alert('添加购物车成功');
            });          
        })
    }
})

