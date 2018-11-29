import React from 'react';
import { Modal } from 'antd';
import shortcut from '../../vender/shortcut';

class Help extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        };

        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {
        const self = this;
        const config = env.keyboard || {};
        shortcut.add(config['helpOn'], function (keyboardEvent) {
            self.setState({
                visible: true
            });
        });

        shortcut.add(config['helpOff'], function (keyboardEvent) {
            self.setState({
                visible: false
            });
        });
    }

    componentWillUnmount() {
    }

    handleCancel() {
        this.setState({
            visible: false
        });
    }

    render() {
        const config = env.keyboard || {};

        const names = {
            fullScreen: '全屏',
            firstScreen: '切换到第一个大屏',
            lastScreen: '切换到最后一个大屏',
            prevScreen: '切换到上一张大屏',
            nextScreen: '切换到下一张大屏',
            numbers: '可通过数字键切换大屏',
            screenPlayOn: '开启大屏自动切换',
            screenPlayOff: '关闭大屏自动切换',
            helpOn: '打开帮助说明',
            helpOff: '关闭帮助说明'
        };

        return <Modal title="帮助说明" visible={this.state.visible} footer={null} onCancel={this.handleCancel}>
            {(function () {
                var list = [];
                for (let name in config) {
                    list.push(<p>{names[name]}: {name == 'numbers' ? '1,2,3,4,5,6,7,8,9,0' : config[name]}</p>);
                }
                return list;
            }())}
        </Modal>;
    }
}

export default Help;