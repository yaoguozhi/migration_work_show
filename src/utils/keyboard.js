import { fullScreen } from './fullScreen';
import shortcut from '../vender/shortcut';
import { prev, next, first, last, start, stop } from './screenCarousel';

const events = {
    // 全屏
    fullScreen: function () {
        fullScreen(document.documentElement);
    },
    // 切换到第一个大屏
    firstScreen: function () {
        first();
    },
    // 切换到最后一个大屏
    lastScreen: function () {
        last();
    },
    // 切换上一张大屏
    prevScreen: function () {
        prev();
    },
    // 切换下一张大屏
    nextScreen: function () {
        next();
    },
    // 数字键切换大屏，十张限制（1-9-0）
    numbers: function (screenId) {
        window.location.href = '#/' + screenId;
    },
    //  开启大屏自动切换
    screenPlayOn: function () {
        env.screens.carousel.autoPlay = true;
        start();
    },
    // 关闭大屏自动切换
    screenPlayOff: function () {
        stop();
    }
};

const numberKey = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

export default function openKeyBoard() {
    const config = env.keyboard || {};
    for (let event in config) {
        if (events[event]) {
            // 数字键列表处理
            if (event == 'numbers') {
                const numbers = config[event];
                for (let i = 0; i < numbers.length; i++) {
                    const screenId = numbers[i];
                    shortcut.add(numberKey[i] + '', function (keyboardEvent) {
                        events[event](screenId, keyboardEvent);
                    });
                }
            } else {
                shortcut.add(config[event], function (keyboardEvent) {
                    events[event](keyboardEvent);
                });
            }

        }
    }
}



