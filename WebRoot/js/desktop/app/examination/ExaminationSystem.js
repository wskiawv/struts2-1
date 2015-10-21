/**
 * 考试管理系统
 */
Ext.define('ExaminationSystem',{
	extend:'',
	
	id:'examinationsystem',
	windowId:'examinationsystemwin',
	title:'考试管理系统',
	init : function() {
		var me=this;
		this.launcher = {
			text : me.title,
			iconCls : 'notepad',
			handler : this.createWindow,
			scope : this
		}
	},
	
	
	createWindow:function(){
		var me = this, desktop = me.app.getDesktop(), win = desktop.getWindow(me.id);
		if(!win){
			win=desktop.createWindow({
				id : me.id,
				title : me.title,
				/*
				 * maximizable:true, minimizable:true,
				 */
				width : 740,
				height : 480,
				iconCls : 'video',
				animCollapse : false,
				constrainHeader : true,
				border : false,
				layout : 'border',
				itesm:[]
			});
		}
		return win;
	}
})