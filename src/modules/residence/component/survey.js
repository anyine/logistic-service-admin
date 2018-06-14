import React from 'react';
import {Link} from 'react-router';
import {
    Row,
    Col,
    Input,
    Icon,
    List,
    Divider,
    Breadcrumb,
    Badge,
    notification,
    Spin,
    Tabs,
    Table,
    message,
    Avatar
} from 'antd';
import _ from 'lodash';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import '../residence.less';

const TabPane = Tabs.TabPane;
const Search = Input.Search;
const getSurveyListUrl = restUrl.ADDR + 'survey/getSurveyList';

class Survey extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data_1: {
                satisfaction: {
                    A: 0,
                    B: 0,
                    C: 0
                },
                dish: {
                    A: 0,
                    B: 0,
                    C: 0
                },
                clean: {
                    A: 0,
                    B: 0,
                    C: 0
                }
            },
            data_2: {
                satisfaction: {
                    A: 0,
                    B: 0,
                    C: 0
                },
                dish: {
                    A: 0,
                    B: 0,
                    C: 0
                },
                clean: {
                    A: 0,
                    B: 0,
                    C: 0
                }
            },
            data_3: {
                satisfaction: {
                    A: 0,
                    B: 0,
                    C: 0
                },
                dish: {
                    A: 0,
                    B: 0,
                    C: 0
                },
                clean: {
                    A: 0,
                    B: 0,
                    C: 0
                }
            },
            data_4: {
                satisfaction: {
                    A: 0,
                    B: 0,
                    C: 0
                },
                dish: {
                    A: 0,
                    B: 0,
                    C: 0
                },
                clean: {
                    A: 0,
                    B: 0,
                    C: 0
                }
            },
            data_5: {
                satisfaction: {
                    A: 0,
                    B: 0,
                    C: 0
                },
                dish: {
                    A: 0,
                    B: 0,
                    C: 0
                },
                clean: {
                    A: 0,
                    B: 0,
                    C: 0
                }
            },
            data_6: {
                satisfaction: {
                    A: 0,
                    B: 0,
                    C: 0
                },
                dish: {
                    A: 0,
                    B: 0,
                    C: 0
                },
                clean: {
                    A: 0,
                    B: 0,
                    C: 0
                }
            },
            data_7: {
                satisfaction: {
                    A: 0,
                    B: 0,
                    C: 0
                },
                dish: {
                    A: 0,
                    B: 0,
                    C: 0
                },
                clean: {
                    A: 0,
                    B: 0,
                    C: 0
                }
            }
        };
    }

    componentWillMount = () => {
    }

    componentDidMount = () => {
        this.getSurveyList();
    }

    getSurveyList = () => {
        this.setState({
            loading: true
        });
        ajax.getJSON(getSurveyListUrl, null, data => {
            if (data.success) {
                let data_1 = {
                    satisfaction: {
                        A: 0,
                        B: 0,
                        C: 0
                    },
                    dish: {
                        A: 0,
                        B: 0,
                        C: 0
                    },
                    clean: {
                        A: 0,
                        B: 0,
                        C: 0
                    }
                }, data_2 = {
                    satisfaction: {
                        A: 0,
                        B: 0,
                        C: 0
                    },
                    dish: {
                        A: 0,
                        B: 0,
                        C: 0
                    },
                    clean: {
                        A: 0,
                        B: 0,
                        C: 0
                    }
                }, data_3 = {
                    satisfaction: {
                        A: 0,
                        B: 0,
                        C: 0
                    },
                    dish: {
                        A: 0,
                        B: 0,
                        C: 0
                    },
                    clean: {
                        A: 0,
                        B: 0,
                        C: 0
                    }
                }, data_4 = {
                    satisfaction: {
                        A: 0,
                        B: 0,
                        C: 0
                    },
                    dish: {
                        A: 0,
                        B: 0,
                        C: 0
                    },
                    clean: {
                        A: 0,
                        B: 0,
                        C: 0
                    }
                }, data_5 = {
                    satisfaction: {
                        A: 0,
                        B: 0,
                        C: 0
                    },
                    dish: {
                        A: 0,
                        B: 0,
                        C: 0
                    },
                    clean: {
                        A: 0,
                        B: 0,
                        C: 0
                    }
                }, data_6 = {
                    satisfaction: {
                        A: 0,
                        B: 0,
                        C: 0
                    },
                    dish: {
                        A: 0,
                        B: 0,
                        C: 0
                    },
                    clean: {
                        A: 0,
                        B: 0,
                        C: 0
                    }
                }, data_7 = {
                    satisfaction: {
                        A: 0,
                        B: 0,
                        C: 0
                    },
                    dish: {
                        A: 0,
                        B: 0,
                        C: 0
                    },
                    clean: {
                        A: 0,
                        B: 0,
                        C: 0
                    }
                };
                data = data.backData;
                data.map(item => {
                    item.key = item.id;
                    if (item.companyId === '3') {
                        if (item.satisfaction === '满意') data_1.satisfaction.A++;
                        else if (item.satisfaction === '一般') data_1.satisfaction.B++;
                        else data_1.satisfaction.C++;

                        if (item.dish === '满意') data_1.dish.A++;
                        else if (item.dish === '一般') data_1.dish.B++;
                        else data_1.dish.C++;

                        if (item.clean === '满意') data_1.clean.A++;
                        else if (item.clean === '一般') data_1.clean.B++;
                        else data_1.clean.C++;
                    }
                    if (item.companyId === '4') {
                        if (item.satisfaction === '满意') data_2.satisfaction.A++;
                        else if (item.satisfaction === '一般') data_2.satisfaction.B++;
                        else data_2.satisfaction.C++;

                        if (item.dish === '满意') data_2.dish.A++;
                        else if (item.dish === '一般') data_2.dish.B++;
                        else data_2.dish.C++;

                        if (item.clean === '满意') data_2.clean.A++;
                        else if (item.clean === '一般') data_2.clean.B++;
                        else data_2.clean.C++;
                    }
                    if (item.companyId === '5') {
                        if (item.satisfaction === '满意') data_3.satisfaction.A++;
                        else if (item.satisfaction === '一般') data_3.satisfaction.B++;
                        else data_3.satisfaction.C++;

                        if (item.dish === '满意') data_3.dish.A++;
                        else if (item.dish === '一般') data_3.dish.B++;
                        else data_3.dish.C++;

                        if (item.clean === '满意') data_3.clean.A++;
                        else if (item.clean === '一般') data_3.clean.B++;
                        else data_3.clean.C++;
                    }
                    if (item.companyId === '6') {
                        if (item.satisfaction === '满意') data_4.satisfaction.A++;
                        else if (item.satisfaction === '一般') data_4.satisfaction.B++;
                        else data_4.satisfaction.C++;

                        if (item.dish === '满意') data_4.dish.A++;
                        else if (item.dish === '一般') data_4.dish.B++;
                        else data_4.dish.C++;

                        if (item.clean === '满意') data_4.clean.A++;
                        else if (item.clean === '一般') data_4.clean.B++;
                        else data_4.clean.C++;
                    }
                    if (item.companyId === '7') {
                        if (item.satisfaction === '满意') data_5.satisfaction.A++;
                        else if (item.satisfaction === '一般') data_5.satisfaction.B++;
                        else data_5.satisfaction.C++;

                        if (item.dish === '满意') data_5.dish.A++;
                        else if (item.dish === '一般') data_5.dish.B++;
                        else data_5.dish.C++;

                        if (item.clean === '满意') data_5.clean.A++;
                        else if (item.clean === '一般') data_5.clean.B++;
                        else data_5.clean.C++;
                    }
                    if (item.companyId === '8') {
                        if (item.satisfaction === '满意') data_6.satisfaction.A++;
                        else if (item.satisfaction === '一般') data_6.satisfaction.B++;
                        else data_6.satisfaction.C++;

                        if (item.dish === '满意') data_6.dish.A++;
                        else if (item.dish === '一般') data_6.dish.B++;
                        else data_6.dish.C++;

                        if (item.clean === '满意') data_6.clean.A++;
                        else if (item.clean === '一般') data_6.clean.B++;
                        else data_6.clean.C++;
                    }
                    if (item.companyId === '9') {
                        if (item.satisfaction === '满意') data_7.satisfaction.A++;
                        else if (item.satisfaction === '一般') data_7.satisfaction.B++;
                        else data_7.satisfaction.C++;

                        if (item.dish === '满意') data_7.dish.A++;
                        else if (item.dish === '一般') data_7.dish.B++;
                        else data_7.dish.C++;

                        if (item.clean === '满意') data_7.clean.A++;
                        else if (item.clean === '一般') data_7.clean.B++;
                        else data_7.clean.C++;
                    }
                });
                this.setState({
                    data_1,
                    data_2,
                    data_3,
                    data_4,
                    data_5,
                    data_6,
                    data_7
                });
            }
            this.setState({
                loading: false
            });
        });
    }

    render() {
        const {data_1, data_2, data_3, data_4, data_5, data_6, data_7, loading} = this.state;

        return (
            <div className="zui-content">
                <div className="breadcrumb-block">
                    <Breadcrumb>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>就餐服务管理</Breadcrumb.Item>
                        <Breadcrumb.Item>满意度调查管理</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="ibox-title">
                    <h5>满意度调查管理</h5>
                </div>
                <div className="ibox-content">
                    <Spin spinning={loading}>

                        <Tabs defaultActiveKey="1">
                            <TabPane tab="学生公寓1号" key="1">
                                <Row gutter={32} className="survey-result">
                                    <Col span={12}>
                                        <h1>服务</h1>
                                        <Divider/>
                                        <h2><span>满意:</span><span>{data_1.satisfaction.A}</span></h2>
                                        <h2><span>一般:</span><span>{data_1.satisfaction.B}</span></h2>
                                        <h2><span>差:</span><span>{data_1.satisfaction.C}</span></h2>
                                    </Col>
                                    <Col span={12}>
                                        <h1>卫生</h1>
                                        <Divider/>
                                        <h2><span>满意:</span><span>{data_1.clean.A}</span></h2>
                                        <h2><span>一般:</span><span>{data_1.clean.B}</span></h2>
                                        <h2><span>差:</span><span>{data_1.clean.C}</span></h2>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="学生公寓2号" key="2">
                                <Row gutter={32} className="survey-result">
                                    <Col span={12}>
                                        <h1>服务</h1>
                                        <Divider/>
                                        <h2><span>满意:</span><span>{data_2.satisfaction.A}</span></h2>
                                        <h2><span>一般:</span><span>{data_2.satisfaction.B}</span></h2>
                                        <h2><span>差:</span><span>{data_2.satisfaction.C}</span></h2>
                                    </Col>
                                    <Col span={12}>
                                        <h1>卫生</h1>
                                        <Divider/>
                                        <h2><span>满意:</span><span>{data_2.clean.A}</span></h2>
                                        <h2><span>一般:</span><span>{data_2.clean.B}</span></h2>
                                        <h2><span>差:</span><span>{data_2.clean.C}</span></h2>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="教师公寓" key="3">
                                <Row gutter={32} className="survey-result">
                                    <Col span={12}>
                                        <h1>服务</h1>
                                        <Divider/>
                                        <h2><span>满意:</span><span>{data_3.satisfaction.A}</span></h2>
                                        <h2><span>一般:</span><span>{data_3.satisfaction.B}</span></h2>
                                        <h2><span>差:</span><span>{data_3.satisfaction.C}</span></h2>
                                    </Col>
                                    <Col span={12}>
                                        <h1>卫生</h1>
                                        <Divider/>
                                        <h2><span>满意:</span><span>{data_3.clean.A}</span></h2>
                                        <h2><span>一般:</span><span>{data_3.clean.B}</span></h2>
                                        <h2><span>差:</span><span>{data_3.clean.C}</span></h2>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="学生公寓3号" key="4">
                                <Row gutter={32} className="survey-result">
                                    <Col span={12}>
                                        <h1>服务</h1>
                                        <Divider/>
                                        <h2><span>满意:</span><span>{data_4.satisfaction.A}</span></h2>
                                        <h2><span>一般:</span><span>{data_4.satisfaction.B}</span></h2>
                                        <h2><span>差:</span><span>{data_4.satisfaction.C}</span></h2>
                                    </Col>
                                    <Col span={12}>
                                        <h1>卫生</h1>
                                        <Divider/>
                                        <h2><span>满意:</span><span>{data_4.clean.A}</span></h2>
                                        <h2><span>一般:</span><span>{data_4.clean.B}</span></h2>
                                        <h2><span>差:</span><span>{data_4.clean.C}</span></h2>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="学生公寓4号" key="5">
                                <Row gutter={32} className="survey-result">
                                    <Col span={12}>
                                        <h1>服务</h1>
                                        <Divider/>
                                        <h2><span>满意:</span><span>{data_5.satisfaction.A}</span></h2>
                                        <h2><span>一般:</span><span>{data_5.satisfaction.B}</span></h2>
                                        <h2><span>差:</span><span>{data_5.satisfaction.C}</span></h2>
                                    </Col>
                                    <Col span={12}>
                                        <h1>卫生</h1>
                                        <Divider/>
                                        <h2><span>满意:</span><span>{data_5.clean.A}</span></h2>
                                        <h2><span>一般:</span><span>{data_5.clean.B}</span></h2>
                                        <h2><span>差:</span><span>{data_5.clean.C}</span></h2>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="学生公寓5号" key="6">
                                <Row gutter={32} className="survey-result">
                                    <Col span={12}>
                                        <h1>服务</h1>
                                        <Divider/>
                                        <h2><span>满意:</span><span>{data_6.satisfaction.A}</span></h2>
                                        <h2><span>一般:</span><span>{data_6.satisfaction.B}</span></h2>
                                        <h2><span>差:</span><span>{data_6.satisfaction.C}</span></h2>
                                    </Col>
                                    <Col span={12}>
                                        <h1>卫生</h1>
                                        <Divider/>
                                        <h2><span>满意:</span><span>{data_6.clean.A}</span></h2>
                                        <h2><span>一般:</span><span>{data_6.clean.B}</span></h2>
                                        <h2><span>差:</span><span>{data_6.clean.C}</span></h2>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="学生公寓6号" key="7">
                                <Row gutter={32} className="survey-result">
                                    <Col span={12}>
                                        <h1>服务</h1>
                                        <Divider/>
                                        <h2><span>满意:</span><span>{data_7.satisfaction.A}</span></h2>
                                        <h2><span>一般:</span><span>{data_7.satisfaction.B}</span></h2>
                                        <h2><span>差:</span><span>{data_7.satisfaction.C}</span></h2>
                                    </Col>
                                    <Col span={12}>
                                        <h1>卫生</h1>
                                        <Divider/>
                                        <h2><span>满意:</span><span>{data_7.clean.A}</span></h2>
                                        <h2><span>一般:</span><span>{data_7.clean.B}</span></h2>
                                        <h2><span>差:</span><span>{data_7.clean.C}</span></h2>
                                    </Col>
                                </Row>
                            </TabPane>
                        </Tabs>
                    </Spin>
                </div>
            </div>
        );
    }
}

Survey.contextTypes = {
    router: React.PropTypes.object
}

export default Survey;