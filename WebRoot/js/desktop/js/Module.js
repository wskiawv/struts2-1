/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Ext.ux.desktop.Module', {
	extend:'Ext.panel.Panel',
    mixins: {
        observable: 'Ext.util.Observable'
    },
    /*requires: [    	
    	'Ext.data.Model',
        'Ext.data.Store',
        'Ext.util.Format', 
        'Ext.selection.CheckboxModel',
        'Ext.panel.Panel',
        'Ext.data.JsonStore',
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
        'app.comm.CenterGrid',  
        'app.comm.*'
    ],*/

    constructor: function (config) {
        this.mixins.observable.constructor.call(this, config);
       // this.getItems();
        this.init();
    },
	//getItems:Ext.emptyFn,
    init: Ext.emptyFn
    /**
	 * 用于组装请求URL
	 * @type 
	 */
	/*moduleName:null,//请求模块名称
	controllersName:'',//请求控制器名称
	modelName:'model',//模型名称
	formWindow:null,//新增、编辑窗口
	gridSm : null,
	CURecord : null, //新增或编辑的record, 与grid , form相关
	pagesize:20,
	searchPanelTitle:"搜索",
	getUrl : function(){
		return this.modelName+this.controllersName;
	},
	
	initComponent : function(){
        
        
        this.addEvents(
            *//**
             * fire before gird record is deleted,
             * if return false,will not delete the record
             * @event
             * @param grid that record of it
             * @param grid of store
             * @param records Array that will be deleted
             *//*
            'beforeDeleteRecord',
            *//**
             * fire gird record is deleted,
             * if  delete the record success will return true, or return false
             * @event
             * @param grid that record of it
             * @param grid of store
             * @param records Array that will be deleted
             *//*
            'deleteRecord',
            *//**
             * fire when edit button click,
             * if neet to add the head photo ,can do something 
             * @event
             * @param window
             * @param record
             *//*
            'addPhotoHead'
         )     
         
         this.on({
         	deleteRecord : this.deleteRecord,          
         	beforedestroy : function(comp){
         		//A.log("CommonOutUpdateGrid beforedestroy!");
         		if(!Ext.isEmpty(comp.formWindow)){
         			//A.log("CommonOutUpdateGrid formwindow close!");
         			if(comp.formWindow.close)
         				comp.formWindow.close();
         			if(comp.formWindow.getGrid && comp.formWindow.getGrid()){
         				comp.formWindow.getGrid().destroy();
         			}
         			comp.formWindow.destroy(); 
         		}
         		
         	},
         	show:this.doLayoutshow,
         	scope : this
         })
         
         this.getCancelButton().setHandler(this.cancelButtonClick, this);
         this.callParent();
	},
	doLayoutshow : function(){
		this.doLayout();
	},
	//搜索Panel相关函数
	*//**
	 * 子类需要覆盖此方法
	 * @type 
	 *//*
	getSearchFields:Ext.emptyFn,//搜索Panel的搜索字段构造
	getSearchFieldHeight:Ext.emptyFn,//搜索Panel高度设置
	
	saveButtonClick : Ext.emptyFn, //保存按钮单击事件
	exportButtonClick : Ext.emptyFn,//导出按钮单击事件	
	
	getStoreModel : Ext.emptyFn,//需要子类覆盖此方法返回Store模型model
	
	
    getFields:Ext.emptyFn,//此方法用于返回model中的filds配置字段
    *//**
	 * grid列模型子类需要覆盖此方法
	 *//*
	getGridColumns :Ext.emptyFn,
	*//**
	 * 按钮及单击事件处理函数
	 * @type 
	 *//*
	addButton : null, //新增按钮
 	editButton : null, //编辑按钮
 	deleteButton : null, //删除按钮
 	searchButton : null, //搜索按钮
 	saveButton : null , //保存按钮
    cancelButton : null, //取消按钮
    exportButton : null, //导出按钮		
    
    *//**
     * 获取按钮方法
     * @param {} config
     * @return {}
     *//*
    getAddButton : function(config){
    	
    	if(Ext.isEmpty(this.addButton)){
			this.addButton =Ext.create('app.comm.AddButton',{			
	            url : this.getUrl()+"/create", 
	            handler: this.addButtonClick,
	            scope : this        	
			});
    	}
		return this.addButton;
    },
    getEditButton : function(config){
    	if(Ext.isEmpty(this.editButton)){
			this.editButton = Ext.create('app.comm.EditButton',{
                url : this.getUrl()+"/save", 
                scope: this,
                handler: this.editButtonClick
            });
		}
		return this.editButton;
    },
    getDeleteButton : function(config){
    	if(Ext.isEmpty(this.deleteButton)){
			this.deleteButton = Ext.create('app.comm.DeleteButton',{
                url : this.getUrl()+"/delete", 
                scope: this,
                handler: this.deleteButtonClick
            });
		}
		return this.deleteButton;
    },
    getSearchButton : function(config){
    	if(Ext.isEmpty(this.searchButton)){
			this.searchButton = Ext.create('app.comm.SearchButton',{
                url : this.getUrl()+"/search", 
                scope : this,
                handler: this.searchButtonClick
			});
		}
		return this.searchButton;
    },
    getSaveButton : function(config){
    	if(Ext.isEmpty(this.saveButton)){
			this.saveButton = Ext.create('app.comm.SaveButton',{
                url : this.getUrl()+"/create" || this.getUrl()+"/save",
                scope : this,
                handler: this.saveButtonClick
          	});
		}
		return this.saveButton;
    },
    getCancelButton : function(config){
    	if(Ext.isEmpty(this.cancelButton)){
            this.cancelButton = Ext.create('app.comm.CancelButton',{
                  scope : this,
                  handler: this.cancelButtonClick
            }); 
        }
        return this.cancelButton;
    },
    getExportButton : function(config){
    	if(Ext.isEmpty(this.exportButton)){
    		this.exportButton = Ext.create('app.comm.ExportButton',{
    			url : this.getUrl()+"/export", 
    			scope : this,
    			handler: this.exportButtonClick
    		});
    	}
    	return this.exportButton;
    },
    
    
    *//**
     * 按钮单击事件处理函数
     *//*
    addButtonClick : function(){
    	var window = this.getFormWindow().show(this.getAddButton().el);
		window.getFormPanel().getForm().reset();	
		window.setCreateStatus(true);
		
		var record = Ext.data.Record.create(this.getFields());
		this.setCURecord(new record());
    },
    
    *//**
     * 编辑按钮单击事件处理函数
     *//*
	editButtonClick : function(){
		var grid = this.getGrid();
		var select = grid.getSelectionModel();
		var records = select.getSelections();
		if(Ext.isEmpty(records) || records.length>1){
			Msg.alert("编辑时只能选择一条记录!");
			return;
		}  
	 
		this.editRecordInWindow(records[0]);
		var w = this.getFormWindow();
		var formPanel = w.getFormPanel();
		//A.log("className:{1}, record.data:{0}", record.data, this.getClsName());
		//formPanel.loadSpecialRecord(record.data, this.getClsName());
		 
		this.setCURecord(records[0]);
		w.setCreateStatus(false);
		
		w.show(this.getEditButton().el);		
		formPanel.loadSpecialRecord(records[0].data, this.getClsName());
		
		w.fireEvent("afterrecordload", w, records[0], this);
	},
	
	*//**
	 * 删除按钮单击事件处理函数
	 *//*
	deleteButtonClick :function(){
		var grid = this.getGrid();
		var select = grid.getSelectionModel();
		var store = grid.getStore();
		var records = select.getSelections();
		if(Ext.isEmpty(records) || Ext.isEmpty(store)){
			Msg.alert(Msg.delSelected);
			return ;
		}
		
		Msg.confirm(Msg.deleteMsg, function(a, b){
			//A.log("delete message:{0}", a);
			if(a.toUpperCase() == Msg.YES){
				//删除前处理
                if(this.fireEvent('beforeDeleteRecord', this.getGrid(), store, records) !== false){
                  	//删除成功返回true后才删除store的record
                  	this.fireEvent('deleteRecord', this.getGrid(), store, records);
                }
			}			
		}, this);
	},
	*//**
	 * gird的默认删除实现
	 *//*
	deleteRecord : function(grid, store, records){
		var ids = [];
		for(var i=0,len=records.length; i<len; i++){
			ids.push(records[i].get("id"));
		}
		AppAjax.request({
			url : {
				url : this.getDeleteAction(),
				method : this.getDeleteMethod()
			},
			params : {"id": ids},
			success : function(){
				Msg.alert(Msg.deleteSuccess);
				for(var i=0,len=records.length; i<len; i++){
					store.remove(records[i]);
				}
				grid.refreshGrid();
				grid.getSelectionModel().clearSelections();
			}
		})
	},
	
	*//**
	 * 搜索按钮单击事件处理函数
	 *//*
	searchButtonClick : function(){
		var formPanel = this.getSearchFormPanel(),
			params = formPanel.getForm().getValues() || {},
			bsParams = {start: 0, limit: ACom.PAGE_SIZE},
			_params = {},
			grid = this.getGrid(),
			store = grid.getStore();
		for(var p in params){
			if(!Ext.isEmpty(params[p])){//将没有值的属性排除
				_params[p] = params[p];
				//A.log("param p:{0},val:{1}", p, _params[p]);
			}			
		}
		store.removeAll();
		store.baseParams = Ext.apply(_params, bsParams);
		store.load();
	},
	
	*//**
	 * 取消或重置按钮单击事件处理函数
	 *//*
	cancelButtonClick : function(){
		this.getSearchFormPanel().getForm().reset();
	},
	
	
	
	
	
	
	constructor:function(config){
		var me=this;
		config=Ext.apply({
			layout : 'border',
			border : false,
			items:this.getItems(config)
		},config);
		me.callParent(config);
		//app.comm.CRUDPanel.superclass.constructor.call(this,config);
	},
	getItems:function(config){
		var items=[{
			region: 'north',
			xtype:'form',
			items : this.getSearchFields(),
			height : this.getSearchFieldHeight(),
			collapsible : this.getSearchCollapsible(),
			title : this.getSearchTitle()
		},{
			region: 'center',
			xtype:'grid',
			tbar : this.getToolbar(),//增删改工具条
			store : this.getGridStore(),//数据源
			//autoExpandColumn: this.getExpand(),//自由伸缩列				 
			columns : this.getGridColumns(),//列模型
			selModel : this.getGridSm(),//选择checkbox列
			//rowTpl : this.getGridRowTpl(),  //很多内容的查看设置
			scope : this, //当前做用域
			listeners :{// grow row select event
			 	select : function(selectModel, index, rc){
			 		//A.log("rown number[{0}] is selected!", index);
			 		var records = selectModel.getSelections();
			 		//编辑按钮,多于一行不能点击编辑按钮
			 		this.getEditButton().setDisabled(records.length != 1);
			 		this.getDeleteButton().setDisabled(false);//删除按钮
			 	},
			 	selectionchange : function(selectModel, index, rc){
			 		var records = selectModel.getSelections();
			 		if(records.length == 0){
			 			this.getEditButton().setDisabled(true);//编辑按钮
			 			this.getDeleteButton().setDisabled(true);//删除按钮
			 			return ;
			 		}
			 		//当只有一行时,显示编辑按钮
			 		if(records.length==1){
			 			this.editButton.setDisabled(false);
			 		}
			 	},
			 	scope : this
			 }
		}]
		return items;
	},
	*//**
	 * 返回搜索Panel
	 * @return {}
	 *//*
	getSearchPanel : function(){
		var p = this.get(0);
		return (!Ext.isEmpty(p) && p.getXType() === 'CommonPanel') ? p : null;
	},
	
	
	
	*//**
	 * 是否可收缩Panel
	 * @return {Boolean}
	 *//*
	getSearchCollapsible:function (){
	
		return false;
	},
	*//**
	 * 搜索Panel标题
	 * @return {}
	 *//*
	getSearchTitle : function(){
		return this.searchPanelTitle;
	},
	
	//Grid相关处理函数
	*//**
	 * 增删改工具条
	 *//*
	getToolbar : function(){
		var tbar = [];				
		tbar.push(this.getAddButton());							
		tbar.push(this.getEditButton());				
		tbar.push(this.getDeleteButton());			
		//添加分隔符
		var _tbar = [];
		for(var i=0, len=tbar.length; i<len; i++){
			_tbar.push(tbar[i]);
			if(i<tbar.length-1)
				_tbar.push('-');
		}
		 
		return _tbar.length==0 ? null : _tbar;
	},
	
	*//**
	 * store数据
	 *//*
	getGridStore : function(){
		var GridStore=Ext.create('Ext.data.JsonStore',{			
				pageSize:this.pagesize,
				model : this.getStoreModel(),				
				proxy : {
				type : 'ajax',
				url : this.getUrl(),
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
		});
		return GridStore;
	},
	
	getGridSm : function(){
		
		if(Ext.isEmpty(this.gridSm)){
			this.gridSm = Ext.create('Ext.selection.CheckboxModel');
		}
		return this.gridSm;				
	},
	
	getCURecord : function(){
		return this.CURecord;
	},
	
	setCURecord : function(record){
		this.CURecord = record;
	}*/
});
