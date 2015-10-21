Ext.define('CenterGrid',{
	extend:'Ext.grid.Panel',
	alias:['widget.CenterGrid'],
	requires:[
		'Ext.grid.plugin.*',
		'Ext.grid.*'
	],
	
	
	
	constructor : function(config){
		var me=this;
		Ext.apply(this,{
			stripeRows: true,
        	border: true,
        	region:'center',
        	margins: "0 3 3 3",
        	loadMask: true,
        	bbar:Ext.create('Ext.PagingToolbar',{
	      		store: me.getStore(),
	            displayInfo: true,
	            displayMsg: '当前显示 {0} - {1} 共 {2}',
	            emptyMsg: "没有记录",
	            refreshText:'刷新',
	            prevText:'上一页',
	            nextText:'下一页',
	            firstText:'第一页',
	            afterPageText:'最后页',
	            beforePageText:'上一页',
	            lastText:'最后页'
	         })
			
		});
		this.callParent(arguments);
	},
	getStore:function(){
		
	}

	
});
