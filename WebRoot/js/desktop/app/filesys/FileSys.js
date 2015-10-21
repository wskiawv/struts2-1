/**
 * 文件管理系统
 * @class Desktop.FileSys
 */
Ext.define('FileSys', {
	extend : 'Ext.ux.desktop.Module',

	requires : [
	            'Ext.form.*', 
	            'Ext.form.field.*', 
	            'Ext.tree.*', 
	            'Ext.data.*',
	            'Ext.data.reader.*',
	            'Ext.grid.*', 
	            'Ext.window.MessageBox',
	            'Ext.toolbar.Paging'
	],
	id : 'FileSys',
	windowId : 'FileSys',
	title:'文件管理',
	tipWidth : 160,
	tipHeight : 96,
	init : function() {
		var me=this;
		this.launcher = {
			text : me.title,
			iconCls : 'notepad',
			handler : this.createWindow,
			scope : this
		}
	},

	createWindow : function() {
		var me = this, desktop = me.app.getDesktop(), win = desktop.getWindow(me.id);

		if (!win) {
			win = desktop.createWindow({
				id : me.id,
				title : '文件管理',
				/*
				 * maximizable:true, minimizable:true,
				 */
				width : 740,
				height : 480,
				iconCls : 'video',
				animCollapse : false,
				constrainHeader : true,
				border : false,
				layout : 'border',
				items : [{
							region : 'west',
							title : '功能模块',
							split : true,
							width : 200,
							minWidth : 175,
							maxWidth : 400,
							collapsible : true,
							animCollapse : false,
							margins : '0 0 0 5',
							layout : 'accordion',
							border : false,
							items : [me.createTree(), {
										title : '个人网盘'
									}, {
										title : '功能3'
									}, {
										title : '功能4'
									}, {
										title : '功能5'
									}]

						}, {
							region : 'center',
							// title:'资源中心',
							layout : 'border',
							xtype:'tabpanel',
							border : false,
							items : [{
								title:'网盘所有文件',
								xtype:'panel',
								glyph: 72,
								layout:'border',
								items:[me.searchPanel(), {
								region : 'center',
								frame : true,
								layout : 'border',
								items : this.createGridPanel()
							}]
							
							},{
								title:'当前目录文件',
								glyph: 99
								
							}]
						}]
			})
		}
		if (me.tip) {
			me.tip.setTarget(win.taskButton.el);
		}
		return win;
	},
	searchPanel:function(){
		var searchpanel=Ext.create('Ext.form.Panel',{
			region : 'north',
			title : '搜索',
			height : 100,
			split : true,
			id:'sp',
			collapsible : true,
			frame : true,	
			layout: {
		        type: 'hbox',
		        align: 'left'
		    },
		    fieldDefaults: {
	            labelWidth: 80,
	            labelAlign: 'right'
	        },
			defaultType: 'textfield',
			items:[{											
					name : 'filter_LIKE_FileName',
					fieldLabel:'文件名'						
				},{
					xtype:'datefield',
					name:'filter_LIKE_FileUploadTime',
					fieldLabel:'上传时间',
					format:'Y-m-d',										
					maxValue:new Date()
				},{
					name:'filter_EQ_FileType',
					fieldLabel:'文件扩展名'
				}],			
			buttons:[{
					text : '搜索',
					iconCls:'search',
					handler : function() {
						/*var form = this.up('form').getForm(),
						params = form.getValues() || {},										
						bsParams = {start: 0, limit: 20,page:1},
						_params = {},*/
						//grid = me.createGridPanel(),
						var store = Ext.data.StoreManager.lookup('filestore');
						store.load();
						/*for(var p in params){
							if(!Ext.isEmpty(params[p])){//将没有值的属性排除
								_params[p] = params[p];
								console.log("param p:{0},val:{1}", p, _params[p]);
							}			
						}
						store.removeAll();									
						store.load({params:Ext.applyIf(_params, bsParams)});	*/
						Ext.example.msg('温馨提醒',"数据刷新成功");
					}
						
				}, {
					text : '重置',		
					iconCls:Ext.baseCSSPrefix + 'tbar-loading',
					handler : function() {
						var form = this.up('form').getForm();
						form.reset();
					}
				}]
		});
		return searchpanel;
	},
	createTreeStore :function(){
		var store = Ext.create('Ext.data.TreeStore', {
					fields:['id','text','leaf','qtip','xtype','children'],
					root:{
						text:'共享网盘',
						id:'root',
						defaultRootId:'root',
						expanded:true
					},
					proxy:{
						type:'ajax',
						url:'filesys/FileSyses/jsontree',
						reader:{
							type:'json'
						}
					},
					listeners:{
						append:function(){
							
						}
					}
		});
		return store;
	},
	createTree : function() {
		var me=this;
		
		var tree = Ext.create('Ext.tree.Panel', {
					title:'共享网盘',
					store:me.createTreeStore(),
					id:'tree2',
					rootVisible:false,
					tools:[{
						type:'refresh',
						tooltip:'刷新'
					},{
						type:'help',
						tooltip:'帮助'
					},{
						type: 'search',
						tooltip:'查找'
					}],
					tbar:[{
						text:'刷新',
						iconCls:Ext.baseCSSPrefix + 'tbar-loading',
						handler:function(){
							me.createTreeStore().load();
						}
					},{
						text:'全部折叠',	
						iconCls:'add',					
						handler:function(){
							tree.collapseAll();
						}						
					},{
						text:'全部展开',	
						iconCls:'delete',					
						handler:function(){
							tree.expandAll();
						}						
					}],
					listeners:{
						//scope:me,
						itemclick:function(view,record,item,index,e){
							var selectNode=Ext.getCmp('tree2').getSelectionModel().getSelection();
							console.info(selectNode);
							var store=me.createTreeStore();
							var root=store.getRootNode();
							//debugger;
							var node={"id":9483,"text":"测试","leaf":false,"qtip":"2015-03-29","xtype":"School","children":[]};
							root.appendChild(Ext.encode(node));
							//var root1=view.ownerCt.getRootNode();
							//var node=tree.getNodeById(record.get('id'));
							//var node=view.getNode(index);
							//Ext.example.msg('温馨提醒',root);
							//var params={text:record.get('text'),id:record.get('id')};
							//this.loadtreenodedata(record,index);
							//store.load({params:params});
							//store.setRootNode(index);
						},
						expand:function(treepanel){
							
						},
						collapse:function(treepanel){
							
						}
					}
		});

		return tree;
	},
	loadtreenodedata:function(record,index2){
		var me=this;
		var treepanel1=me.createTree();
		var root2=treepanel1.getRootNode();
		var _params={text:record.get('text'),id:record.get('id')};
		Ext.Ajax.request({
			url:'filesys/FileSyses/jsontree',
			params:{text:record.get('text'),id:record.get('id')},
			suceess:function(response){
				var node = Ext.decode(response.responseText);
				Ext.example.msg('温馨提醒',node);
				root2.insertChild(record.get('id'),node);
			},
			failure:function(response){
				Ext.example.msg('温馨提醒',"获取节点失败！");
			}
		});
	},
	createGridStore:function(){
		var store = Ext.create('Ext.data.JsonStore', {
					storeId : 'filestore',
					//autoLoad : true,
					pageSize: 20,
					model:'FileSysModel',
					//scope:me,
					listeners:{
						//scope:me,
						beforeload:function(s,operation,eOpts){
							//var form = me.searchPanel().getForm(),
							var form=Ext.getCmp('sp').getForm(),
							_params = form.getValues() || {},										
							bsParams = {start: 0, limit: 20},
							params = {};
							
							//grid = me.createGridPanel(),
							var store1 = Ext.data.StoreManager.lookup('filestore');
							for(var p in _params){
								if(!Ext.isEmpty(_params[p])){//将没有值的属性排除
									params[p] = _params[p];
									console.log("param p:{0},val:{1}", p, params[p]);
								}			
							}
							Ext.apply(s.proxy.extraParams,bsParams);							
							//Ext.apply(s.proxy.extraParams,params);	
							Ext.apply(s.proxy.extraParams,Ext.getCmp('sp').getForm().getValues());
							
							
						}
					},
					proxy : {
						type : 'ajax',
						url : 'filesys/FileSyses/search',
						reader : {
							type : 'json',
							totalProperty : 'totalCount',
							root : 'result',
							successProperty: 'success'

						},
						simpleSortMode : true
					},
					sorters : [{
								property : 'id',
								direction : 'ASC'
							}]
				});
		return store;
	},
	createGridPanel : function() {
		var me=this;
		/*var form = me.searchPanel().getForm(),
		//var form=Ext.getCmp('sp').getForm(),
			params = form.getValues() || {},										
			_params = {};
		for(var p in params){
			if(!Ext.isEmpty(params[p])){//将没有值的属性排除
				_params[p] = params[p];
				console.log("param p:{0},val:{1}", p, _params[p]);
			}			
		};*/
		
		var Grid = Ext.create('Ext.grid.Panel', {
					title : '资源中心',
					// frame:true,
					region : 'center',
					autoScroll : true,
					store :me.createGridStore(),// Ext.data.StoreManager.lookup('filestore'),
					autoExpandColumn : 'UploadUser',
					tbar:[{
						text:'主目录',
						iconCls:'main',
						scope:this,
						handler:function(){
							
						}
					},{
						text:'上一级目录',
						iconCls:'black',
						scope:this,
						handler:function(){
							
						}
					},{
						text:'新建目录',
						iconCls:'new',
						scope:this,
						handler:function(){
							
						}
					},{
						text:'复制',
						iconCls:'add',
						scope:this,
						handler:function(){
							
						}
					},{
						text:'剪切',
						iconCls:'add',
						scope:this,
						handler:function(){
							
						}
					},{
						text:'粘贴',
						iconCls:'add',
						scope:this,
						handler:function(){
							
						}
					},{
						text:'删除',
						iconCls:'delete',
						scope:this,
						handler:function(){
							
						}
					},{
						text:'在线预览',
						iconCls:'add',
						scope:this,
						handler:function(){
							var records=Grid.getSelectionModel().getSelection();
							me.onLineShow(records);			         		
						}
					},{
						text:'上传',
						iconCls:'add',
						scope:this,
						handler:function(){
							me.upload();
						}
					},{
						text:'下载',
						iconCls: 'add',
			         	scope:this,
			         	handler:function(){
			         		var records=Grid.getSelectionModel().getSelection();
			         		me.download(records);			         		
			         	}
					}],
					selModel: Ext.create('Ext.selection.CheckboxModel'),
					columns : [{
								xtype: 'rownumberer'							
							},/* {
				                xtype: 'actioncolumn',
				                width: 25,
				                sortable: false,
				                menuDisabled: true,
				                items: [{
				                    iconCls: 'delete',
				                    tooltip: '图标',
				                    scope: this,
				                    handler: this.onRemoveClick
				                }]
				            }*/{
				            	//xtype: 'actioncolumn',
				            	width:25,
				            	//menuDisabled: true,
				            	//scope:this,
				            	sortable : true,
				            	dataIndex : 'FileType',
				            	//scope:this,
				            	renderer:function(value){
				            		var iconxtype=value.toLocaleLowerCase();
									return Ext.String.format('<img src="public/javascripts/desktop/images/{0}.gif" class="doc"/>',iconxtype);
				            	}
				            },{
								text : '文件名称',
								dataIndex : 'FileName',
								sortable : true,
								width:200,
								flex : 1
							}, {
								text : '文件路径',
								dataIndex : 'FilePath',
								sortable : true,
								width:100
							}, {
								text : '文件大小',
								dataIndex : 'FileSize',
								sortable : true,
								width:100
							}, {
								text : '文件类型',
								dataIndex : 'FileType',
								sortable : true,
								width:100
							}, {
								text : '文件用途',
								dataIndex : 'FileUse',
								sortable : true,
								width:100
							}, {
								text : '上传时间',
								dataIndex : 'FileUploadTime',
								width:150,
								sortable : true
							}, {
								text : '上传用户',
								dataIndex : 'UploadUser',
								sortable : true,
								width:100
							}],
					listeners:{
						scope:me,
						itemdblclick:function(Grid,record,item,index,e){
							var records=Grid.getSelectionModel().getSelection();
							me.onLineShow(records);
						},
						afterrender:function(grid){
							var store=grid.getStore();
							store.load();
						}
					},
					dockedItems : [{
								xtype : 'pagingtoolbar',
								store : Ext.data.StoreManager.lookup('filestore'), // same store
								// GridPanel is
								// using
								dock : 'bottom',
								displayInfo : true,
								displayMsg: '当前显示 {0} - {1} 共 {2}',
					            emptyMsg: "没有记录",
					            refreshText:'刷新',
					            prevText:'上一页',
					            nextText:'下一页',
					            firstText:'第一页',
					            afterPageText:'页',
					            beforePageText:'第',
					            lastText:'最后页'
							}]
				});
		return Grid;
	},
	iconRenderer:function(value,record){
		var iconxtype=record.get("FileType").toLocaleLowerCase();
		//Ext.example.msg('温馨提醒',iconxtype);
		//if(iconxtype=="doc"||iconxtype=="docx"){
			//return '<img class="doc"/>';
		
			
		//}
	},
	/**
	 * 在线预览
	 */
	onLineShow:function(records){
		var i=records.length;			         	
 		var record=records[0];
 		var ids=[];
 		//this.Method='delete';
 		var filextype=records[0].get("FileType").toLocaleLowerCase();
 		var filename=records[0].get("FileName");
 		var index=records[0].get("FilePath").indexOf(records[0].get("FileType"));
 		var filepath=records[0].get("FilePath").substring(0,index)+"swf";
 		if(i==0)
 		{
 			Ext.Msg.alert('温馨提醒','你没有选择记录！');
 			Ext.example.msg('温馨提醒',"你没有选择记录");
 			return;
 		}else if(i>1){
 			Ext.example.msg('温馨提醒',"一次预览一个文件！");
 			return;
 		}
 		if(filextype=="jpg"||filextype=="png"||filextype=="gif"||filextype=="doc"||filextype=="docx"||filextype=="ppt"||filextype=="pptx"||filextype=="xls"||filextype=="xlsx"||filextype=="txt"||filextype=="swf"||filextype=="pdf"||filextype=="mp4"||filextype=="mp3"||filextype=="svg")
 		{
 			var  me=this,desktop = me.app.getDesktop();
			var swfwindowId="showswf"+records[0].get("id");
	        var  win = desktop.getWindow(swfwindowId); 	               	
	       	if(!win){
				win=desktop.createWindow({
					id: swfwindowId,
	                 title:filename,
	                // modal:true,
	                 width: 740,
	                 height: 480,
	                 iconCls: 'video',
	                 animCollapse: false,
	                 border: false,
	                 layout:'fit',	                 
	                 items:[/*Ext.create('Ext.ux.IFrame',{
	            	 	 laodMask:"页面加载中",
	            	 	 //src:"show"
	            	  	 src:"filesys/FileSyses/online?id="+records[0].get("id")+"&FilePath="+filepath
	            		 
	            	 })*/]
				});
			}
			if(filextype=="jpg"||filextype=="png"||filextype=="gif"||filextype=="svg"){
				var Img=Ext.create('Ext.Img',{
	       		src:records[0].get("FilePath")
	       	});
				win.add(Img);
			}else if(filextype=="mp4"){
				var videoplay=Ext.create('Ext.ux.desktop.Video',{
	       			src:[{ src: records[0].get("FilePath"), type: 'video/mp4' }],
	       			autobuffer: true,
                	autoplay : true,
                	controls : true
	       		});
				win.add(videoplay);
			}else if(filextype=="mp3"){
				var aduioplay=Ext.create('Ext.ux.desktop.Audio',{
					src:[{ src: records[0].get("FilePath"), type: 'audio/mp3' }],
	       			autobuffer: true,
                	autoplay : true,
                	controls : true
				})
				win.add(aduioplay);
			}else{
				var iframe=Ext.create('Ext.ux.IFrame',{
	        		loadMask:'页面加载中',	        		
	        		//height:470,
	    	 	 	//src:"show"	        	
	    	  	 	src:"filesys/FileSyses/online?id="+records[0].get("id")+"&FilePath="+encodeURI(filepath)
	       		});
				win.add(iframe);			
			}
			//var loadmask=new Ext.LoadMask(iframe,{msg:'载入中'});
			win.show();
			win.doLayout();
			//iframe.setLoading(true);
			//loadmask.show();
 			
 			
 		//}else if(filextype=="jpg"||filextype=="png"||filextype=="gif"){
 			
 		}else{
 			Ext.example.msg('温馨提醒',"不支持该文件的预览，请重新选择文件！"+filextype);
 			return;
 		}
		
	},
	
	/**
	 * 下载文件
	 */
	download :function(records){
		var i=records.length;			         	
 		var record=records[0];
 		var ids=[];
 		//this.Method='delete';
 		
 		if(i==0)
 		{
 			Ext.Msg.alert('温馨提醒','你没有选择记录！');
 			Ext.example.msg('温馨提醒',"你没有选择记录");
 			return;
 		}else if(i>1){
 			Ext.example.msg('温馨提醒',"一次只能下载一个文件！");
 			return;
 		}
 			
 		ids.push(records[0].get("id"));
 		window.open("filesys/FileSyses/download?id="+records[0].get("id"));
 		/*if(loadOrShow){
 			
 		}*/
	},
	/**
	 * 上传文件
	 */
	upload:function(){
		var me=this,desktop = me.app.getDesktop();
		var swfwindowId="uploadfile";
        var  win = desktop.getWindow(swfwindowId);
        if(!win){
        	win=desktop.createWindow({
        		id: swfwindowId,
                title:"上传文件",
                width: 740,
                height: 480,
                iconCls: 'video',
                animCollapse: false,
                border: false,
                layout:'fit',
                items:[{
                	xtype:'form',
                	frame:false,
                	fieldDefaults : {
						labelAlign : 'left',
						labelWidth : 90,
						anchor : '100%',
						width : 340
					},
					items:[{
						xtype : 'hidden',
						name : 'model.id'
					},{
						xtype : 'filefield',
						name : 'fileup',
						// filedLabel:'请选择上传文件',
						msgTarget : 'side',
						allowBlank : false,
						buttonText : "请选择文件"
					}],
					buttons:[{
						text : '上传',	
						iconCls:'save',
						//scope:me,
						handler : function() {
							var form = this.up('form').getForm();
							//var grid2=me.createGridPanel();
							//var store=grid2.getStore();
							if (form.isValid()) {
								form.submit({										
									url : 'filesys/FileSyses/create',
									waitMsg : '正在上传中...',
									success : function(fp, o) {			
										try {														
											Ext.example.msg('温馨提醒',o.result.msg);
											Ext.data.StoreManager.lookup('filestore').load();
											win.close();
										} catch (e) {
											if (o.status !== "500") {													
												Ext.example.msg('温馨提醒',o.result.msg);
											}																									
										}											
									}

								})
							}
						}
					},{
						text : '重置',		
						iconCls:Ext.baseCSSPrefix + 'tbar-loading',
						handler : function() {
							var form = this.up('form').getForm();
							form.reset();
						}
					},{
						text : '取消上传',		
						iconCls:'cancel',
						handler : function() {
							var form = this.up('form').getForm();
							form.reset();
							win.close();
						}
					}]
                }]
        	});
        }
        win.show();		
	}
});
/**
 * 数据模型
 */
Ext.define('FileSysModel',{
			extend:'Ext.data.Model',
			idProperty: 'id',
			fields : [{
						name : 'id',
						type : 'int'
					}, {
						name : 'FileName',
						type : 'string'
					}, {
						name : 'FilePath',
						type : 'string'
					}, {
						name : 'FileSize',
						type : 'string'
					}, {
						name : 'FileType',
						type : 'string'
					}, {
						name : 'FileUse',
						type : 'string'
					}, {
						name : 'FileUploadTime',
						type : 'string'
					}, {
						name : 'UploadUser',
						type : 'string'
					}]
			
});