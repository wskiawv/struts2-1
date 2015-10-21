Ext.define('app.student.Student',{
	extend:'CRUDPanel',
	ailias:['wegdit.Student'],
	requires:['CRUDPanel'],
	
	moduleName:"sutdent",//请求模块名称
    modelName:'student',
	controllersName:"/Students",//请求控制器名称
	getStoreModel : function(){
    	var me=this;
    	return Ext.define(me.modelName,{
    		extend:'Ext.data.Model',
    		fileds:me.getFields(),
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

    /**
     * 搜索panel的高度
     * @return {Number}
     */
    getSearchFieldHeight : function(){
    	return 200;
    },
    getGridColumns : function(){    	
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
     * 配置搜索字段
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
				name: 'filter_LIKE_xm',
				anchor: '100%'
			},{
				fieldLabel: '学号',
				name: 'filter_LIKE_xh',
				anchor: '100%'
			}],
			buttons: [this.getSearchButton({text:'搜索'}), this.getCancelButton({text:'重置'})]
		}]
		
	}
});
