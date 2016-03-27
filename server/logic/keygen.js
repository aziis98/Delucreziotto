// Copyright 2016 Antonio De Lucreziis

letters = 'abcdefghiljkmnopqrstuvxywz';
digits = '0123456789';
chars = letters + letters.toUpperCase() + digits;

registry = {};

exports.random = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
exports.generate = function (size) {
    key = "";
    for (var i = 0; i < size; i++) {
        key += chars[exports.random(0, chars.length - 1)];
    }
    if (registry[key]) {
      return exports.generate(size);
    }
    else {
      registry[key] = true;
      return key;
    }
};
