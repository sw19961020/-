define(['jquery'],function($){
    function getBannerData(){
        return $.ajax('../api/mock/banner.json');
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