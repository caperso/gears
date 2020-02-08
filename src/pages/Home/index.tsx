import { Avatar, Card, Col, Icon, Row, Statistic } from 'antd';
import { routeCfg } from 'config';
import React from 'react';
import img from '../../assets/image/panda.png';
import './style.less';

const { Meta } = Card;

const Home = () => {
    const hour = new Date().getHours();
    let hello = hour >= 12 && hour <= 17 ? '下午好' : hour >= 17 && hour <= 24 ? '晚上好' : '早上好';

    return (
        <div className="p-home">
            <h3> 组件平台 </h3>
            <Row>
                <Col span={20}>
                    <Meta
                        avatar={<Avatar style={{ marginTop: 5 }} size="large" src={img} />}
                        title={`${hello}，祝你开心每一天`}
                        description="消除恐惧的最好办法就是面对恐惧！坚持，才是胜利。加油！奥利给！"
                    />
                </Col>
                <Col style={{ marginTop: -13 }} span={4}>
                    <Statistic title="当前组件总数" value={routeCfg[1].routes?.length} prefix={<Icon type="like" />} />
                </Col>
            </Row>
        </div>
    );
};

export default Home;
