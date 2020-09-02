define(['jquery'],function($){
    function getBannerData(){
        return $.ajax('../api/mock/banner.json'); //返回值为一个promise对象  底层为resolve(数据)  所以.then((res)=>{能拿到res数据})
    }

    function getBannerData_detail(){
        return $.ajax('../api/mock/banner2.json');
    }

    function getPhoneData(){
        return $.ajax('../api/mock/phone.json');
    }

    function getPadData(){
        return $.ajax('../api/mock/pad.json');
    }

    function getBookData(){
        return $.ajax('../api/mock/book.json');
    }

    return {getBannerData,getPhoneData,getPadData,getBookData,getBannerData_detail};
})