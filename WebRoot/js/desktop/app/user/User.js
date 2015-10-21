/**
 * 用户管理
 */

Ext.define('User', {
    extend: 'Ext.ux.desktop.Module',

    requires: [    	
    	'Ext.data.Model',
        'Ext.data.Store',
        'Ext.util.Format',
        'Ext.PagingToolbar',
        'Ext.form.*',
        'Ext.selection.CheckboxModel',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.util.Format.dateRenderer',
        '*'
    ],
    
    id:'user-grid',
    title:'用户管理',
    cls:'user/Users',
    Method:'search',
    pagtbar:null,
    init: function(){
    	var me=this;
    	this.launcher = {
            text: me.title,
            iconCls:'icon-grid',
            handler : this.createWindow,
            scope: this
        };
    },
    initComponent:function(){
    	
    },
    getPathUrl:function(){
    	//var url=this.path+this.cls;
    	var url=this.cls;
    	url+="/";
    	url+=this.Method;
    	return url;
    },    
    
    getStore: function(){
    	
		Ext.define('user', {
	        extend: 'Ext.data.Model',
	        fields: [            
	            {name:'id'},
	            {name:'username'},
	            {name:'password'},
	            {name:'registertime',dateFormat:'Y-m-d H:i:s'}
	            
	        ],
	        idProperty: 'id'
	    });
	   
		var store=Ext.create('Ext.data.JsonStore', {
			storeId:'userstore',
	        pageSize: 20,
	        model: user,
	        /*fields: [            
	            {name:'id'},
	            {name:'username'},
	            {name:'password'}
	            
	        ],*/
	        remoteSort: true,
	        autoLoad:false,	        
	        proxy: {
	            // load using script tags for cross domain, if the data in on the same domain as
	            // this page, an HttpProxy would be better
	            type: 'ajax',
	            url: this.cls+'/search',
	            reader: {
	            	type : 'json',
	                root: 'result',
	                totalProperty: 'totalCount',
	                successProperty: 'success'
	            },
	            // sends single sort as multi parameter
	            simpleSortMode: true
	        },
	        sorters: [{
	            property: 'id',
	            direction: 'ASC'
	        }]
	    });
	    return store;
    },
    createWindow : function(){
        var me=this,desktop = this.app.getDesktop();
        var win = desktop.getWindow(me.id);
        if(!win){
            win = desktop.createWindow({
                id: me.id,
                title:me.title,
                width:740,
                height:480,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
                layout: 'border',
                items: [{                	
                	region:'north',
                	collapsible : true,
                	xtype:'form',
                	height:120,
                	id:'searchform',
                	//layout:'table',
                	layout: {
				        type: 'hbox',
				        align: 'left'
				    },
                	border: false,
			        fieldDefaults: {
			            labelWidth: 60,
			            labelAlign: 'right'
			        },
			        defaultType: 'textfield',
                	items:[{
						fieldLabel: '姓名',
						name: 'filter_LIKE_username',
						//width:200,
						anchor: '100%'
						},{
						fieldLabel: '密码',
						name: 'filter_LIKE_password',
						//width:200,
						anchor: '100%'
					},{
						xtype:'datefield',
						fieldLabel:'注册时间',
						format:'Y-m-d',
						name:'filter_LIKE_registertime',
						maxValue:new Date()
					}],
				
				buttons:[{text:'搜索',iconCls:'search',handler:function(){
								
						var formPanel = this.up('form');
						var	params = formPanel.getForm().getValues() || {};
							
						var	bsParams = {start: 0, limit: 20,page:1};
						var	_params = {};
						var	grid = me.getGrid();
						var	store = grid.getStore();
						for(var p in params){
							if(!Ext.isEmpty(params[p])){//将没有值的属性排除
								_params[p] = params[p];
								console.log("param p:{0},val:{1}", p, _params[p]);
							}			
						}
						store.removeAll();
						//store.params = Ext.apply(_params, bsParams);
						store.load({params:Ext.apply(_params, bsParams)});	
						Ext.example.msg('温馨提醒',"数据刷新成功");
				}},{text:'重置',iconCls:Ext.baseCSSPrefix + 'tbar-loading',handler:function(){
					this.up('form').getForm().reset();
				}}]
				},{
                	border: false,
                	region:'center',
                    xtype: 'grid',
                    id:'gridpanel',                   
                    store:this.getStore() ,
                    selModel: Ext.create('Ext.selection.CheckboxModel'),
			        columns:[Ext.create('Ext.grid.RowNumberer'),{        	
			         	text:'姓名',
			         	width:120,
			         	dataIndex:'username',
			         	sortable:true
			         },{
			         	text:'密码',
			         	dataIndex:'password',
			         	width:150,
			         	sortable:true
			         },{
			         	text:'注册时间',
			         	dataIndex:'registertime',
			         	//format : 'Y-m-d',
			         	renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
			         	sortable:true,
			         	flex:1
			         }],
			         tbar:[{
			         	text:'新增',
			         	iconCls: 'add',
			         	scope:this,
			         	handler:function(){
			         		this.Method='create';
			         		this.getFormWindow().setTitle("新增");
			         		this.getFormWindow().show();			         		
			         		this.getForm().getForm().reset();			         		
			         	}
			         },'-',{
			         	text:'编辑',
			         	scope:this,
			         	iconCls: 'edit',
			         	handler:function(){			         			
			         		var records=this.getGrid().getSelectionModel().getSelection();
			         		var i=records.length;
			         		this.Method='save';
			         		if(i==1)
			         		{
			         			this.getFormWindow().setTitle("编辑");
			         			this.getFormWindow().show(); 
			         			this.getForm().getForm().reset();
			         			//this.getForm().getForm().loadRecord(records[0]);
			         			this.loadSpecialRecord(records[0].data,'model');
			         			        			
			         		}else if(i==0)
			         		{
			         			Ext.Msg.alert('温馨提醒','请选择要编辑的记录！');
			         		}else if(i>1)
			         		{
			         			Ext.Msg.alert('温馨提醒','一次只能编辑一条记录！');         		
			         		}
			         	}
			         },'-',{
			         	text:'删除',
			         	iconCls: 'delete',
			         	scope:this,
			         	handler:function(){
			         		var records=this.getGrid().getSelectionModel().getSelection();
			         		var i=records.length;			         	
			         		var record=records[0];
			         		var ids=[];
			         		this.Method='delete';
			         		if(i==0)
			         		{
			         			Ext.Msg.alert('温馨提醒','你没有选择记录！');
			         			return;
			         		}      		
			         		
			         		for(var i=0,len=records.length; i<len; i++){
								ids.push(records[i].get("id"));
							}
							console.log("id data:{ids}"+ids)
			         		Ext.Msg.confirm('温馨提醒','你确定删除所选择的记录？',function(btn,text){
			         			if(i>=1 && btn=='yes')
			         			{
			         				Ext.Ajax.request({
								    url: this.getPathUrl(),
								    timeout: 60000,
								    params: {
								        "id": ids
								    },
								    scope:this,
								    success: function(response){
								        var text = response.responseText;
								        var result=Ext.decode(text);
								      	var store =me.getGrid().getStore();
								        Ext.example.msg('温馨提醒',result.msg);
								        for(var i=0,len=records.length; i<len; i++){
											store.remove(records[i]);
										}
										store.load();
								       // Ext.Msg.alert('温馨提醒',result.msg);				        
								    },
								    failure:function(response){
						    		    var text = response.responseText;
								        var result=Ext.decode(text);
								        Ext.example.msg('温馨提醒',result.msg);
								        Ext.Msg.alert('温馨提醒',result.msg);
								    }
									}); 
			         			}else
			         			{
			         				return;
			         			}
			         		},this);         		
			         	}
			         }],
			         bbar: pagtbar=Ext.create('Ext.PagingToolbar',{
			      		store: Ext.data.StoreManager.lookup('userstore'),
			            displayInfo: true,
			            displayMsg: '当前显示 {0} - {1} 共 {2}',
			            emptyMsg: "没有记录",
			            refreshText:'刷新',
			            prevText:'上一页',
			            nextText:'下一页',
			            firstText:'第一页',
			            afterPageText:'页',
			            beforePageText:'第',
			            lastText:'最后页'
			        
			          }),
			          listeners:{			          
			          	afterrender : function(){
			          		this.getStore().load();
			          	} 	
			          }                	
                        
    			}]
			})
        }	       
        win.show();
        return win;
    },
    getGrid : function(){
    	// Ext.example.msg('温馨提醒',this.ownerCt);
    	return Ext.getCmp('gridpanel');;
    },
    refreshGrid : function(){
		var pbar = pagtbar;
		if(pbar){
			this.getStore().removeAll(true);
			pbar.doRefresh();
		}
	},
    getForm:function(){
    	var form=Ext.getCmp('userform');
    	if(!form)
    	{
    	    form=Ext.create('Ext.form.Panel',{
			border: false,
			//frame:true,
			id:'userform',
		    fieldDefaults: {
		        labelWidth: 70,
		        labelAlign:'right'
		    },
		    url: this.getPathUrl(),
		    defaultType: 'textfield',
		   // bodyPadding: 5,
		    items: [{
		    	xtype:'hidden',
		    	name:'model.id'
		    },{
		        fieldLabel: '姓名',
		        name: 'model.username',
		        allowBlank:false,
		        emptyText:'姓名不能为空！',
		        msgTarget:'姓名不能为空！',
		        anchor:'100%'  
		    },{
		        fieldLabel: '密码',
		        allowBlank:false,
		        emptyText:'密码不能空！',
		        name: 'model.password',
		        anchor: '100%'  
		    }]
			});
    	}
    	return form;
    },
    getFormWindow:function(){    
    	 var  me=this,desktop = me.app.getDesktop();
    	//var window=Ext.getCmp('usernew-window');
    	var  win = desktop.getWindow('usernew-window');
    	if(!win){
    		win=desktop.createWindow({
			title:'新增',
			width:350,
			id:'usernew-window',
			height:220,
			border: false,
			items:me.getForm(),
			minWidth: 350,
		    minHeight: 220,
		    //closeAction:'hide',
		    layout: 'fit',
		    //renderTo:Ext.getBody(),
		   // plain: true,
		   // scope:this,
		    buttonAlign : 'center',
			buttons:[{
				text:'保存',
				scope:me,
				iconCls: 'save',
				handler: function(){				
					me.form_submit(this.getPathUrl());				
				}
			},{
				text:'重置',
				scope:me,
				iconCls:Ext.baseCSSPrefix + 'tbar-loading',
				handler:function(){
					me.getForm().getForm().reset();					
				}
			},{
				text:'取消',
				scope:me,
				iconCls:'cancel',
				handler:function(){
					me.getForm().getForm().reset();
					win.close();
				}
			}],
			listeners:{
				afterrender:function(){
					
				}
			}
			});
    	}
    win.show();    
    return win;
  },
  form_submit:function(url){
	if(this.getForm().getForm().isValid()){
		this.getForm().getForm().submit({
			clientValidation:true,
			//scope:this,
			url:url,
			waitTitle:'温馨提醒',
			waitMsg:'数据提交中...',		
			
		    scope:this,
			success:function(form,action){
				var store =this.getGrid().getStore();
					store.load();
				this.getFormWindow().close();
				//this.getStore().load();
				Ext.example.msg('温馨提醒', action.result.msg);
				//Ext.Msg.alert('温馨提醒',action.result.msg);	
			},
			failure:function(form,action){
				switch (action.failureType) {
		            case Ext.form.action.Action.CLIENT_INVALID:
		            	Ext.Msg.alert('温馨提醒', '数据验证没通过！');
		                break;
		            case Ext.form.action.Action.CONNECT_FAILURE:
		                Ext.Msg.alert('温馨提醒', '请求失败！');
		                break;
		            case Ext.form.action.Action.SERVER_INVALID:
		            	Ext.Msg.alert('温馨提醒', action.result.msg);			               
		       }
			}
		});
	}
  },
  /**
   * 
   * @param {} data Gird 行数据
   * @param {} clsName 添加model字符
   */
  loadSpecialRecord : function(data, clsName){
		if(data){
			var assetsCard = data;
			var form = this.getForm().getForm().reset();
			var id, field;
			for(var id in assetsCard){
				var fid = Ext.isEmpty(clsName) ? id : Ext.String.format("{0}.{1}", clsName, id);
				
            	if(!Ext.isFunction(assetsCard[id]) && (field = form.findField(fid))){
            		
            		field.setValue(assetsCard[id]);     
            		
            		if(!Ext.isEmpty(assetsCard[id+"CodeText"])){ //代码处理
            			field.reset();
            			field.setValue(assetsCard[id]);
            			field.setRawValue(assetsCard[id+"CodeText"]);
            		} 
            		
                	console.log("form id:{0}, value:{1}, _value:{2}", id, field.getValue(), assetsCard[id]);
                	if(form.trackResetOnLoad){
                    	field.originalValue = field.getValue();
                    }
                }
            }
		}
	}
});

