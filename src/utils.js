/**根据key值查找对象的value
 * key可能的形式有 'a.b.c' 'a[c].c[f]'
 * @param key
 * @param obj
 * @return array [found, obj]
 */
export const parseKey = function (key, obj) {
    let value = obj;
    key = key.replace(/]/g, '').replace(/\[/g, '.');
    let attr = key.split('.');
    while (attr.length) {
        let curKey = attr.shift();
        if (value.hasOwnProperty(curKey)) {
            value = value[curKey];
        } else {
            return [false]
        }
    }

    return [true, value];
}