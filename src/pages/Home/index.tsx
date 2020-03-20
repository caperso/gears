import { Avatar, Card, Col, Row, Statistic } from 'antd';
import { routeConfig } from 'config';
import React from 'react';
import img from '../../assets/image/panda.png';
import './style.less';

const { Meta } = Card;

const Home = () => {
    const hour = new Date().getHours();
    let hello =
        hour >= 12 && hour <= 17
            ? '下午好, 记得多起来动动'
            : hour >= 17 && hour <= 23
            ? '晚上好, 要多多玩耍~'
            : hour > 23 || hour < 5
            ? '深夜了, 快休息吧'
            : '早上好, 迎接一天最好的阳光';

    return (
        <div className="p-home">
            <h3> 组件平台 </h3>
            <Row>
                <Col span={20}>
                    <Meta
                        avatar={<Avatar style={{ marginTop: 5 }} size="large" src={img} />}
                        title={`${hello}`}
                        description="组件目录在侧栏, 请选择查看"
                    />
                </Col>
                <Col style={{ marginTop: -13 }} span={4}>
                    <Statistic title="当前组件总数" value={routeConfig[1].routes?.length} />
                </Col>
            </Row>
        </div>
    );
};

export default Home;
