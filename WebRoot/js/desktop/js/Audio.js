/**
 * 音频播放
 */
Ext.define('Ext.ux.desktop.Audio',{
	extend:'Ext.panel.Panel',
	alias:'widget.audio',
	layout:'fit',
	autoplay:false,
	controls:true,
	bodyStyle: 'background-color:#000;color:#fff',
    html: '',
    tpl: [
        '<audio id="{id}-audio" autoPlay="{autoplay}" controls="{controls}" loop="{loop}" style="width:100%;height:100%">',
            '<tpl for="src">',
                '<source src="{src}" type="{type}"/>',
            '</tpl>',
            '{html}',
        '</audio>'
    ],
    initComponent: function () {

        var me = this,
            fallback,
            size,
            cfg,
            el;

        if (me.fallbackHTML) {
            fallback = me.fallbackHTML;
        } else {
            fallback = "Your browser does not support HTML5 Audio. ";

            if (Ext.isChrome) {
                fallback += 'Upgrade Chrome.';
            } else if (Ext.isGecko) {
                fallback += 'Upgrade to Firefox 3.5 or newer.';
            } else {
                var chrome = '<a href="http://www.google.com/chrome">Chrome</a>';
                fallback += 'Please try <a href="http://www.mozilla.com">Firefox</a>';

                if (Ext.isIE) {
                    fallback += ', ' + chrome +
                        ' or <a href="http://www.apple.com/safari/">Safari</a>.';
                } else {
                    fallback += ' or ' + chrome + '.';
                }
            }
        }
        me.fallbackHTML = fallback;

        cfg = me.data = Ext.copyTo({
            tag   : 'audio',
            html: fallback
        },
        me, 'id,poster,start,loopstart,loopend,playcount,autobuffer,loop');

        // just having the params exist enables them
        if (me.autoplay) {
            cfg.autoplay = 1;
        }
        if (me.controls) {
            cfg.controls = 1;
        }

        // handle multiple sources
        if (Ext.isArray(me.src)) {
            cfg.src  = me.src;
        } else {
            cfg.src  = [ {src: me.src} ];
        }
        me.callParent();
    },
    afterRender: function() {
        var me = this;
        me.callParent();
        me.audio = me.body.getById(me.id + '-audio');
        el = me.audio.dom;
        me.supported = (el && el.tagName.toLowerCase() == 'audio');
        if (me.supported) {
            me.audio.on('error', me.onAudioError, me);
        }
    },
    
    getFallback: function() {
        return '<h1 style="background-color:#ff4f4f;padding: 10px;">' + this.fallbackHTML + '</h1>';
    },

    onAudioError: function() {
        var me = this;

        me.audio.remove();
        me.supported = false;
        me.body.createChild(me.getFallback());
    },

    onDestroy: function () {
        var me = this;

        var audio = me.audio;
        if (me.supported && audio) {
            var audioDom = audio.dom;
            if (audioDom && audioDom.pause) {
                audioDom.pause();
            }
            audio.remove();
            me.audio = null;
        }

        me.callParent();
    }
	
});