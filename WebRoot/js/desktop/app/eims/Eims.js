/**
 * 教育信息管理系统
 */
Ext.define('Eims',{
	extend: 'Ext.ux.desktop.Module',
	requires:[
	'Ext.ux.desktop.Module',
	'WestPanel',
	'CenterTabPanel'
	],
	id:'eims',
	init: function(){
    	this.launcher = {
            text: '教育信息管理系统',
            iconCls:'icon-grid',
            handler : this.createWindow,
            scope: this
        };
       
    },
    /*config:[{items:[{xtype:'WestPanel'}]}],*/
    
	createWindow : function(){
    	var me=this,desktop = this.app.getDesktop();
    	var tabpanel=Ext.getCmp('mainTab');
    	var westpanel=Ext.getCmp('westPanel');
    	if(!tabpanel){
    		tabpanel=Ext.create('CenterTabPanel');
    		//return tabpanel;
    	}
    	if(!westpanel)
    	{
    		westpanel=Ext.create('WestPanel');
       	}
        var win = desktop.getWindow(me.id);
        if(!win){
        	win = desktop.createWindow({
        		id:me.id,
        		title:'教育信息管理系统',
                width:740,
                height:480,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
                layout:'border'
               // items:[{xtype:'WestPanel'}]
             	//items:[me.getWestPanel(),me.getTabPanel()]
              //  items:[{xtype:'CenterTabPanel'}]
        	});
        }
       	win.add(westpanel,tabpanel);
       	
        return win;
    }
});