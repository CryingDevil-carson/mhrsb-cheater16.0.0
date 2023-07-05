
class Cache {
    constructor(dbName, tableName, version,) {
        this.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
        this.sessionStorage = window.sessionStorage
        this.store = this.indexedDB || window.localStorage;
        this.dbName = dbName;
        this.version = version;
        this.tableName = tableName;
        this.db = null;
    };
    open() {
        if (!this.store) return;
        if (this.indexedDB) {
            return this.version ? indexedDB.open(this.dbName, this.version) : indexedDB.open(this.dbName)
        } else {
            return window.localStorage
        }
    };
    init() {
        if (!this.store) return;
        let _this = this;
        return new Promise((resolve, reject) => {
            let IDBOpenDBRequest = _this.open()
            if (_this.indexedDB) {
                IDBOpenDBRequest.onupgradeneeded = (e) => {
                    _this.db = e.target.result; // 获取到对应的 IDBDatabase实例。
                    if (!_this.db.objectStoreNames.contains(_this.tableName)) {
                        //如果表格不存在，创建一个新的表格（keyPath，主键 ； autoIncrement,是否自增），会返回一个对象（objectStore）
                        // objectStore就相当于数据库中的一张表。IDBObjectStore类型。
                        var objectStore = _this.db.createObjectStore(_this.tableName, {
                            keyPath: 'id',
                            // autoIncrement: true    //自动生成主键
                        });
                        //   指定可以被索引的字段，unique字段是否唯一。类型： IDBIndex
                        //   IDBObject.createIndex()的三个参数分别为索引名称、索引所在的属性、配置对象（说明该属性是否包含重复的值）
                        // objectStore.createIndex('name', 'name', {
                        //     unique: true  //是否唯一， 意思是name 都是唯一的不能重复
                        // });
                    }
                };
                IDBOpenDBRequest.onsuccess = (e) => {
                    _this.db = e.target.result
                    resolve('数据库打开成功')
                };
                IDBOpenDBRequest.onerror = function (e) {
                    reject(e)
                };
            } else {
                _this.db = IDBOpenDBRequest;
                resolve('数据库打开成功')
            }
        })
    };
    //增加数据 expired为过期时间单位毫秒 针对localStorage(过期时间相关代码已经注释 暂不设置过期时间)
    add(key, value, expired) {
        if (!this.db) return;
        let _this = this;
        return new Promise((resolve, reject) => {
            let data = { 'id': key, data: value }
            if (_this.indexedDB) {
                let request = _this.db.transaction([_this.tableName], 'readwrite')
                    .objectStore(_this.tableName)
                    .put(data);

                request.onsuccess = function (event) {
                    resolve('数据写入成功')
                };

                request.onerror = function (event) {
                    reject(event)
                }
            } else {
                _this.db.setItem(key, JSON.stringify(data))
                // if (expired) {
                //     let expKey = key + "__expires__";
                //     _this.db.setItem(expKey, Date.now() + expired)
                // }
                resolve('数据写入成功')
            }
        });
    };
    //删除
    delete(key) {
        if (!this.db) return;
        let _this = this;
        return new Promise((resolve, reject) => {
            if (_this.indexedDB) {
                let request = _this.db.transaction([_this.tableName], 'readwrite')
                    .objectStore(_this.tableName)
                    .delete(key);
                request.onsuccess = function (event) {
                    resolve('数据删除成功')

                };
                request.onerror = function (event) {
                    reject(event)
                };
            } else {
                _this.db.removeItem(key)
                // let expKey = key + "__expires__";
                // _this.db.removeItem(expKey)
                resolve('数据删除成功')
            }
        });
    };
    //获取
    get(key) {
        if (!this.db) return;
        let _this = this;
        return new Promise(async (resolve, reject) => {
            if (_this.indexedDB) {
                let transaction = _this.db.transaction(_this.tableName, 'readonly');
                let store = transaction.objectStore(_this.tableName);
                let result = store.get(key);
                result.onsuccess = function (e) {
                    //多嵌套了一层 所以再.data
                    let data = e.target.result;
                    if (data) data = data.data
                    resolve(data)
                };
                result.onerror = function (event) {
                    reject(event)
                };
            } else {
                let data = _this.db.getItem(key)
                if (data !== null) {
                    data = JSON.parse(data)
                    data = data.data;
                    // let expKey = key + "__expires__";
                    // let expired = _this.db.getItem(expKey) || Date.now() + 1;
                    // let now = Date.now();
                    // if (now >= expired) {
                    //     await _this.delete(key);
                    //     resolve('已过期')
                    //     return;
                    // } else {
                    resolve(data)
                    // }
                } else {
                    reject('没有该键')
                }
            }

        });

    };
    // 清空
    clear() {
        if (!this.db) return;
        let _this = this;
        return new Promise((resolve, reject) => {
            if (_this.indexedDB) {
                var request = _this.db.transaction([_this.tableName], 'readwrite')
                    .objectStore(_this.tableName)
                    .clear();

                request.onsuccess = function (event) {
                    resolve('清空表成功')
                };

                request.onerror = function (event) {
                    reject(event)
                }
            } else {
                _this.db.clear()
                resolve('清空成功')
            }
        });
    };
    //  遍历所有数据  
    readAll() {
        if (!this.db) return;
        let _this = this;
        return new Promise(async (resolve, reject) => {
            if (_this.indexedDB) {
                var request = _this.db.transaction([_this.tableName], 'readonly')
                    .objectStore(_this.tableName)
                    .openCursor();
                let data = []
                request.onsuccess = function (event) {
                    var cursor = event.target.result;
                    if (cursor && cursor.value && cursor.value.data) {
                        let d = {
                            "k":cursor.value.id,
                            "v":cursor.value.data
                        }
                        // for (let k in cursor.value) {
                        //     d[cursor.value.id] = cursor.value.data
                        // }
                        // d["k"]d[cursor.value.id] = cursor.value.data
                        data.push(d)
                        cursor.continue();
                    } else {
                        resolve(data)
                    }
                };

                request.onerror = function (event) {
                    reject(event)
                }
            } else {
                let data = [];
                // let deleteItem = [];
                for (let i = 0; i < _this.db.length; i++) {
                    let key = _this.db.key(i);
                    // if (!key.includes('_expires__')) {
                    // let expKey = key + "__expires__";
                    // let expired = _this.db.getItem(expKey) || Date.now() + 1;
                    // let now = Date.now();
                    // if (now >= expired) {
                    //     deleteItem.push(key)
                    // } else {
                    let v = _this.db.getItem(key)
                    v = JSON.parse(v)
                    v = v.data
                    let d = {
                        "k":key,
                        "v":v
                    }                    
                    data.push(d)
                    // }
                    // }
                }
                // for (let i = 0; i < deleteItem.length; i++) {
                //     await _this.delete(deleteItem[i])
                // }
                resolve(data)
            }
        });
    };
    //sessionStorage 相关方法
    sessionAdd(key, value) {
        if (!this.sessionStorage) return;
        let _this = this;
        return new Promise((resolve, reject) => {
            let data = { 'id': key, data: value }
            _this.sessionStorage.setItem(key, JSON.stringify(data))
            resolve('数据写入成功')
        });
    };
    sessionGet(key) {
        if (!this.sessionStorage) return;
        let _this = this;
        return new Promise((resolve, reject) => {
            let data = _this.sessionStorage.getItem(key)
            if (data !== null) {
                data = JSON.parse(data)
                data = data.data;
                resolve(data)
            } else {
                reject('没有该键')
            }
        });
    };
    sessionDelete(key) {
        if (!this.sessionStorage) return;
        let _this = this;
        return new Promise((resolve, reject) => {
            _this.sessionStorage.removeItem(key)
            resolve('数据删除成功')
        });
    };
};


// /** 
//  * 缓存处理
//  * 
//  */
// var CacheObj = null;

// async function initCache(db) {
//     CacheObj = new Cache(db, "sys", 1);
//     await CacheObj.init();
// }

// async function setSysCache(cache) {
//     return await CacheObj.add("data", cache);

// }

// async function getSysCache() {
//     return await CacheObj.get("data");

// }