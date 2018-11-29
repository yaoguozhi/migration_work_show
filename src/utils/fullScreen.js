export const fullScreen = (element) => {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
};

export const exitFullscreen = (element) => {
    if (element.exitFullscreen) {
        element.exitFullscreen();
    } else if (element.mozCancelFullScreen) {
        element.mozCancelFullScreen();
    } else if (element.webkitCancelFullScreen) {
        element.webkitCancelFullScreen();
    } else if (element.msExitFullscreen) {
        element.msExitFullscreen();
    }
};