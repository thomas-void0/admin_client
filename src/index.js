import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import store from './store';
import ramInfo from './tools/ramInfo';
import localInfo from './tools/localInfo';

//读取localStorage中的数据存储到内存中
const localData = localInfo.getLocalData();
if(localData){
    ramInfo.user = localData;
}

const App1 = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(App1, document.getElementById('root'));


