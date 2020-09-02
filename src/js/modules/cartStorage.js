
define(['jquery'],function($){
    var key = 'cartList';
    function getLocationStorage(){
        return JSON.parse(localStorage.getItem(key) || '[]');
    }
    function setLocationStorage(data){
        localStorage.setItem(key  , JSON.stringify(data));
    }
    function addLocationStorage(data , cb){
        var cartList = getLocationStorage();
        var kif = false;
        var index_now = -1;
        for( var i=0;i<cartList.length;i++ ){
            if( data.goodsId == cartList[i].goodsId && data.goodsColor == cartList[i].goodsColor){
                kif = true;
                index_now = i;
            }
        }
        
        if( kif ){
            cartList[index_now].goodsNumber += data.goodsNumber; 
            setLocationStorage(cartList);
        }
        else{
            cartList.push(data);
            setLocationStorage(cartList);
        }

        cb();
    }
    return {getLocationStorage , setLocationStorage , addLocationStorage};
})