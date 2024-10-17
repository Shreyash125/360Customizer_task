function getUserInfo(user) {
    var _a;
    return {
        name: user.name,
        age: (_a = user.age) !== null && _a !== void 0 ? _a : 'Age not provided'
    };
}
var userWithAge = { name: 'shreyash', age: 21 };
var userWithoutAge = { name: 'khillare' }; 
console.log(getUserInfo(userWithAge)); 
console.log(getUserInfo(userWithoutAge)); 