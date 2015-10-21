/**
 * 默认jsonStore, 提供totalProperty跟root的值
 * 
 * @class DefaultJsonStore
 * @extends Ext.data.JsonStore
 */
Ext.define('DefaultJsonStore',{
	extend:'Ext.data.JsonStore',
	
	requires: [    	
    	'Ext.data.Model',
        'Ext.data.JsonStore'      
    ],
    
	constructor : function(config){
		config = Ext.apply({
			totalProperty : 'totalCount',
			root : 'result',
			fields : [{
				name : 'code'
			}, {
				name : 'name'
			}]
		}, config);
		//DefaultJsonStore.superclass.constructor.call(this, config);
	}

});
Ext.define('GridJsonStore',{
	extend:'Ext.data.JsonStore',
	requires: [    	
    	'Ext.data.Model',
        'Ext.data.JsonStore'      
    ],
	PAGE_SIZE:20,
	constructor : function(config){
		config=Ext.apply({
			pageSize:this.PAGE_SIZE,
			//model:config.model,
			autoLoad : true,
			/*baseParams : Ext.apply({
					start : 0,
					limit : this.PAGE_SIZE
			}, config.params || {}),*/
			proxy : {
				type : 'ajax',
				//url : config.url+ '/search',
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
		//GridJsonStore.superclass.constructor.call(this, config);
	}
	
});
