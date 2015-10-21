<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Struts 2</title>
<script src="<%=path%>/js/jquery-1.6.4.min.js"></script>
<script>
 function login(){
	 $("#loginform").submit();
 }

 function setFormValue(){
	 data={"id":22,"username":"wskiawv","password":"123"};
	 $("#loginform :input").each(function(i,item){
		 var type=$(this).attr("type");
		 var name=$(this).attr("name");
		 var inputName=$(this);
		 $.each(data,function(n,v){
			 var nn=n;
 			 var value=v;
			 if(name!=null&&name.indexOf(n)>0&&type !="button"){	
				 if(type=="text"||type=="hidden"||type=="password"){
					 $(":input[name='"+name+"']").attr("value",v);
					 var vvv=$(":input[name='"+name+"']").attr("value");
					 var dd;
					 return;
				 }
				 //$(name).attr("value",v);
			 }
		 });
	 });
 }
 
</script>
</head>
<body>
	<form action="user.action" id="loginform" method="post">
		id:<input type="hidden" name="user.id">
		用户名：<input type="text" name="user.username"><br>
		密码：<input type="password" name="user.password"><br>
		<input type="button" value="提交" onclick="login()">
		<input type="button" value="测试" onclick="setFormValue();">
	</form>
</body>
</html>