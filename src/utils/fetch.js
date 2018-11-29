import 'isomorphic-fetch';

export default function _fetch(url, options) {
    let _url = url;
    options = {
        //跨域请求参数
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        ...options
    };

    const { body, method } = options;
    if ((!method || method.toLocaleLowerCase() === 'get') && body) {
        let getParams = [];
        for (let k in body) {
            getParams.push(k + '=' + body[k]);
        }
        _url = _url + '?' + getParams.join('&');
        delete options.body;
    }

    if (options.body && typeof options.body == 'object') {
        options.body = JSON.stringify(options.body);
    }

    return fetch(_url, options)
        .then(function (response) {
            const status = response.status;

            if (status == '200') {
                if (options.headers['Content-Type'] == 'application/json') {
                    return response.json();
                }
                return response;
            }
        }).catch(function (error) {
            console.error('error:', error);
        });
}