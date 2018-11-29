import React from 'react';
import { start, stop, setIndex } from '../../utils/screenCarousel';
import Helper from '../help';

class Screen extends React.Component {
    constructor(props) {
        super(props);
        this.getStyle = this.getStyle.bind(this);
    }

    componentDidMount() {
        // 是否开启告警通知
        if (env.alarm) {
            import(/*webpackChunkName: "alarm"*/'../../utils/alarm');
        }

        // 分辨率适配缩放
        const screen = this.element;
        const getStyle = this.getStyle;

        function adaptiveScreen() {
            const style = getStyle();
            for (let k in style) {
                screen.style[k] = style[k];
            }
        }

        let timeout = null;
        window.addEventListener('resize', () => {
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                adaptiveScreen();
            }, 400);
        });
        adaptiveScreen();

        // 更新大屏轮播索引
        setIndex(this.props.location.pathname.substring(1));
        // 开启大屏循环切换
        const config = env.screens.carousel || {};
        if (config.autoPlay && config.interval) {
            start();
        }
    }

    componentWillUnmount() {
        stop();
    }

    getStyle() {
        const { width = 1920, height = 1080 } = this.props.style || {};
        // 判断是否要显示手机端
        let root = '';
        if(env.usePhone) {
            root = document.documentElement;
        } else {
            root = document.querySelector('#root');
        }
        // 判断是否要显示手机端
        let per;
        let perX;
        let perY;
        if(env.usePhone) {
            perX = root.clientWidth / width;
            perY = root.clientHeight / height;
            window._screen_scale = [perX, perY];
        } else {
            per = root.clientWidth / width;
            window._screen_scale = per;
        }
        return {
            width: width,
            height: height,
            transformOrigin: 'left top',
            transform: env.usePhone ? 'scale(' + perX + ',' + perY + ')' : 'scale(' + per + ')',
        };
    }

    render() {
        const { width = 1920, height = 1080 } = this.props.style || {};

        const childrenStyle = this.props.children.props.style || {};
        this.props.children.props.style = { height, width, ...childrenStyle };

        return <div ref={(elem) => { this.element = elem; }}
            className="screen">
            {this.props.children}
            <Helper />
        </div>;
    }
}

export default Screen;