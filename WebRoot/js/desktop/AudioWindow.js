Ext.define('AudioWindow',{
	extend:'Ext.ux.desktop.Module',
	uses: [
	        'Ext.ux.desktop.Audio'
	    ],
    id:'audio',
    windowId: 'audio-window',

    tipWidth: 160,
    tipHeight: 96,
    init : function(){
        this.launcher = {
            text: '音乐播放器',
            iconCls:'audio'
        }
    },
    createWindow : function(){
        var me = this, desktop = me.app.getDesktop(),
            win = desktop.getWindow(me.windowId);

        if (!win) {
            win = desktop.createWindow({
                id: me.windowId,
                title: '音乐播放器',
                width: 740,
                height: 480,
                iconCls: 'audio',
                animCollapse: false,
                border: false,
                layout: 'fit',
                items: [
                    {
                        xtype: 'audio',
                        id: 'audio-player',
                        src: [
                            // browser will pick the format it likes most:
                            { src: 'data/attachments/audio/zly.mp3', type: 'audio/mp3' }
                            
                        ],
                        poster: 'http://b.vimeocdn.com/ts/148/397/148397103_640.jpg',
                        //autobuffer: true,
                        autoplay : true,
                        controls : true,
                        /* default */
                        listeners: {
                            afterrender: function(audio) {
                                me.audioEl = audio.audio.dom;

                                if (audio.supported) {
                                    me.tip = new Ext.tip.ToolTip({
                                        anchor   : 'bottom',
                                        dismissDelay : 0,
                                        height   : me.tipHeight,
                                        width    : me.tipWidth,
                                        renderTpl: [
                                            '<canvas width="', me.tipWidth,
                                                  '" height="', me.tipHeight, '">'
                                        ],
                                        renderSelectors: {
                                            body: 'canvas'
                                        },
                                        listeners: {
                                            afterrender: me.onTooltipRender,
                                            show: me.renderPreview,
                                            scope: me
                                        }
                                    }); // tip
                                }
                            }
                        }
                    }
                ],
                listeners: {
                    beforedestroy: function() {
                        me.tip = me.ctx = me.audioEl = null;
                    }
                }
            });
        }

        if (me.tip) {
            me.tip.setTarget(win.taskButton.el);
        }

        return win;
    },

    onTooltipRender: function (tip) {
        // get the canvas 2d context
        var el = tip.body.dom, me = this;
        me.ctx = el.getContext && el.getContext('2d');
    },

    renderPreview: function() {
        var me = this;

        if ((me.tip && !me.tip.isVisible()) || !me.audioEl) {
            return;
        }

        if (me.ctx) {
            try {
                me.ctx.drawImage(me.audioEl, 0, 0, me.tipWidth, me.tipHeight);
            } catch(e) {};
        }

        // 20ms to keep the tooltip audio smooth
        Ext.Function.defer(me.renderPreview, 20, me);
    }
	
});