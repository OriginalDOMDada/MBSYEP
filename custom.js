$(document).ready(function(){
  function openNav() {
    document.getElementById("myNav").style.height = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.height = "0%";
}

  // $(function() {
  //   $(".slice").mouseenter(function () {
  //            $this = $(this);
  //           // $this.find("span").css("display", "block");
  //           console.log($this);
  //     }).mouseleave(function ()
  //     {
  //         $this = $(this);
  //         // $this.find("span").hide();
  //
  //     });
  // });
//   function random(icon_number) {
//     return Math.floor(Math.random() * icon_number);
//   }
//   var icon_number = $('.top-section svg g').length;
//   var icons = $('.top-section svg g');
//   // var transition_time = 500;
//   // var waiting_time = 500;
//   $(icons).each( function(index,value) {
//       $(value).attr('id','icon_' + index);
//       // $(value).css('visibility','visible');
//   });
//
// (function fadeOutSvg() {
//   var number = $('#icon_' + random(icon_number));
//   if($(number).css('display') !== 'none'){
//     $(number).fadeOut(Math.floor(Math.random() * 5000),fadeOutSvg);
//     $(number).delay(1000).fadeIn(Math.floor(Math.random() * 250),fadeOutSvg);
//   }
//   else {
//     $(number).fadeIn(Math.floor(Math.random() * 250),fadeOutSvg);
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
    // console.log(delta);
    // current -= 1;
    up = current;
    if (delta > 0){
      current -= 2;
      $('div.horizontal-section').css("backgroundPosition", (direction == 'h') ? current+"px 0" : "0 " + current+"px");
    }
    else {
      current -= -2;
      $('div.horizontal-section').css("backgroundPosition", (direction == 'h') ? current+"px 0" : "0 " + current+"px");
    }
  });

  var cboxOptionsVideo = {
    iframe: true,
    width: '95%',
    height: '95%',
    maxWidth: '960px',
    maxHeight: '585px',
    close: '<img class="close-button" src="css/images/close-button.svg">',
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
    // console.log(size);
    // console.log(pieElement);
    // console.log(sliceSize);
    // console.log(piebackground);
    // $(id+ " .pie-chart__legend li").each(function() {
    //   // console.log($(this).attr('style'));
    //   var raw = String($(this).attr('style')).replace('border-color: ','').replace(';','');
    //   var piebackground = $("."+sliceID + " span").css('background-color');
    //   if(raw === piebackground){
    //     console.log(raw);
    //     console.log(piebackground);
    //   }
    //
    // });

    $(pieElement).append("<div data-total='" + '1' + "' class='slice "+ sliceID + "'><span></span></div>");
    var offset = offset - 1;
    var sizeRotation = -179 + sliceSize;
    // console.log(sizeRotation);

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
// start of data charts
  function createPie(id) {
    var
      listData      = [],
      listTotal     = 0,
      offset        = 0,
      i             = 0,
      pieElement    = id + " .pie-chart__pie",
      dataElement   = id + " .pie-chart__legend"

      // console.log($(dataElement));


      if(id === '.pieID--micro-skills'){
        color    = [
          "#00ab65",
          "#008850",
          "#32bb83",
          "#00663c",
          "#66cca2"
        ];
      }
      else if (id === '.pieID--categories') {
        color    = [
          "#fcd804",
          "#e2c203",
          "#fcdb1d",
          "#c9ac03",
          "#fcdf36",
          "#b09702",
          "#fce34f",
          '#978102'
        ];

      }
      else if (id === '.pieID--operations') {
        color    = [
          "#041927",
          "#052234",
          "#072b41",
          "#08334e",
          "#093c5b",
          "#0b4468",
          "#0c4d75",
          "#0e5682",
          "#26668e",
          "#3e779b",
          "#5688a7",
          "#6e99b4",
          "#86aac0",
          "#9ebbcd",
          "#b6ccd9"
        ];
      }

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

  // createPieCharts();
// end of data
// var slices = [];
// var stats = [];
// $('.pie-charts .pie-chart--wrapper .pie-chart').each(function(){
//   $('.pie-chart__pie .slice').each(function() {
//     var $this = $(this).children('span');
//      slices.push($($this).css('background-color'));
//   });
//   $('.pie-chart__legend li').each(function() {
//     $(this).addClass('numbers');
//      stats.push($(this).css('border-color'));
//   });
// });

// $(function() {
//   $(".slice").mouseenter(function () {
//           var currentChart = $(this).parent();
//            var currentColor = $(this).children('span').css('background-color');
//
//           var matchMaker = $('li.numbers').filter(function() {
//               var element = $(this);
//               if(element.css('border-color') == currentColor) {
//                 var currentNumber = $(element).children('span')['0'].innerHTML;
//                 var currentJob = $(element).children('em')['0'].innerHTML;
//                 $("<div class='current-number'>" + currentNumber + "<br><span>" +currentJob + "</span></div>").appendTo(currentChart);
//               }
//               return true;
//           });
//
//     }).mouseleave(function ()
//     {
//         $this = $(this);
//         // $this.find("span").hide();
//         $('.current-number').remove();
//
//     });
// });

$('.pie-chart__legend li a').on('click',function(){
    var $this = $(this);
    var chartContainer = $this.closest('.pie-chart--wrapper');
    var currentChart = chartContainer.find('.pie-chart__pie');
    currentChart.empty();

    function numberCounter() {
      currentChart.find('.number-value').each(function () {
          $(this).prop('Counter',0).animate({
              Counter: $(this).text()
          }, {
              duration: 1000,
              easing: 'swing',
              step: function (now) {
                  $(this).text(Math.ceil(now));
              }
          });
      });
    }

    if (chartContainer.hasClass('pieID--micro-skills')) {
      createPie('.pieID--micro-skills');
      var currentNumber = $this.find('span')['0'].innerHTML;
      var totalNumbers = 0;
      $('.pieID--micro-skills ul li span').each(function(){
        totalNumbers += Number($(this).text());
      });
      var currentPercentage = (parseInt(currentNumber) / totalNumbers) * 100;
      var currentJob = $this.find('em')['0'].innerHTML;
      $("<div class='current-number'><span class='number-value'>" + currentPercentage + "</span><span>%</span><br><span>" +currentJob + "</span></div>").appendTo(currentChart);
      numberCounter();
    }
    if (chartContainer.hasClass('pieID--categories')) {
        createPie('.pieID--categories');
        var currentNumber = $this.find('span')['0'].innerHTML;
        var totalNumbers = 0;
        $('.pieID--categories ul li span').each(function(){
          totalNumbers += Number($(this).text());
        });
        var currentPercentage = (parseInt(currentNumber) / totalNumbers) * 100;
        var currentJob = $this.find('em')['0'].innerHTML;
        $("<div class='current-number'><span class='number-value'>" + currentPercentage + "</span><span class=>%</span><br><span>" +currentJob + "</span></div>").appendTo(currentChart);
        numberCounter();
    }
    if (chartContainer.hasClass('pieID--operations')) {
        createPie('.pieID--operations');
        var currentNumber = $this.find('span')['0'].innerHTML;
        var totalNumbers = 0;
        $('.pieID--operations ul li span').each(function(){
          totalNumbers += Number($(this).text());
        });
        var currentPercentage = (parseInt(currentNumber) / totalNumbers) * 100;
        var currentJob = $this.find('em')['0'].innerHTML;
        $("<div class='current-number'><span class='number-value'>" + currentPercentage + "</span><span class=>%</span><br><span>" +currentJob + "</span></div>").appendTo(currentChart);
        numberCounter();
    }
  return false;
});

  $("#imageGallery").justifiedGallery({
    lastRow : 'justify',
    rowHeight: 200,
    maxRowHeight : 200,
    rel : 'gallery', //replace with 'gallery1' the rel attribute of each link
    margins : 10,
    randomize: false
    }).on('jg.complete', function () {
        $(this).find('a').colorbox({
            maxWidth : '80%',
            maxHeight : '80%',
            opacity : 0.8,
            transition : 'elastic',
            current : ''
        });
    });


});
