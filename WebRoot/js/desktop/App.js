/*!
 * Ext JS Library 4.2
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('App', {
    extend: 'Ext.ux.desktop.App',

    requires: [
        'Ext.window.MessageBox',        
        'Ext.ux.desktop.ShortcutModel',
        'SystemStatus',
        'VideoWindow',
        'SWFVideo',
        'AudioWindow',
        'GridWindow',
        'TabWindow',
        'AccordionWindow',
        'Notepad',
        'BogusMenuModule',
        'BogusModule',
        //'Blockalanche',
        'Settings',
        'User',
		'FileSys',
		'DouBan',
		'Eims'
    ],

    init: function() {
        // custom logic before getXYZ methods get called...
		
        this.callParent();
       // this.desktop.initShortcut();

        // now ready...
    },

    getModules : function(){
        return [
            new VideoWindow(),
            new SWFVideo(),
            new AudioWindow(),
          //  new Blockalanche(),
            new SystemStatus(),
            new GridWindow(),
            new TabWindow(),
            new AccordionWindow(),
            new Notepad(),
            new BogusMenuModule(),
            new BogusModule(),
            new User(),
            new FileSys(),
            new Eims(),
            new DouBan()
            
        ];
    },
    /**
     * 桌面图标、右键菜单、背景配置
     */
    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            //cls: 'ux-desktop-black',
        	//右键菜单
            contextMenuItems: [            	
                { text: '系统设置', handler: me.onSettings, scope: me }
                          
                
            ],
            //桌面图标store
            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: this.getDesktopIocn()
            }),

            wallpaper: 'js/desktop/wallpapers/Blue-Sencha.jpg',
            wallpaperStretch: false
        });
    },    
    
    /**
     * 桌面图标配置数据
     */
	getDesktopIocn : function (){
		var data=[
                    { name: 'Grid Window', iconCls: 'grid-shortcut', module: 'grid-win' },    
                    //{ name: '视频播放器', iconCls: 'video', module: 'video' },
                   // { name: '音乐播放器', iconCls: 'audio', module: 'audio' },
                    { name: '用户管理', iconCls: 'grid-shortcut', module: 'user-grid' },
                    //{ name: 'SWF视频播放器', iconCls: 'video', module: 'swfvideo' },
                    { name: '文件管理', iconCls: 'grid-shortcut', module: 'FileSys' },
                    { name: '豆瓣电台', iconCls: 'dbfm-shortcut', module: 'douban' },
                    { name: 'Accordion Window', iconCls: 'accordion-shortcut', module: 'acc-win' },                    
                    { name: 'Notepad', iconCls: 'notepad-shortcut', module: 'notepad' },                
                    { name: '教务系统', iconCls: 'grid-shortcut', module: 'eims' },                   
                    { name: 'System Status', iconCls: 'cpu-shortcut', module: 'systemstatus'}
                ];
		return data;
	},
    // config for the start menu开始菜单配置
    getStartConfig : function() {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            title: '管理员',
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: [
                    {
                        text:'设置',
                        iconCls:'settings',
                        handler: me.onSettings,
                        scope: me
                    },
                    '-',
                    {
                        text:'注销',
                        iconCls:'logout',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
            }
        });
    },

    getTaskbarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
            quickStart: this.getQuickStartIocn(),
            trayItems: [
                { xtype: 'trayclock', flex: 1 }
            ]
        });
    },
    /**
     * 任务栏图标
     */
	getQuickStartIocn : function(){
		var data=[
			{ name: 'Accordion Window', iconCls: 'accordion', module: 'acc-win' },
            { name: 'Grid Window', iconCls: 'icon-grid', module: 'grid-win' },
            { name: '用户管理', iconCls: 'icon-grid', module: 'user-grid' },
            { name: '文件管理', iconCls: 'icon-grid', module: 'FileSys' },
            { name: '教务管理系统', iconCls: 'icon-grid', module: 'eims' }
            
            ];
         return data;
	},
	/**
	 * 退出系统
	 */
    onLogout: function () {
        Ext.Msg.confirm('温馨提示', '你确定退出系统?');
    },
    /**
     * 系统设置
     */
    onSettings: function () {
        var dlg = new Settings({
            desktop: this.desktop
        });
        dlg.show();
    }
});
