$(document).ready(function(){
  function random(icon_number) {
    return Math.floor(Math.random() * icon_number);
  }
  var icon_number = $('svg g').length;
  var icons = $('svg g');
  // var transition_time = 500;
  // var waiting_time = 500;
  $(icons).each( function(index,value) {
      $(value).attr('id','icon_' + index);
      // $(value).css('visibility','visible');
  });

// (function fadeOutSvg() {
//   var number = $('#icon_' + random(icon_number));
//   if($(number).css('display') !== 'none'){
//     $(number).fadeOut(Math.floor(Math.random() * 1000),fadeOutSvg);
//     $(number).delay(1000).fadeIn(Math.floor(Math.random() * 1000),fadeOutSvg);
//   }
//   else {
//     $(number).delay(1000).fadeIn(Math.floor(Math.random() * 1000),fadeOutSvg);
//   }
//
// })();
var x = 0;
var current = 0;
var up = 0;
var direction = 'h';
// console.log(x+1);
// $(window).scroll(function(){
//   current -= 1;
//   $('div.horizontal-section').css("backgroundPosition", (direction == 'h') ? current+"px 0" : "0 " + current+"px");
// });

  $(window).on('wheel', function(e) {
  	var delta = e.originalEvent.deltaY;
    current -= 1;
    up = current;
    if (delta > 0){
      $('div.horizontal-section').css("backgroundPosition", (direction == 'h') ? current+"px 0" : "0 " + current+"px");
    }
  });

  var cboxOptionsVideo = {
    iframe: true,
    width: '95%',
    height: '95%',
    maxWidth: '960px',
    maxHeight: '585px',
    href: function(){
      var videoId = new RegExp('[\\?&]v=([^&#]*)').exec(this.href);
      if (videoId && videoId[1]) {
        return 'https://youtube.com/embed/'+videoId[1]+'?rel=0&wmode=transparent&modestbranding=1&autoplay=1';
      }
    }
  };
  $('.youtube').colorbox(cboxOptionsVideo);
  $(window).resize(function(){
    $.colorbox.resize({
      width: window.innerWidth > parseInt(cboxOptionsVideo.maxWidth) ? cboxOptionsVideo.maxWidth : cboxOptionsVideo.width,
      height: window.innerHeight > parseInt(cboxOptionsVideo.maxHeight) ? cboxOptionsVideo.maxHeight : cboxOptionsVideo.height
    });
  });


  function sliceSize(dataNum, dataTotal) {
    return (dataNum / dataTotal) * 360;
  }

  function addSlice(id, sliceSize, pieElement, offset, sliceID, color) {
    $(pieElement).append("<div class='slice "+ sliceID + "'><span></span></div>");
    var offset = offset - 1;
    var sizeRotation = -179 + sliceSize;

    $(id + " ." + sliceID).css({
      "transform": "rotate(" + offset + "deg) translate3d(0,0,0)"
    });

    $(id + " ." + sliceID + " span").css({
      "transform"       : "rotate(" + sizeRotation + "deg) translate3d(0,0,0)",
      "background-color": color
    });
  }

  function iterateSlices(id, sliceSize, pieElement, offset, dataCount, sliceCount, color) {
    var
      maxSize = 179,
      sliceID = "s" + dataCount + "-" + sliceCount;

    if( sliceSize <= maxSize ) {
      addSlice(id, sliceSize, pieElement, offset, sliceID, color);
    } else {
      addSlice(id, maxSize, pieElement, offset, sliceID, color);
      iterateSlices(id, sliceSize-maxSize, pieElement, offset+maxSize, dataCount, sliceCount+1, color);
    }
  }

  function createPie(id) {
    var
      listData      = [],
      listTotal     = 0,
      offset        = 0,
      i             = 0,
      pieElement    = id + " .pie-chart__pie"
      dataElement   = id + " .pie-chart__legend"

      color         = [
        "#00ab65",
        "#0e5682",
        "#fcd804",
        "#ecedee",
        "#007847",
        "#d3af37",
        "#111111",
        "#3e779b"
      ];

    color = shuffle( color );

    $(dataElement+" span").each(function() {
      listData.push(Number($(this).html()));
    });

    for(i = 0; i < listData.length; i++) {
      listTotal += listData[i];
    }

    for(i=0; i < listData.length; i++) {
      var size = sliceSize(listData[i], listTotal);
      iterateSlices(id, size, pieElement, offset, i, 0, color[i]);
      $(dataElement + " li:nth-child(" + (i + 1) + ")").css("border-color", color[i]);
      offset += size;
    }
  }

  function shuffle(a) {
      var j, x, i;
      for (i = a.length; i; i--) {
          j = Math.floor(Math.random() * i);
          x = a[i - 1];
          a[i - 1] = a[j];
          a[j] = x;
      }

      return a;
  }

  function createPieCharts() {
    createPie('.pieID--micro-skills' );
    createPie('.pieID--categories' );
    createPie('.pieID--operations' );
  }

  createPieCharts();


});
