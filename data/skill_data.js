var Attr = {
    "atk": "攻击",//
    "def": "防御",//
    "sd": "拔纳",
    "cri": "会心",//会心
    "ele": "属性",//
    "abn": "异常",//
    "heal": "回复",//
    "body": "身体性能",//相关
    "sharp": "锋利度",//
    "gun": "远程",//相关
    "other": "其他",//
    "spec": "特殊",//
    // "insect":"虫",//
}
var skill_data = {
    "01": { "tag": [Attr.atk], "hex": "01", "sname": "攻击", "cost": 15, "max": 7, "lvType": "A", "p1Max": 3, "p2Max": 2, },
    "02": { "tag": [Attr.atk], "hex": "02", "sname": "挑战者", "cost": 12, "max": 5, "lvType": "A", "p1Max": 4, "p2Max": 3, },
    "03": { "tag": [Attr.atk], "hex": "03", "sname": "无伤", "cost": 12, "max": 3, "lvType": "A", "p1Max": 3, "p2Max": 2, },
    "04": { "tag": [Attr.atk], "hex": "04", "sname": "怨恨", "cost": 12, "max": 5, "lvType": "A", "p1Max": 4, "p2Max": 3, },
    "05": { "tag": [Attr.atk], "hex": "05", "sname": "死里逃生", "cost": 12, "max": 3, "lvType": "A", "p1Max": 3, "p2Max": 2, },
    "06": { "tag": [Attr.cri], "hex": "06", "sname": "看破", "cost": 15, "max": 7, "lvType": "A", "p1Max": 3, "p2Max": 2, },
    "07": { "tag": [Attr.cri], "hex": "07", "sname": "超会心", "cost": 15, "max": 3, "lvType": "S", "p1Max": 3, "p2Max": 2, },
    "08": { "tag": [Attr.cri], "hex": "08", "sname": "弱点特效", "cost": 15, "max": 3, "lvType": "A", "p1Max": 3, "p2Max": 2, },
    "09": { "tag": [Attr.atk, Attr.cri], "hex": "09", "sname": "力量解放", "cost": 12, "max": 5, "lvType": "A", "p1Max": 5, "p2Max": 4, },
    "0A": { "tag": [Attr.cri], "hex": "0A", "sname": "精神抖擞", "cost": 12, "max": 3, "lvType": "A", "p1Max": 2, "p2Max": 2, },
    "0B": { "tag": [Attr.ele, Attr.cri], "hex": "0B", "sname": "会心击【属性】", "cost": 9, "max": 3, "lvType": "A", "p1Max": 3, "p2Max": 2, },
    "0C": { "tag": [Attr.sharp], "hex": "0C", "sname": "达人艺", "cost": 15, "max": 3, "lvType": "S", "p1Max": 3, "p2Max": 2, },
    "0D": { "tag": [Attr.ele], "hex": "0D", "sname": "火属性攻击强化", "cost": 3, "max": 5, "lvType": "B", "p1Max": 5, "p2Max": 4, },
    "0E": { "tag": [Attr.ele], "hex": "0E", "sname": "水属性攻击强化", "cost": 3, "max": 5, "lvType": "B", "p1Max": 5, "p2Max": 4, },
    "0F": { "tag": [Attr.ele], "hex": "0F", "sname": "冰属性攻击强化", "cost": 3, "max": 5, "lvType": "B", "p1Max": 5, "p2Max": 4, },
    "10": { "tag": [Attr.ele], "hex": "10", "sname": "雷属性攻击强化", "cost": 3, "max": 5, "lvType": "B", "p1Max": 5, "p2Max": 4, },
    "11": { "tag": [Attr.ele], "hex": "11", "sname": "龙属性攻击强化", "cost": 3, "max": 5, "lvType": "B", "p1Max": 5, "p2Max": 4, },
    "12": { "tag": [Attr.abn], "hex": "12", "sname": "毒属性强化", "cost": 6, "max": 3, "lvType": "B", "p1Max": 3, "p2Max": 2, },
    "13": { "tag": [Attr.abn], "hex": "13", "sname": "麻痹属性强化", "cost": 6, "max": 3, "lvType": "A", "p1Max": 3, "p2Max": 2, },
    "14": { "tag": [Attr.abn], "hex": "14", "sname": "睡眠属性强化", "cost": 6, "max": 3, "lvType": "A", "p1Max": 3, "p2Max": 2, },
    "15": { "tag": [Attr.abn], "hex": "15", "sname": "爆破属性强化", "cost": 6, "max": 3, "lvType": "A", "p1Max": 3, "p2Max": 2, },
    "16": { "tag": [Attr.sharp], "hex": "16", "sname": "匠", "cost": 12, "max": 5, "lvType": "S", "p1Max": 4, "p2Max": 3, },
    "17": { "tag": [Attr.sharp], "hex": "17", "sname": "利刃", "cost": 15, "max": 3, "lvType": "A", "p1Max": 3, "p2Max": 2, },
    "18": { "tag": [Attr.gun], "hex": "18", "sname": "弹药节制", "cost": 15, "max": 3, "lvType": "A", "p1Max": 3, "p2Max": 2, },
    "19": { "tag": [Attr.sharp], "hex": "19", "sname": "钢刃研磨", "cost": 9, "max": 3, "lvType": "A", "p1Max": 3, "p2Max": 2, },
    "1A": { "tag": [Attr.sharp], "hex": "1A", "sname": "心眼", "cost": 9, "max": 3, "lvType": "S", "p1Max": 3, "p2Max": 2, },
    "1B": { "tag": [Attr.gun], "hex": "1B", "sname": "弹道强化", "cost": 9, "max": 3, "lvType": "A", "p1Max": 3, "p2Max": 2, },
    "1C": { "tag": [Attr.sharp], "hex": "1C", "sname": "钝器能手", "cost": -99, "max": 3, "lvType": "B", "p1Max": 3, "p2Max": 2, },
    "1D": { "tag": [Attr.gun], "hex": "1D", "sname": "解放弓的蓄力阶段", "cost": -99, "max": 1, "lvType": "", "p1Max": 0, "p2Max": 0, },
    "1E": { "tag": [Attr.body], "hex": "1E", "sname": "集中", "cost": 9, "max": 3, "lvType": "S", "p1Max": 3, "p2Max": 2, },
    "1F": { "tag": [Attr.body], "hex": "1F", "sname": "强化持续", "cost": 9, "max": 3, "lvType": "A", "p1Max": 3, "p2Max": 2, },
    "20": { "tag": [Attr.body], "hex": "20", "sname": "跑者", "cost": 6, "max": 3, "lvType": "S", "p1Max": 3, "p2Max": 2, },
    "21": { "tag": [Attr.body], "hex": "21", "sname": "体术", "cost": 6, "max": 5, "lvType": "C", "p1Max": 5, "p2Max": 4, },
    "22": { "tag": [Attr.body], "hex": "22", "sname": "耐力急速回复", "cost": 6, "max": 3, "lvType": "A", "p1Max": 3, "p2Max": 2, },
    "23": { "tag": [Attr.def], "hex": "23", "sname": "防御性能", "cost": 6, "max": 5, "lvType": "A", "p1Max": 5, "p2Max": 4, },
    "24": { "tag": [Attr.def], "hex": "24", "sname": "防御强化", "cost": 6, "max": 3, "lvType": "A", "p1Max": 3, "p2Max": 2, },
    "25": { "tag": [Attr.atk], "hex": "25", "sname": "攻击守势", "cost": 9, "max": 3, "lvType": "S", "p1Max": 3, "p2Max": 2, },
    "26": { "tag": [Attr.sd], "hex": "26", "sname": "拔刀术【技】", "cost": 9, "max": 3, "lvType": "S", "p1Max": 3, "p2Max": 2, },
    "27": { "tag": [Attr.sd], "hex": "27", "sname": "拔刀术【力】", "cost": 6, "max": 3, "lvType": "B", "p1Max": 3, "p2Max": 2, },
    "28": { "tag": [Attr.sd], "hex": "28", "sname": "纳刀术", "cost": 6, "max": 3, "lvType": "B", "p1Max": 3, "p2Max": 2, },
    "29": { "tag": [Attr.atk], "hex": "29", "sname": "KO术", "cost": 6, "max": 3, "lvType": "B", "p1Max": 3, "p2Max": 2, },
    "2A": { "tag": [Attr.atk], "hex": "2A", "sname": "耐力夺取", "cost": 3, "max": 3, "lvType": "C", "p1Max": 3, "p2Max": 3, },
    "2B": { "tag": [Attr.atk], "hex": "2B", "sname": "滑走强化", "cost": 3, "max": 1, "lvType": "C", "p1Max": 0, "p2Max": 0, },
    "2C": { "tag": [Attr.body], "hex": "2C", "sname": "吹笛名人", "cost": 3, "max": 1, "lvType": "C", "p1Max": 0, "p2Max": 0, },
    "2D": { "tag": [Attr.gun], "hex": "2D", "sname": "炮术", "cost": 12, "max": 3, "lvType": "S", "p1Max": 3, "p2Max": 2, },
    "2E": { "tag": [Attr.gun], "hex": "2E", "sname": "炮弹装填", "cost": 6, "max": 2, "lvType": "A", "p1Max": 2, "p2Max": 1, },
    "2F": { "tag": [Attr.gun], "hex": "2F", "sname": "特殊射击强化", "cost": 6, "max": 2, "lvType": "A", "p1Max": 2, "p2Max": 1, },
    "30": { "tag": [Attr.gun], "hex": "30", "sname": "通常弹·连射箭强化", "cost": 15, "max": 3, "lvType": "A", "p1Max": 3, "p2Max": 2, },
    "31": { "tag": [Attr.gun], "hex": "31", "sname": "散弹·扩散箭强化", "cost": 15, "max": 3, "lvType": "S", "p1Max": 3, "p2Max": 2, },
    "32": { "tag": [Attr.gun], "hex": "32", "sname": "贯通弹·贯通箭强化", "cost": 15, "max": 3, "lvType": "S", "p1Max": 3, "p2Max": 2, },
    "33": { "tag": [Attr.gun], "hex": "33", "sname": "装填扩充", "cost": 15, "max": 3, "lvType": "S", "p1Max": 3, "p2Max": 2, },
    "34": { "tag": [Attr.gun], "hex": "34", "sname": "装填速度", "cost": 6, "max": 3, "lvType": "B", "p1Max": 3, "p2Max": 2, },
    "35": { "tag": [Attr.gun], "hex": "35", "sname": "减轻后坐力", "cost": 6, "max": 3, "lvType": "B", "p1Max": 3, "p2Max": 2, },
    "36": { "tag": [Attr.gun], "hex": "36", "sname": "抑制偏移", "cost": 6, "max": 2, "lvType": "B", "p1Max": 3, "p2Max": 2, },
    "37": { "tag": [Attr.gun], "hex": "37", "sname": "速射强化", "cost": 15, "max": 3, "lvType": "S", "p1Max": 3, "p2Max": 2, },
    "38": { "tag": [Attr.def], "hex": "38", "sname": "防御", "cost": 3, "max": 7, "lvType": "B", "p1Max": 7, "p2Max": 7, },
    "39": { "tag": [Attr.def], "hex": "39", "sname": "精灵加护", "cost": 3, "max": 3, "lvType": "B", "p1Max": 3, "p2Max": 3, },
    "3A": { "tag": [Attr.heal], "hex": "3A", "sname": "体力回复量UP", "cost": 3, "max": 3, "lvType": "C", "p1Max": 3, "p2Max": 3, },
    "3B": { "tag": [Attr.heal], "hex": "3B", "sname": "回复速度", "cost": 3, "max": 3, "lvType": "C", "p1Max": 3, "p2Max": 3, },
    "3C": { "tag": [Attr.body], "hex": "3C", "sname": "快吃", "cost": 6, "max": 3, "lvType": "B", "p1Max": 3, "p2Max": 3, },
    "3D": { "tag": [Attr.def], "hex": "3D", "sname": "耳栓", "cost": 9, "max": 5, "lvType": "B", "p1Max": 5, "p2Max": 5, },
    "3E": { "tag": [Attr.def], "hex": "3E", "sname": "风压耐性", "cost": 3, "max": 3, "lvType": "B", "p1Max": 3, "p2Max": 3, },
    "3F": { "tag": [Attr.def], "hex": "3F", "sname": "耐震", "cost": 6, "max": 3, "lvType": "B", "p1Max": 3, "p2Max": 3, },
    "40": { "tag": [Attr.body], "hex": "40", "sname": "泡沫之舞", "cost": 6, "max": 3, "lvType": "B", "p1Max": 3, "p2Max": 3, },
    "41": { "tag": [Attr.def], "hex": "41", "sname": "回避性能", "cost": 6, "max": 5, "lvType": "B", "p1Max": 5, "p2Max": 4, },
    "42": { "tag": [Attr.def], "hex": "42", "sname": "回避距离UP", "cost": 6, "max": 3, "lvType": "B", "p1Max": 3, "p2Max": 2, },
    "43": { "tag": [Attr.body], "hex": "43", "sname": "火耐性", "cost": -99, "max": 3, "lvType": "C", "p1Max": 3, "p2Max": 3, },
    "44": { "tag": [Attr.body], "hex": "44", "sname": "水耐性", "cost": -99, "max": 3, "lvType": "C", "p1Max": 3, "p2Max": 3, },
    "45": { "tag": [Attr.body], "hex": "45", "sname": "冰耐性", "cost": -99, "max": 3, "lvType": "C", "p1Max": 3, "p2Max": 3, },
    "46": { "tag": [Attr.body], "hex": "46", "sname": "雷耐性", "cost": -99, "max": 3, "lvType": "C", "p1Max": 3, "p2Max": 3, },
    "47": { "tag": [Attr.body], "hex": "47", "sname": "龙耐性", "cost": -99, "max": 3, "lvType": "C", "p1Max": 3, "p2Max": 3, },
    "48": { "tag": [Attr.body], "hex": "48", "sname": "属性异常状态的耐性", "cost": 3, "max": 3, "lvType": "B", "p1Max": 3, "p2Max": 2, },
    "49": { "tag": [Attr.body], "hex": "49", "sname": "毒耐性", "cost": 3, "max": 3, "lvType": "C", "p1Max": 3, "p2Max": 3, },
    "4A": { "tag": [Attr.body], "hex": "4A", "sname": "麻痹耐性", "cost": 3, "max": 3, "lvType": "C", "p1Max": 3, "p2Max": 3, },
    "4B": { "tag": [Attr.body], "hex": "4B", "sname": "睡眠耐性", "cost": 3, "max": 3, "lvType": "C", "p1Max": 3, "p2Max": 3, },
    "4C": { "tag": [Attr.body], "hex": "4C", "sname": "气绝耐性", "cost": 3, "max": 3, "lvType": "B", "p1Max": 3, "p2Max": 2, },
    "4D": { "tag": [Attr.body], "hex": "4D", "sname": "泥雪耐性", "cost": 3, "max": 3, "lvType": "C", "p1Max": 2, "p2Max": 2, },
    "4E": { "tag": [Attr.body], "hex": "4E", "sname": "爆破耐性", "cost": 3, "max": 3, "lvType": "C", "p1Max": 3, "p2Max": 3, },
    "4F": { "tag": [Attr.body], "hex": "4F", "sname": "植生学", "cost": -99, "max": 3, "lvType": "C", "p1Max": 4, "p2Max": 4, },
    "50": { "tag": [Attr.body], "hex": "50", "sname": "地质学", "cost": -99, "max": 3, "lvType": "C", "p1Max": 3, "p2Max": 3, },
    "51": { "tag": [Attr.atk], "hex": "51", "sname": "破坏王", "cost": 6, "max": 3, "lvType": "B", "p1Max": 3, "p2Max": 2, },
    "52": { "tag": [Attr.other], "hex": "52", "sname": "捕获名人", "cost": -99, "max": 1, "lvType": "", "p1Max": 0, "p2Max": 0, },
    "53": { "tag": [Attr.other], "hex": "53", "sname": "剥取名人", "cost": -99, "max": 1, "lvType": "", "p1Max": 0, "p2Max": 0, },
    "54": { "tag": [Attr.other], "hex": "54", "sname": "幸运", "cost": 12, "max": 3, "lvType": "S", "p1Max": 3, "p2Max": 2, },
    "55": { "tag": [Attr.sharp], "hex": "55", "sname": "砥石使用高速化", "cost": 3, "max": 3, "lvType": "B", "p1Max": 3, "p2Max": 2, },
    "56": { "tag": [Attr.other], "hex": "56", "sname": "炸弹客", "cost": -99, "max": 3, "lvType": "C", "p1Max": 3, "p2Max": 3, },
    "57": { "tag": [Attr.body], "hex": "57", "sname": "最爱蘑菇", "cost": 9, "max": 3, "lvType": "S", "p1Max": 3, "p2Max": 2, },
    "58": { "tag": [Attr.body], "hex": "58", "sname": "道具使用强化", "cost": 3, "max": 3, "lvType": "C", "p1Max": 3, "p2Max": 3, },
    "59": { "tag": [Attr.body], "hex": "59", "sname": "广域化", "cost": 3, "max": 5, "lvType": "B", "p1Max": 3, "p2Max": 2, },
    "5A": { "tag": [Attr.body], "hex": "5A", "sname": "满足感", "cost": 3, "max": 3, "lvType": "C", "p1Max": 3, "p2Max": 3, },
    "5B": { "tag": [Attr.atk], "hex": "5B", "sname": "火场怪力", "cost": 9, "max": 5, "lvType": "A", "p1Max": 4, "p2Max": 3, },
    "5C": { "tag": [Attr.atk], "hex": "5C", "sname": "不屈", "cost": 3, "max": 1, "lvType": "C", "p1Max": 1, "p2Max": 1, },
    "5D": { "tag": [Attr.def], "hex": "5D", "sname": "减轻胆怯", "cost": 3, "max": 3, "lvType": "B", "p1Max": 3, "p2Max": 2, },
    "5E": { "tag": [Attr.other], "hex": "5E", "sname": "跳跃铁人", "cost": -99, "max": 1, "lvType": "S", "p1Max": 1, "p2Max": 1, },
    "5F": { "tag": [Attr.other], "hex": "5F", "sname": "剥取铁人", "cost": -99, "max": 1, "lvType": "C", "p1Max": 1, "p2Max": 1, },
    "60": { "tag": [Attr.other], "hex": "60", "sname": "饥饿耐性", "cost": 3, "max": 3, "lvType": "C", "p1Max": 3, "p2Max": 3, },
    "61": { "tag": [Attr.other], "hex": "61", "sname": "飞身跃入", "cost": 3, "max": 1, "lvType": "C", "p1Max": 1, "p2Max": 1, },
    "62": { "tag": [Attr.body], "hex": "62", "sname": "佯动", "cost": 3, "max": 1, "lvType": "C", "p1Max": 1, "p2Max": 1, },
    "63": { "tag": [Attr.other], "hex": "63", "sname": "骑乘名人", "cost": 3, "max": 1, "lvType": "C", "p1Max": 1, "p2Max": 1, },
    "64": { "tag": [Attr.spec], "hex": "64", "sname": "霞皮的恩惠", "cost": 6, "max": 4, "lvType": "C", "p1Max": 4, "p2Max": 3, },
    "65": { "tag": [Attr.spec], "hex": "65", "sname": "钢壳的恩惠", "cost": 6, "max": 4, "lvType": "C", "p1Max": 4, "p2Max": 3, },
    "66": { "tag": [Attr.spec], "hex": "66", "sname": "炎鳞的恩惠", "cost": 6, "max": 4, "lvType": "C", "p1Max": 4, "p2Max": 3, },
    "67": { "tag": [Attr.spec], "hex": "67", "sname": "龙气活性", "cost": 9, "max": 5, "lvType": "B", "p1Max": 4, "p2Max": 3, },
    "68": { "tag": [Attr.body], "hex": "68", "sname": "翔虫使", "cost": 9, "max": 3, "lvType": "C", "p1Max": 3, "p2Max": 3, },
    "69": { "tag": [Attr.other], "hex": "69", "sname": "墙面移动", "cost": 6, "max": 3, "lvType": "C", "p1Max": 3, "p2Max": 3, },
    "6A": { "tag": [Attr.atk], "hex": "6A", "sname": "逆袭", "cost": 6, "max": 3, "lvType": "B", "p1Max": 3, "p2Max": 2, },
    "6B": { "tag": [Attr.atk], "hex": "6B", "sname": "高速变形", "cost": 12, "max": 3, "lvType": "B", "p1Max": 3, "p2Max": 2, },
    "6C": { "tag": [Attr.spec], "hex": "6C", "sname": "鬼火缠", "cost": 9, "max": 4, "lvType": "A", "p1Max": 4, "p2Max": 3, },
    "6D": { "tag": [Attr.spec], "hex": "6D", "sname": "风纹一致", "cost": -99, "max": 5, "lvType": "", "p1Max": 0, "p2Max": 0, },
    "6E": { "tag": [Attr.spec], "hex": "6E", "sname": "雷纹一致", "cost": -99, "max": 5, "lvType": "", "p1Max": 0, "p2Max": 0, },
    "6F": { "tag": [Attr.spec], "hex": "6F", "sname": "风雷合一", "cost": -99, "max": 5, "lvType": "", "p1Max": 0, "p2Max": 0, },
    "70": { "tag": [Attr.heal], "hex": "70", "sname": "气血", "cost": 12, "max": 3, "lvType": "B", "p1Max": 3, "p2Max": 2, },
    "71": { "tag": [Attr.spec], "hex": "71", "sname": "伏魔耗命", "cost": -99, "max": 3, "lvType": "S", "p1Max": 2, "p2Max": 1, },
    "72": { "tag": [Attr.spec], "hex": "72", "sname": "激昂", "cost": 9, "max": 3, "lvType": "B", "p1Max": 3, "p2Max": 2, },
    "73": { "tag": [Attr.spec], "hex": "73", "sname": "业铠【修罗】", "cost": 9, "max": 3, "lvType": "A", "p1Max": 3, "p2Max": 2, },
    "74": { "tag": [Attr.spec], "hex": "74", "sname": "因祸得福", "cost": 12, "max": 3, "lvType": "A", "p1Max": 0, "p2Max": 0, },
    "75": { "tag": [Attr.spec], "hex": "75", "sname": "狂龙症【蚀】", "cost": 12, "max": 3, "lvType": "A", "p1Max": 3, "p2Max": 2, },
    "76": { "tag": [Attr.def], "hex": "76", "sname": "坚如磐石", "cost": 6, "max": 5, "lvType": "C", "p1Max": 5, "p2Max": 4, },
    "77": { "tag": [Attr.spec], "hex": "77", "sname": "偷袭", "cost": 12, "max": 3, "lvType": "A", "p1Max": 3, "p2Max": 2, },
    "78": { "tag": [Attr.spec], "hex": "78", "sname": "巧击", "cost": 9, "max": 3, "lvType": "A", "p1Max": 3, "p2Max": 2, },
    "79": { "tag": [Attr.def], "hex": "79", "sname": "嘲讽防御(煽动)", "cost": 6, "max": 3, "lvType": "C", "p1Max": 3, "p2Max": 2, },
    "7A": { "tag": [Attr.def], "hex": "7A", "sname": "合气", "cost": 9, "max": 2, "lvType": "", "p1Max": 0, "p2Max": 0, },
    "7B": { "tag": [Attr.def], "hex": "7B", "sname": "提供", "cost": 3, "max": 1, "lvType": "", "p1Max": 0, "p2Max": 0, },
    "7C": { "tag": [Attr.atk], "hex": "7C", "sname": "蓄力大师", "cost": 9, "max": 3, "lvType": "A", "p1Max": 3, "p2Max": 2, },
    "7D": { "tag": [Attr.abn, Attr.atk, Attr.cri], "hex": "7D", "sname": "攻势", "cost": 9, "max": 3, "lvType": "A", "p1Max": 3, "p2Max": 2, },
    "7E": { "tag": [Attr.gun], "hex": "7E", "sname": "零件改造", "cost": 12, "max": 2, "lvType": "", "p1Max": 0, "p2Max": 0, },
    "7F": { "tag": [Attr.sharp], "hex": "7F", "sname": "打磨术【锐】", "cost": 9, "max": 3, "lvType": "A", "p1Max": 3, "p2Max": 2, },
    "80": { "tag": [Attr.sharp], "hex": "80", "sname": "刃鳞打磨", "cost": 9, "max": 3, "lvType": "A", "p1Max": 3, "p2Max": 2, },
    "81": { "tag": [Attr.other], "hex": "81", "sname": "走壁移动【翔】", "cost": 3, "max": 1, "lvType": "", "p1Max": 0, "p2Max": 0, },
    "82": { "tag": [Attr.ele], "hex": "82", "sname": "弱点特效【属性】", "cost": 9, "max": 3, "lvType": "A", "p1Max": 3, "p2Max": 2, },
    "83": { "tag": [Attr.atk, Attr.ele], "hex": "83", "sname": "连击", "cost": 12, "max": 3, "lvType": "A", "p1Max": 3, "p2Max": 2, },
    "84": { "tag": [Attr.def], "hex": "84", "sname": "毅力", "cost": 15, "max": 3, "lvType": "S", "p1Max": 2, "p2Max": 1, },
    "85": { "tag": [Attr.def], "hex": "85", "sname": "迅之气息", "cost": -99, "max": 1, "lvType": "", "p1Max": 0, "p2Max": 0, },
    "86": { "tag": [Attr.abn], "hex": "86", "sname": "状态异常必定累积", "cost": 9, "max": 3, "lvType": "B", "p1Max": 3, "p2Max": 2, },
    "87": { "tag": [Attr.def], "hex": "87", "sname": "刚心", "cost": 6, "max": 2, "lvType": "C", "p1Max": 2, "p2Max": 1, },
    "88": { "tag": [Attr.abn], "hex": "88", "sname": "累积时攻击强化", "cost": 12, "max": 3, "lvType": "A", "p1Max": 3, "p2Max": 2, },
    "89": { "tag": [Attr.def], "hex": "89", "sname": "狂化", "cost": -99, "max": 2, "lvType": "S", "p1Max": 2, "p2Max": 1, },
    "8A": { "tag": [Attr.spec], "hex": "8A", "sname": "风绕", "cost": 9, "max": 3, "lvType": "A", "p1Max": 3, "p2Max": 2, },
    "8B": { "tag": [Attr.spec], "hex": "8B", "sname": "粉尘绕", "cost": 9, "max": 3, "lvType": "A", "p1Max": 3, "p2Max": 2, },
    "8C": { "tag": [Attr.spec], "hex": "8C", "sname": "寒气炼成", "cost": 12, "max": 3, "lvType": "A", "p1Max": 3, "p2Max": 2, },
    "8D": { "tag": [Attr.spec], "hex": "8D", "sname": "龙气转换", "cost": 12, "max": 3, "lvType": "A", "p1Max": 3, "p2Max": 2, },
    "8E": { "tag": [Attr.spec], "hex": "8E", "sname": "天衣无缝", "cost": -99, "max": 3, "lvType": "", "p1Max": 0, "p2Max": 0, },
    "8F": { "tag": [Attr.spec], "hex": "8F", "sname": "狂龙症【翔】", "cost": 9, "max": 3, "lvType": "A", "p1Max": 3, "p2Max": 2, },
    
    "90": { "tag": [Attr.atk], "hex": "90", "sname": "气血觉醒", "cost": -99, "max": 3, "lvType": "", "p1Max": 0, "p2Max": 0, },
    "91": { "tag": [Attr.spec], "hex": "91", "sname": "奋斗", "cost": 9, "max": 3, "lvType": "A", "p1Max": 3, "p2Max": 2, },
    "92": { "tag": [Attr.def], "hex": "92", "sname": "缓冲", "cost": -99, "max": 1, "lvType": "B", "p1Max": 0, "p2Max": 0, },
    

}


