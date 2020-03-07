import React from 'react'
import {  Menu, Row, Col, Card,Tabs} from 'antd';
import { exact } from 'prop-types';
const { Meta } = Card;
const { TabPane } = Tabs;

export default class homepage extends React.Component{
    render(){
        return(
            <div 
            className='homepage'
            >
                <div className='ziigy'>
                <h  >
                <br />
                   
                </h>
                </div>
                <div className='ziijiany'>
                <h1 class="display-4 font-italic">Bast 公益</h1>
                <p class="lead my-3">在这个理想地，金钱不再是最高统治者<br/>个人的价值比物质财富和社会地位重要许多<br/>人从慈善中获得自我满足，内心的善念得到满足<br/>慈善是人的最高层次需求
                </p>
                <p className='ziijianyen'>
                In this ideal, money is no longer the supreme ruler<br />
                Personal value is much more important than material wealth and social status<br />
                People get self-satisfaction from charity, and inner good intentions are satisfied<br />
                Charity is the highest level of human needs
                </p>
                <p class="lead mb-0"><a href="#" class="text-white font-weight-bold">Continue reading...</a></p>
                </div>
                <br/>
                <Row  gutter={[1,16]} align="top">
                    <Col offset={5}>
                        <Card title="慈善动态" bordered={false} style={{ width: 365 }} className='dongtai'>
                            <p> content content content content</p>
                            <p> content content content content</p>
                            <p> content content content content</p>
                            <p> content content content content</p>
                            <p> content content content content</p>
                            <p> content content content content</p>
                        </Card>
                    </Col>
                    <Col >
                        <Tabs defaultActiveKey="1" style={{ width: 365 }} className='dontaitab'>
                            <TabPane tab="资金流动" key="1">
                            Tab 1
                            </TabPane>
                            <TabPane tab="基金会空间"  key="2">
                            Tab 2
                            </TabPane>
                            <TabPane tab="志愿活动" key="3">
                            Tab 3
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col >
                        <Card title="爱心丰碑" bordered={false} style={{ width: 350 }} className='dongtai'>
                            <p> content content content content</p>
                            <p> content content content content</p>
                            <p> content content content content</p>
                            <p> content content content content</p>
                            <p> content content content content</p>
                            <p> content content content content</p>
                        </Card>
                    </Col>
                </Row>
                <br/>
                <br/>
                
                <Row gutter={[16,50]}>
                    <Col offset={5}>
                    <Card
                        hoverable
                        style={{ width: 350 }}
                        cover={<img alt="example" id='hplogo' src={require('../img/btxiulogo.jpg')} />}
                    >
                        <Meta title="项目示例" description="基金会宗旨为“弘扬正气，奉献爱心，扶危济困，和谐共生”，关注偏远地区的医疗卫生建设和重大自然灾害应急救援" />
                    </Card>
                    </Col>
                    <Col  >
                    <Card
                        hoverable
                        style={{ width: 350 }}
                        cover={<img alt="example" id='hplogo' src={require('../img/btxiulogo.jpg')} />}
                    >
                        <Meta title="项目示例" description="基金会宗旨为“弘扬正气，奉献爱心，扶危济困，和谐共生”，关注偏远地区的医疗卫生建设和重大自然灾害应急救援" />
                    </Card>
                    </Col>
                    <Col >
                    <Card
                        hoverable
                        style={{ width: 350 }}
                        cover={<img alt="example" id='hplogo' src={require('../img/btxiulogo.jpg')} />}
                    >
                        <Meta title="项目示例" description="基金会宗旨为“弘扬正气，奉献爱心，扶危济困，和谐共生”，关注偏远地区的医疗卫生建设和重大自然灾害应急救援" />
                    </Card>
                    </Col>
                </Row>
                <Row gutter={[16,10]}>
                    <Col  offset={5}>
                    <Card
                        hoverable
                        style={{ width: 350 }}
                        cover={<img alt="example" id='hplogo' src={require('../img/btxiulogo.jpg')} />}
                    >
                        <Meta title="项目示例" description="基金会宗旨为“弘扬正气，奉献爱心，扶危济困，和谐共生”，关注偏远地区的医疗卫生建设和重大自然灾害应急救援" />
                    </Card>
                    </Col>
                    <Col  >
                    <Card
                        hoverable
                        style={{ width: 350 }}
                        cover={<img alt="example" id='hplogo' src={require('../img/btxiulogo.jpg')} />}
                    >
                        <Meta title="项目示例" description="基金会宗旨为“弘扬正气，奉献爱心，扶危济困，和谐共生”，关注偏远地区的医疗卫生建设和重大自然灾害应急救援" />
                    </Card>
                    </Col>
                    <Col >
                    <Card
                        hoverable
                        style={{ width: 350 }}
                        cover={<img alt="example" id='hplogo' src={require('../img/btxiulogo.jpg')} />}
                    >
                        <Meta title="项目示例" description="基金会宗旨为“弘扬正气，奉献爱心，扶危济困，和谐共生”，关注偏远地区的医疗卫生建设和重大自然灾害应急救援" />
                    </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}