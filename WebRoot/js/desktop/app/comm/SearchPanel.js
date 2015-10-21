Ext.define('SearchPanel',{
	extend:'Ext.form.Panel',
	alias:['widget.SearchPanel'],
	requires: [    	
    	'Ext.form.Panel'           
    ],
	
	
	
	constructor:function(config){
		config=Ext.apply({
			region: 'north', 
			height: 75,
			border: false,
			minSize: 40,
			split:true,
			labelWidth: 97,
			labelAlign: 'right',
			margins:'3 3 0 3',
            cmargins:'3 3 0 3',
			frame: true,
			autoScroll : true
		},config);
		this.callParent(arguments);
		
	},
	/**
	 * 处理字段赋值
	 * @param {} data
	 * @param {} clsName
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
	/**
	 * 利用data中的值对form中fiel进行更新
	 * @param {} data record of data
	 * @param {} clsName form中field 的 类名前缀
	 *//*
	loadSpecialRecord : function(data, clsName){
		if(data){
			var assetsCard = data;
			var form = this.getForm().reset();
			var id, field;
			for(var id in assetsCard){
				var fid = Ext.isEmpty(clsName) ? id : String.format("{0}.{1}", clsName, id);
				var cbs = [];
            	if(!Ext.isFunction(assetsCard[id]) && (field = form.findField(fid))){
            		//A.log("form id:{0}, value:{1}, _value:{2}", id, field.getValue(), assetsCard[id]);
            		field.setValue(assetsCard[id]);     
            		//A.log("form id:{0}, value:{1}, _value:{2}", id, field.getValue(), assetsCard[id]);
            		if(!Ext.isEmpty(assetsCard[id+"CodeText"])){ //代码处理
            			field.reset();
            			field.setValue(assetsCard[id]);
            			field.setRawValue(assetsCard[id+"CodeText"]);
            		} 
            		
                	A.log("form id:{0}, value:{1}, _value:{2}", id, field.getValue(), assetsCard[id]);
                	if(form.trackResetOnLoad){
                    	field.originalValue = field.getValue();
                    }
                }
            }
		}
	},
	
	*//**
	 * 给fields赋值的时候通过,findByType来查询fields
	 * @param {} data
	 * @param {} clsName
	 *//*
	loadSpecialRecordByField: function(data, clsName){
		if(data){
			var assetsCard = data;
			var form = this.getForm().reset();
			var id, field;
			var comaa = this.findByType("compositefield");
			A.log("comaa:{0}",comaa.length);
			
			for(var id in assetsCard){
				var fid = Ext.isEmpty(clsName) ? id : String.format("{0}.{1}", clsName, id);
				var cbs = [];
            	if(!Ext.isFunction(assetsCard[id]) && (field = form.findField(fid))){
            		//A.log("form id:{0}, value:{1}, _value:{2}", id, field.getValue(), assetsCard[id]);
            		field.setValue(assetsCard[id]);     
            		//A.log("form id:{0}, value:{1}, _value:{2}", id, field.getValue(), assetsCard[id]);
            		if(!Ext.isEmpty(assetsCard[id+"CodeText"])){ //代码处理
            			field.reset();
            			field.setValue(assetsCard[id]);
            			field.setRawValue(assetsCard[id+"CodeText"]);
            		} 
            		
                	A.log("form id:{0}, value:{1}, _value:{2}", id, field.getValue(), assetsCard[id]);
                	if(form.trackResetOnLoad){
                    	field.originalValue = field.getValue();
                    }
                }
            }
            
            *//**
             * 对于compositefield组件进行特殊的处理
             *//*
            Ext.each(this.findByType("compositefield"), function(compf){
            	var items = compf.innerCt.items;
            	for(var i=0,len=items.getCount(); i<len; i++){
            		var f = items.get(i);
            		A.log("compositefield of field:{0}", [f.getName?f.getName():null]);
            		var name = f.getName?f.getName():null;
            		if(name){            			
            			var _name = name.replace(/model./g, "");
            			A.log("compositefield of field:{0}", [name, _name]);
            			f.setValue(assetsCard[_name]);     
	            		//A.log("form id:{0}, value:{1}, _value:{2}", id, field.getValue(), assetsCard[id]);
	            		if(!Ext.isEmpty(assetsCard[_name+"CodeText"])){ //代码处理
	            			f.reset();
	            			f.setValue(assetsCard[_name]);
	            			f.setRawValue(assetsCard[_name+"CodeText"]);
	            		} 
            		}
            	}
            }, this);            
		}
	},
	
	*//**
	 * 从form中的值更新到record中
	 * @param {} record
	 *//*
	updateSpecialRecord : function(record, clsName){
		var form = this.getForm();
		record.beginEdit();
        var fs = record.fields, me = this;        
        fs.each(function(f){
        	var _name=f.name;
            if(f.name.indexOf("CodeText") > -1){ //处理代码
            	_name = f.name.substring(0, f.name.length-8);
            }
            //A.log("name:{0}, _name:{1}", f.name, _name);
            var field = form.findField(String.format("{0}.{1}", clsName, _name));  
            
            if(field){          	
                if(f.name.indexOf("CodeText") > -1){ //代码
                	record.set(f.name, field.getRawValue());
                	//A.log("codeText name:{0},val:{1}", f.name, field.getRawValue());
                }else{
                	record.set(f.name, field.getValue());
                	//A.log("name:{0},val:{1}", f.name, field.getValue());
                }
            }
        }, form);
        record.endEdit();
	}*/
})