class UserSingleton   {
    constructor() {
        this._jwt = '';
        
    }
    set jwt(_jwt) {
        this._jwt = _jwt;
    }

    get jwt() {
        return this._jwt;
    }
}
export default new UserSingleton();