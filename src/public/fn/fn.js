/**
 * @function fn
 * 公共函数，提供基本的一些数据格式处理
 */
export default fn ={
    dx(n){
        if(isNaN(n)) return
        let flag = n.indexOf('.');
        var fraction = ['角', '分'];
        var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        var unit = [ ['元', '万', '亿'], ['', '拾', '佰', '仟']  ];
        var unit2 = [ '拾', '佰', '仟', '万', '亿', '元', '角', '分' ];
        var head = n < 0? '负': '';
        n = Math.abs(n);
        var s = '';
        for (var i = 0; i < fraction.length; i++)
        {
            s += (digit[Math.floor((n+0.001) * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
        }
        s = s || '整';
        n = Math.floor(n);
        for (var i = 0; i < unit[0].length && n > 0; i++)
        {
            var p = '';
            for (var j = 0; j < unit[1].length && n > 0; j++)
            {
                p = digit[n % 10] + unit[1][j] + p;
                n = Math.floor(n / 10);
            }
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')  + unit[0][i] + s;
        }
        // 把金额用空格隔开，方便阅读
        var res = head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
        let arr = res.split('');
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < unit2.length; j++) {
                if (arr[i] == unit2[j]) {
                    if (flag != -1) { // 小数形式
                        arr[i] = arr[i] + (arr[i + 1] == '元' ? '' : ' ')
                    } else { // 整数形式
                        if (arr[i] == '元') {
                            arr[i] = arr[i]
                        } else {
                            arr[i] = arr[i] + ' '
                        }
                    }
                }
            }
        }
        return arr.join('');
    }
}