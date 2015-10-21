
Ext.define('CommWindow',{
	extend:'Ext.ux.desktop.Module',
	requires: [    	
    	'Ext.panel.Panel',
    	'SearchPanel',
    	'SaveButton',
    	'CancelButton'
    ],
    
    
    saveButton:null,//保存按钮
	cancelButton:null,//取消按钮
	
    initComponent : function(){
    	Ext.apply(this,{
    		xtype:'SearchPanel',
    		items:[{xtype:'text'}],
    		closable : true,
			modal : true,		
			closeAction : 'hide',
			constrainHeader : true,
			maximizable: false,
			resizable : false,
			width : 830,
			minWidth : 830,
			minHeight : 350,
			height : 350,
			plain : true,
			buttonAlign : 'center',
			layout : 'border',
			buttons : [this.getSaveButton(),
					   this.getCancelButton()]
    	});
    	this.callParent(arguments);
    },
    getSaveButton : function(){
    	if(Ext.isEmpty(this.saveButton)){
			this.saveButton = Ext.create('SaveButton',{
                url : this.getUrl()+"/create" || this.getUrl()+"/save",
                scope : this,
                handler: this.saveButtonClick
          	});
		}
		return this.saveButton;
    	
    },
    saveButtonClick : function(){
    	
    },
    
    getCancelButton : function(){
    	if(Ext.isEmpty(this.cancelButton)){
            this.cancelButton = Ext.create('CancelButton',{
                  scope : this,
                  text:'取消',
                  handler: this.cancelButtonClick
            }); 
        }
        return this.cancelButton;
    },
    cancelButtonClick :　function(){
    	this.getForm().reset();
    }
});


