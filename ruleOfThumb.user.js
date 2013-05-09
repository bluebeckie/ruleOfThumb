// ==UserScript==
// @name          rule of thumb
// @namespace     http://www.bluebeckie.com/
// @description   put all the functions within the range of the thumb
// @include       http://*.yahoo.com*
// @require       http://code.jquery.com/jquery-2.0.0.min.js
// @version       1.0
// @copyright     2013+, beckie
// ==/UserScript==

$(function(){
    var dBody,
        myStyle;

    myStyle = ' \
          #yog-bd { background: gray; } \
        #thumbTrigger { \
               bottom: 0; \
               left: 0; \
               position: fixed; \
        }\
          #thumbTrigger .trigger { \
               background: rgba(108,186, 66, 0.8); \
          } \
          #thumbTrigger .close { \
               border-radius: 0 100px 0 0; \
            height: 100px; \
            width: 100px; \
          } \
          #thumbTrigger .open { \
               border-radius: 0 200px 0 0; \
            height: 200px; \
               position: relative; \
            width: 200px; \
          }\
        #thumbTrigger .btns { \
               font-size: 80px; \
               font-family: verdana; \
               font-weight: bold; \
               position: absolute; \
          } \
          #thumbTrigger .close .btns { \
               display: none; \
          } \
        #thumbTrigger .back { \
            top: 0; \
            left: 10px; \
        } \
        #thumbTrigger .forward { \
            top: 30px; \
            left: 60px; \
        } \
        #thumbTrigger .srch { \
            top: 60px; \
            left: 90px; \
        } \
        #thumbTrigger .go { \
            top: 110px; \
            left: 120px; \
        } \
          #thumbTrigger .thumb-input { \
               border: 5px solid brown; \
               top: 100px; \
               position: absolute; \
               left: 10px; \
               width: 400px; \
               padding: 5px; \
          } \
    ';
   
    var addStyles = function() {
        var styleBlock = $('<style id="thumbStyle"></style>');
        styleBlock.text(myStyle);
        $('head').append(styleBlock);
    };

   
    var hideBox = function() {
        if ($('#thumb-search')) {
            $('#thumb-search').remove();
        }
       
        if ($('#thumb-go')) {
            $('#thumb-go').remove();
        } 
    };
   
    var goShortcut = function (node) {
        var searchBox = $('<form id="thumb-search" action="http://search.yahoo.com/mobile/s?">' +
             '<input type="text" class="thumb-input" name="q" value="" placeholder="input search here"/>' +
            '</form>');
        var urlBox = $('<form id="thumb-go" action="http://search.yahoo.com/mobile/s?">' +
             '<input type="text" class="thumb-input" name="q" value="http://" />' +
            '</form>');
       
        hideBox();
       
        if ($(node).hasClass('back')) {
               window.history.back();
        };
        if ($(node).hasClass('forward')) {
               window.history.forward();
        };
        if ($(node).hasClass('srch')) {
             $('#thumbTrigger').append(searchBox);
        };

        if ($(node).hasClass('go')) {
             $('#thumbTrigger').append(urlBox);
            urlBox.on('submit', function(e) {
                 e.preventDefault();   
                alert($('#thumb-go .thumb-input').value);
                //window.location.href= $('#thumb-go .thumb-input').value;
            });
        };
    }
   
   
    var setupTrigger = function() {
        var dTrigger, dBack, dForward, dSearch, dGo;
        dTrigger = $('<div id="thumbTrigger"><div class="trigger open">'+
             '<span class="btns back">B</span>' +
             '<span class="btns forward">F</span>' +
             '<span class="btns srch">S</span>' +
             '<span class="btns go">G</span>' +
        '</div></div>');
       
        $('body').append(dTrigger);
       
        dTrigger.delegate('.trigger','click',function(e){
            if ($(this).hasClass('close')){
                 $(this).removeClass('close').addClass('open');   
            } else if ($(this).hasClass('open')) {
                if ('SPAN' === e.target.tagName) {
                     goShortcut(e.target);
                     return;
                }
                  $(this).removeClass('open').addClass('close');
                hideBox();
            }
        });
    };
   
    addStyles();
    setupTrigger();
});
