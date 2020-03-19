import React from 'react';
import './index.less';

export const SiteRecord = () => {
    return (
        <div className="site-info">
            <p>
                <span role="img" aria-label="emoji">
                    ❤️ Written by Caper with passion and&nbsp; ❤️
                </span>
                <span role="img" aria-label="emoji">
                    ✨ Built with React & supported by Node on Nginx. ✨
                </span>
            </p>
            <a className="site-record-anchor" href="http://www.beian.miit.gov.cn/" aria-label="link and check for this site">
                IPC证: 浙ICP备19047176号
            </a>
        </div>
    );
};
