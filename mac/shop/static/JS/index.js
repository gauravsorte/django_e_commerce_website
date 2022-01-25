 console.log("Working");
    if(localStorage.getItem('cart')==null)
    {
        var cart={};
        console.log('Cart is Empty!!!');
    }
    else
    {
        cart = JSON.parse(localStorage.getItem('cart'));
        console.log('Cart is Not Empty!!!');
    }

    document.getElementById('cart').innerHTML = Object.keys(cart).length;

    //Jquery Code

    $('.cart').click(function()
    {
        console.log('Clicked!!!');
        var idstr = this.id.toString();
        console.log(idstr);

        // {'pr1':2}
        if( cart[idstr] != undefined)
            cart[idstr] += 1 ;
        else
            cart[idstr]=1;

        localStorage.setItem('cart',JSON.stringify(cart));
        console.log(cart);
        document.getElementById('cart').innerHTML = Object.keys(cart).length;
        send_cart(idstr, cart[idstr])
    });

    var myCarousel = document.querySelector('.main__top__carousel')
    var carousel = new bootstrap.Carousel(myCarousel, {
        interval: 3000,
        wrap: true
    })

    // ========================================================================
    window.onscroll = function() {navFunction()};

    // Get the navbar
    var navbar = document.getElementById("navbar");

    // Get the offset position of the navbar
    var sticky = navbar.offsetTop;
    // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function navFunction() {
        if (window.pageYOffset > sticky) {
            navbar.classList.add("sticky")
        } else {
            navbar.classList.remove("sticky");
        }
    }

    // ===============================================================================
    // cart__btn = document.querySelector('.cart__btn');
    // cart__btn.addEventListener('click', send_cart);
    function send_cart(idstr, cnt){
        console.log(idstr, cnt);
        $(document).ready(function(){
            $.ajax({
                type:"GET",
                url: 'cart',
                data: {
                    'localstorage': idstr,
                    'count': cnt
                },
                dataType: "json",
                success: function(){
                    console.log('successfull');
                }
            })
        })
    }