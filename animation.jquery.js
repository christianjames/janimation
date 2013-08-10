animation = {
	onReady: function (){
		
		KEY_DOWN = 40; 
		KEY_UP  = 38; 
		KEY_LEFT = 37; 
		KEY_RIGHT = 39; 
		
		KEY_END  = 35; 
		KEY_BEGIN = 36; 
		
		KEY_BACK_TAB  = 8; 
		KEY_TAB    = 9; 
		KEY_SH_TAB   = 16; 
		KEY_ENTER   = 13; 
		KEY_ESC    = 27; 
		KEY_SPACE   = 32; 
		KEY_DEL    = 46; 
		
		KEY_A  = 65; 
		KEY_B  = 66; 
		KEY_C  = 67; 
		KEY_D  = 68; 
		KEY_E  = 69; 
		KEY_F  = 70; 
		KEY_G  = 71; 
		KEY_H  = 72; 
		KEY_I  = 73; 
		KEY_J  = 74; 
		KEY_K  = 75; 
		KEY_L  = 76; 
		KEY_M  = 77; 
		KEY_N  = 78; 
		KEY_O  = 79; 
		KEY_P  = 80; 
		KEY_Q  = 81; 
		KEY_R  = 82; 
		KEY_S  = 83; 
		KEY_T  = 84; 
		KEY_U  = 85; 
		KEY_V  = 86; 
		KEY_W  = 87; 
		KEY_X  = 88; 
		KEY_Y  = 89; 
		KEY_Z  = 90; 
		
		KEY_PF1  = 112; 
		KEY_PF2  = 113; 
		KEY_PF3  = 114; 
		KEY_PF4  = 115; 
		KEY_PF5  = 116; 
		KEY_PF6  = 117; 
		KEY_PF7  = 118; 
		KEY_PF8  = 119; 
		
		REMAP_KEY_T = 5019; 
		
		posx = [];
		posy = [];
		vel = 0;
		count = 0;
		isrun = false;
		intervalId = '';
		pauseAfter = false;
		
		ms = 0;
		counterId = '';
		stopCount = false;
		correndo = false;
		pulando = false;

		$(document).focus();
	
		$(window).keydown( function (a) {
			if(!animation.isRun()){
				if(a.keyCode == KEY_RIGHT){
			        var eixoX = [-323, -204 ];
			        var eixoY = [7, 7];
			        var vel = 120;
			        animation.play(eixoX, eixoY, vel, false, a.keyCode);
			    }
			    
			    if(a.keyCode == KEY_LEFT){
			        var eixoX = [-162, -45];
			        var eixoY = [7, 7];
			        var vel = 120;
			        animation.play(eixoX, eixoY, vel, false, a.keyCode);
			    }
			    
			    if(a.keyCode == KEY_DOWN){
			    	var eixoX = [-282];
			        var eixoY = [-30];
			        var vel = 120;
			        animation.play(eixoX, eixoY, vel, false, a.keyCode);
			    }
			    
			    if(a.keyCode == KEY_UP){
			    	if(pulando == false){
			    		animation.pular(a);
			    	}
			    }
			}
		});
		
		$(window).keyup( function (a) {
			if(a.keyCode == KEY_RIGHT || a.keyCode == KEY_LEFT || a.keyCode == KEY_DOWN){
				animation.pararContagem();
				animation.pause();
				animation.posicaoInicial();
			}
			
		});
	},
	
	init: function (posx, posy, vel, pauseAfter, eventMouse){
		
		if(isrun == true){
			animation.conta(eventMouse);
			
			intervalId = window.setInterval(function(){
				var s = $('#sprite');
				var sStyle = '';
				
				if(eventMouse == KEY_RIGHT){
					var posBoneco = s.css('left');
				
					posBoneco = posBoneco.replace('px', '');
					
					if(vel == 120){
						posBoneco = parseInt(posBoneco) + parseInt(10);
					}
					else if (vel == 80){
						posBoneco = parseInt(posBoneco) + parseInt(13);
					}
					
					s.css('left', posBoneco+'px');
				}
				else if(eventMouse == KEY_LEFT){
					var posBoneco = s.css('left');
				
					posBoneco = posBoneco.replace('px', '');
					
					if(vel == 120){
						posBoneco = parseInt(posBoneco) - parseInt(10);
					}
					else if (vel == 80){
						posBoneco = parseInt(posBoneco) - parseInt(13);
					}
					
					s.css('left', posBoneco+'px');
				}
				
				s.css('background-position', ' '+posx[count]+'px '+posy[count]+'px');
				
				count++;
				if(count >= posx.length) count = 0;
				
				if(pauseAfter){
					animation.pause();
				}
				
			}, vel);
		}
	},
	
	play: function (posx, posy, vel, pauseAfter, eventMouse) {
		isrun = true;
		animation.init(posx, posy, vel, pauseAfter, eventMouse);
	},
	
	pause: function (){
		console.log('pause');
		
		window.clearInterval(intervalId);
		isrun = false;
		correndo = false;
	},
	
	pular: function (a){
		
		pulando = true;
		
		var eixoX = [-201];
        var eixoY = [-33];
        var vel = 100;
        animation.play(eixoX, eixoY, vel, true, a.keyCode);
        
        var s = $('#sprite');
        	
		  
		  	$('#sprite').animate(
			{ top: '-=80' }, // what we are animating
			{
			
			    duration: 800, // how fast we are animating
				easing: 'swing', // the type of easing
				complete: function() { // the callback
					
					animation.pause();
					var eixoX = [-242];
			        var eixoY = [-33];
			        var vel = 100;
			        animation.play(eixoX, eixoY, vel, true, a.keyCode);
			        
			    	$('#sprite').animate(
						{ top: '+=80' }, // what we are animating
						{
						    duration: 800, // how fast we are animating
							easing: 'swing', complete: function () {animation.pause(); animation.posicaoInicial(); pulando = false;}
						});
			    }
			});
		  
	},
	isRun: function (){
		return isrun;
	},
	
	posicaoInicial: function (){
		var eixoX = [-323];
        var eixoY = [7];
        var vel = 100;
        animation.play(eixoX, eixoY, vel, true);
	},
	
	pararContagem: function  (){
		console.log('pause');
		clearTimeout(counterId);
		stopCount = true;
		ms = 0;
	},
	
	conta: function (eventMouse){
		if(eventMouse == KEY_RIGHT || eventMouse == KEY_LEFT){
			if(stopCount == false){
				counterId = setTimeout(function(){
					ms++; 
					animation.conta(eventMouse);
				}, 250);
			}
			else{
				stopCount = false;
			}
			
			if(ms == 7 && correndo == false){
				animation.pararContagem();
				animation.pause();
		        var eixoX = [-323, -204 ];
			    var eixoY = [7, 7];
			        
		        animation.play(eixoX, eixoY, 80, false, eventMouse);
		        correndo = true;
			}
		}
	}
}

$(document).ready(animation.onReady);