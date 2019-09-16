//Option [ 1-on, 0-off ]


var now = new Date();
var date = now.getTime();

var _auto = 0;		// 자동 슬라이드
var _term = 5000;	// 자동 슬라이드 실행 간격 1000 = 1초
//var _navi = 1;		// 썸네일 표시
var _title = 1;		// 이미지 타이틀 표시
var _title_type = 1;	// 0-위, 1-아래

var _img = "img/photo";

var total_width = 760;
var navi_total = 5;
var hide_total = [6, 1, 6, 1, 1, 4];
var pic_total = 0;
for(var i in hide_total){
	pic_total = pic_total + hide_total[i];
}

var navi_text = ["외부전경", "헬스장", "헬스기구", "GX실", "샤워시설", "부대시설"];
var pic_title = [
	[
		"저스트핏", 
		"저스트핏",	
		"저스트핏", 
		"저스트핏", 
		"저스트핏", 
		"저스트핏"
	],

	[
		"이미지 준비중", 
	],

	[
		"E Series",
		"T3x Treadmill", 
		"Converging Chest Press",
		"Converging Shoulder Press",
		"Diverging Lat Pulldown",
		"Diverging Seated Row"
	],

	[
		"이미지 준비중", 
	],

	[
		"이미지 준비중", 
	],

	[
		"아산시내가 한눈에 보이는 옥상정원", 
		"모노팰리스 건물 1층에 자리잡은 대형 편의점 모노슈퍼렛24", 
		"24시간 편의점내에서 운영되는 세탁편의점 모노크린피아",
		"모노팰리스 건물 1층에 자리잡은 에어프라이 치킨&백반"
	]
];


var img_border = 2;
var img_margin = 4;

var img_width = 620;
var img_height = 384;
var btn_top = (img_height - 30) / 2;
var img_wrap_width = img_width + (img_margin * 2);

var side_width = (total_width - img_wrap_width) / 2 - 1;
//var navi_img_width = (img_wrap_width - (img_margin * 2 * navi_total)) / navi_total;
var navi_img_width = 117;
var navi_img_height = 100;

var autoSlide;	// 슬라이드 자동 실행

var numCurr;	// 현재 큰 번호
var hidCurr;	// 현재 작은 번호

var mouseOver;		// 마우스 오버 상태

if(_title == 1)			_title = "inline";
else					_title = "none";
if(_title_type == 0){
	_title_type = "top";
}else{
	_title_type = "bottom";
}

