'use strict';

{
  const open = document.getElementById('open');
  const close = document.getElementById('close');
  const overlay = document.querySelector('.overlay');
  open.addEventListener('click', () => {
    overlay.classList.add('show');
    open.classList.add('hide');
  });
  close.addEventListener('click', () => {
    overlay.classList.remove('show')
    open.classList.remove('hide')
  })
}

{
  var lang = window.navigator.languages || 
  window.navigator.language || 
  window.navigator.userLanguage || 
  window.navigator.browserLanguage;
  changeJaUrl('index.html');
  changeJaUrl('privacypolicy.html');
  changeJaUrl('mytransitmakers.html');
  changeJaUrl('studyphonics.html');
  changeEnUrl('index.html');
  changeEnUrl('privacypolicy.html');
  changeEnUrl('mytransitmakers.html');
  changeEnUrl('studyphonics.html');
  function changeEnUrl(url) {
    if(lang != 'ja' && location.href == 'ja/' + url){ 
      location.href = url; 
    }   
  }
  function changeJaUrl(url) {
    if (lang == 'ja' && location.href == url) {
      location.href = 'ja/' + url; 
    }
  }
}

// 下にスクロールしてバナーボタンを表示
$(function(){
  var bottom = $('.banner_button');
  var content = $('.content');
  $(window).on('scroll', function(){

    if($(this).scrollTop() > window.innerHeight / 2){
      //上にスクロールしたとき
      bottom.removeClass('hide');
    }else{
      //下にスクロールしたとき
      bottom.addClass('hide');
    }

    if (window.innerWidth < 700) {
      if($(this).scrollTop() > 0){
          //上にスクロールしたとき
          content.addClass('active');
        }else{
          //下にスクロールしたとき
          content.removeClass('active');
        }    
    }
  });
});
