$(window).scroll(function(){
  vidScroll();
});


  function vidScroll(){
    var wScroll = $(window).scrollTop();

    //console.log(wScroll);
    $('.video-strip').css('background-position','center -'+ wScroll +'px');

        //console.log('$(.video-strip)', $('.video-strip').length);
        //console.log('center '+ wScroll +'px');
  }
  //install jquery in layouts, default.html <script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
