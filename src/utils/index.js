import _fetch from './fetch';
import stomp from 'stompjs';

export const fetch = _fetch;

/**
 * websocket数据发送
 * @param params
 * @param callback
 */
let wsClient = null;
export function ws(params, callback) {
    const { url, username, password, topicCtrl } = env.ws;
    const { topic } = params;
    // const { topic, interval, type=1 } = params; // 区分不同大屏的标记
    const _ws = new Promise((resolve, reject) => {
        if (wsClient) {
            resolve(wsClient);
        } else {
            wsClient = stomp.client(url);
            wsClient.connect(username, password, function () {
                resolve(wsClient);
            });
        }
    });

    return _ws.then(function (client) {
        client.subscribe(topic, function (message) {
            const result = JSON.parse(message.body);
            if ((result.code != 200 && result.msg != 'success') || typeof result.data != 'object') {
                console.error('后台服务异常!');
                return;
            }
            callback(result);
        });
        // client.send(topic, {}, JSON.stringify({topic: topicCtrl, interval, type}));
        client.send(topicCtrl, {}, JSON.stringify(params));
        return client;
    });
}

/**
 * 请求大屏数据
 * @param config
 * @param params
 * @param callback
 */
export const requestData = (config, params, callback) => {
    let _params = params,
        _callback = callback,
        _config = config || {};
    if (!callback) {
        _callback = params;
        _params = undefined;
    }

    if (env.useMockData || !_config.topic) {
        // 原始状态
        // return _fetch(_config.mockData[2], {
        //     body: _params
        // }).then(_callback);
        // 修改后状态
        let i = 0;
        _fetch(_config.mockData[i], {
            body: _params
        }).then(_callback);
        window.mockInterval = setInterval(() => {
            i ++;
            if(i === _config.mockData.length) {
                i = 0;
            }
            _fetch(_config.mockData[i], {
                body: _params
            }).then(_callback);
        }, _config.interval * 1000);
        
    } else {
        _params = {
            topic: _config.topic,
            type: _config.type || null,
            interval: _config.interval || env.screens.interval,
            ..._params
        };
        
        // 增加计时器请求topic，测试后端用
        if(_config.openSendTopicInterval) {
            window.mockInterval = setInterval (() => {
                _params = {
                    topic: _config.topic,
                    type: _config.type,
                    interval: _config.interval || env.screens.interval,
                    ..._params
                };
                return ws(_params, _callback);
            }, _config.interval * 1000);
        }
        return ws(_params, _callback);
    }
};