/*
*//**
 * 弹出窗口
 *//*
Ext.define('CommWindow',{
	extend:'Ext.panel.Panel',
	requires: [    	
    	'Ext.panel.Panel'           
    ],
	saveButton:null,//保存按钮
	cancelButton:null,//取消按钮
	
	*//**
	 * 组件初始化函数
	 *//*
	initComponent:function(){
		this.addEvents(
            *//**
            * 当窗口打开,窗口的form载入数据之后,触发的事件,可以做些载入数据之后的处理工作
            * @event
            * @param window
            * @param record
            * @param fromOwner
             *//*
            'afterrecordload'
        )
            
        this.on({
            afterrecordload : this.afterrecordload,
            scope : this
        })
        
    	this.getSaveButton().setHandler(this.saveButtonClick.createDelegate(this, [this.initialConfig.fromOwner, this]));
		this.callParent();
    	//CommWindow.superclass.initComponent.call(this);
	},
	
	*//**
	 * 构造函数
	 * @param {} config
	 *//*
	constructor : function(config){
		config =Ext.apply({
			closable : true,
			modal : true,		
			closeAction : 'hide',
			constrainHeader : true,
			maximizable: false,
			resizable : false,
			width : 830,
			minWidth : 830,
			minHeight : 350,
			height : 350,
			plain : true,
			buttonAlign : 'center',
			layout : 'border',
			buttons : [this.getSaveButton(),
					   this.getCancelButton()]
		},config);
		this.callParent(arguments);
		
	},
	afterrecordload : Ext.emptyFn,
	
	*//**
       * 保存按钮事件,子类可以覆盖实现
       * @param {} studentPanel 
       *//*
	saveButtonClick : function(ownerPanel, formWindow){
        
	},
    
      *//**
       * 关闭windows
       *//*
	closeWindow : function(){
		this.hide();
	},
      
	*//**
	* 来自的panel
	*//*
	getOwner : function(){
		return this.initialConfig.fromOwner;
	},
    
	*//**
	 * 获取保存按钮
	 * @param {} options
	 * @return {}
	 *//*
	getSaveButton : function(options){
    	if(Ext.isEmpty(this.saveButton)){ 
        	this.saveButton = new SaveButton(options||{});
        }
        return this.saveButton;
	},
    
	*//**
	 * 获取取消按钮
	 * @return {}
	 *//*
	getCancelButton : function(){
    	if(Ext.isEmpty(this.cancelButton)){ 
       		this.cancelButton = new CancelButton({
       			scope: this,
       			handler: function(){       			
       				this.closeWindow();
       			}       			
       		});
        }
        return this.cancelButton;
    },
    *//**
     * 获取表单组件Form
     * @type 
     *//*  
    getFormPanel : Ext.emptyFn
});



*//**
 * 
 * 弹出新增、编辑窗口
 *//*
Ext.define('FormWindow',{
	extend:'CommWindow',
	requires: [    	
    	'CommWindow'           
    ],
	
	createStatus : false, //是否新增状态
	moduleName: null,
	fromOwner: null,
	
	
	constructor : function(config){
		this.fromOwner = config.fromOwner;
		config = config||{};
		config = Ext.apply({		
            items : [{
            	labelWidth: this.getLabelWidth(),
            	frame: true,
            	border : false,
            	labelAlign: 'right',
            	region:'center',
            	margins:'3 3 3 3',
            	cmargins:'3 3 3 3',
                xtype : 'CommonSearchPanel',  
                autoScroll : true,                	  
            	items:this.getFormField()
			}]
		}, config);
		this.callParent(arguments);
	s
	},
	initComponent : function(){
		this.addEvents(        	
        	    *//**
      	 		 * fire when before create a new record,
      	 		 * if return false,will not fire the createRecord event
      	 		 * @event
      	 		 * @param formpanel 
      	 		 * @param grid
      	 		 * @param store
      	 		 * @param record
      	 		 *//*
      	 		'beforeCreate',
      	 		*//**
      	 		 * fire when create a new record
      	 		 * @event
      	 		 * @param formpanel 
      	 		 * @param grid
      	 		 * @param store
      	 		 * @param record
      	 		 *//*
      	 		'createRecord',
      	 		*//**
      	 		 * fire after create a new record
      	 		 * @event
      	 		 * @param formpanel 
      	 		 * @param grid
      	 		 * @param store
      	 		 * @param record
      	 		 *//*
      	 		'afterCreate',
      	 		*//**
      	 		 * fire when before update a new record,
      	 		 * if return false,the record will not be update
      	 		 * @event
      	 		 * @param formpanel 
      	 		 * @param grid
      	 		 * @param store
      	 		 * @param record
      	 		 *//*
      	 		'beforeUpdate',
      	 		*//**
      	 		 * fire when update a record
      	 		 * @event
      	 		 * @param formpanel 
      	 		 * @param grid
      	 		 * @param store
      	 		 * @param new record
      	 		 * @param index number of record
      	 		 *//*
      	 		'updateRecord',
      	 		*//**
      	 		 * fire when after update a record
      	 		 * @event
      	 		 * @param formpanel 
      	 		 * @param grid
      	 		 * @param store
      	 		 * @param record
      	 		 *//*
      	 		'afterUpdate'
        )
        
        this.on({
        	beforeCreate : this.beforeCreate,      
        	beforeUpdate :  this.beforeUpdate,
        	createRecord : this.createRecord,
        	afterCreate : this.afterCreate,
        	updateRecord : this.updateRecord,
        	afterUpdate : this.afterUpdate,
        	scope : this
        });
        this.callParent();
       
	},
	
	*//**
	 * 事件处理函数
	 * @type 
	 *//*
	createRecord : Ext.emptyFn,
	afterCreate : Ext.emptyFn,
    updateRecord : Ext.emptyFn,
    afterUpdate : Ext.emptyFn,
    getFormField: Ext.isEmpty,
    *//**
     * 点击保存按钮
     * @param {} ownerPanel
     * @param {} formWindow
     *//*
    saveButtonClick : function(ownerPanel, formWindow){
		
		var success = true,
			formPanel = formWindow.getFormPanel(),
			form = formPanel.getForm(),
	  		grid = ownerPanel.getGrid?ownerPanel.getGrid():null,
			store = grid?grid.getStore():null,
			record = ownerPanel.getCURecord?ownerPanel.getCURecord():null,
			index = store?store.indexOf(record||0):null;
		//update or add record to gird		
		if(formWindow.isCreateStatus() && this.fireEvent("beforeCreate" , formWindow.getFormPanel(), grid, store, record) !== false){ //新增
			//A.log("saveButtonClick pass beforeCreate!");
			this.fireEvent('createRecord', formWindow.getFormPanel(), grid, store, record)
		}
		if(!formWindow.isCreateStatus()){ //更新
			if(this.fireEvent("beforeUpdate" , formWindow.getFormPanel(), grid, store, record, index) !== false){
				//A.log("saveButtonClick pass beforeUpdate!");
				this.fireEvent('updateRecord', formWindow.getFormPanel(), grid, store, record, index);
			}
		}
	},
	
	*//**
	 * 新增
	 * @param {} formpanel
	 * @param {} grid
	 * @param {} store
	 * @param {} record
	 *//*
	createRecord : function(formpanel, grid, store, record){
		var url = this.getCreateUrl();
		if(Ext.isEmpty(url)){
			alert("新增url为空!");
			return false;
		}
		
		var me = this;
		AppAjax.submit({
			url : {
				url : url, //url,
				method: this.getCreateMethod()//"POST"
			},
			baseForm : this.getBaseForm(formpanel),
			success : function(){
				Msg.alert(Msg.createSuccess);
				me.hide();
				grid.refreshGrid();
			}
		})		
	},
	
	getCreateUrl : function(){
		return ACom.getUVAction(this.moduleName, "create");
	},
	
	getCreateMethod : function(){
		return ACom.getUVMethod(this.moduleName, "create");
	},
	
	*//**
	 * 更新
	 * @param {} formpanel
	 * @param {} grid
	 * @param {} store
	 * @param {} record
	 *//*
	updateRecord : function(formpanel, grid, store, record){
		var url = this.getUpdateUrl(record.get("id"));
		if(Ext.isEmpty(url)){
			alert("更新url为空!");
			return false;
		}
		
		var me = this;
		AppAjax.submit({
			url : {
				url : url, //url,
				method : POST//"put"
			},
			baseForm : this.getBaseForm(formpanel),
			success : function(){
				Msg.alert(Msg.updateSuccess);
				me.hide();
				grid.refreshGrid();
			}
		})
	},
	
	*//**
	 * 提交时baseForm,当有文件上传时form有不一样
	 * @param {} formpanel
	 *//*
	getBaseForm: function(formpanel){
		var files = formpanel.findByType("multifileuploadfield");
		var file  = formpanel.findByType("fileuploadfield");
		//A.log("getBaseForm multifileuploadfield,fileuploadfield:{0}", [files.length, file.length]);
		if(files.length == 0 && file.length == 0){
			return formpanel.getForm();
		}else{
			return  new Ext.form.BasicForm(formpanel.getEl().child("form", true).id, {
				fileUpload : true					
			});
		}
	},
	
	getUpdateUrl : function(id){
		return String.format(ACom.getUVAction(this.moduleName, "save"), id);
	},
	
	getUPdateMethod : function(){
		return ACom.getUVMethod(this.moduleName, "save");
	},
    
	
	*//**
	 * form field
	 * @type 
	 *//*
	getField : Ext.emptyFn,
 
	*//**
	 * 取得formpanel
	 * @return {}
	 *//*
	getFormPanel : function(){
		return this.get(0);
	},

	*//**
	 * berfor save 
	 * 验证输入是否合法, 如果没有修改也会返回false
	 * @param {} formPanel
	 * @return {}
	 *//*
	beforeCreate : function(formPanel, grid, store, record){
		var form = formPanel.getForm();
		//A.log("formWindow beforeSave return : {0}", form.isValid());
		return form.isValid();
	},
	
	beforeUpdate : function(formPanel, grid, store, record){
		var form = formPanel.getForm();
		//A.log("formWindow beforeSave return   valid:{0},dirty:{1}", form.isValid(), form.isDirty());
		return form.isValid() && form.isDirty();
	},
	 
	isCreateStatus : function(){
		return this.createStatus;
	},
      
	setCreateStatus : function(status){
		this.createStatus = status;
	},
	
	getLabelWidth : function(){
		return 97;
	},
	
	getFromOwner : function(){
		return this.fromOwner;
	}
	
});*/