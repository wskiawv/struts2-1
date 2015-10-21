Ext.define('SWFVideo',{
	extend:'Ext.ux.desktop.Module',
	
	//requires:['Ext.ux.IFrame'],
	
	id:'swfvideo',
    windowId: 'swfvideo-window',
   // renderTpl:['<div id="{flexpaperid}" style="width:100%;height:100%"></div>'],
    init : function(){
        this.launcher = {
            text: 'SWF视频播放器',
            iconCls:'video'
        }
    },
    createWindow:function(){
    	 var me = this, desktop = me.app.getDesktop(),
         win = desktop.getWindow(me.windowId);
    	 if(!win){
    		 win=desktop.createWindow({
    			 id: me.windowId,
                 title: 'SWF视频播放器',
                 width: 740,
                 height: 480,
                 iconCls: 'video',
                 animCollapse: false,
                 border: false,
                 layout:'fit',
                 /*listeners:{
                	 afterrender:function(){
                		 var flexpaper=Ext.get('#documentViewer').FlexPaperViewer({
                	    		config:{
                	    			Scale:1,
                	    			SWFFile:'public/javascripts/desktop/video/555.swf',
                	    			ZoomTransition:'easeOut',
                	    			ZoomTime:0.5,
                	    			ZoomInterval:0.2,
                	    			FitPageOnLoad:true,
                	    			FitWidthOnLoad:true,
                	    			FullScreenAsMaxWindow:true,
                	    			ProgressiveLoading:true,
                	    			MinZoomSize:0.2,
                	    			MaxZoomSize:5,
                	    			SearchMatchAll:true,
                	    			RenderingOrder:'flash,html',
                	    			ViewModeToolsVisible:true,
                	    			ZoomToolsVisible:true,
                	    			NavToolsVisible:true,
                	    			CursorToolsVisible:true,
                	    			SearchToolsVisible:true,
                	    			localeChain:'zh_CN'
                	    			
                	    		}
                	 });
                 },*/
                 //html:['<div id="documentViewer" style="width:100%;height:100%"></div>'],
                 //tpl:'<div id="{documentViewer}" style="width:100%;height:100%"></div><script type="text/javascript"></script>'
                 //items:me.getFlexPaper()
                 items:[/*{
                	 xtype:'flash',
                	 flashAttributes:{menu:true},
                	 flashParams:{menu:true},
                	 renderTpl:Ext.get('documentViewer'),
                	// flashVars:[menu,true],
                	 statics:{
                		 EXPRESS_INSTALL_URL:'public/javascripts/ext/plugins/flash/expressInstall.swf'
                	 },
                	 url:'public/javascripts/desktop/video/555.swf'
                 }, */Ext.create('Ext.ux.IFrame',{
                	 	 laodMask:"页面加载中",
                	 	 //src:"show"
                	  	 src:"filesys/FileSyses/fileshow"
                		 /*loader:{
                			 url:'show.html',
                		     autoLoad:true
                		 }*/
                	 })
                 ]
    		 });
    	 }
    	 return win;
    }
   /* getFlexPaper:function(){
    	var flexpaper= $('#documentViewer').FlexPaperViewer({
    		config:{
    			Scale:1,
    			SWFFile:'public/javascripts/desktop/video/555.swf',
    			ZoomTransition:'easeOut',
    			ZoomTime:0.5,
    			ZoomInterval:0.2,
    			FitPageOnLoad:true,
    			FitWidthOnLoad:true,
    			FullScreenAsMaxWindow:true,
    			ProgressiveLoading:true,
    			MinZoomSize:0.2,
    			MaxZoomSize:5,
    			SearchMatchAll:true,
    			RenderingOrder:'flash,html',
    			ViewModeToolsVisible:true,
    			ZoomToolsVisible:true,
    			NavToolsVisible:true,
    			CursorToolsVisible:true,
    			SearchToolsVisible:true,
    			localeChain:'zh_CN'
    			
    		}
    	});
    	return flexpaper;
    }*/
    
});