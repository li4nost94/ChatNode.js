var socket=io();
	// Получать обновления данных пользователя
	socket.on('message',function(data){
  $('#client-count').text(data.clients);
});
// имя пользователя , колво символов никнейм
setUsername=function(){
	$('#username').focus();
	$('#username').keydown(function(event){
    var event= event || window.event;
        if(event.which==13 || event.keyCode==13){
          if($('#username').val().length>10) {alert('Имя не более 4 символов');return false;}
        	username=$('#username').val();
	         if(username){
		$('#login').fadeOut();
        $('#message').focus();
        socket.emit('add user', username);  
	        }else{alert('Пожалуйста, введите имя');}
        }
	})
}
setUsername();

$('#enter').click(function(){
  if($('#username').val().length>10) {alert('Имя не более 4 символов');return false;}
	username=$('#username').val();
	if(username){
		$('#login').fadeOut();
        $('#message').focus();
        socket.emit('add user', username);
	}else{alert('Пожалуйста, введите имя');}
});

$('form').submit(function(){
	if($('#message').val()){ 
	text=$('#message').val();
	$('#message').val('');
// Отправить сообщение через сокет
	socket.emit('newchat',{
		text:text,
    name:username
	});
}
	return false;
});
    socket.on('newchat',function(data){
    	$('#chatroom').append('<div class="dialog clearfix"><span class="name">'+data.name+'</span><p class="text">'+data.text+'<span class="arrow"></span></p></div>').animate({scrollTop:5000}, 100);
        $.each($('.name'),function(index,value){
            if(username==$('.name').eq(index).text()){
            $(this).addClass('right');
            $(this).next().addClass('right');
             $(this).parent().find('.arrow').removeClass('arrow').addClass('newarrow');
};         
});    
});
   


// Добавление новых пользователей ++++
socket.on('user joined', function (data) {
    	$('<span class="username"><strong>'+data.username+'  </strong>в чате</span>').appendTo('#chatroom');
  });

//список пользователей
socket.on('user left', function (data) {
    	$('<span class="username"><strong>'+data.username+'  </strong>в чате</span>').appendTo('#chatroom');
  });
//получить экран
if($(window).innerWidth()<=992){ 
    var h=$(window).innerHeight()-123;
     $('#chatroom').css('height',(h+'px'));
}

$(window).resize(function(){
	if($(window).innerWidth()<=992){ 
    var h=$(window).innerHeight()-123;
	$('#chatroom').css('height',(h+'px'));
};
});