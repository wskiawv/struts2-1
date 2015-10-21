Ext.define('commButton',{
	extend:'Ext.button.Button',
	requires:[
		'Ext.button.Button'		
	],
	constructor : function(config){
		
		/*var url = config.url, hide = false;
		if(!Ext.isEmpty(url)){
		 	hide = true;
		}*/
		config=Ext.apply({
			hideMode: 'visibility'
			//hidden : hide 
		},config);
		this.callParent(arguments);
		
	}
});


/**
 * 新增
 */
Ext.define('AddButton',{
	extend:'commButton',
	
	requires:[
		'commButton'		
	],
	constructor : function(config){
		config = Ext.apply({
			text : '新增', 
			iconCls: 'add'
		}, config);
		this.callParent(arguments);
		
	}		
});

/**
 * 编辑
 */
Ext.define('EditButton',{
	extend:'commButton',
	
	requires:[
		'commButton'		
	],
	constructor : function(config){
		config = Ext.apply({
			text : '编辑', 
			iconCls: 'edit',
			disabled:true
		}, config);
		this.callParent(arguments);
	
	}		
});

/**
 * 删除
 */
Ext.define('DeleteButton',{
	extend:'commButton',
	
	requires:[
		'commButton'		
	],
	
	constructor : function(config){
		config = Ext.apply({
			text : '删除', 
			iconCls: 'delete',
			disabled:true
		}, config);
		this.callParent(arguments);
		
	}		
});

/**
 * 保存
 */
Ext.define('SaveButton',{
	extend:'commButton',
	
	requires:[
		'commButton'		
	],
	
	constructor : function(config){
		config = Ext.apply({
			text : '保存', 
			iconCls: 'save'
		}, config);
		this.callParent(arguments);
		
	}		
});

/**
 * 取消
 */
Ext.define('CancelButton',{
	extend:'commButton',
	
	requires:[
		'commButton'		
	],
	
	constructor : function(config){
		config = Ext.apply({
			text : '取消', 
			iconCls: 'cancel'
		}, config);
		this.callParent(arguments);
		
	}		
});

/**
 * 搜索
 */
Ext.define('SearchButton',{
	extend:'commButton',
	
	requires:[
		'commButton'		
	],
	
	constructor : function(config){
		config = Ext.apply({
			text : '搜索', 
			iconCls: 'search'
		}, config);
		this.callParent(arguments);
		
	}		
});


/**
 * 导出
 */
Ext.define('ExportButton',{
	extend:'commButton',
	
	requires:[
		'commButton'		
	],
	
	constructor : function(config){
		config = Ext.apply({
			text : '导出', 
			iconCls: 'export'
		}, config);
		this.callParent(arguments);
		
	}		
});

/**
 * 导入
 */
Ext.define('ImportButton',{
	extend:'commButton',
	
	requires:[
		'commButton'		
	],
	
	constructor : function(config){
		config = Ext.apply({
			text : '导入', 
			iconCls: 'import'
		}, config);
		this.callParent(arguments);
		
	}		
});

/**
 * 打印
 */
Ext.define('PrintButton',{
	extend:'commButton',
	
	requires:[
		'commButton'		
	],
	
	constructor : function(config){
		config = Ext.apply({
			text : '打印', 
			iconCls: 'print'
		}, config);
		this.callParent(arguments);
		
	}		
});

Ext.define('DownloadButton',{
	extend:'commButton',
	
	requires:['commButton'],
	
	constructor:function(config){
		config=Ext.apply({
			text:'下载',
			iconCls:'download'			
		},config);
		this.callParent();
	}
});

Ext.define('UploadButton',{
	extend:'commButton',
	
	requires:['commButton'],
	
	constructor:function(config){
		config=Ext.apply({
			text:'上传',
			iconCls:'upload'	
		});
		this.callParent();
	}
	
	
});

Ext.define('CutButton',{
	extend:'commButton',
	requires:['commButton'],
	
	
	constructor:function(config){
		config=Ext.apply({
			text:'剪切',
			iconCls:'cut'	
		});
		this.callParent();
	}
});

Ext.define('CopyButton',{
	extend:'commButton',
	requires:['commButton'],
	
	
	constructor:function(config){
		config=Ext.apply({
			text:'复制',
			iconCls:'copy'	
		});
		this.callParent();
	}
});

Ext.define('PasteButton',{
	extend:'commButton',
	requires:['commButton'],
	
	
	constructor:function(config){
		config=Ext.apply({
			text:'粘贴',
			iconCls:'paste'	
		});
		this.callParent();
	}
});
