//base class
function BaseBuilder(val) {
    this.val = val;
}

BaseBuilder.prototype.get = function() {
    return this.val;
}

BaseBuilder.prototype.plus = function(...n) {
    this.val = n.reduce(function(prev, curr) {
        return prev + curr;
    }, this.val);
    return this;
}

//intBuilder class - int operations (ES6)
class IntBuilder extends BaseBuilder {

    constructor(val = 0) {
        super(val);
    }

    minus(...n) {
        this.val = n.reduce(function(prev, curr) {
            return prev - curr;
        }, this.val);
        return this;
    }

    multiply(n) {
        this.val *= n;
        return this;
    }

    divide(n) {
        this.val = Math.floor(this.val / n);
        return this;
    }

    mod(n) {
        this.val %= n;
        return this;
    }

    static random(from, to) {
        return from + Math.floor((to - from) * Math.random());
    }
}

//StringBuilder class - string operations (ES5)
function StringBuilder(str = '') {
    BaseBuilder.call(this, str);
}

StringBuilder.prototype = Object.create(BaseBuilder.prototype);
StringBuilder.prototype.constructor = StringBuilder();

StringBuilder.prototype.minus = function (n) {
    this.val = this.val.substring(0, (this.val.length - n));
    return this;
}

StringBuilder.prototype.multiply = function (n) {
    this.val = this.val.repeat(n);
    return this;
}

StringBuilder.prototype.divide = function (n) {
    let k = Math.floor(this.val.length / n);
    this.val = this.val.substring(0, k);
    return this;
}

StringBuilder.prototype.remove = function (str) {
    let cutStr = this.val;
    while (cutStr.search(str) >= 0) {
        let strStart = cutStr.search(str);
        let strEnd = strStart + str.length;
        let cutStrStart = cutStr.split('').slice(0, strStart).join('');
        let cutStrEnd = cutStr.split('').slice(strEnd, cutStr.length).join('');
        cutStr = cutStrStart + cutStrEnd;
    }
    this.val = cutStr;
    return this;
}

StringBuilder.prototype.sub = function (from, n) {
    this.val = this.val.substring(from, from+n);
    return this;
}

let strBuilder = new StringBuilder('hellololo!');
console.log(strBuilder.plus('ala ma kota').minus(4).multiply(2).divide(3).remove('lo'));
console.log(strBuilder.sub(3,5).get());

const el = new IntBuilder(1);
console.log(el.plus(4).minus(3).multiply(3).divide(2).get());
console.log(IntBuilder.random(3,7));