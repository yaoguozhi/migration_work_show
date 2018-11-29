import React from 'react';

import './assets/style.less';

class Loading extends React.Component {
    render() {
        return <div className="router-loading">
            <div className="router-loading-line">
                <div className="router-loading-circle router-loading-circle-blue"></div>
                <div className="router-loading-circle router-loading-circle-blue"></div>
                <div className="router-loading-circle router-loading-circle-blue"></div>
            </div>
            <div className="router-loading-line">
                <div className="router-loading-circle router-loading-circle-yellow"></div>
                <div className="router-loading-circle router-loading-circle-yellow"></div>
                <div className="router-loading-circle router-loading-circle-yellow"></div>
            </div>
            <div className="router-loading-line">
                <div className="router-loading-circle router-loading-circle-red"></div>
                <div className="router-loading-circle router-loading-circle-red"></div>
                <div className="router-loading-circle router-loading-circle-red"></div>
            </div>
            <div className="router-loading-line">
                <div className="router-loading-circle router-loading-circle-green"></div>
                <div className="router-loading-circle router-loading-circle-green"></div>
                <div className="router-loading-circle router-loading-circle-green"></div>
            </div>
        </div>;
    }
}

export default Loading;