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
import BrandAdmin from '../modules/dish/component/brandAdmin';
/* 订单管理 */
import OrderList from '../modules/order/component/orderList';
import OrderDetailInfo from '../modules/order/component/orderDetailInfo';
/* 案例和新闻管理 */
import CaseList from '../modules/news/component/caseList';
import AddCase from '../modules/news/component/addCase';
import NewsList from '../modules/news/component/newsList';
import AddNews from '../modules/news/component/addNews';
import NewsDetailInfo from '../modules/news/component/newsDetailInfo';
import EditNews from '../modules/news/component/editNews';

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
            <route path="dish/brandAdmin" component={BrandAdmin} />
            <route path="order/orderList" component={OrderList} />
            <route path="order/orderDetailInfo/:id" component={OrderDetailInfo} />
            <route path="news/newsList" component={NewsList} />
            <route path="news/addNews" component={AddNews} />
            <route path="news/newsDetailInfo/:id" component={NewsDetailInfo} />
            <route path="news/editNews/:id" component={EditNews} />
            <route path="news/caseList" component={CaseList} />
            <route path="news/addCase" component={AddCase} />
        </Route>
    </Route>
);
