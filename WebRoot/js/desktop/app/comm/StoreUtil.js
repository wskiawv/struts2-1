/**
 * 给下拉框提供store
 */
StoreUtil = function() {
	return {
		
		PAGE_SIZE:20,
		Method:'POST',
		/**
		 * 一般index页面 grid需要的store configs中需要有参数: moduleName模块名url getFields
		 * gird需要的field
		 * 
		 */
		createGridStore : function(config) {
			return this.createStore(Ext.apply({
				url : config.url
			}, config));
		},

		/**
		 * 用于roweditor插件的sotre 当needPage属性为false时,不用分页数据
		 */
		createGroupingStore : function(config) {
			
		 
			if(config.method){
				config.proxy = new Ext.data.HttpProxy({
					url: config.url,
					method: this.Method
				});
			}
			
			if (config.needPage === false) {
				return new Ext.data.GroupingStore(Ext.apply({
					reader : new Ext.data.JsonReader({
						fields : config.fields
					}),
					url : config.url,
					autoLoad : {
						params : {
							start : 0,
							limit : PAGE_SIZE
						}
					}
				}, config));
			}

			return new Ext.data.GroupingStore(Ext.apply({
				reader : new Ext.data.JsonReader({
					fields : config.fields,
					totalProperty : 'totalCount',
					root : 'result'
				}),
				url : config.url,
				autoLoad : {
					params : {
						start : 0,
						limit : PAGE_SIZE
					}
				}
			}, config));
		},

		/**
		 * 创建用于列表的store
		 */
		createStore : function(config) {
			A.log("createCommonStore config:{0}", config);
			return new app.comm.DefaultJsonStore(Ext.apply({
				baseParams : Ext.apply({
					start : 0,
					limit : PAGE_SIZE
				}, config.params || {}),
				autoLoad : true
			}, config));
		} 
		 
	}
}()

/**
 * 默认jsonStore, 提供totalProperty跟root的值
 * 
 * @class app.comm.DefaultJsonStore
 * @extends Ext.data.JsonStore
 */
Ext.define('app.comm.DefaultJsonStore',{
	extend:'Ext.data.JsonStore',
	
	requires: [    	
    	'Ext.data.Model',
        'Ext.data.JsonStore'      
    ],
    
	constructor : function(config){
		config = Ext.apply({
			totalProperty : 'totalCount',
			root : 'result'
			/*fields : [{
				name : 'code'
			}, {
				name : 'name'
			}]*/
		}, config);
		this.callParent(config);
		
	}

});
Ext.define('app.comm.GridJsonStore',{
	extend:'Ext.data.JsonStore',
	requires: [    	
    	'Ext.data.Model',
        'Ext.data.JsonStore'      
    ],
	PAGE_SIZE:20,
	constructor : function(config){
		config=Ext.apply({
			pageSize:this.PAGE_SIZE,
			model:config.model,
			autoLoad : true,
			baseParams : Ext.apply({
					start : 0,
					limit : this.PAGE_SIZE
			}, config.params || {}),
			proxy : {
				type : 'ajax',
				url : config.url+ '/search',
				reader : {
					type : 'json',
					totalProperty : 'totalCount',
					root : 'result'
				},
				simpleSortMode : true
			},
			sorters : [{
						property : 'id',
						direction : 'ASC'
					}]
		},config);
		this.callParent(config);		
	},
	getModel:function(){
		return '';
	},
	getUrl:function(){
		return;
	}
	
});
