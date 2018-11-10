/*
* @Author: sisi
* @Date:   2018-09-27 19:05:37
* @Last Modified by:   sisi
* @Last Modified time: 2018-10-09 10:56:45
*/
$(function(){
	//查询获取所有数据
	$.get("http://120.78.164.247:8099/manager/category/findAllCategory",function(result){
		var lanmus=result.data;
		// console.log(lanmus);
		lanmus.forEach(function(item){
			//克隆被隐藏的tr
			
			var cloneTr=$(".hidden").clone();
			cloneTr.removeAttr('class');
			//给tr中添加数据
			cloneTr.children(":first").children(":first").val(item.id); //获取第一个td中input的id值
			$(cloneTr.children()[1]).text(item.name);
			$(cloneTr.children()[3]).text(item.comment);
			
			if(item.parent){
				$(cloneTr.children()[2]).text(item.parent.name);
				var option="<option value='"+item.id+"'>"+item.parent.name+"</option>";
				$("#parent").append(option);
			}else{
				$(cloneTr.children()[2]).text("无");
			}



			//添加tr
			$("tbody").append(cloneTr);
			
			//给父栏目的option添加选项
			

		});


		//批量删除
		$(".batchDelete").click(function(){
			var ids=[];
			$(".myCheck:checked").each(function(index,item){
				var id=$(item).val();
				ids.push(id);
			});
			if(ids.length){
				var o={
					ids:ids.toString()
				}
				// console.log(o);
				$.post("http://120.78.164.247:8099/manager/category/batchDeleteCategory",o,function(result){
					if(result.status==200){
						$(".right-content").load("lanmu.html");
					}else{
						alert("删除失败");
					}
				});
			}else{
				alert("请选择要删除的信息");
			}
		});

		//单一删除
		$(".deleteById").click(function(){
			var id=$(this).parent().parent().children(":first").children().val();
			var o={
				id:Number(id)
			}
			$.get("http://120.78.164.247:8099/manager/category/deleteCategoryById",o,function(result){
				if(result.status==200){
					$(".right-content").load("lanmu.html");
				}else{
					alert('删除失败');
				}
			})
		});


		//添加按钮
		$(".newAdd").click(function(){
			//清空输入框内已有内容
			$("#lanname").val("");
			$("#desc").val("");
			$("#parent").val("");
			$(".hiddenId").val("");
			//显示模态框
			$(".modal").modal('show');
			//修改模态框标题
			$(".myTitle").text("添加栏目信息");
		});	


		//修改按钮
		$(".updata").click(function(){
			$(".myTitle").text("修改栏目信息");
			$(".modal").modal('show');
			//获取当前输入框中的数据
			var name=$(this).parent().parent().children()[1].innerHTML;
			var desc=$(this).parent().parent().children()[3].innerHTML;
			var parent=$(this).parent().parent().children()[2].innerHTML;
			var hiddenId=$(this).parent().parent().children(":first").children().val();
			console.log(hiddenId);
			
			//获取当前输入框的id值并赋给select option
			// var id=lanmus.filter(function(item){
			// 	return item.name==parent;
			// })[0].id;
			
			
			$("#lanname").val(name);
			$("#desc").val(desc);
			$("#parent").val(hiddenId);
			$(".hiddenId").text(hiddenId);
		});


		//模态框取消按钮
		$(".myClose").click(function(){
			$(".modal").modal('hide');
		});
		//模态框确定按钮
		$(".confrim").click(function(){
			var name=$("#lanname").val();
			var desc=$("#desc").val();
			var parent=$("#parent").val();
			var hiddenId=$(".hiddenId").text();
			if(hiddenId){
				//此时id存在，应该修改
				if(name && desc){
					if(parent){
						var o={
							id:hiddenId,
							name:name,
							comment:desc,
							parentId:parent,
							no:1
						}
					}else{
						var o={
							id:hiddenId,
							name:name,
							comment:desc,
							no:1
						}
					}
					
				}else{
					alert("请输入信息");
				}
			}else{
				//此时id不存在，应该新增
				if(name && desc){
					if(parent){
						var o={
							name:name,
							comment:desc,
							parentId:parent,
							no:1
						}
					}else{
						var o={
							name:name,
							comment:desc,
							no:1
						}
					}
					
				}else{
					alert("请输入信息");
				}
			}
			$.post("http://120.78.164.247:8099/manager/category/saveOrUpdateCategory",o,function(result){
				if(result.status==200){
					$(".modal").modal('hide');
					$(".right-content").load("lanmu.html");
				}
			});
		});

		









	});
});