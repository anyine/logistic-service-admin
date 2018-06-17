import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from '../modules/App';
import Frame from '../modules/Frame';

/* 首页 */
import Home from '../modules/home/component/home';
/* 登录 */
import Login from '../modules/login/component/login';
/* 便民信息 */
import Lost from '../modules/lost/component/';
import Need from '../modules/lost/component/need';
/* 菜单管理 */
import DishList from '../modules/dish/component/dishList';
import DishDetailInfo from '../modules/dish/component/dishDetailInfo';
import EditDish from '../modules/dish/component/editDish';
import AddDish from '../modules/dish/component/addDish';
import HealthFood from '../modules/dish/component/healthFood';
import AddHealthFood from '../modules/dish/component/addHealthFood';
import EditHealth from '../modules/dish/component/editHealth';
import DishSurvey from '../modules/dish/component/survey';
import BrandAdmin from '../modules/dish/component/brandAdmin';
/* 公司信息管理 */
import Website from '../modules/company/component/website';
import Website2 from '../modules/company/component/website2';
import AddServiceAndHoliday from '../modules/company/component/addServiceAndHoliday';
import EditServiceAndHoliday from '../modules/company/component/editServiceAndHoliday';
import OrderDetailInfo from '../modules/company/component/orderDetailInfo';
/* 宿舍公寓管理 */
import PropertyInformation from '../modules/residence/component/propertyInformation';
import ResidenceSurvey from '../modules/residence/component/survey';
import HealthLife from '../modules/residence/component/healthLife';
import AddHealthLife from '../modules/residence/component/addHealthLife';
import EditResidenceHealth from '../modules/residence/component/editHealth';
import Ball from '../modules/residence/component/ball';
import AddBall from '../modules/residence/component/addBall';
import EditBall from '../modules/residence/component/editBall';
/* 训练段动态 */
import LiveList from '../modules/live/component/liveList';
import AddLive from '../modules/live/component/addLive';
import EditLive from '../modules/live/component/editLive';
/* 班车信息 */
import Bus from '../modules/bus/component/';

module.exports = (
    <Route path="/" component={App}>
        <IndexRoute component={Login}/>
        <route path="login" component={Login} />
        <Route path="/frame" component={Frame}>
            <IndexRoute component={Home}/>
            <route path="home" component={Home} />
            <route path="lost" component={Lost} />
            <route path="need" component={Need} />
            <route path="dish/dishList" component={DishList} />
            <route path="dish/dishDetailInfo/:id" component={DishDetailInfo} />
            <route path="dish/editDish/:id" component={EditDish} />
            <route path="dish/AddDish" component={AddDish} />
            <route path="dish/healthFood" component={HealthFood} />
            <route path="dish/addHealthFood" component={AddHealthFood} />
            <route path="dish/editHealth/:id" component={EditHealth} />
            <route path="dish/survey" component={DishSurvey} />
            <route path="dish/brandAdmin" component={BrandAdmin} />
            <route path="company/website" component={Website} />
            <route path="company/webSiteResident" component={Website2} />
            <route path="company/addServiceAndHoliday" component={AddServiceAndHoliday} />
            <route path="company/editServiceAndHoliday/:id" component={EditServiceAndHoliday} />
            <route path="company/orderDetailInfo/:id" component={OrderDetailInfo} />
            <route path="residence/propertyInformation" component={PropertyInformation} />
            <route path="residence/survey" component={ResidenceSurvey} />
            <route path="residence/healthLife" component={HealthLife} />
            <route path="residence/addHealthLife" component={AddHealthLife} />
            <route path="residence/editHealth/:id" component={EditResidenceHealth} />
            <route path="residence/ball" component={Ball} />
            <route path="residence/addBall" component={AddBall} />
            <route path="residence/editBall/:id" component={EditBall} />
            <route path="live/liveList" component={LiveList} />
            <route path="live/addLive" component={AddLive} />
            <route path="live/editLive/:id" component={EditLive} />
            <route path="bus" component={Bus} />
        </Route>
    </Route>
);
