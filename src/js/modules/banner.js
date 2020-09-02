define(['jquery' , '../../api/server'],function($,{getPhoneData,getPadData,getBookData}){

    var now = 0;

    function initBanner(res){       //渲染
        var $banner = $('#banner');
        var $tmp = `
        <ul>
            ${ res.banner_list.map((v,i,a)=>{
                return `<li class="${i==0?'show' : ''}"><a href="${v.imgLink}"><img src="${v.imgUrl}"></a></li>`
            }).join('') }
        </ul>
        <div class="container olList">
            <ol>
                ${ res.banner_list.map((v,i,a)=>{
                    return `<li class="${i==0?'active' : ''}"></li>`
                }).join('') }
            </ol>
        </div>

        `;
        $banner.append($tmp);
        changeBanner();
        autochange();
        article_list();
    }

    function changeBanner(){        //点击切换图片
        $('#banner').on('click','ol li',function(){
            var $ulList = $('#banner').find('ul li');
            $(this).attr('class','active').siblings().attr('class','');
            $ulList.eq($(this).index()).attr('class','show').siblings().attr('class','');
            now = $(this).index();
        })
    }

    function autochange(){    //自动切换与左右按钮切换
        var $ulList_1 = $('#banner').find('ul li');
        var $olList_1 = $('#banner').find('ol li');
        var $jian_l = $('.jian_l');
        var $jian_r = $('.jian_r');
        
        function auto(){      //定时器需要用到的函数
            if( now == $ulList_1.length - 1){
                now = 0;
            }
            else{
                now ++;
            }
            $olList_1.eq(now).attr('class','active').siblings().attr('class','');
            $ulList_1.eq(now).attr('class','show').siblings().attr('class','');
        }

        $jian_l.on('click',function(){     //左箭头
            if( now == 0 ){
                now = $ulList_1.length - 1;
            }
            else{
                now -- ;
            }
            $olList_1.eq(now).attr('class','active').siblings().attr('class','');
            $ulList_1.eq(now).attr('class','show').siblings().attr('class','');
        })

        $jian_r.on('click',function(){    //右箭头
            if( now == $ulList_1.length - 1 ){
                now = 0;
            }
            else{
                now ++ ;
            }
            $olList_1.eq(now).attr('class','active').siblings().attr('class','');
            $ulList_1.eq(now).attr('class','show').siblings().attr('class','');
        })

        var timer = setInterval(auto,3000);    //启动定时器

        $('#banner').on('mouseover',function(){    //清除定时器
            clearInterval(timer);
        });

        $('#banner').on('mouseout',function(){       //再次启动定时器
            timer = setInterval(auto,3000);
        });
    }

    function article_list(){   //做一个扩展列表
        var $all_list = $('#at_list p');
        var $aside = $('<aside id="change_list">');
        $all_list.on('mouseover',function(){ //鼠标移上出现
            
            if( $(this).index() == 0 ){
                getPhoneData().then((res)=>{
                    $aside.html ( `
                        ${(res.goods_list).map((v,i,a)=>{
                            return `
                                        <div class="list_own">
                                            <img src=${v.goodsImg}>
                                            <h2>${v.goodsName}</h2>
                                            <p>￥${v.goodsPrice}</p>        
                                        </div>
                                    `;
                        }).join('').repeat(2)}
                    `);
                })
                $('#banner').append($aside);
            }
            else if( $(this).index() == 1 ){
                getBookData().then((res)=>{
                    $aside.html(`
                                ${(res.goods_list).map((v,i,a)=>{
                                    return `
                                                <div class="list_own">
                                                    <img src=${v.goodsImg}>
                                                    <h2>${v.goodsName}</h2>
                                                    <p>￥${v.goodsPrice}</p>        
                                                </div>
                                            `
                                }).join('').repeat(2)}
                                `
                    );
                })
                $('#banner').append($aside);
            }
            else if( $(this).index() == 2 ){
                getPadData().then((res)=>{
                    $aside.html(`
                                ${(res.goods_list).map((v,i,a)=>{
                                    return `
                                                <div class="list_own">
                                                    <img src="${v.goodsImg}">
                                                    <h2>${v.goodsName}</h2>
                                                    <p>￥${v.goodsPrice}</p>        
                                                </div>
                                            `
                                }).join('').repeat(2)}
                                `
                    );
                })
                $('#banner').append($aside);
            }
            var L = $('#at_list').offset().left;
            var T = $('#at_list').offset().top;
            var H = $all_list.eq(0).outerHeight();
            var W = $all_list.eq(0).outerWidth();
            $aside.css({
                left : L + W, 
                top : T - H * 3
            })
        })

        $all_list.on('mouseout',function(){ // 移下来消失
            if($aside.html()){
                $aside.remove();
            }
        })
    }


    return initBanner;
})