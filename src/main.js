import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

import Loading from './components/loading';
import openKeyBoard from './utils/keyboard';

// 公共样式部分
import 'normalize.css';
import './assets/index.less';

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/" component={
                Loadable({
                    loader: () => import('./routes/index'),
                    loading: Loading
                })
            } />
            <Redirect from="/" to="/" />
        </Switch>
    </Router>
    ,
    document.getElementById('root'), function () {
        // 开启快捷键操作
        openKeyBoard();
    }
);

// 设置所有模块接受热更新
if (module.hot) {
    module.hot.accept();
}