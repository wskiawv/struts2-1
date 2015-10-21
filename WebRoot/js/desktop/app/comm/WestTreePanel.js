Ext.define('WestTreePanel',{
	extend:'Ext.tree.Panel',
	alias:['widget.WestTreePanel'],
	requires:['Ext.tree.Panel'],
	
	constructor : function(config){
		var me=this;
		var mainTab=me.getMainTab();
		me.store=Ext.create('Ext.data.TreeStore',{
			fields:['id','text','leaf','qtip','xtype','children'],
					root:{
						text:'共享网盘',
						//id:'gongxiang',
						defaultRootId:'root',
						expanded:true
					},
					proxy:{
						type:'ajax',
						url:'public/javascripts/desktop/app/eims/WestTree.json',
						reader:{
							type:'json'
						}
					}
		});
		Ext.apply(me,{
			autoScroll : true,   		
			store:me.store
			
		});
		me.setChild(config.menuNodes,config.root);//设置子菜单
		
		me.on({
			
			scope:this
		});
		this.callParent(arguments);
	},
	setChild : function(children,node){
		var me=this;
		if(Ext.isEmpty(children))
			return;
		if(Ext.isArray(children)){
			for(var i=0,len=children.length; i<len; i++){
				var params = {};			
				if(!Ext.isEmpty(children[i]["xtype"])){
					params["id"] =  children[i]["xtype"];
				}			
				
				if(!Ext.isEmpty(children[i]["params"])){
					params["id"] = params["id"]+"-"+children[i]["params"];
				}
				
				/*var childNode = new Ext.tree.TreeNode(Ext.apply(children[i], params));
				node.appendChild(childNode);
				me.setChild(children[i].children, childNode);*/
			}
		}else{
			/**
			 * children = {
			 *	text: 'Milk',
        	 *	leaf: true        
    		 *	}
			 */
			var params = {};			
			if(!Ext.isEmpty(children["xtype"])){
				params["id"] =  children["xtype"];
			}
			//A.log("node1 params:{0}", params);
			
			if(!Ext.isEmpty(children[i]["params"])){
				params["id"] = params["id"]+"-"+children[i]["params"];
			}
			
			/*var singlNode = new Ext.tree.TreeNode(Ext.apply(children, params));
			node.appendNode(singlNode);
			me.setChild(singlNode.children, singlNode);*/
		}
		
	},
	addTab : function(mainTab,node,xtype){
		var me=this;
		var tabItem=me.getCmp(node.id);
		 if(Ext.isEmpty(tab)){
		 	tabItem=mainTab.add({
		 		id:node.id,
		 		xtype:xtype,
		 		title:node.text,
		 		iconCls: 'tab-icon',
	            layout : 'fit',
	            closable:true,
	            scope : this
		 	});
		 }
		 mainTab.setActiveTab(tabItem);
		 return tabItem;
	},
	getTreeData: function(){
		
	},
	/**
	 * 获取tab组件
	 */
	getMainTab : function(){
		Ext.getCmp('mainTab');
	}
	
});