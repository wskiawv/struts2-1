Ext.define('User', {
    extend: 'Ext.ux.desktop.Module',
    //extend: 'app.comm.CRUDPanel',
	//mixins:['app.comm.CRUDPanel'],
    requires: [    	
    	'Ext.data.Model',
        'Ext.data.Store',
        'Ext.util.Format',
        'Ext.PagingToolbar',
        'Ext.form.*',
        'Ext.selection.CheckboxModel',
        'Ext.panel.Panel',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.form.Panel',
        //'app.comm.GridJsonStore',
        //'app.comm.CommButton',
        'app.comm.AddButton',
        'app.comm.EditButton',
        'app.comm.DeleteButton',
        'app.comm.SearchButton',
        'app.comm.SaveButton',
        'app.comm.CancelButton',
        'app.comm.ExportButton',
        'app.comm.SearchPanel',
        'app.comm.CommWindow',       
        'app.comm.CRUDPanel',
        'app.comm.*',
        '*'
    ],
    id:'user-grid',
    storeid:'user-store',
    moduleName:"user",//请求模块名称
    modelName:'usermodel',
	controllersName:"/Users",//请求控制器名称
    init: function(){
    	this.launcher = {
            text: '用户',
            iconCls:'icon-grid',
            handler : this.createWindow,
            scope: this
        };
       // this.getGridStore().load();
    },
    createWindow : function(){
    	var me=this,desktop = this.app.getDesktop();
        var win = desktop.getWindow(me.id);
        if(!win){
        	win = desktop.createWindow({
        		id:me.id,
        		title:'用户',
                width:740,
                height:480,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
                layout:'border',
             	items:[me.getWestPanel(),me.getTabPanel()]
                //items:[{xtype:'CRUDPanel'}]
        	})
        }
        return win;
    },
    /**
     * 获取store的model
     */
    getStoreModel : function(){
    	var me=this;
    	return Ext.define(me.modelName,{
    		extend:'Ext.data.Model',
    		fileds:this.getFields(),
    		idProperty: 'id'
    	})
    },
    
    /**
     * 获取model中的字段fileds
     * @return {}
     */
    getFields : function(){
    	return [            
	            {name:'id'},
	            {name:'username'},
	            {name:'password'}
	            
	        ]
    },
    /*getGridColumns : function(){
    	return "username";
    },*/
    /**
     * 搜索panel的高度
     * @return {Number}
     */
    getSearchFieldHeight : function(){
    	return 200;
    },
    getGridColumns : function(){
    	//var sm=this.getGridSm();
    	var columns=[Ext.create('Ext.grid.RowNumberer'),{        	
			         	text:'姓名',
			         	width:120,
			         	dataIndex:'username',
			         	sortable:true
			         },{
			         	text:'密码',
			         	dataIndex:'password',
			         	width:150,
			         	sortable:true
			         }]
    	return columns;
    },
    /**
     * 配置查询字段
     * @return {}
     */
    getSearchFields: function(){
		return [{
			layout: 'form',			
			border: false,
	        fieldDefaults: {
	            labelWidth: 60,
	            labelAlign: 'right'
	        },
	        defaultType: 'textfield',					
			items: [{
				fieldLabel: '姓名',
				name: 'filter_LIKE_username',
				anchor: '100%'
			},{
				fieldLabel: '密码',
				name: 'filter_LIKE_password',
				anchor: '100%'
			}],
			buttons: [this.getSearchButton({text:'搜索'}), this.getCancelButton({text:'重置'})]
		}]
		
	}
    
});