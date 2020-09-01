requirejs.config({    
    paths:{    
        "jquery" : "../lib/jquery-3.4.1.min"      
    }     
});

define(['jquery','../api/server','modules/banner'],function($,{getBannerData_detail,getPhoneData,getPadData,getBookData},initBanner){
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

    function shopList($elem,res){
        $tmp = `
                ${res.goods_list.map((v,i,a)=>{
                    if(v.goodsId == id){
                        return `
                                <div class="box">
                                    <img src="${v.goodsImg}" class="l">
                                    <div class="r d_r">
                                        <h2>${v.goodsName}</h2>
                                        <h3>价格:<span>￥${v.goodsPrice}</span></h3>
                                        <p>选择颜色:${v.chooseColor == undefined ? '<i>无可选颜色</i>' : v.chooseColor.map((v,i,a)=>{
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
                                                <button id="buy">立即下单</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
            
                                `;
                    }
                }).join('')}
                `;
        $elem.html($tmp);

        btn_cli();
        btn_cart()
    }

    function btn_cli(){            //增加与减少数量
        var $btn_add = $('#add');
        var $btn_unadd = $('#unadd');
        var $int = $('#num_cart');
        var $int_value = $int.val();
        if(!$int_value){
            $int.val(0);
        }
        $btn_add.on('click',function(){
            $int_value = $int.val();
            if(!$int_value){
                $int.val(0);
            }
            $int.val(parseInt($int_value) + 1);
        });
        $btn_unadd.on('click',function(){
            var $int_value = $int.val();
            if($int_value <= 0){
                $int.val(0);
            }
            else{
                $int.val($int_value - 1);
            }
        });
    }

    function btn_cart(){      //加入购物车与购买和选中颜色
        var $btn_cor = $('.cor');
        $btn_cor.on('click',function(){
            var $this = $(this);
            $btn_cor.css({
                background : ''
            });
            $this.css({
                    background : '#0ff'
            });
        })
    }
})

