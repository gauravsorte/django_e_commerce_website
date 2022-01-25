//var prices = document.querySelectorAll('.card_price_value');
//for(var i = 0; i < prices.length; i++){
//    console.log(prices[i].innerText)
//    console.log(prices[i].parentElement.parentElement.parentElement.classList)
//}
  var max_range;
  var min_range
$( function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 500000,
      values: [ 75, 5000 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "Rs " + ui.values[ 0 ] + " - Rs " + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "Rs " + $( "#slider-range" ).slider( "values", 0 ) +
      " - Rs " + $( "#slider-range" ).slider( "values", 1 ) );

  } );

//document.getElementById('price__filter__btn').addEventListener('click', rating_filter)
//$("#price__filter__btn").addEventListener('click', price_filter())
function price_filter(){
    min_range = $("#slider-range").slider("values", 0);
    max_range = $("#slider-range").slider("values", 1);
    var prices = document.querySelectorAll('.card_price_value');
    for(var i = 0; i < prices.length; i++){
            if( prices[i].innerText >= min_range  &&  prices[i].innerText <= max_range){
                prices[i].parentElement.parentElement.parentElement.classList.remove("hidden")
             }
             else{
                prices[i].parentElement.parentElement.parentElement.classList.add("hidden")
             }

//            console.log(prices[i].parentElement.parentElement.parentElement.classList);


    }
}

function reset__filter(){
    var products = document.querySelectorAll('.product__card');
//    console.log(products[0])
    for(var i = 0; i < products.length; i++){
        products[i].classList.remove("hidden");
//        if( products[i].classList.includes('hidden')){
//            console.log('true')
//        }
    }
}

function rating_filter(){
    var s4 = $('4star');
    var s3 = $('3star');
    var s2 = $('2star');
    var s1 = $('1star');

//    var s4_ = $("#4star")
//    alert(s4_.is(':checked'))
    max = 5
    min = 0
    if(s4.is(':checked')){
        min = 4;
    }
    if(s3.is(':checked')){
        min = 3;
    }
    if(s2.is(':checked')){
        min = 2;
    }
    if(s1.is(':checked')){
        min = 1;
    }



    var ratings = document.querySelectorAll('.product__rating');
    for(var i = 0; i < ratings.length; i++){
        if(min > ratings[0].innerText.substring(0,1)){
            ratings[i].parentElement.parentElement.classList.add("hidden")

        }
    }
}