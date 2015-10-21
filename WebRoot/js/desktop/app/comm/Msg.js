Msg=function(){

	return {
		YES : "YES",
		NO : "NO",
		OK : "OK",
		
		//delete
		delSelected : "请选择记录再进行删除!",
		deleteMsg : "你确定要删除所选择的记录吗?",
		deleteAllMsg : "你确定要删除所有的记录吗?",
		deleteSuccess : "记录成功删除!",
		deleteError : "记录删除失败:{0}",
		
		//create
		createSuccess : "记录成功新增!",
		createError : "记录新增失败:{0}",
		
		//update
		updateSuccess : "记录成功更新!",
		updateError : "记录更新失败:{0}" ,
		
		operateSuccess : "操作成功!",
		
		confirm : function(msg, callback, scope){
			Ext.MessageBox.confirm('温馨提醒', msg ,  callback, scope);
		},
		
		alert : function(msg, callback, scope){
			Ext.MessageBox.alert('温馨提醒', msg, callback, scope);
		},
		
		prompt : function(msg, callback, scope){
			Ext.MessageBox.prompt('温馨提醒', msg, callback, scope);
		}
	}
}