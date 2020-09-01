define(['jquery'],function($){
    
    var now = 0;

    function initBanner(res){
        var $banner = $('#banner');
        var $tmp = `
        <ul>
            ${ res.banner_list.map((v,i,a)=>{
                return `<li class="${i==0?'show' : ''}"><a href="${v.imgLink}"><img src="${v.imgUrl}"></a></li>`
            }).join('') }
        </ul>
        <div class="container">
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
    }

    function changeBanner(){
        $('#banner').on('click','ol li',function(){
            var $ulList = $('#banner').find('ul li');
            $(this).attr('class','active').siblings().attr('class','');
            $ulList.eq($(this).index()).attr('class','show').siblings().attr('class','');
            now = $(this).index();
        })
    }

    function autochange(){
        var $ulList_1 = $('#banner').find('ul li');
        var $olList_1 = $('#banner').find('ol li');
        
        function auto(){
            if( now == $ulList_1.length - 1){
                now = 0;
            }
            else{
                now ++;
            }
            $olList_1.eq(now).attr('class','active').siblings().attr('class','');
            $ulList_1.eq(now).attr('class','show').siblings().attr('class','');
        }

        var timer = setInterval(auto,3000);

        $('#banner').on('mouseover',function(){
            clearInterval(timer);
        })
        $('#banner').on('mouseout',function(){
            timer = setInterval(auto,3000);
        })
    }

    return initBanner;
})