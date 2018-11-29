import React from 'react';
import Screen from 'SRC_PATH/components/screen';
import './assets/style.less';//样式
import { requestData } from 'SRC_PATH/utils'; //request请求

const config = env.screens['screen'] || {};

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    
    componentDidMount() {
        requestData(config, result => {
            // 更新数据
            this.setState(result.data);
        });
    }

    componentWillUnmount () {
        // 本地mock数据轮播的计时器
        if(window.mockInterval){
            clearInterval(window.mockInterval);
            window.mockInterval = null;
        }
    }
    
    render() {
        return <Screen {...this.props} style={{width: 16384, height: 2355}}>
            <div className="index">
                
            </div>
        </Screen>;
    }
}

export default Index;