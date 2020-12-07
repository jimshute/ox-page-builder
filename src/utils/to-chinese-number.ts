const units: any = {
  0: '零',
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  7: '七',
  8: '八',
  9: '九',
  10: '十'
};

let place: any = {
  0: '',
  1: '十',
  2: '百',
  3: '千'
};

let place2: any = {
  0: '',
  1: '万',
  2: '亿',
  3: '万亿'
};

export default function toChineseNumber (n: any) {
  let str = n.toString();
  let reg = /(\d{1,4}?)(?=(\d{4})*$)/g;
  let matched = reg.exec(str);
  let arr = [];

  let optimize = new RegExp(
    `(?:${units[0]}+$)|(${units[0]})(?:${units[0]}+)|(?:${units[1]})(${place[1]
    })`,
    'g'
  );
  while (matched) {
    arr.push(
      matched[0]
        .split('')
        .reverse()
        .map((a, i) => {
          return a !== '0' ? units[a] + place[i] : units[a];
        })
        .reverse()
        .join('')
        .replace(optimize, '$1$2')
    );
    matched = reg.exec(str);
  }
  return arr
    .reverse()
    .map((a, i) => {
      return a + place2[i];
    })
    .reverse()
    .join('');
}
