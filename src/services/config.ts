const fs = require('fs');

export default class Config {
    _cache: string = process.env.CACHE

    get cache() {
        return this._cache
    }
}
