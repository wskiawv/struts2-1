Ext.define('CenterTabPanel',{
	extend:'Ext.tab.Panel',
	alias:['widget.CenterTabPanel'],
	requires:['Ext.tab.Panel'],
	
	
	id:'mainTab',
	constructor : function(){
		var me=this;
		Ext.apply(this,{
			id:me.id,
			region:'center',
			renderTo: document.body,
			/*plugins: Ext.create('Ext.ux.TabCloseMenu',{
				closeAllTabsText:'关闭所有窗口',
				closeOthersTabsText:'关闭其他窗口',
				closeTabText:'关闭窗口'
			}),*/
			layout:'fit',
			items:[{
				title:'首页'
			}]
		});
		this.callParent(arguments);
	}
	
});
