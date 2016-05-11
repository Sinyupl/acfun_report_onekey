// ==UserScript==
// @name        acfun举报
// @namespace   1
// @include     http://www.acfun.tv/*
// @include     http://acfun.tudou.com/*
// @version     1
// @grant       none

// ==/UserScript==


window.getjubk = function(data) {
	var d = new Array();
	d[0] = $(data).parent().parent().find(".name").html();
	d[1] = location.href;
	d[2] = 2;
	d[3] = $(data).parent().find(".xrze").val();
	d[4] = $(data).parent().parent().find(".index-comment").html();
	d[5] = $.parseSafe($(data).parent().parent().find(".content-comment").html());
	d[6] = 'acyw';
	d[7] = getNum($(data).parent().parent().attr("id"));
	console.log(d);
	$.post("/report.aspx", {
		defendantUsername: d[0],
		url: d[1],
		type: d[2],
		crime: d[3],
		description: d[4]+'楼,评论内容违规。',
		proof: d[5],
		captcha: d[6],
		objectId: d[7]
	}).done(function(t) {
		
		//return t.success ? console.log("success") : console.log("fail")
		if(t.success){
			$(data).parent().parent().find(".jubk_su").fadeIn();
			setTimeout(function(){
				$(data).parent().parent().find(".jubk_su").fadeOut();
			},3000);
		}
		else{
			$(data).parent().parent().find(".jubk_fa").fadeIn();
			setTimeout(function(){
				$(data).parent().parent().find(".jubk_fa").fadeOut();
			},3000);
		}
	})
}
 
window.run = function(){
	var str = "<div class='jubk'><select class='xrze'><option value='1'>色情</option><option value='2'>血腥</option><option value='3'>暴力</option>";
	str += "<option value='4'>猎奇</option><option value='5'>政治</option>";
	str += "<option value='6'>辱骂</option><option selected='selected' value='7'>广告</option><option value='8'>挖坟</option><option value='9'>其他</option></select>";
	str += "<button class='jubk_this' onclick='getjubk(this)'>提交</button></div>";
	str += "<div class='jubk_su'>举报成功</div><div class='jubk_fa'>举报失败</div>"
	$(".item-comment").append(str);

	$(".xrze").css({
		"width": "60px",
		"min-width": "60px",
		"border-radius": "5px"
	})
	$(".jubk").css({
		"position": "absolute",
		"right": 0,
		"bottom": "25px",
		"opacity": 0.3
	})
	$(".jubk_su").css({
		"position": "absolute",
		"background-color": "#3a9bd9",
		"right": 0,
		"bottom": "55px",
		"color": "#fff",
		"padding": "2px",
		"display":"none"
	})
	$(".jubk_fa").css({
		"position": "absolute",
		"background-color": "#ff3a35",
		"right": 0,
		"bottom": "55px",
		"color": "#fff",
		"padding": "2px",
		"display": "none"
	})
	$(".jubk").hover(function() {
		$(this).css("opacity", 1);
	})
	$(".jubk").mouseleave(function() {
		$(this).css("opacity", 0.1);
	})
}

window.getNum = function(text){
var value = text.replace(/[^0-9]/ig,"");
return value;
}
//setTimeout("run()",5000);
$("html body").animate({
	scrollTop:0
})

$(window).scroll(function(){
	if($(document).scrollTop()>200){
		
		var obj = $(".jubk").html();
		if(!obj){
		   run();
		}
	}
})