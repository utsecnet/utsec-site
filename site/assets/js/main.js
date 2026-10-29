(function(){
  var btn=document.querySelector('.menu-btn'),nav=document.getElementById('site-nav');
  if(btn&&nav){btn.addEventListener('click',function(){
    var o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o?'true':'false');
  });}
  var y=document.getElementById('yr');if(y){y.textContent=new Date().getFullYear();}
})();
