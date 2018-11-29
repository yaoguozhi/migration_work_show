import React from 'react';

import './assets/style.less';

function format(date) {
    return date.getFullYear() + '-' + handleDate(date.getMonth() + 1) + '-' + handleDate(date.getDate()) + ' ' + handleDate(date.getHours()) + ':' + handleDate(date.getMinutes())  + ':' + handleDate(date.getSeconds());
}
function handleDate(date) {
    if(date < 10) {
        return '0' + date;
    } else {
        return date;
    }
}
class DateTime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: format(new Date())
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({
                currentTime: format(new Date())
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return <div className="screen-time">
            {this.state.currentTime}
        </div>;
    }
}

export default DateTime;