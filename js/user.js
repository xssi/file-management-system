/*
* @Author: sisi
* @Date:   2018-09-29 09:08:44
* @Last Modified by:   sisi
* @Last Modified time: 2018-09-30 10:55:55
*/
$(function(){
	//获取用户数据
	var url="http://120.78.164.247:8099/manager/user/findAllUser";
	$.get(url,function(result){
		result.data.forEach(function(item,index){
			var cloneDiv=$('#usercard:first').clone(true);
			cloneDiv.removeAttr('class');
			var user=$("#usercard").parent().append(cloneDiv);
			var im=$(cloneDiv[0].children[0]);
			var trr=$(cloneDiv[0].children[1].children[0].children);
			trr.each(function(index,items){
				//头像
				if(item.userface){
					im.attr('src',item.userface);
				}else{
					im.attr('src','./images/u443.png');
				}
				//用户信息
				if(items.children[0].innerText=='id'){  
					items.children[1].innerText=item.id;
				};
				if(items.children[0].innerText=='用户名'){
					items.children[1].innerText=item.username;
				};
				if(items.children[0].innerText=='真实姓名'){
					items.children[1].innerText=item.nickname;
				};
				if(items.children[0].innerText=='email'){
					items.children[1].innerText=item.email;
				}


			});


		});
		//删除数据
		$("div#usercard").click(function(){
			var ids=this.children[1].children[0].children[0].children[1].innerHTML;
			var url="http://120.78.164.247:8099/manager/user/deleteUserById";
			var o={
				id:ids
			}
			$.get(url,o,function(result){
				if(result.status==200){
					$(".right-content").load("user.html");
				}else{
					alert("删除失败");
				}
			});
		});
		
			

		var reg=/^[a-zA-Z]\w{5,17}$/;

		//获取模态框中的数据并进行验证
		$("#confrim").click(function(){

			var arr=[];
			var val;
			var reval;
			$('input').each(function(index,item){
				if(item.value){
					if(item.type=='password'){
						if(reg.test(item.value)){
							arr.push(item.value);
							if(item.id=='pwd'){
								val=item.value;
								// console.log(val);
							}
							if(item.id=='repwd'){
								reval=item.value;
								// console.log(reval);
							}if(!val==reval){
								$("#pwd").css('border','1px solid red');
								$("#repwd").css('border','1px solid red');
							}
						}else{
							$("#pwd").css('border','1px solid red');
							$("#repwd").css('border','1px solid red');
						}
					}else{
						arr.push(item.value);
					}
				}else{
					$(item).css('border','1px solid red');
				}
			
			});
			if(arr[1]==arr[2]&&arr.length==5){
				var name=$("#name").val();
				var password=$("#pwd").val();
				var nickname=$("#nickname").val();
				var email=$("#email").val();
				
				var o={
					username:name,
					password:password,
					nickname:nickname,
					email:email,
					userface:'http://39.108.81.60:8888/group1/M00/00/02/rBApFlut6CiAXiwyAAA-jGizqRM379.jpg'
				}
				$.post("http://120.78.164.247:8099/manager/user/saveOrUpdateUser",o,function(result){
					if(result.status==200){
						$(".modal").modal('hide');
						$(".right-content").load("user.html");
					}else{
						alert("添加失败");
					}
				});
			}
			




		});
		




		//按钮弹出模态框
		$("#newAdd").click(function(){
			$("#name").css('border','1px solid #EDEDED');
			$("#pwd").css('border','1px solid #EDEDED');
			$("#repwd").css('border','1px solid #EDEDED');
			$("#nickname").css('border','1px solid #EDEDED');
			$("#email").css('border','1px solid #EDEDED');

			$("#name").val("");
			$("#pwd").val("");
			$("#repwd").val("");
			$("#nickname").val("");
			$("#email").val("");
			
			$(".modal").modal("show");
			
		});


		//按钮关闭模态框
		$(".myClose").click(function(){
			$(".modal").modal("hide");
		});





	});






});