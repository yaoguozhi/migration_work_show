import { requestData } from './index';
import { notification } from 'antd';

const config = env.alarm || {};

const openNotificationWithIcon = (data) => {
    notification[data.type]({
        message: data.title,
        description: data.explain,
        duration: config.duration || 4.5,
    });
};

const callback = (result) => {
    let alarms = [];
    const order = config.order || [];
    const maxNumber = config.maxNumber || 3;

    for (let o of order) {
        if (alarms.length < maxNumber) {
            for (let dt of result.data) {
                if (dt.type == o) {
                    alarms.push(dt);
                }
            }
        } else {
            break;
        }
    }
    for (let alarm of alarms) {
        openNotificationWithIcon(alarm);
    }
};

requestData(config, callback);
