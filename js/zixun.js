/*
* @Author: sisi
* @Date:   2018-09-28 21:57:36
* @Last Modified by:   sisi
* @Last Modified time: 2018-09-30 15:13:26
*/
$(function(){
	//将 页数和行数给死，然后当做参数传进去
	var o={
		page:8,
		pageSize:20
	}
	//链接文章端口获取数据
	$.getJSON("http://120.78.164.247:8099/manager/article/findArticle",o,function(result){
		datas=result.data.list;
		datas.forEach(function(item,index){
			var dat=item;
			var cloneTr=$(".hidden").clone(true);
			cloneTr.removeAttr('class');
			$("tbody").append(cloneTr);
			if(dat.category){
				$(cloneTr.children()[2]).text(item.category.name);
			}
			// $(cloneTr.children()[0]).text(item.id);
			cloneTr.children(":first").children(":first").val(item.id);
			$(cloneTr.children()[1]).text(item.title);
			$(cloneTr.children()[3]).text(item.music);
			$(cloneTr.children()[4]).text(item.author);
			$(cloneTr.children()[5]).text(item.publishtime);
			$(cloneTr.children()[6]).text(item.readtimes);



			//获取所属栏目数据
			// if(item.category){
			// 	var option="<option value='"+item.id+"'>"+item.category.name+"</option>";
			// }else{
			// 	var option="<option value='"+item.id+"'>"+null+"</option>";
			// }
			// $("select").append(option);		

		})

		$.get("http://120.78.164.247:8099/manager/category/findAllCategory",function(res){
			parentdata=res.data;
			parentdata.forEach(function(item){
				var option="<option value='"+item.id+"'>"+item.name+"</option>";
				$("select").append(option);

			})
		});

		//批量删除
		$("#batchDelete").click(function(){
			var ids=[];
			$(".myCleck:checked").each(function(index,item){
				var id=$(item).val();
				ids.push(id);
			});
			console.log(ids);
			if(ids.length){
				var o={
					ids:ids.toString()
				}
				var url="http://120.78.164.247:8099/manager/article/batchDeleteArticle";
				$.post(url,o,function(result){
					if(result.status==200){
						$(".right-content").load("zixun.html");
					}else{
						alert("删除失败");
					}
				})
			}else{
				alert("请选择要删除的信息");
			}
			
		});

		//按id单一删除
		$('.deleteById').click(function(){
			var ids=$(this).parent().parent().children(":first").children().val();
			var o={
				id:ids
			}
			var url="http://120.78.164.247:8099/manager/article/deleteArticleById";
			$.get(url,o,function(result){
				if(result.status==200){
					$(".right-content").load("zixun.html");
				}else{
					alert("删除失败");
				}
			})
		});


	});
	
	$("#newAdd").click(function(){
		$("#title").val("");
		$("#category").val("");
		$("#music").val("");
		$("#author").val("");
		$("#hiddenId").text("");
		$(".modal").modal('show');
		$(".myTitle").text("发布资讯");
	});
	
	$(".updata").click(function(){
		$(".myTitle").text("修改资讯");
		$(".modal").modal('show');

		var title=$(this).parent().parent().children()[1].innerHTML;
		var category=$(this).parent().parent().children()[2].innerHTML;
		var music=$(this).parent().parent().children()[3].innerHTML;
		var author=$(this).parent().parent().children()[4].innerHTML;
		var hiddenId=$(this).parent().parent().children(":first").children().val();
		console.log(hiddenId);
		$("#hiddenId").text(hiddenId);
		
		if(category){
			var id=parentdata.filter(function(item){
				return item.name==category;
			})[0].id;
			$("#category").val(id);
		}else{
			console.log('父栏目信息获取失败');
		}
		


		$("#title").val(title);
		$("#music").val(music);
		$("#author").val(author);

	});

	$("#release").click(function(){
		var title=$("#title").val();
		var category=$("#category").val();
		var music=$("#music").val();
		var author=$("#author").val();
		var hiddenId=$("#hiddenId").text();
		if(hiddenId){
			if(title){
				if(category){
					var o={
						id:hiddenId,
						title:title,
						categoryId:category,
						music:music,
						author:author,
						liststyle:1
					}
				}else{
					var o={
						id:hiddenId,
						title:title,
						music:music,
						author:author,
						liststyle:1
					}
				}
			}else{
				alert("请输入信息");
			}
		}else{
			if(title){
				if(category){
					var o={
						title:title,
						categoryId:category,
						music:music,
						author:author,
						liststyle:1
					}
				}else{
					var o={
						title:title,
						music:music,
						author:author,
						liststyle:1
					}
				}
			}else{
				alert("请输入信息");
			}
		}
		
		
		
		$.post("http://120.78.164.247:8099/manager/article/saveOrUpdateArticle",o,function(result){
			if(result.status==200){
				$(".right-content").load("zixun.html");
			}else{
				alert("新增失败");
			}
		} )

		
	});



	$(".myClose").click(function(){
		$(".modal").modal('hide');
	});

});