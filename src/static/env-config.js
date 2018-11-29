var env = (function () {
    return {
        // websocket连接配置
        ws: {
            // url: 'ws://192.168.28.89:61623',
            // url: 'ws://10.11.12.73:61623',
            // url: 'ws://121.33.239.157:61623',
            url: 'ws://monitorbsuat.rfchina.com:61623',
            username: 'admin',
            password: 'password',
            topicCtrl: '/topic/topic-controller'
        },
        useMockData: true, // 是否使用模拟数据
        usePhone: false, // 是否在手机端显示 （比例按屏幕尺寸大小调整，拉伸图形）
        screens: {
            // 轮播配置
            carousel: {
                interval: 1, // 轮播间隔（单位：min）
                autoPlay: false,
                list: [
                    
                ]
            },
            'screen': {
                topic: '/topic/screen',
                type: 2,
                mockData: [
                    './mock_data/data1.json',
                ],
                interval: 5, // 生产模式下：设置socket发送间隔，单位为min； mock数据模式下：设置mock数据请求间隔，单位为s；
                openSendTopicInterval: false, // 是否按间隔触发socket请求（测试时候用true，一般为false）
            },
        },
        // 快捷键配置
        keyboard: {
            // exitScreen: 'esc',
            fullScreen: 'ctrl+d', // 全屏
            // firstScreen: 'up', // 切换到第一个大屏
            // lastScreen: 'down', // 切换到最后一个大屏
            // prevScreen: 'left', // 切换上一张大屏
            // nextScreen: 'right', // 切换下一张大屏
            numbers: [
                
            ], // 数字键切换大屏，十张限制（1-9-0）
            screenPlayOn: 'ctrl+q', //  开启大屏自动切换
            screenPlayOff: 'ctrl+w', // 关闭大屏自动切换
            helpOn: 'ctrl+j',   // 打开帮助说明
            helpOff: 'ctrl+k',  // 关闭帮助说明
        }
    };
})();