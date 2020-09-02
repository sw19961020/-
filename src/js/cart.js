requirejs.config({    
    paths:{    
        "jquery" : "../lib/jquery-3.4.1.min"      
    }     
});

define(['jquery','modules/cartStorage'],function($,{getLocationStorage , setLocationStorage , addLocationStorage}){
    var res = getLocationStorage();
    var $cart = $('#cart');
    createList(res);

    function createList(res){              //渲染页面
        var $cart_list = $cart.find('.cart_list');
        var all_price = 0;
        var num_goods = 0;
        var tmp = res.map((v,i,a)=>{
            return `
                <li>
                    <div><input type="checkbox" class="check_box" ${v.goodsChecked ? 'checked' : ''}></div>   
                    <div>${v.goodsName} ( ${v.goodsColor} )</div>
                    <div>¥ ${v.goodsPrice}.00</div>
                    <div>
                        <span class="reduceBtn">-</span>
                        <input class="cart_list_text" type="text" value="${v.goodsNumber}">
                        <span class="addBtn">+</span>
                    </div>
                    <div>¥ ${v.goodsNumber * v.goodsPrice}.00</div>
                    <div class="removeBtn">删除</div>
                </li>

            `;
        });

        $cart_list.html(tmp);

        var numberGoods = $cart.find('.numberGoods');
        var allPrice = $cart.find('.allPrice');
        for( var k=0;k<res.length;k++ ){
            if( res[k].goodsChecked == true ){
                num_goods += Number(res[k].goodsNumber);
                all_price += Number(res[k].goodsNumber) * Number(res[k].goodsPrice);
            }
        }
        numberGoods.html(`已选择 ${num_goods}件商品`);
        allPrice.html(`总计：¥ ${all_price}.00`);

        var $cart_title_selectAll = $cart.find('.cart_title_selectAll');
        var all_checked = true;
        for( var i=0;i<res.length;i++ ){
            if( res[i].goodsChecked == false ){
                all_checked = false;
            }
        }
        if( all_checked ){
            $cart_title_selectAll.prop('checked',true);
        }
        else{
            $cart_title_selectAll.prop('checked',false); 
        }    

        btn_click(); 
        chooseCheckBox(); 
        removeLi();
        all_checked_btn();
    }

    //下面写cart页面的一些功能

    function btn_click(){      //数量功能
        var $addSpan = $('.addBtn');
        var $reduceSpan = $('.reduceBtn');
        var $int_cart = $('.cart_list_text');
        var cart_value ;
        $addSpan.on('click',function(){
            console.log($(this).prev().val())
            cart_value = $(this).prev().val();
            if(!cart_value){
                $(this).prev().val(1);
                res[$(this).closest('li').index()].goodsNumber = Number($(this).prev().val());
                setLocationStorage(res);
                res = getLocationStorage();
                createList(res);
            }
            $(this).prev().val(parseInt(cart_value) + 1);
            res[$(this).closest('li').index()].goodsNumber = Number($(this).prev().val());
            setLocationStorage(res);
            res = getLocationStorage();
            createList(res);
        });
        $reduceSpan.on('click',function(){
            cart_value = $(this).next().val();
            if(cart_value <= 1){
                $(this).next().val(1);
                res[$(this).closest('li').index()].goodsNumber = Number($(this).next().val());
                setLocationStorage(res);
                res = getLocationStorage();
                createList(res);
            }
            else{
                $(this).next().val(cart_value - 1);
                res[$(this).closest('li').index()].goodsNumber = Number($(this).next().val());
                setLocationStorage(res);
                res = getLocationStorage();
                createList(res);
            }
        });
        $int_cart.on('input',function(){
            if(!Number($int_cart.val())){
               $(this).val('');
            }
        });
        $int_cart.on('blur',function(){
            if( !Number($int_cart.val())){
                $(this).val(1);
            }
                res[$(this).closest('li').index()].goodsNumber = Number($(this).val());
                setLocationStorage(res);
                res = getLocationStorage();
                createList(res);
        })
    }

    function chooseCheckBox(){    //复选框功能
        var $check_box = $('.check_box');
        $check_box.click(function(){
            var index = $(this).closest('li').index();
            if( res[index].goodsChecked == true ){
                res[index].goodsChecked = false;
            }
            else{
                res[index].goodsChecked = true; 
            }
            setLocationStorage(res);
            createList(res); 
        })
    }

    function all_checked_btn(){    //全选框功能
        var $cart_title_selectAll = $cart.find('.cart_title_selectAll');
        $cart_title_selectAll.off().click(function(){
            if( $cart_title_selectAll.prop('checked') ){
                for( var i=0;i<res.length;i++ ){
                    res[i].goodsChecked = true;
                }
            }
            else{
                for( var i=0;i<res.length;i++ ){
                    res[i].goodsChecked = false;
                }
            }
            setLocationStorage(res);
            createList(res);
        })
    }

    function removeLi(){    //删除数据
        var removeBtn = $cart.find('.removeBtn');
        removeBtn.click(function(){
            var index = $(this).closest('li').index();
            res.splice(res[index] , 1);
            setLocationStorage(res);
            createList(res);
        })
    }

})
