/**
 * Created by mohammad on 11/29/17.
 */
//import $ from '../js/jquery_library2.js'
//import '../assets/owl.carousel.min.css';
//import '../js/owl.carousel.min.js'


$(document).ready(function() {
    $("#owl-demo").owlCarousel({
        rtl:true,
        navigation : true, // Show next and prev buttons
        slideSpeed : 300,
        paginationSpeed : 400,
        // singleItem:true,
        autoPlay: true,
        autoPlay: 3000,

        // "singleItem:true" is a shortcut for:
        items : 6,
        // itemsDesktop : false,
        // itemsDesktopSmall : false,
        // itemsTablet: false,
        // itemsMobile : false

    });

});