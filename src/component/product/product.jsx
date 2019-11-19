import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import ProductAdd from '../../containers/product-add';
import ProductDetail from '../../containers/product-detail';
import ProductHome from '../../containers/product-home';

export default function Product() {
    return (
        <Switch>
            <Route path="/product" exact component={ProductHome}/>
            <Route path="/product/detail" component={ProductDetail}/>
            <Route path="/product/add" component={ProductAdd}/>
            <Redirect to="/product" />
        </Switch>
    )
}
