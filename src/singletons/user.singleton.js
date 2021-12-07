class UserSingleton {
  constructor() {
    this._jwt = "";
    this._affiliateList = true;
  }
  set jwt(_jwt) {
    this._jwt = _jwt;
  }
  get jwt() {
    return this._jwt;
  }
  set affiliateList(_affiliateList) {
    this._affiliateList = _affiliateList;
  }
  get affiliateList() {
    return this._affiliateList;
  }
}
export default new UserSingleton();
