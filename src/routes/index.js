import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from '../modules/App';
import Frame from '../modules/Frame';

/* 首页 */
import Home from '../modules/home/component/home';
/* 登录 */
import Login from '../modules/login/component/login';
/* 失物招领 */
import Lost from '../modules/lost/component/';
/* 菜单管理 */
import DishList from '../modules/dish/component/dishList';
import DishDetailInfo from '../modules/dish/component/dishDetailInfo';
import EditDish from '../modules/dish/component/editDish';
import AddDish from '../modules/dish/component/addDish';
import HealthFood from '../modules/dish/component/healthFood';
import DishSurvey from '../modules/dish/component/survey';
import BrandAdmin from '../modules/dish/component/brandAdmin';
/* 订单管理 */
import OrderList from '../modules/order/component/orderList';
import OrderDetailInfo from '../modules/order/component/orderDetailInfo';
/* 宿舍公寓管理 */
import PropertyInformation from '../modules/residence/component/propertyInformation';
import ResidenceSurvey from '../modules/residence/component/survey';
import HealthLife from '../modules/residence/component/healthLife';

module.exports = (
    <Route path="/" component={App}>
        <IndexRoute component={Login}/>
        <route path="login" component={Login} />
        <Route path="/frame" component={Frame}>
            <IndexRoute component={Home}/>
            <route path="home" component={Home} />
            <route path="lost" component={Lost} />
            <route path="dish/dishList" component={DishList} />
            <route path="dish/dishDetailInfo/:id" component={DishDetailInfo} />
            <route path="dish/editDish/:id" component={EditDish} />
            <route path="dish/AddDish" component={AddDish} />
            <route path="dish/healthFood" component={HealthFood} />
            <route path="dish/survey" component={DishSurvey} />
            <route path="dish/brandAdmin" component={BrandAdmin} />
            <route path="order/orderList" component={OrderList} />
            <route path="order/orderDetailInfo/:id" component={OrderDetailInfo} />
            <route path="residence/propertyInformation" component={PropertyInformation} />
            <route path="residence/survey" component={ResidenceSurvey} />
            <route path="residence/healthLife" component={HealthLife} />
        </Route>
    </Route>
);
