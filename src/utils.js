/**
 * key可能的形式有 'a.b.c' 'a[c].c[f]'
 * @param key
 * @param obj
 * @return {*}
 */
export const parseKey = function (key, obj) {
    let value = obj;
    key = key.replace(/]/g, '').replace(/\[/g, '.');
    let attr = key.split('.');
    while (attr.length) {
        if (!value) {
            return console.error(`Cannot read property '${attr}' of undefined in state or props`)
        }
        let curKey = attr.shift();
        value = value[curKey];
    }

    return value;
}