var slide = {
	start: function(){
		// CSS 설정
		$("#jwSlide_wrap").css({"width":total_width, "border":"0px"});
		$("#jwSlide_center").css({"float":"left"});
		$(".jwSlide_btn").css({"width":side_width, "float":"left"});
		$(".jwSlide_btn .btn").css({"position":"relative", "top":btn_top, "margin":img_margin, "opacity":"0.5"});
		$("#jwSlide_left .btn").css({"float":"right"});
		$("#jwSlide_right .btn").css({"float":"left"});

		$("#jwSlide_view").css({"width":img_width, "border":img_border+"px solid #e2e2e2", "margin":img_margin - img_border});
		$("#jwSlide_view #img_view").css({"width":img_width, "bottom":"0px", "position":"absolute"});

		$("#jwSlide_navi").css({"width":img_wrap_width});
		$("#jwSlide_navi_text").css({"height":"20px"});
		
		$("#jwSlide_view .view_title").css({"width":img_width, "position":"absolute", "bottom":"0px", "display":_title});
		$("#jwSlide_title_bg").css({"height":"30px", "background-color":"black", "opacity":"0.5"});
		$("#jwSlide_title").css({"height":"22px", "color":"white"});
		
		var print_navi = "";
		var print_text = "";
		var print_icon = "";
		for(var j = 0; j < navi_total; j++){
			print_navi += '<td><a href="javascript:slide.view('+(j+1)+', 1);"><img src="'+_img+'/main_'+(j+1)+'_s.jpg?ver='+date+'" class="img_navi" id="img_navi_'+(j+1)+'" alt="충남 아산의 명품 랜드마크!" onmouseover="javascript:slide.navi_over('+(j+1)+');" onmouseout="javascript:slide.navi_over(0);" /></a></td>';
			
			print_icon += '<td id="jwSlide_hide_'+(j+1)+'" class="jwSlide_hide">';
			for(var k = 1; k <= hide_total[j]; k++){
				print_icon += '<img id="hide_'+(j+1)+'_'+k+'" class="hide" src="">';
			}
			print_icon += '</td>';

			print_text += '<td>'+navi_text[j]+'</td>';
		}
		$("#jwSlide_navi_thumb").html(print_navi);
		$("#jwSlide_navi_text").html(print_text);
		$("#jwSlide_navi_icon").html(print_icon);


	
		slide.view(1, 1);		// 초기 화면 1, 1로 시작
	},

	view: function(num, hide){
		clearTimeout(autoSlide);	// 이전에 실행되던 슬라이드 자동실행 중지
		numCurr = num;
		hidCurr = hide;

		var count = hide;

		for(var i = 1; i < num; i++){
			count = count + hide_total[i-1];
		}


		$("#jwSlide_view #img_view").fadeOut(200, function(){
			$("#jwSlide_view #img_view").attr("src", _img+"/main_"+num+"_"+hide+".jpg?ver="+date);
			$("#jwSlide_view #img_view").fadeIn(200);
		});

		
		$(".hide").attr("src", _img+"/dot.jpg");
		$(".hide").css({"margin":"1px"});
		$("#hide_"+num+"_"+hide).attr("src", _img+"/dot_ov.jpg");
		$(".jwSlide_hide img").hide();
		$("#jwSlide_hide_"+num+" img").show();

		$("#jwSlide_navi .img_navi").css({"width":navi_img_width, "float":"left", "margin":img_margin, "opacity":"0.5", "border":"0px"});
		$("#jwSlide_navi td").css({"text-align":"center"});
		$("#img_navi_"+num).css({"margin":img_margin - img_border, "border":img_border+"px solid #eb1c24", "opacity":"1"});
		$("#jwSlide_title_text").text(pic_title[numCurr-1][hidCurr-1]);
		$("#jwSlide_title_no").text(count+"/"+pic_total);

		//$("#jwSlide_left .btn_link").attr("href", "javascript:slide.view("+numPrev+")");
		//$("#jwSlide_right .btn_link").attr("href", "javascript:slide.view("+numNext+")");
		if(_auto == 1){
			if(mouseOver != "over"){
				autoSlide = setTimeout("slide.next()", 5000);
			}
		}
	},

	next: function(){
		if(hidCurr < hide_total[numCurr-1]){
			hidCurr++;
		}else{
			hidCurr = 1;
			if(numCurr < navi_total){
				numCurr++;
			}else{
				numCurr = 1;
			}
		}
		slide.view(numCurr, hidCurr);
	},

	prev: function(){
		if(hidCurr > 1){
			hidCurr--;
		}else{
			if(numCurr > 1){
				numCurr--;
			}else{
				numCurr = navi_total;
			}
			hidCurr = hide_total[numCurr-1];
		}
		slide.view(numCurr, hidCurr);
	},
	

	btn_over: function(on){
		if(on == "prev"){
			$("#jwSlide_left .btn").css({"opacity":"1"});
		}else if(on == "next"){
			$("#jwSlide_right .btn").css({"opacity":"1"});
		}else{
			$(".jwSlide_btn .btn").css({"opacity":"0.5"});
		}
	},
	
	img_over: function(over){
		mouseOver = over;
		if(mouseOver == "over"){
			clearTimeout(autoSlide);
		}else{
			if(_auto == 1){
				autoSlide = setTimeout("slide.next()", _term);
			}
		}
	},
	
	navi_over: function(num){
		$("#jwSlide_navi .img_navi").css({"opacity":"0.5"});
		$("#img_navi_"+numCurr).css({"opacity":"1"});
		if(num != 0){
			$("#img_navi_"+num).css({"opacity":"1"});
		}
	}
}



//---------------------- 모바일 ----------------------------------------------//
var m_auto = 1;		// 자동 슬라이드


var m_slide = {
	start: function(){
		// CSS 설정
		$("#jwSlide_m_navi").css({"margin-top":"10px", "padding":"0px"});
		$("#jwSlide_m_navi IMG").css({"width":"17%", "float":"left"});

		m_slide.view(1);		// 초기 화면 1, 1로 시작
	},

	view: function(num){
		clearTimeout(autoSlide);	// 이전에 실행되던 슬라이드 자동실행 중지
		numCurr = num;

		$("#jwSlide_m_view #img_view").fadeOut(200, function(){
			$("#jwSlide_m_view #img_view").attr("src", "http://img.monopalace.com/m/slide_"+num+".jpg?ver="+date);
			$("#jwSlide_m_view #img_view").fadeIn(200);
		});
		$("#jwSlide_m_navi IMG").css({"margin":"3px", "opacity":"0.5", "border":"none"});
		$("#jwSlide_m_navi #img_navi_"+num).css({"opacity":"1.0", "margin":"0px", "border":"3px solid #b08f51"});

		if(m_auto == 1){
			autoSlide = setTimeout("m_slide.next()", 5000);
		}
	},

	next: function(){
		var nextNum;
		if(numCurr == 5){
			nextNum = 1;
		}else{
			nextNum = numCurr + 1;
		}
		m_slide.view(nextNum);
	}

}