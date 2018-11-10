/*
* @Author: sisi
* @Date:   2018-09-27 10:53:06
* @Last Modified by:   sisi
* @Last Modified time: 2018-09-28 09:11:55
*/
$(function(){
	// $(".left-nav").height($(window).height());
	// $(".right-content").height($(window).height());
	$("#one").click(function(){
		$(".right-content").load("shouye.html");
	});
	$("#two").click(function(){
		$(".right-content").load("lanmu.html");
	});
	$("#three").click(function(){
		$(".right-content").load("zixun.html");
	});
	$("#four").click(function(){
		$(".right-content").load("user.html");
	});
	$("#one").trigger("click");
});