var skill_desc = {
    "01": {
        "sname": "攻击", "desc": `提高玩家的攻击力。`, "effect": `
                <ul>
                    <li>Lv1. 攻击力+3</li>
                    <li>Lv2. 攻击力+6</li>
                    <li>Lv3. 攻击力+9</li>
                    <li>Lv4. 攻击力变为1.05倍，攻击力+7</li>
                    <li>Lv5. 攻击力变为1.06倍，攻击力+8</li>
                    <li>Lv6. 攻击力变为1.08倍，攻击力+9</li>
                    <li>Lv7. 攻击力变为1.1倍，攻击力+10</li>
                </ul>
            `},
    "02": {
        "sname": "挑战者", "desc": `若狩猎时大型怪物发怒，即会提高攻击力与会心率。`, "effect": `
                <ul>
                    <li>Lv1. 技能发动时，攻击力+4，会心率+3%</li>
                    <li>Lv2. 技能发动时，攻击力+8，会心率+5%</li>
                    <li>Lv3. 技能发动时，攻击力+12，会心率+7%</li>
                    <li>Lv4. 技能发动时，攻击力+16，会心率+10%</li>
                    <li>Lv5. 技能发动时，攻击力+20，会心率+15%</li>
                </ul>
            `},
    "03": {
        "sname": "无伤", "desc": `体力全满时，攻击力提高。`, "effect": `
                <ul>
                    <li>Lv1. 技能发动时，攻击力+5</li>
                    <li>Lv2. 技能发动时，攻击力+10</li>
                    <li>Lv3. 技能发动时，攻击力+20</li>
                </ul>
            `},
    "04": {
        "sname": "怨恨", "desc": `体力槽残留有红色部分的期间，攻击力上升。`, "effect": `
                <ul>
                    <li>Lv1. 技能发动时，攻击力+5</li>
                    <li>Lv2. 技能发动时，攻击力+10</li>
                    <li>Lv3. 技能发动时，攻击力+15</li>
                    <li>Lv4. 技能发动时，攻击力+20</li>
                    <li>Lv5. 技能发动时，攻击力+25</li>
                </ul>
            `},
    "05": {
        "sname": "死里逃生", "desc": `处于状态异常时，攻击力上升。`, "effect": `
                <ul>
                    <li>Lv1. 技能发动时，攻击力+5</li>
                    <li>Lv2. 技能发动时，攻击力+10</li>
                    <li>Lv3. 技能发动时，攻击力+20</li>
                </ul>
            `},
    "06": {
        "sname": "看破", "desc": `会心率提升。`, "effect": `
                <ul>
                    <li>Lv1. 会心率+5%</li>
                    <li>Lv2. 会心率+10%</li>
                    <li>Lv3. 会心率+15%</li>
                    <li>Lv4. 会心率+20%</li>
                    <li>Lv5. 会心率+25%</li>
                    <li>Lv6. 会心率+30%</li>
                    <li>Lv7. 会心率+40%</li>
                </ul>
            `},
    "07": {
        "sname": "超会心", "desc": `增加会心攻击的伤害。`, "effect": `
                <ul>
                    <li>Lv1. 会心攻击时的伤害倍率增强为1.3倍</li>
                    <li>Lv2. 会心攻击时的伤害倍率增强为1.35倍</li>
                    <li>Lv3. 会心攻击时的伤害倍率增强为1.4倍</li>
                </ul>
            `},
    "08": {
        "sname": "弱点特效", "desc": `攻击怪物时，若攻击对该部位颇有效的话，会心率则会上升。`, "effect": `
                <ul>
                    <li>Lv1. 攻击有效部位时，会心率+15%</li>
                    <li>Lv2. 攻击有效部位时，会心率+30%</li>
                    <li>Lv3. 攻击有效部位时，会心率+50%</li>
                </ul>
            `},
    "09": {
        "sname": "力量解放", "desc": `满足特定条件后，一定时间内提高会心率，减轻消耗耐力行动的消耗量。`, "effect": `
                <ul>
                    <li>Lv1. 技能发动时，会心率+10%，耐力消耗量减少30%，</li>
                    <li>Lv2. 技能发动时，会心率+20%，耐力消耗量减少30%，</li>
                    <li>Lv3. 技能发动时，会心率+30%，耐力消耗量减少50%，</li>
                    <li>Lv4. 技能发动时，会心率+40%，耐力消耗量减少50%，</li>
                    <li>Lv5. 技能发动时，会心率+50%，耐力消耗量减少50%，</li>
                </ul>
            `},
    "0A": {
        "sname": "精神抖擞", "desc": `维持耐力计量表全满状态一段时间后，会心率会上升。`, "effect": `
                <ul>
                    <li>Lv1. 效果发动时，会心率+10%</li>
                    <li>Lv2. 效果发动时，会心率+20%</li>
                    <li>Lv3. 效果发动时，会心率+30%</li>
                </ul>
            `},
    "0B": {
        "sname": "会心击【属性】", "desc": `因攻击而出现会心时，所造成的属性伤害（火、水、雷、冰、龙）会提高。`, "effect": `
                <ul>
                    <li>Lv1. 效果发动时，属性伤害1.05倍</li>
                    <li>Lv2. 效果发动时，属性伤害1.1倍</li>
                    <li>Lv3. 效果发动时，属性伤害1.15倍</li>
                </ul>
            `},
    "0C": {
        "sname": "达人艺", "desc": `发生会心攻击时，抑制锋利度消耗。`, "effect": `
                <ul>
                    <li>Lv1. 效果发动时，有20%概率不会消耗锋利度</li>
                    <li>Lv2. 效果发动时，有40%概率不会消耗锋利度</li>
                    <li>Lv3. 效果发动时，有80%概率不会消耗锋利度</li>
                </ul>
            `},
    "0D": {
        "sname": "火属性攻击强化", "desc": `强化火属性之力。（武器属性值的强化，有其上限）`, "effect": `
                <ul>
                    <li>Lv1. 火属性攻击值+2</li>
                    <li>Lv2. 火属性攻击值+3</li>
                    <li>Lv3. 火属性攻击值变为1.05倍，火属性攻击值+4</li>
                    <li>Lv4. 火属性攻击值变为1.1倍，火属性攻击值+4</li>
                    <li>Lv5. 火属性攻击值变为1.2倍，火属性攻击值+4</li>
                </ul>
            `},
    "0E": {
        "sname": "水属性攻击强化", "desc": `强化水属性之力。（武器属性值的强化，有其上限）`, "effect": `
                <ul>
                    <li>Lv1. 水属性攻击值+2</li>
                    <li>Lv2. 水属性攻击值+3</li>
                    <li>Lv3. 水属性攻击值变为1.05倍，水属性攻击值+4</li>
                    <li>Lv4. 水属性攻击值变为1.1倍，水属性攻击值+4</li>
                    <li>Lv5. 水属性攻击值变为1.2倍，水属性攻击值+4</li>
                </ul>
            `},
    "0F": {
        "sname": "冰属性攻击强化", "desc": `强化冰属性之力。（武器属性值的强化，有其上限）`, "effect": `
                <ul>
                    <li>Lv1. 冰属性攻击值+2</li>
                    <li>Lv2. 冰属性攻击值+3</li>
                    <li>Lv3. 冰属性攻击值变为1.05倍，冰属性攻击值+4</li>
                    <li>Lv4. 冰属性攻击值变为1.1倍，冰属性攻击值+4</li>
                    <li>Lv5. 冰属性攻击值变为1.2倍，冰属性攻击值+4</li>
                </ul>
            `},
    "10": {
        "sname": "雷属性攻击强化", "desc": `强化雷属性之力。（武器属性值的强化，有其上限）`, "effect": `
                <ul>
                    <li>Lv1. 雷属性攻击值+2</li>
                    <li>Lv2. 雷属性攻击值+3</li>
                    <li>Lv3. 雷属性攻击值变为1.05倍，雷属性攻击值+4</li>
                    <li>Lv4. 雷属性攻击值变为1.1倍，雷属性攻击值+4</li>
                    <li>Lv5. 雷属性攻击值变为1.2倍，雷属性攻击值+4</li>
                </ul>
            `},
    "11": {
        "sname": "龙属性攻击强化", "desc": `强化龙属性之力。（武器属性值的强化，有其上限）`, "effect": `
                <ul>
                    <li>Lv1. 龙属性攻击值+2</li>
                    <li>Lv2. 龙属性攻击值+3</li>
                    <li>Lv3. 龙属性攻击值变为1.05倍，龙属性攻击值+4</li>
                    <li>Lv4. 龙属性攻击值变为1.1倍，龙属性攻击值+4</li>
                    <li>Lv5. 龙属性攻击值变为1.2倍，龙属性攻击值+4</li>
                </ul>
            `},
    "12": {
        "sname": "毒属性强化", "desc": `强化毒属性累积值。（武器属性值的强化，有其上限）`, "effect": `
                <ul>
                    <li>Lv1. 毒素累积值变为1.05倍，毒素累积值+1</li>
                    <li>Lv2. 毒素累积值变为1.1倍，毒素累积值+2</li>
                    <li>Lv3. 毒素累积值变为1.2倍，毒素累积值+5</li>
                </ul>
            `},
    "13": {
        "sname": "麻痹属性强化", "desc": `强化麻痹属性累积值。（武器属性值的强化，有其上限）`, "effect": `
                <ul>
                    <li>Lv1. 麻痹累积值变为1.05倍，麻痹累积值+1</li>
                    <li>Lv2. 麻痹累积值变为1.1倍，麻痹累积值+2</li>
                    <li>Lv3. 麻痹累积值变为1.2倍，麻痹累积值+5</li>
                </ul>
            `},
    "14": {
        "sname": "睡眠属性强化", "desc": `强化睡眠属性累积值。（武器属性值的强化，有其上限）`, "effect": `
                <ul>
                    <li>Lv1. 睡眠累积值变为1.05倍，睡眠累积值+1</li>
                    <li>Lv2. 睡眠累积值变为1.1倍，睡眠累积值+2</li>
                    <li>Lv3. 睡眠累积值变为1.2倍，睡眠累积值+5</li>
                </ul>
            `},
    "15": {
        "sname": "爆破属性强化", "desc": `强化爆破属性累积值。（武器属性值的强化，有其上限）`, "effect": `
                <ul>
                    <li>Lv1. 爆破累积值变为1.05倍，爆破累积值+1</li>
                    <li>Lv2. 爆破累积值变为1.1倍，爆破累积值+2</li>
                    <li>Lv3. 爆破累积值变为1.2倍，爆破累积值+5</li>
                </ul>
            `},
    "16": {
        "sname": "匠", "desc": `延长武器的锋利度槽。但锋利度槽不会超过上限。`, "effect": `
                <ul>
                    <li>Lv1. 武器锋利度+10</li>
                    <li>Lv2. 武器锋利度+20</li>
                    <li>Lv3. 武器锋利度+30</li>
                    <li>Lv4. 武器锋利度+40</li>
                    <li>Lv5. 武器锋利度+50</li>
                </ul>
            `},
    "17": {
        "sname": "利刃", "desc": `抑制锋利度消耗。`, "effect": `
                <ul>
                    <li>Lv1. 发动概率10%</li>
                    <li>Lv2. 发动概率25%</li>
                    <li>Lv3. 发动概率50%</li>
                </ul>
            `},
    "18": {
        "sname": "弹药节制", "desc": `低概率在发射时不消耗弩炮的弹药及弓的瓶。`, "effect": `
                <ul>
                    <li>Lv1. 发动概率3%</li>
                    <li>Lv2. 发动概率10%</li>
                    <li>Lv3. 发动概率20%</li>
                </ul>
            `},
    "19": {
        "sname": "钢刃研磨", "desc": `打磨武器后，一定时间内锋利度不会降低。`, "effect": `
                <ul>
                    <li>Lv1. 发动后，效果持续30秒</li>
                    <li>Lv2. 发动后，效果持续60秒</li>
                    <li>Lv3. 发动后，效果持续90秒</li>
                </ul>
            `},
    "1A": {
        "sname": "心眼", "desc": `攻击不易被弹开，对坚硬部位造成的伤害上升。`, "effect": `
                <ul>
                    <li>Lv1. 攻击有50%概率不会被弹开，对坚硬部位的伤害变为1.1倍</li>
                    <li>Lv2. 攻击有100%概率不会被弹开，对坚硬部位的伤害变为1.15倍</li>
                    <li>Lv3. 攻击有100%概率不会被弹开，对坚硬部位的伤害变为1.3倍</li>
                </ul>
            `},
    "1B": {
        "sname": "弹道强化", "desc": `扩大弹药、箭矢可击出最大威力的范围。`, "effect": `
                <ul>
                    <li>Lv1. 有效距离稍微变长</li>
                    <li>Lv2. 有效距离变长</li>
                    <li>Lv3. 有效距离大幅变长</li>
                </ul>
            `},
    "1C": {
        "sname": "钝器能手", "desc": `锋利度较差时攻击力上升。`, "effect": `
                <ul>
                    <li>Lv1. 锋利度在黄色以下时，攻击力1.05倍</li>
                    <li>Lv2. 锋利度在黄色以下时，攻击力1.1倍</li>
                    <li>Lv3. 锋利度在绿色以下时，攻击力1.1倍</li>
                </ul>
            `},
    "1D": {
        "sname": "解放弓的蓄力阶段", "desc": `弓的蓄力阶段增加1个阶段。`, "effect": `
                <ul>
                    <li>Lv1. 发动技能效果</li>
                </ul>
            `},
    "1E": {
        "sname": "集中", "desc": `加快蓄力攻击的蓄力速度，太刀、双剑、剑斧、盾斧、弩炮的槽更容易积攒。`, "effect": `
                <ul>
                    <li>Lv1. 槽上升率提升5%，蓄力时间缩短5%</li>
                    <li>Lv2. 槽上升率提升10%，蓄力时间缩短10%</li>
                    <li>Lv3. 槽上升率提升20%，蓄力时间缩短15%</li>
                </ul>
            `},
    "1F": {
        "sname": "强化持续", "desc": `以太刀、双剑、操虫棍、剑斧、盾斧发动，增长强化状态的持续时间。`, "effect": `
                <ul>
                    <li>Lv1. 稍微延长强化时间</li>
                    <li>Lv2. 延长强化时间</li>
                    <li>Lv3. 大幅延长强化时间</li>
                </ul>
            `},
    "20": {
        "sname": "跑者", "desc": `进行冲刺等渐渐消耗耐力的行动时所需的耐力消耗量减少。`, "effect": `
                <ul>
                    <li>Lv1. 持续耐力消耗量减少15%</li>
                    <li>Lv2. 持续耐力消耗量减少30%</li>
                    <li>Lv3. 持续耐力消耗量减少50%</li>
                </ul>
            `},
    "21": {
        "sname": "体术", "desc": `进行回避等固定消耗耐力的行动时所需的耐力消耗量减少。`, "effect": `
                <ul>
                    <li>Lv1. 固定耐力消耗量减少10%</li>
                    <li>Lv2. 固定耐力消耗量减少20%</li>
                    <li>Lv3. 固定耐力消耗量减少30%</li>
                    <li>Lv4. 固定耐力消耗量减少40%</li>
                    <li>Lv5. 固定耐力消耗量减少50%</li>
                </ul>
            `},
    "22": {
        "sname": "耐力急速回复", "desc": `加快耐力的回复速度。`, "effect": `
                <ul>
                    <li>Lv1. 回复速度1.1倍</li>
                    <li>Lv2. 回复速度1.2倍</li>
                    <li>Lv3. 回复速度1.4倍</li>
                </ul>
            `},
    "23": {
        "sname": "防御性能", "desc": `防御时不易后仰，并减轻耐力的消耗。`, "effect": `
                <ul>
                    <li>Lv1. 小幅减少攻击威力</li>
                    <li>Lv2. 小幅减少攻击威力，减少耐力消耗量15%</li>
                    <li>Lv3. 减少攻击威力，减少耐力消耗量15%</li>
                    <li>Lv4. 减少攻击威力，减少耐力消耗量30%</li>
                    <li>Lv5. 大幅减少攻击威力，减少耐力消耗量30%</li>
                </ul>
            `},
    "24": {
        "sname": "防御强化", "desc": `可以防御一般无法防御的攻击。`, "effect": `
                <ul>
                    <li>Lv1. 减少伤害30%</li>
                    <li>Lv2. 减少伤害50%</li>
                    <li>Lv3. 减少伤害80%</li>
                </ul>
            `},
    "25": {
        "sname": "攻击守势", "desc": `抓准时机防御成功的话，会提升一定时间的攻击力。`, "effect": `
                <ul>
                    <li>Lv1. 技能发动时，攻击力1.05倍</li>
                    <li>Lv2. 技能发动时，攻击力1.1倍</li>
                    <li>Lv3. 技能发动时，攻击力1.15倍</li>
                </ul>
            `},
    "26": {
        "sname": "拔刀术【技】", "desc": `武器拔刀攻击后一定时间内，会心率提升。（铁虫丝技除外）`, "effect": `
                <ul>
                    <li>Lv1. 会心率+15%</li>
                    <li>Lv2. 会心率+30%</li>
                    <li>Lv3. 会心率+60%</li>
                </ul>
            `},
    "27": {
        "sname": "拔刀术【力】", "desc": `追加、强化武器拔刀攻击所引起的昏厥的能力，攻击力也会小幅提升。（铁虫丝技除外）`, "effect": `
                <ul>
                    <li>Lv1. 附加微弱的引起昏厥的能力。武器拔刀攻击的攻击力+3</li>
                    <li>Lv2. 附加引起昏厥的能力。武器拔刀攻击的攻击力+5</li>
                    <li>Lv3. 附加强大的引起昏厥的能力。武器拔刀攻击的攻击力+7</li>
                </ul>
            `},
    "28": {
        "sname": "纳刀术", "desc": `加快收起武器的速度。`, "effect": `
                <ul>
                    <li>Lv1. 速度小幅上升</li>
                    <li>Lv2. 速度上升</li>
                    <li>Lv3. 速度大幅上升</li>
                </ul>
            `},
    "29": {
        "sname": "KO术", "desc": `更容易让怪物陷入昏厥状态。`, "effect": `
                <ul>
                    <li>Lv1. 昏厥威力1.2倍</li>
                    <li>Lv2. 昏厥威力1.3倍</li>
                    <li>Lv3. 昏厥威力1.4倍</li>
                </ul>
            `},
    "2A": {
        "sname": "耐力夺取", "desc": `提高特定攻击所拥有的，使怪物疲劳的效果。`, "effect": `
                <ul>
                    <li>Lv1. 减气威力1.2倍</li>
                    <li>Lv2. 减气威力1.3倍</li>
                    <li>Lv3. 减气威力1.4倍</li>
                </ul>
            `},
    "2B": {
        "sname": "滑走强化", "desc": `进行滑行后，一定时间内会心率会上升。`, "effect": `
                <ul>
                    <li>Lv1. 可发动技能</li>
                </ul>
            `},
    "2C": {
        "sname": "吹笛名人", "desc": `狩猎笛的演奏和多重演奏速度加快，冲击波的伤害提升。`, "effect": `
                <ul>
                    <li>Lv1. 发动技能效果</li>
                </ul>
            `},
    "2D": {
        "sname": "炮术", "desc": `铳枪的炮击、龙击炮、盾斧的瓶攻击、穿甲榴弹等伴随爆炸的攻击，威力上升。`, "effect": `
                <ul>
                    <li>Lv1. 对象的攻击威力1.1倍，减少龙击炮的冷却时间15%</li>
                    <li>Lv2. 对象的攻击威力1.2倍，减少龙击炮的冷却时间30%</li>
                    <li>Lv3. 对象的攻击威力1.3倍，减少龙击炮的冷却时间50%</li>
                </ul>
            `},
    "2E": {
        "sname": "炮弹装填", "desc": `炮弹装填速度变快，增加铳枪的装填数以及盾斧的充能数。`, "effect": `
                <ul>
                    <li>Lv1. 加快弹药与瓶的装填速度</li>
                    <li>Lv2. 追加铳枪装填数+1盾斧的充能数上升</li>
                </ul>
            `},
    "2F": {
        "sname": "特殊射击强化", "desc": `弩炮的特殊弹药与弓的龙之箭威力上升。`, "effect": `
                <ul>
                    <li>Lv1. 弩炮的特殊弹药与弓的龙之箭威力变为1.1倍</li>
                    <li>Lv2. 弩炮的特殊弹药与弓的龙之箭威力变为1.2倍</li>
                </ul>
            `},
    "30": {
        "sname": "通常弹·连射箭强化", "desc": `提高弩炮的通常弹或是弓的连射箭的攻击力。`, "effect": `
                <ul>
                    <li>Lv1. 通常弹与连射箭的威力小幅上升</li>
                    <li>Lv2. 通常弹与连射箭的威力上升</li>
                    <li>Lv3. 通常弹与连射箭的威力进一步上升</li>
                </ul>
            `},
    "31": {
        "sname": "散弹·扩散箭强化", "desc": `提高弩炮的散弹、放散弹或是弓的扩散箭的攻击力。`, "effect": `
                <ul>
                    <li>Lv1. 散弹、放散弹、扩散箭的威力小幅上升</li>
                    <li>Lv2. 散弹、放散弹、扩散箭的威力上升</li>
                    <li>Lv3. 散弹、放散弹、扩散箭的威力进一步上升</li>
                </ul>
            `},
    "32": {
        "sname": "贯通弹·贯通箭强化", "desc": `提高弩炮的贯穿弹或是弓的贯穿箭的攻击力。`, "effect": `
                <ul>
                    <li>Lv1. 贯穿弹与贯穿箭的威力小幅上升</li>
                    <li>Lv2. 贯穿弹与贯穿箭的威力上升</li>
                    <li>Lv3. 贯穿弹与贯穿箭的威力进一步上升</li>
                </ul>
            `},
    "33": {
        "sname": "装填扩充", "desc": `增加弩炮的装填数。（装填数有其上限）`, "effect": `
                <ul>
                    <li>Lv1. 增加部分弹药的装填数</li>
                    <li>Lv2. 增加多数弹药的装填数</li>
                    <li>Lv3. 增加几乎所有弹药的装填数</li>
                </ul>
            `},
    "34": {
        "sname": "装填速度", "desc": `提升弩炮的弹药以及弓的瓶的装填速度。`, "effect": `
                <ul>
                    <li>Lv1. 弩炮的装填速度上升1个阶段。加快弓的装填速度</li>
                    <li>Lv2. 弩炮的装填速度上升2个阶段。弓的瓶会自动装填</li>
                    <li>Lv3. 弩炮的装填速度上升3个阶段</li>
                </ul>
            `},
    "35": {
        "sname": "减轻后坐力", "desc": `减轻弩炮射击时的后坐力。`, "effect": `
                <ul>
                    <li>Lv1. 减轻后坐力1个阶段</li>
                    <li>Lv2. 减轻后坐力2个阶段</li>
                    <li>Lv3. 减轻后坐力3个阶段</li>
                </ul>
            `},
    "36": {
        "sname": "抑制偏移", "desc": `抑制弩炮子弹的偏移。`, "effect": `
                <ul>
                    <li>Lv1. 减轻偏移1个阶段</li>
                    <li>Lv2. 减轻偏移2个阶段</li>
                </ul>
            `},
    "37": {
        "sname": "速射强化", "desc": `强化轻弩炮的速射。`, "effect": `
                <ul>
                    <li>Lv1. 速射弹的伤害1.05倍</li>
                    <li>Lv2. 速射弹的伤害1.1倍</li>
                    <li>Lv3. 速射弹的伤害1.2倍</li>
                </ul>
            `},
    "38": {
        "sname": "防御", "desc": `提高玩家的防御力。等级提高后，也会影响耐性值。`, "effect": `
                <ul>
                    <li>Lv1. 防御力+5</li>
                    <li>Lv2. 防御力+10</li>
                    <li>Lv3. 防御力变为1.05倍，防御力+10</li>
                    <li>Lv4. 防御力变为1.05倍，防御力+20，全属性耐性值+3</li>
                    <li>Lv5. 防御力变为1.08倍，防御力+20，全属性耐性值+3</li>
                    <li>Lv6. 防御力变为1.08倍，防御力+35，全属性耐性值+5</li>
                    <li>Lv7. 防御力变为1.1倍，防御力+35，全属性耐性值+5</li>
                </ul>
            `},
    "39": {
        "sname": "精灵加护", "desc": `一定概率减少玩家受到的伤害。`, "effect": `
                <ul>
                    <li>Lv1. 效果发动时，伤害减轻15%</li>
                    <li>Lv2. 效果发动时，伤害减轻30%</li>
                    <li>Lv3. 效果发动时，伤害减轻50%</li>
                </ul>
            `},
    "3A": {
        "sname": "体力回复量UP", "desc": `提高体力回复时的回复量。`, "effect": `
                <ul>
                    <li>Lv1. 回复量小幅增加</li>
                    <li>Lv2. 回复量中幅增加</li>
                    <li>Lv3. 回复量大幅增加</li>
                </ul>
            `},
    "3B": {
        "sname": "回复速度", "desc": `受到伤害时，红色槽部分的回复速度会提高。`, "effect": `
                <ul>
                    <li>Lv1. 红色槽的自动回复速度2倍</li>
                    <li>Lv2. 红色槽的自动回复速度3倍</li>
                    <li>Lv3. 红色槽的自动回复速度4倍</li>
                </ul>
            `},
    "3C": {
        "sname": "快吃", "desc": `加快食用肉及道具的速度。`, "effect": `
                <ul>
                    <li>Lv1. 进食速度小幅加快</li>
                    <li>Lv2. 进食速度加快</li>
                    <li>Lv3. 进食速度大幅加快</li>
                </ul>
            `},
    "3D": {
        "sname": "耳栓", "desc": `拥有对大型怪物咆哮的耐性。`, "effect": `
                <ul>
                    <li>Lv1. 减轻咆哮【小】的影响</li>
                    <li>Lv2. 使咆哮【小】无效</li>
                    <li>Lv3. 使咆哮【小】无效，减轻咆哮【大】的影响</li>
                    <li>Lv4. 使咆哮【小】【大】无效</li>
                    <li>Lv5. 使咆哮【小】【大】无效，减轻强咆哮的影响</li>
                </ul>
            `},
    "3E": {
        "sname": "风压耐性", "desc": `拥有对风压的耐性。`, "effect": `
                <ul>
                    <li>Lv1. 使风压【小】无效</li>
                    <li>Lv2. 使风压【小】【大】无效</li>
                    <li>Lv3. 使风压【小】【大】无效，减轻龙风压的影响</li>
                </ul>
            `},
    "3F": {
        "sname": "耐震", "desc": `拥有对地面震动的耐性。`, "effect": `
                <ul>
                    <li>Lv1. 使震动【小】无效</li>
                    <li>Lv2. 使震动【小】无效，减轻震动【大】的影响</li>
                    <li>Lv3. 使震动【小】【大】无效</li>
                </ul>
            `},
    "40": {
        "sname": "泡沫之舞", "desc": `减轻泡沫异常状态，可以通过泡沫使回避能力上升。`, "effect": `
                <ul>
                    <li>Lv1. 减轻泡沫异常状态【大】的影响</li>
                    <li>Lv2. 将泡沫异常状态【大】减轻至【小】，处于泡沫异常时会强化回避能力</li>
                    <li>Lv3. 追加进行多次回避行动后会进入泡沫异常状态</li>
                </ul>
            `},
    "41": {
        "sname": "回避性能", "desc": `延长回避时的无敌时间。`, "effect": `
                <ul>
                    <li>Lv1. 极小幅延长无敌时间</li>
                    <li>Lv2. 小幅延长无敌时间</li>
                    <li>Lv3. 延长无敌时间</li>
                    <li>Lv4. 大幅延长无敌时间</li>
                    <li>Lv5. 极大幅延长无敌时间</li>
                </ul>
            `},
    "42": {
        "sname": "回避距离UP", "desc": `延长回避时的移动距离。`, "effect": `
                <ul>
                    <li>Lv1. 小幅延长回避距离</li>
                    <li>Lv2. 延长回避距离</li>
                    <li>Lv3. 大幅延长回避距离</li>
                </ul>
            `},
    "43": {
        "sname": "火耐性", "desc": `提高玩家的火耐性。等级上升后，也会影响防御力。`, "effect": `
                <ul>
                    <li>Lv1. 火耐性+6</li>
                    <li>Lv2. 火耐性+12</li>
                    <li>Lv3. 火耐性+20、防御力+10</li>
                </ul>
            `},
    "44": {
        "sname": "水耐性", "desc": `提高玩家的水耐性。等级上升后，也会影响防御力。`, "effect": `
                <ul>
                    <li>Lv1. 水耐性+6</li>
                    <li>Lv2. 水耐性+12</li>
                    <li>Lv3. 水耐性+20、防御力+10</li>
                </ul>
            `},
    "45": {
        "sname": "冰耐性", "desc": `提高玩家的冰耐性。等级上升后，也会影响防御力。`, "effect": `
                <ul>
                    <li>Lv1. 冰耐性+6</li>
                    <li>Lv2. 冰耐性+12</li>
                    <li>Lv3. 冰耐性+20、防御力+10</li>
                </ul>
            `},
    "46": {
        "sname": "雷耐性", "desc": `提高玩家的雷耐性。等级上升后，也会影响防御力。`, "effect": `
                <ul>
                    <li>Lv1. 雷耐性+6</li>
                    <li>Lv2. 雷耐性+12</li>
                    <li>Lv3. 雷耐性+20、防御力+10</li>
                </ul>
            `},
    "47": {
        "sname": "龙耐性", "desc": `提高玩家的龙耐性。等级上升后，也会影响防御力。`, "effect": `
                <ul>
                    <li>Lv1. 龙耐性+6</li>
                    <li>Lv2. 龙耐性+12</li>
                    <li>Lv3. 龙耐性+20、防御力+10</li>
                </ul>
            `},
    "48": {
        "sname": "属性异常状态的耐性", "desc": `拥有对全部的属性异常状态的耐性。`, "effect": `
                <ul>
                    <li>Lv1. 全属性异常状态的效果时间减少50%</li>
                    <li>Lv2. 全属性异常状态的效果时间减少75%</li>
                    <li>Lv3. 使全属性异常状态无效</li>
                </ul>
            `},
    "49": {
        "sname": "毒耐性", "desc": `减少中毒状态时所受到的伤害。`, "effect": `
                <ul>
                    <li>Lv1. 减少受到中毒伤害的次数</li>
                    <li>Lv2. 大幅减少受到中毒伤害的次数</li>
                    <li>Lv3. 不会变为中毒状态，减轻猛毒状态</li>
                </ul>
            `},
    "4A": {
        "sname": "麻痹耐性", "desc": `缩短麻痹状态的时间。`, "effect": `
                <ul>
                    <li>Lv1. 麻痹状态的时间减少30%</li>
                    <li>Lv2. 麻痹状态的时间减少60%</li>
                    <li>Lv3. 不会变为麻痹状态</li>
                </ul>
            `},
    "4B": {
        "sname": "睡眠耐性", "desc": `缩短睡眠状态的时间。`, "effect": `
                <ul>
                    <li>Lv1. 睡眠状态的时间减少30%</li>
                    <li>Lv2. 睡眠状态的时间减少60%</li>
                    <li>Lv3. 不会变为睡眠状态</li>
                </ul>
            `},
    "4C": {
        "sname": "气绝耐性", "desc": `缩短昏厥状态的时间。`, "effect": `
                <ul>
                    <li>Lv1. 昏厥状态的时间减少60%</li>
                    <li>Lv2. 昏厥状态的时间减少90%</li>
                    <li>Lv3. 不会变为昏厥状态</li>
                </ul>
            `},
    "4D": {
        "sname": "泥雪耐性", "desc": `减轻怪物引发在泥地或深雪的行动限制。`, "effect": `
                <ul>
                    <li>Lv1. 减轻对移动的限制</li>
                    <li>Lv2. 移动不会受到限制</li>
                </ul>
            `},
    "4E": {
        "sname": "爆破耐性", "desc": `拥有对爆破异常状态的耐性。`, "effect": `
                <ul>
                    <li>Lv1. 延长爆破前的间隔时间，减轻爆破时受到的伤害</li>
                    <li>Lv2. 进一步延长爆破前的间隔时间，大幅减轻爆破时受到的伤害</li>
                    <li>Lv3. 不会变为爆破异常状态</li>
                </ul>
            `},
    "4F": {
        "sname": "植生学", "desc": `增加药草等消耗道具的取得数。`, "effect": `
                <ul>
                    <li>Lv1. 草系消耗道具的取得数+1</li>
                    <li>Lv2. 追加果实、种子系消耗道具的取得数+1</li>
                    <li>Lv3. 追加虫系消耗道具的取得数+1</li>
                    <li>Lv4. 追加菇系消耗道具的取得数+1</li>
                </ul>
            `},
    "50": {
        "sname": "地质学", "desc": `增加采集点的取得数。`, "effect": `
                <ul>
                    <li>Lv1. 骸骨采集点的取得数+1</li>
                    <li>Lv2. 追加特产采集点的取得数+1</li>
                    <li>Lv3. 追加矿石采掘点的取得数+1</li>
                </ul>
            `},
    "51": {
        "sname": "破坏王", "desc": `更容易破坏怪物的部位。`, "effect": `
                <ul>
                    <li>Lv1. 对部位的累积伤害1.1倍</li>
                    <li>Lv2. 对部位的累积伤害1.2倍</li>
                    <li>Lv3. 对部位的累积伤害1.3倍</li>
                </ul>
            `},
    "52": {
        "sname": "捕获名人", "desc": `捕获取得的报酬数量变多的概率很高。（从任务中途开始使用不会有效果）`, "effect": `
                <ul>
                    <li>Lv1. 发动技能效果</li>
                </ul>
            `},
    "53": {
        "sname": "剥取名人", "desc": `剥取次数增加1次。（从任务中途开始使用不会有效果）`, "effect": `
                <ul>
                    <li>Lv1. 发动技能效果</li>
                </ul>
            `},
    "54": {
        "sname": "幸运", "desc": `完成任务获得的报酬数量容易变多。（从任务中途开始使用不会有效果）`, "effect": `
                <ul>
                    <li>Lv1. 获得概率小幅上升</li>
                    <li>Lv2. 获得概率上升</li>
                    <li>Lv3. 获得概率进一步上升</li>
                </ul>
            `},
    "55": {
        "sname": "砥石使用高速化", "desc": `缩短砥石的使用时间。`, "effect": `
                <ul>
                    <li>Lv1. 省略打磨动作1次</li>
                    <li>Lv2. 省略打磨动作2次</li>
                    <li>Lv3. 省略打磨动作3次</li>
                </ul>
            `},
    "56": {
        "sname": "炸弹客", "desc": `提高爆弹系道具的伤害。`, "effect": `
                <ul>
                    <li>Lv1. 威力1.1倍</li>
                    <li>Lv2. 威力1.2倍</li>
                    <li>Lv3. 威力1.3倍</li>
                </ul>
            `},
    "57": {
        "sname": "最爱蘑菇", "desc": `平常无法食用的蘑菇，现在可以入口了。也因此能取得有效的效果。`, "effect": `
                <ul>
                    <li>Lv1. 可食用蓝蘑菇与毒菇</li>
                    <li>Lv2. 追加可食用硝化伞菇与麻痹菇</li>
                    <li>Lv3. 追加可食用曼陀罗与心跳加速菇</li>
                </ul>
            `},
    "58": {
        "sname": "道具使用强化", "desc": `延长部分道具的效果时间。`, "effect": `
                <ul>
                    <li>Lv1. 效果时间1.1倍</li>
                    <li>Lv2. 效果时间1.25倍</li>
                    <li>Lv3. 效果时间1.5倍</li>
                </ul>
            `},
    "59": {
        "sname": "广域化", "desc": `部分道具的使用效果对在一定范围内的同伴也会有作用。`, "effect": `
                <ul>
                    <li>Lv1. 给予周围的同伴1/3的效果</li>
                    <li>Lv2. 给予大范围内的同伴1/3的效果</li>
                    <li>Lv3. 给予大范围内的同伴2/3的效果</li>
                    <li>Lv4. 给予极大范围内的同伴2/3的效果</li>
                    <li>Lv5. 给予极大范围内的同伴同样的效果</li>
                </ul>
            `},
    "5A": {
        "sname": "满足感", "desc": `食用、饮用类的道具有一定的概率可再次使用。`, "effect": `
                <ul>
                    <li>Lv1. 效果发动概率10%</li>
                    <li>Lv2. 效果发动概率25%</li>
                    <li>Lv3. 效果发动概率45%</li>
                </ul>
            `},
    "5B": {
        "sname": "火场怪力", "desc": `体力在最大值的35%以下时，防御力与攻击力会提高。`, "effect": `
                <ul>
                    <li>Lv1. 技能发动时，防御力+50</li>
                    <li>Lv2. 技能发动时，攻击力1.05倍，防御力+50</li>
                    <li>Lv3. 技能发动时，攻击力1.05倍，防御力+100</li>
                    <li>Lv4. 技能发动时，攻击力1.1倍，防御力+100</li>
                    <li>Lv5. 技能发动时，攻击力1.3倍，不再有防御力上升效果</li>
                </ul>
            `},
    "5C": {
        "sname": "不屈", "desc": `每次力尽倒下时，攻击力与防御力就会上升。（部分任务中无效，最多2次）`, "effect": `
                <ul>
                    <li>Lv1. 每次攻击力1.1倍、防御力1.15倍</li>
                </ul>
            `},
    "5D": {
        "sname": "减轻胆怯", "desc": `减轻受到小伤害时的反应。`, "effect": `
                <ul>
                    <li>Lv1. 使后仰无效</li>
                    <li>Lv2. 使后仰无效。将坐倒在地减轻为后仰状态</li>
                    <li>Lv3. 使后仰、坐倒在地无效</li>
                </ul>
            `},
    "5E": {
        "sname": "跳跃铁人", "desc": `跳跃中即使遭受攻击，也不会后仰。`, "effect": `
                <ul>
                    <li>Lv1. 跳跃中，后仰无效</li>
                </ul>
            `},
    "5F": {
        "sname": "剥取铁人", "desc": `剥取中即使遭受攻击，也不会被击飞。`, "effect": `
                <ul>
                    <li>Lv1. 发动技能效果</li>
                </ul>
            `},
    "60": {
        "sname": "饥饿耐性", "desc": `可抑制耐力槽最大值随着时间经过的减少。`, "effect": `
                <ul>
                    <li>Lv1. 减少的间隔时间延长50%</li>
                    <li>Lv2. 减少的间隔时间延长100%</li>
                    <li>Lv3. 耐力最大值不会减少</li>
                </ul>
            `},
    "61": {
        "sname": "飞身跃入", "desc": `可以面朝大型怪物进行紧急回避，并延长回避距离。`, "effect": `
                <ul>
                    <li>Lv1. 可发动技能</li>
                </ul>
            `},
    "62": {
        "sname": "佯动", "desc": `攻击击中时，能更加吸引怪物的注意。`, "effect": `
                <ul>
                    <li>Lv1. 发动技能效果</li>
                </ul>
            `},
    "63": {
        "sname": "骑乘名人", "desc": `可以更熟练地对怪物进行御龙。`, "effect": `
                <ul>
                    <li>Lv1. 更容易积攒御龙槽，并且更容易使出回避反击</li>
                </ul>
            `},
    "64": {
        "sname": "霞皮的恩惠", "desc": `获得古龙“霞龙”的力量。`, "effect": `
                <ul>
                    <li>Lv1. 偶尔会增加鬼火鸟的效果</li>
                    <li>Lv2. 追加使风压【小】【大】无效</li>
                    <li>Lv3. 追加延长对怪物施毒的效果时间</li>
                    <li>Lv4. 追加使全部的风压无效</li>
                </ul>
            `},
    "65": {
        "sname": "钢壳的恩惠", "desc": `获得古龙“钢龙”的力量。`, "effect": `
                <ul>
                    <li>Lv1. 水与冰的属性攻击值变为1.05倍</li>
                    <li>Lv2. 水与冰的属性攻击值变为1.1倍</li>
                    <li>Lv3. 追加体力在达到槽的最大值前会持续自动回复</li>
                    <li>Lv4. 追加使热造成的伤害无效</li>
                </ul>
            `},
    "66": {
        "sname": "炎鳞的恩惠", "desc": `获得古龙“炎王龙”的力量。`, "effect": `
                <ul>
                    <li>Lv1. 火属性攻击值与爆破累积值变为1.05倍</li>
                    <li>Lv2. 火属性攻击值与爆破累积值变为1.1倍</li>
                    <li>Lv3. 追加免于中毒或猛毒状态</li>
                    <li>Lv4. 追加不会被偷窃</li>
                </ul>
            `},
    "67": {
        "sname": "龙气活性", "desc": `体力下降到一定程度时，活性化的龙属性之力会在全身奔腾。武器会失去除龙属性之外的效果。`, "effect": `
                <ul>
                    <li>Lv1. 体力在50%以下时，会进入特殊的龙异常状态，全属性耐性变为30</li>
                    <li>Lv2. 体力在50%以下时，会进入特殊的龙异常状态，全属性耐性变为50</li>
                    <li>Lv3. 体力在70%以下时，会进入特殊的龙异常状态，全属性耐性变为50</li>
                    <li>Lv4. 体力在70%以下时，会进入特殊的龙异常状态，全属性耐性变为50，攻击力1.05倍</li>
                    <li>Lv5. 体力在80%以下时，会进入特殊的龙异常状态，全属性耐性变为50，攻击力1.1倍</li>
                </ul>
            `},
    "68": {
        "sname": "翔虫使", "desc": `可以更熟练地使用翔虫。`, "effect": `
                <ul>
                    <li>Lv1. 能使用野生翔虫的时间变为1.3倍</li>
                    <li>Lv2. 追加翔虫受身的回复速度上升</li>
                    <li>Lv3. 追加在地上时回复速度上升</li>
                </ul>
            `},
    "69": {
        "sname": "墙面移动", "desc": `减少飞檐走壁时的耐力消耗。`, "effect": `
                <ul>
                    <li>Lv1. 飞檐走壁时的耐力消耗减少25%</li>
                    <li>Lv2. 飞檐走壁时的耐力消耗减少50%</li>
                    <li>Lv3. 追加在飞檐走壁后一定时间内攻击力上升</li>
                </ul>
            `},
    "6A": {
        "sname": "逆袭", "desc": `被击飞后，一定时间内攻击力上升。`, "effect": `
                <ul>
                    <li>Lv1. 技能发动后，攻击力+10</li>
                    <li>Lv2. 技能发动后，攻击力+15</li>
                    <li>Lv3. 技能发动后，攻击力+25</li>
                </ul>
            `},
    "6B": {
        "sname": "高速变形", "desc": `提升斩击斧与盾斧的变形动作的速度与火力。`, "effect": `
                <ul>
                    <li>Lv1. 速度变为1.1倍</li>
                    <li>Lv2. 速度变为1.2倍，变形攻击的伤害变为1.1倍</li>
                    <li>Lv3. 速度变为1.3倍，变形攻击的伤害变为1.2倍</li>
                </ul>
            `},
    "6C": {
        "sname": "鬼火缠", "desc": `获得对鬼火的耐性，满足一定条件便会缠绕鬼火，可利用爆炸造成伤害。`, "effect": `
                <ul>
                    <li>Lv1. 减少受到的鬼火伤害</li>
                    <li>Lv2. 增加鬼火爆炸对怪物造成的伤害</li>
                    <li>Lv3. 当怪物发怒时，自动进入鬼火异常状态</li>
                    <li>Lv4. 怪物发怒结束后，效果也能持续1分钟</li>
                </ul>
            `},
    "6D": {
        "sname": "风纹一致", "desc": `获得古龙“风神龙”的力量。`, "effect": `
                <ul>
                    <li>Lv1. 龙耐性+1</li>
                    <li>Lv2. 龙耐性+2</li>
                    <li>Lv3. 龙耐性+3</li>
                    <li>Lv4. 龙耐性+4</li>
                    <li>Lv5. 追加获得强运的效果</li>
                </ul>
            `},
    "6E": {
        "sname": "雷纹一致", "desc": `获得古龙“雷神龙”的力量。`, "effect": `
                <ul>
                    <li>Lv1. 雷耐性+1</li>
                    <li>Lv2. 雷耐性+2</li>
                    <li>Lv3. 雷耐性+3</li>
                    <li>Lv4. 雷耐性+4</li>
                    <li>Lv5. 追加获得强运的效果</li>
                </ul>
            `},
    "6F": {
        "sname": "风雷合一", "desc": `强化雷属性与龙属性，提升技能效果。`, "effect": `
                <ul>
                    <li>Lv1. 雷与龙的属性攻击值变为1.05倍</li>
                    <li>Lv2. 雷与龙的属性攻击值变为1.1倍</li>
                    <li>Lv3. 雷与龙的属性攻击值变为1.15倍</li>
                    <li>Lv4. 追加使此技能之外的防具技能等级+1</li>
                    <li>Lv5. 追加使此技能之外的防具技能等级再+1</li>
                </ul>
            `},
    "70": {
        "sname": "气血", "desc": `击中大型怪物被破坏过的部位时，根据伤害回复体力。`, "effect": `
                <ul>
                    <li>Lv1. 发动效果</li>
                    <li>Lv2. 体力的回复量上升</li>
                    <li>Lv3. 体力的回复量进一步上升</li>
                </ul>
            `},
    "71": {
        "sname": "伏魔耗命", "desc": `啮生虫一直在夺取体力，但攻击性能会上升。啮生虫越多，攻击性能则会进一步上升，此外，迅速切换可回复体力。`, "effect": `
                <ul>
                    <li>Lv1. 使用迅速切换之书【朱】时，属性值与状态异常上升；使用迅速切换之书【苍】时，攻击力、昏厥威力上升</li>
                    <li>Lv2. 每本迅速切换之书的攻击性能上升</li>
                    <li>Lv3. 每本迅速切换之书的攻击性能进一步上升</li>
                </ul>
            `},
    "72": {
        "sname": "激昂", "desc": `使用迅速切换之书【朱】时，与大型怪物战斗可累积怒气。怒气达最大值时切换为迅速切换之书【苍】，即可在一定时间内不消耗耐力。`, "effect": `
                <ul>
                    <li>Lv1. 使用迅速切换之书【朱】时，防御力+10、全耐性+5；切换为迅速切换之书【苍】时，一定时间内不消耗耐力</li>
                    <li>Lv2. 使用迅速切换之书【朱】时，防御力+20、全耐性+10；切换为迅速切换之书【苍】时，不消耗耐力的时间延长</li>
                    <li>Lv3. 使用迅速切换之书【朱】时，防御力+30、全耐性+20；切换为迅速切换之书【苍】时，不消耗耐力的时间延长</li>
                </ul>
            `},
    "73": {
        "sname": "业铠【修罗】", "desc": `防御类性能下降，但攻击类性能上升。不同的迅速切换之书，发生变化的性能也会不同。`, "effect": `
                <ul>
                    <li>Lv1. 使用迅速切换之书【朱】时，防御力减少，攻击力上升使用迅速切换之书【苍】时，耐性值减少，属性值上升</li>
                    <li>Lv2. 防御力、耐性值进一步减少，攻击力、属性值进一步上升</li>
                    <li>Lv3. 防御力、耐性值大幅减少，攻击力、属性值大幅上升</li>
                </ul>
            `},
    "74": {
        "sname": "因祸得福", "desc": `状态异常或属性异常状态结束后，会强化一定时间的攻击性能。`, "effect": `
                <ul>
                    <li>Lv1. 技能发动时，攻击力+12、属性值+2，状态异常累积值变为1.05倍</li>
                    <li>Lv2. 技能发动时，攻击力+15、属性值+3，状态异常累积值变为1.1倍</li>
                    <li>Lv3. 技能发动时，攻击力+18、属性值+4，状态异常累积值变为1.15倍</li>
                </ul>
            `},
    "75": {
        "sname": "狂龙症【蚀】", "desc": `狂龙症的效果将发生变化，感染时体力会逐渐减少，但会获得各种效果。处于战斗状态时，每隔一段时间会染上狂龙症。`, "effect": `
                <ul>
                    <li>Lv1. 感染时攻击力和回避性能上升，固定耐力消耗量减少。克服后，体力的红色槽会完全回复，会心率上升</li>
                    <li>Lv2. 感染时，获得效果增强克服后，会心率进一步上升</li>
                    <li>Lv3. 感染时，获得效果进一步增强。克服后，会心率上升，时间延长</li>
                </ul>
            `},
    "76": {
        "sname": "坚如磐石", "desc": `若狩猎时大型怪物发怒，防御类性能将提升。`, "effect": `
                <ul>
                    <li>Lv1. 技能发动时，使咆哮、风压、震动【小】无效</li>
                    <li>Lv2. 技能发动时，防御力+5，使咆哮、风压、震动【小】无效，使咆哮、风压、震动【大】减轻</li>
                    <li>Lv3. 技能发动时，防御力+10，使咆哮、风压、震动【小】【大】无效</li>
                    <li>Lv4. 技能发动时，防御力+20，使咆哮、风压、震动【小】【大】无效，减轻强咆哮和龙风压的影响</li>
                    <li>Lv5. 技能发动时，防御力+30，使咆哮、风压、震动【小】【大】、强咆哮、龙风压无效</li>
                </ul>
            `},
    "77": {
        "sname": "偷袭", "desc": `从大型怪物背后攻击时，造成的伤害增加。`, "effect": `
                <ul>
                    <li>Lv1. 效果发动时，攻击力1.05倍</li>
                    <li>Lv2. 效果发动时，攻击力1.1倍</li>
                    <li>Lv3. 效果发动时，攻击力1.2倍</li>
                </ul>
            `},
    "78": {
        "sname": "巧击", "desc": `回避时，若时机正好与怪物的攻击重合，一定时间内攻击力上升。`, "effect": `
                <ul>
                    <li>Lv1. 效果发动时，一定时间内，攻击力+10</li>
                    <li>Lv2. 效果发动时，一定时间内，攻击力+15</li>
                    <li>Lv3. 效果发动时，一定时间内，攻击力+30</li>
                </ul>
            `},
    "79": {
        "sname": "嘲讽防御(煽动)", "desc": `成为大型怪物的攻击目标时，怪物会更容易发怒，但玩家的防御类性能会上升。`, "effect": `
                <ul>
                    <li>Lv1. 技能发动时，防御力+10，小幅延长回避的无敌时间；防御时，小幅减少攻击威力</li>
                    <li>Lv2. 技能发动时，防御力+20，延长回避的无敌时间；防御时，减少攻击威力</li>
                    <li>Lv3. 技能发动时，防御力+40，大幅延长回避无敌时间；防御时，大幅减少攻击威力</li>
                </ul>
            `},
    "7A": {
        "sname": "合气", "desc": `迅速切换时，如果同时刚好被怪物击中，受到的伤害减少，且使伤害反应无效。`, "effect": `
                <ul>
                    <li>Lv1. 发动效果</li>
                    <li>Lv2. 使受到的伤害无效，进一步向后方冲锋，稍微回复翔虫槽</li>
                </ul>
            `},
    "7B": {
        "sname": "提供", "desc": `每隔一段时间就会获得鬼火鸟的某一种效果。（部分任务除外）`, "effect": `
                <ul>
                    <li>Lv1. 发动效果</li>
                </ul>
            `},
    "7C": {
        "sname": "蓄力大师", "desc": `蓄力攻击命中怪物时，蓄力攻击的属性值和状态异常累积值上升。`, "effect": `
                <ul>
                    <li>Lv1. 效果发动时，属性伤害和状态异常累积值小幅上升</li>
                    <li>Lv2. 效果发动时，属性伤害和状态异常累积值上升</li>
                    <li>Lv3. 效果发动时，属性伤害和状态异常累积值大幅上升</li>
                </ul>
            `},
    "7D": {
        "sname": "攻势", "desc": `攻击陷入中毒、麻痹、属性异常状态的大型怪物时，攻击力和会心率上升。`, "effect": `
                <ul>
                    <li>Lv1. 技能发动时，攻击力+10</li>
                    <li>Lv2. 技能发动时，攻击力+10，会心率+10%</li>
                    <li>Lv3. 技能发动时，攻击力+15，会心率+20%</li>
                </ul>
            `},
    "7E": {
        "sname": "零件改造", "desc": `提升自定义弩炮所装备的强化零件性能。`, "effect": `
                <ul>
                    <li>Lv1. 提升消音器和盾牌的性能未装备强化零件时，装填速度+1</li>
                    <li>Lv2. 追加提升长枪管和强力枪管的性能。未装备强化零件时，装填速度+1、抑制偏移+1</li>
                </ul>
            `},
    "7F": {
        "sname": "打磨术【锐】", "desc": `锋利度回复时，根据回复的阶段，提升锋利度性能。`, "effect": `
                <ul>
                    <li>Lv1. 锋利度回复3阶段时，60秒内，发动效果</li>
                    <li>Lv2. 锋利度回复2阶段时，60秒内，发动效果</li>
                    <li>Lv3. 锋利度回复2阶段时，90秒内，发动效果</li>
                </ul>
            `},
    "80": {
        "sname": "刃鳞打磨", "desc": `拔刀时，回避的无敌时间内躲开攻击，即可回复武器锋利度，装填弩炮的弹药；使用弓时，则可在一定时间内增强弓的近战瓶的性能。`, "effect": `
                <ul>
                    <li>Lv1. 50%的概率发动效果</li>
                    <li>Lv2. 75%的概率发动效果</li>
                    <li>Lv3. 100%的概率发动效果</li>
                </ul>
            `},
    "81": {
        "sname": "走壁移动【翔】", "desc": `飞檐走壁时，翔虫槽回复速度上升`, "effect": `
                <ul>
                    <li>Lv1. 发动效果</li>
                </ul>
            `},
    "82": {
        "sname": "弱点特效【属性】", "desc": `攻击属性有效的部位时，属性伤害增加。`, "effect": `
                <ul>
                    <li>Lv1. 攻击有效部位时，属性伤害1.1倍</li>
                    <li>Lv2. 攻击有效部位时，属性伤害1.125倍</li>
                    <li>Lv3. 攻击有效部位时，属性伤害1.15倍</li>
                </ul>
            `},
    "83": {
        "sname": "连击", "desc": `若攻击连续命中，攻击力和属性值会阶段性上升。（不同的武器种类，上升效果会不同）`, "effect": `
                <ul>
                    <li>Lv1. 攻击命中时，一定时间内攻击力+5、属性值+5；效果持续5次后，上升效果会提高。</li>
                    <li>Lv2. 攻击命中时，一定时间内攻击力+5、属性值+5；效果持续5次后，上升效果会进一步提高。</li>
                    <li>Lv3. 攻击命中时，一定时间内攻击力+5、属性值+5；效果持续5次后，上升效果会大幅提高。</li>
                </ul>
            `},
    "84": {
        "sname": "毅力", "desc": `体力残量在一定值以上时，即便受到超过该值的伤害，也不会力尽倒下（1次）`, "effect": `
                <ul>
                    <li>Lv1. 体力在80以上时，发动效果</li>
                    <li>Lv2. 体力在72以上时，发动效果</li>
                    <li>Lv3. 体力在64以上时，发动效果</li>
                </ul>
            `},
    "85": {
        "sname": "迅之气息", "desc": `进行迅速切换，可解除或减轻部分状态异常。每解除一个状态异常，都会相应地回复体力。`, "effect": `
                <ul>
                    <li>Lv1. 发动效果</li>
                </ul>
            `},
    "86": {
        "sname": "状态异常必定累积", "desc": `在正确时机回避怪物的攻击后，一定时间内，攻击命中时必定会累积状态异常。`, "effect": `
                <ul>
                    <li>Lv1. 技能发动时的效果时间5秒</li>
                    <li>Lv2. 技能发动时的效果时间8秒</li>
                    <li>Lv3. 技能发动时的效果时间12秒</li>
                </ul>
            `},
    "87": {
        "sname": "刚心", "desc": `攻击持续命中，刚心槽达到最大时，受到击飞攻击后，有且仅有一次伤害反应无效，并减少所受伤害的效果。`, "effect": `
                <ul>
                    <li>Lv1. 发动效果</li>
                    <li>Lv2. 效果发动时，受到的伤害进一步减少，追加产生爆炸。</li>
                </ul>
            `},
    "88": {
        "sname": "累积时攻击强化", "desc": `攻击命中时，若毒、麻痹、睡眠、爆破、减气中有任意一项累积，将提升攻击威力。（减气仅在弹药或瓶累积时才有效）`, "effect": `
                <ul>
                    <li>Lv1. 效果发动时，攻击威力1.1倍</li>
                    <li>Lv2. 效果发动时，攻击威力1.15倍</li>
                    <li>Lv3. 效果发动时，攻击威力1.2倍</li>
                </ul>
            `},
    "89": {
        "sname": "狂化", "desc": `切换为迅速切换之书【苍】后，全部体力会变为红色槽并逐渐减少。此时只要红色槽还有剩余，即使受到伤害也不会力尽倒下。`, "effect": `
                <ul>
                    <li>Lv1. 发动效果</li>
                    <li>Lv2. 使用迅速切换之书【苍】时，红色槽的减少速度变慢</li>
                </ul>
            `},
    "8A": {
        "sname": "风绕", "desc": `使用铁虫丝技后会有风环绕身体，翔虫槽的回复速度会上升。若攻击不断命中，效果将持续，且上升量会增加。纳刀后效果将解除。`, "effect": `
                <ul>
                    <li>Lv1. 发动效果</li>
                    <li>Lv2. 回复速度的上升量增加。</li>
                    <li>Lv3. 回复速度的上升量进一步增加。</li>
                </ul>
            `},
    "8B": {
        "sname": "粉尘绕", "desc": `狩猎大型怪物时，攻击不断命中即可使周围形成粉尘。粉尘会随时间而改变颜色，不同颜色的效果也不一样。`, "effect": `
                <ul>
                    <li>Lv1. 当粉尘为红色时，受到击飞攻击后会产生爆炸；当粉尘为蓝色时攻击命中的部位会产生爆炸。</li>
                    <li>Lv2. 所需攻击次数减少。</li>
                    <li>Lv3. 所需攻击次数进一步减少。</li>
                </ul>
            `},
    "8C": {
        "sname": "寒气炼成", "desc": `纳刀状态下，会慢慢累积寒气，强化攻击力。当近身攻击击中时或发射箭/弹药时，寒气会逐渐丧失。`, "effect": `
                <ul>
                    <li>Lv1. 发动效果</li>
                    <li>Lv2. 增加寒气槽的长度</li>
                    <li>Lv3. 进一步增加寒气槽的长度</li>
                </ul>
            `},
    "8D": {
        "sname": "龙气转换", "desc": `使用迅速切换之书【朱】时，属性耐性值全部归0，并转换为属性攻击值。使用迅速切换之书【苍】时，攻击连续命中可提升属性耐性值。`, "effect": `
                <ul>
                    <li>Lv1. 发动效果除此效果外全属性耐性值+3</li>
                    <li>Lv2. 使用迅速切换之书【苍】时，攻击连续命中提升的属性耐性值增加除此效果外全属性耐性值+5</li>
                    <li>Lv3. 使用迅速切换之书【朱】时提升属性攻击值的转换率除此效果外全属性耐性值+10</li>
                </ul>
            `},
    "8E": {
        "sname": "天衣无缝", "desc": `狩猎大型怪物时，保持不受到伤害即可发动效果。离大型怪物过远或被击飞后，效果将解除。`, "effect": `
                <ul>
                    <li>Lv1. 效果发动时，耐力消耗会减少，并获得一次减少伤害的效果。进行迅速切换，可回复锋利度或装填弹药。</li>
                    <li>Lv2. 发动效果所需的时间减少</li>
                    <li>Lv3. 还可不消耗耐力与锋利度。进行迅速切换，可解除或减轻状态异常。</li>
                </ul>
            `},
    "8F": {
        "sname": "狂龙症【翔】", "desc": `克服狂龙症后，在一段时间内增加1格翔虫槽。变为纳刀状态时，效果将在短时间后解除。`, "effect": `
                <ul>
                    <li>Lv1. 效果时间30秒</li>
                    <li>Lv2. 效果时间60秒</li>
                    <li>Lv3. 效果时间90秒</li>
                </ul>
            `},
    "91": {
        "sname": "奋斗", "desc": `根据体力的红色槽长度，提升会心率和属性攻击力。`, "effect": `
                <ul>
                    <li>Lv1. 根据槽的长度，提升攻击性能。</li>
                    <li>Lv2. 根据槽的长度，进一步提升攻击性能。</li>
                    <li>Lv3. 根据槽的长度，进一步提升攻击性能。攻击性能提升至最大后，将得到不消耗耐力的效果。</li>
                </ul>
            `},
    "92": {
        "sname": "缓冲", "desc": `攻击命中同行的同伴，或是受到同伴的攻击时，使伤害反应无效。（在特定状态异常时不会生效）`,
        "effect": `<ul><li>Lv1. 发动效果</li></ul>`
    },
    "90": {
        "sname": "气血觉醒", "desc": `根据吸血量提升攻击力 升级强化数值`,
        "effect": `<ul>
        <li>Lv1. 发动效果</li>
        <li>Lv2. 加强效果</li>
        <li>Lv3. 进一步加强效果</li>
        </ul>`
    },

}
