let index = 0, interval = null;
const config = env.screens.carousel || {};

const change = () => {
    let screenId = config.list[index];
    window.location.href = '#/' + screenId;
};

export const next = () => {
    index = index == config.list.length - 1 ? 0 : index + 1;
    change();
};

export const prev = () => {
    index = index == 0 ? config.list.length - 1 : index - 1;
    change();
};

export const first = () => {
    index = 0;
    change();
};

export const last = () => {
    index = config.list.length - 1;
    change();
};

export const stop = () => {
    clearInterval(interval);
};

export const start = () => {
    interval = setInterval(function () {
        next();
    }, config.interval * 60 * 1000);
};

// 根据screenId设置当前索引
export const setIndex = (screenId) => {
    index = config.list.indexOf(screenId);
};
