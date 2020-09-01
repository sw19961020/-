requirejs.config({    
    paths:{    
        "jquery" : "../lib/jquery-3.4.1.min"      
    }     
});

define(['jquery','../api/server','modules/banner'],function($,{getBannerData,getPhoneData,getPadData,getBookData},initBanner){
    getBannerData().then((res)=>{
        initBanner(res);
    });
    getBookData().then((res)=>{
        changeList('#book',res);
    });
    getPadData().then((res)=>{
        changeList('#pad',res);
    });
    getPhoneData().then((res)=>{
        changeList('#phone',res);
    });

    function changeList(elem,res){
        $elem = $(elem);
        $tmp = `
        <p>${res.title}</p>
        <ul>
            ${ res.goods_list.map((v,i,a)=>{
                return `<li>
                            <a href="./detail.html?type=${res.type}&id=${v.goodsId}" target="_blank">
                                <img src="${v.goodsImg}">
                                <h2>${v.goodsName}</h2>
                                <p>￥${v.goodsPrice}</p>
                            </a>
                        </li>`;             
            }).join('').repeat(2) }
        </ul>
        `;
        $elem.html($tmp);
    }
    
})