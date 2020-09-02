requirejs.config({    
    paths:{    
        "jquery" : "../lib/jquery-3.4.1.min"      
    }     
});

define(['jquery' , 'modules/cartStorage'],function($,{getLocationStorage , setLocationStorage , addLocationStorage}){

    create_form();
    function create_form(){
        var all_price = 0;
        var res = getLocationStorage().filter((v,i,a)=>{
                    return v.goodsChecked == true;
                });
        var tmp =`
            ${res.map((v,i,a)=>{
                return `
                    <li>
                        <div class="goods_div">
                            <img src="${v.goodsImg}">
                            <article>
                                <h2>${v.goodsName}</h2>
                                <p>${v.goodsColor}</p>    
                            </article>
                        </div>
                        <div class="title_div">
                            <h2>单价:￥${v.goodsPrice}</h2>
                            <p>数量:${v.goodsNumber}</p>
                            <span>总价:￥${v.goodsPrice * v.goodsNumber}</span>
                        </div>
                    </li>
                `
            }).join('')}
        ` ;
        $('#form_ul').html(tmp);

        for( var i=0;i<res.length;i++ ){
            all_price += res[i].goodsNumber * res[i].goodsPrice;
        }
        $('#form_status').find('span').html(`￥ ${all_price}.00`)
        
        $('#buy_goods').find('.btn_remove').off().click(function(){
            alert('取消订单成功')
        })
    }

})