// Reduxers index file.

import { combineReducers } from 'redux';
import users from './users';
import transactions from './transactions';
import playOff from 'playOff';
import settings from 'settings';
import notification from './notification';
import news from './news';
import auth from './auth'; 

export default combineReducers({
    users,
    transactions,
    playOff,
    settings,
    notification,
    news,
    auth
});
