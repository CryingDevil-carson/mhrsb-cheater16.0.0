



//要怎么获取这个值
// var version_code = "11D95B00";//12.0.1
// var version_code = "12400610";//13.0.1
// var version_code = "123693D0";//14.0.1
// var version_code = "129E11D8";//15.0.1
var version_code = "12A4FD80";//16.0.1

var TID = "0100559011740000";
var BID = "44C9289FBB51455F";

var RefreshCount = 0;

let isFastMode = true;

var isStopRender = false;

var cost_skill_hex = {};
var DecoratrionSel = {};
var DecoratrionNameMap = {};
var DecoratrionHexLvMap = {};

var PartIdxMap = {
    "1": "head",
    "2": "body",
    "3": "hand",
    "4": "waist",
    "5": "foot",
}


var PartMap = {};
var CharmData = {
    sel1: [],
    sel2: [],
    skill1Hex: "00",
    skill1Lv: 0,
    skill1Type: "",
    skill2Hex: "00",
    skill2Lv: 0,
    skill2Type: "",
    slot: "000",
    decoration: [
        { "hex": "00", "lv": 0 },
        { "hex": "00", "lv": 0 },
        { "hex": "00", "lv": 0 },
    ]
};
var WeaponData = {
    slot: "444",
    decoration: [
        { "hex": "00", "lv": 0 },
        { "hex": "00", "lv": 0 },
        { "hex": "00", "lv": 0 },
    ]
};


var AutoGen = false;
var TmpCacheName = "临时缓存";
var CacheObj = null;
var MsgCount = 0;
var MsgAry = [];
var MsgLooping = false;
init();
async function init() {


    stopRender();
    for (let i in PartIdxMap) {
        PartMap[i] = null;
    }
    for (let i in skill_data) {
        let ski = skill_data[i];
        let cost = ski["cost"];
        if (!cost_skill_hex["" + cost]) {
            cost_skill_hex["" + cost] = [];
        }
        cost_skill_hex["" + cost].push(ski);
    }
    for (let i in cost_skill_hex) {
        cost_skill_hex[i].sort(function (a, b) {
            return parseInt(a.hex, 16) - parseInt(b.hex, 16);
        })

    }
    initSkillInfo();
    initCharmSkillData();
    initDecorationData();
    initHtml();
    initTable();

    initCharmSel();
    bindEvents();

    $("#menu2").hide();
    startRender();
    showMsg("初始化完成");
    await initCache();
    // await timeLag(500);
    $("#main").show();

}

async function initCache() {
    //根据版本获取？
    showMsg("加载缓存");
    $("#saveCache-spinner").hide();
    let cc = new Cache("MHRSB", "sys", 1);
    await cc.init();
    CacheObj = cc;
    let last = await loadList();
    //默认显示最后一个设置    
    await loadCache(last);



}
//加载历史缓存列表
async function loadList() {
    let cl = await CacheObj.readAll();
    //     <ul class="dropdown-menu">
    //     <li><button class="dropdown-item" href="#">Action</button></li>                            
    // </ul>
    cl.sort(function (a, b) {
        return b.v.t - a.v.t;
    })
    let str = "";
    let cl0 = ((cl && cl[0]) ? cl[0]["k"] : TmpCacheName);
    for (let i = 0; i < cl.length; i++) {
        let n = cl[i]["k"];
        let t = cl[i]["v"]["t"];
        t = format(t);
        str = str + `<li title="${n}-${t}"><a class="dropdown-item ">
        <div class="col col-sm-auto">
        <a class="btn cacheItem" >${n}<a>
        <a class="btn btn-danger deleteCache right" style="float: right;">删除<a>
        </div>
        </a></li>`;
    }
    $(".dropdown-menu").html(str);
    return cl0;
}
async function loadCache(name) {
    let cahe = await CacheObj.get(name);
    if (cahe) {
        showMsg("加载中:" + name);
        let tmp = cahe.PartMap;
        let tmpC = cahe.CharmData;
        let tmpW = cahe.WeaponData;
        // startRender();
        //用于以前的编号问题
        let cmm = {
            "9999991": "498",
            "9999992": "499",
            "9999993": "500",
            "9999994": "506",
            "9999995": "502",
        }
        for (let idx in tmp) {
            let pd = tmp[idx];
            if (pd["eq_id"]) {
                let aa = pd["eq_id"].split("_");
                if (cmm[aa[0]]) {
                    pd["eq_id"] = cmm[aa[0]] + "_" + aa[1];
                }

                $(".armor_select_" + idx).val(pd["eq_id"]);
                $(".armor_select_" + idx).change();
                // armor_container_
                // small form-select k_skill_select
                let sd = pd["k_skill"];
                for (let i = 0; i < sd.length; i++) {
                    let d = sd[i];

                    let v1 = `${idx}_${i}_${d["k_skill_hex"]}_${d["k_skill_cost"]}`;
                    $(".armor_container_" + idx).find(".k_skill_select").eq(i).val(v1);
                    $(".armor_container_" + idx).find(".k_skill_select").eq(i).change();

                    if (d["k_skill_edit_hex"] == "00") {
                        continue;
                    }
                    let v2 = `${idx}_${i}_${d["k_skill_edit_hex"]}`;
                    $(".armor_container_" + idx).find(".k_skill_change").eq(i).val(v2);
                    $(".armor_container_" + idx).find(".k_skill_change").eq(i).change();
                }
                for (let i = 0; i < pd["decoration"].length; i++) {
                    let d = pd["decoration"][i];

                    if ((d["hex"] != "00") && (d["lv"] > 0)) {
                        let v3 = `${d["hex"]}_${d["lv"]}`;
                        $(`.decoration_input_${idx}_${i}`).val(v3);
                        $(`.decoration_input_${idx}_${i}`).trigger("change");
                    }
                }
            }
        }
        //charm
        if (tmpC) {
            let v1 = `${1}_${tmpC["skill1Type"]}_${tmpC["skill1Hex"]}_${tmpC["skill1Lv"]}`;
            let v2 = `${2}_${tmpC["skill2Type"]}_${tmpC["skill2Hex"]}_${tmpC["skill2Lv"]}`;
            let v3 = tmpC["slot"];
            $("#charm_skill_select1").val(v1);
            $("#charm_skill_select1").change();
            $("#charm_skill_select2").val(v2);
            $("#charm_skill_select2").change();
            $("#charm_slot_select").val(v3);
            $("#charm_slot_select").change();
            for (let i = 0; i < tmpC["decoration"].length; i++) {
                let d = tmpC["decoration"][i];
                if ((d["hex"] != "00") && (d["lv"] > 0)) {
                    let v4 = `${d["hex"]}_${d["lv"]}`;
                    $(`.decoration_input_${6}_${i}`).val(v4);
                    $(`.decoration_input_${6}_${i}`).trigger("change");
                }
            }
            CharmData = tmpC;
        }
        if (tmpW) {
            for (let i = 0; i < tmpW["decoration"].length; i++) {
                let d = tmpW["decoration"][i];
                if ((d["hex"] != "00") && (d["lv"] > 0)) {
                    let v4 = `${d["hex"]}_${d["lv"]}`;
                    $(`.decoration_input_${7}_${i}`).val(v4);
                    $(`.decoration_input_${7}_${i}`).trigger("change");
                }
            }
            WeaponData = tmpW;
        }
        if (name != TmpCacheName) $("#cache-name").val(name);
        $("#curTitle").text(name);
        refreshShowArmorData();
        showMsg("加载完成:" + name);
    } else {
        //没有找到对应的缓存
        // showMsg("加载失败:" + name);
    }

}
//保存当前设置缓存
async function saveCache() {
    // prompt
    $("#saveCache-spinner").show();
    let name = $("#cache-name").val();
    if (name) {
        await CacheObj.add(name, { "PartMap": PartMap, "CharmData": CharmData, "WeaponData": WeaponData, "t": new Date });
        $("#saveCache-spinner").hide();
        showMsg("保存成功:" + name);
        await loadList();
        $('#cacheModal').modal('hide');
    } else {
        $("#cache-name").focus();
        $("#saveCache-spinner").hide();
    }
}
//设置临时缓存
function setTmpCache() {
    CacheObj.add(TmpCacheName, { "PartMap": PartMap, "CharmData": CharmData, "WeaponData": WeaponData, "t": new Date });
    showMsg("缓存成功");
}
async function delCache(name) {
    await CacheObj.delete(name);
    // console.log(name);
    showMsg("删除成功:" + name);
    await loadList();
}

function startRender() {
    isStopRender = false;
    refreshShowArmorData();
}
function stopRender() {
    isStopRender = true;
}

function switcTab() {
    if ($("#menu1").is(':visible')) {
        $("#menu1").hide();
        $("#menu2").show();
        $("#switch").text("切换回炼化");
        //并生成代码
        genAllTemplate();
    } else {
        $("#menu2").hide();
        $("#menu1").show();
        $("#switch").text("切换至代码");
    }
}
function switcMode() {
    isFastMode = !isFastMode;
    if (isFastMode) {
        $("#switchMode").text("切换至普通模式");
    } else {
        $("#switchMode").text("切换至快速模式");
    }
}
function isSkipSkill(hex) {
    var exc = {
        "2A": { "sname": "耐力夺取", },
        "2B": { "sname": "滑走强化", },
        "2C": { "sname": "吹笛名人", },
        "2E": { "sname": "炮弹装填", }, 
        // "35": { "sname": "减轻后坐力", },
        // "36": { "sname": "抑制偏移", },
        "3C": { "sname": "快吃", },
        "3D": { "sname": "耳栓", },
        "3E": { "sname": "风压耐性", },
        "3F": { "sname": "耐震", },
        "40": { "sname": "泡沫之舞", },
        "43": { "sname": "火耐性", },
        "44": { "sname": "水耐性", },
        "45": { "sname": "冰耐性", },
        "46": { "sname": "雷耐性", },
        "47": { "sname": "龙耐性", },
        "48": { "sname": "属性异常状态的耐性", },
        "49": { "sname": "毒耐性", },
        "4A": { "sname": "麻痹耐性", },
        "4B": { "sname": "睡眠耐性", },
        "4C": { "sname": "气绝耐性", },
        "4D": { "sname": "泥雪耐性", },
        "4E": { "sname": "爆破耐性", },
        "4F": { "sname": "植生学", },
        "50": { "sname": "地质学", },
        "52": { "sname": "捕获名人", },
        "53": { "sname": "剥取名人", },
        "54": { "sname": "幸运", },
        "55": { "sname": "砥石使用高速化", },
        "56": { "sname": "炸弹客", },
        "57": { "sname": "最爱蘑菇", },
        "59": { "sname": "广域化", },
        "5A": { "sname": "满足感", },
        // "5C": { "sname": "不屈", },
        "5D": { "sname": "减轻胆怯", },
        "5E": { "sname": "跳跃铁人", },
        "5F": { "sname": "剥取铁人", },
        "60": { "sname": "饥饿耐性", },
        "61": { "sname": "飞身跃入", },
        "62": { "sname": "佯动", },
        "63": { "sname": "骑乘名人", },
        "69": { "sname": "墙面移动", },
        "6A": { "sname": "逆袭", },
        "6D": { "sname": "风纹的一致", },
        "6E": { "sname": "雷纹的一致", },
        "6F": { "sname": "风雷合一", },
        // "7B": { "sname": "提供", },
        // "7E": { "sname": "零件改造", },
        "81": { "sname": "走壁移动【翔】", },
        // "85": { "sname": "迅之气息", },
    }
    return !!exc[hex];
}
function initCharmSkillData() {
    let m1 = [];
    let m2 = [];
    for (let hex in skill_data) {
        let d = skill_data[hex];
        if (isSkipSkill(hex)) {
            continue;
        }
        if (d["p1Max"]) {
            m1.push(d);
        }
        if (d["p2Max"]) {
            m2.push(d);
        }
    }
    m1.sort(function (a, b) { return parseInt(a.hex, 16) - parseInt(b.hex, 16) });
    m2.sort(function (a, b) { return parseInt(a.hex, 16) - parseInt(b.hex, 16) });
    CharmData["sel1"] = m1;
    CharmData["sel2"] = m2;
}

function initDecorationData() {
    let sl = [4, 3, 2, 1];
    for (let j = 0; j < sl.length; j++) {
        let slot = sl[j];
        let a = [];
        for (let i in decoration_data) {
            let di = decoration_data[i];
            DecoratrionNameMap[di["dname"]] = di;
            DecoratrionHexLvMap[di["hex"] + di["lv"]] = di;
            if (slot >= di["slot"]) {
                a.push(di);
            }
        }
        a.sort(function (a, b) {
            //return -101
            let n = b.slot - a.slot;
            if (n == 0) {
                n = parseInt(a.hex, 16) - parseInt(b.hex, 16);
            }
            return n;
        });
        let str = ""
        for (let i = 0; i < a.length; i++) {
            let d = a[i];
            let dname = d["dname"];
            let skill_hex = d["hex"];
            let lv = d["lv"];
            // opt.value = `${partIdx}_${idx}_${skill_hex}_${lv}`;
            str = str + `<option value="${dname}">`;
        }
        DecoratrionSel["" + slot] = a;
        $("#slot" + slot).html(str);
    }
}
function getDecorationDataByHexLv(hex, lv) {
    return DecoratrionHexLvMap[hex + lv];
}
function getDecorationDataByDName(dname) {
    return DecoratrionNameMap[dname];
}
function initHtml() {
    let tmp = $(".armor_container").html();

    let html = "";
    for (let idx in PartIdxMap) {
        let n = PartIdxMap[idx];
        let t = $(tmp);

        t.find(".armor_pos").html(idx + "_" + getBoxNumberHex(idx));
        let tmp2 = t.find(".k_skill_tbody").html();
        let tr = "";
        for (let i = 0; i < 7; i++) {
            tr = tr + tmp2;
        }
        let dsel = t.find(".decoration_select_container").html();
        let dselStr = "";
        for (let i = 0; i < 3; i++) {
            let s = $(dsel);
            s.addClass("decoration_input_" + idx + "_" + i);
            s.attr("id", "decoration_input_" + idx + "_" + i);
            dselStr = dselStr + s[0].outerHTML;
        }
        // console.log(dselStr)
        t.find(".decoration_select_container").html(dselStr);

        t.find(".k_skill_tbody").html(tr);

        t.find(".k_skill_tbody").addClass("k_skill_tbody_" + idx);
        t.find(".armor_select").addClass("armor_select_" + idx);
        t.find(".armor_pos").addClass("armor_pos_" + idx);
        t.find(".armor_slot").addClass("armor_slot_" + idx);
        t.find(".armor_cost").addClass("armor_cost_" + idx);

        t.find(".def_p").addClass("def_p_" + idx);
        t.find(".def_f").addClass("def_f_" + idx);
        t.find(".def_w").addClass("def_w_" + idx);
        t.find(".def_t").addClass("def_t_" + idx);
        t.find(".def_i").addClass("def_i_" + idx);
        t.find(".def_d").addClass("def_d_" + idx);

        t.find(".armor_skill").addClass("armor_skill_" + idx);


        html = html + `<div class="col ${"armor_container_" + idx}">${t.html()}</div>`;
    }
    $("#armor_body").html(html);
    initArmorSelect();

}

function bindEvents() {
    $(".armor_select").on("change", function (event) {
        onSelectArmor(event.target.value);
    });
    $(".k_skill_select").on("change", function (event) {
        onSelectKSkill(event.target.value);
    });
    $(".k_skill_change").on("change", function (event) {
        onSelectChangeSkill(event.target.value);
    });
    $(".charm_skill_select").on("change", function (event) {
        onSelectCharmSkill(event.target.value)
    });
    $("#charm_slot_select").on("change", function (event) {
        onSelectCharmSlot(event.target.value)
    });


    $(".decoration_input").on("change", function (event) {
        onInputDecoration(event.target, event.target.value)
    });


    $("#saveCache").on("click", function (event) {
        saveCache();
    });
    $("#setTmpCache").on("click", function (event) {
        setTmpCache();
    });
    $("#switch").on("click", function (event) {
        switcTab();
    });
    $("#switchMode").on("click", function (event) {
        switcMode();
    });



    $("#auto_gen_armor").on("change", function (event) {
        AutoGen = event.target.checked;
        genAllTemplate();
    });

    $("#copy_to_clipboard").on("click", function (event) {
        copyToClipboard();
    });
    $("#download").on("click", function (event) {
        downloadTxt();
    });

    $(".dropdown-menu").on("click", ".cacheItem", function (event) {
        loadCache(event.target.text);
    });

    $(".dropdown-menu").on("click", ".deleteCache", function (event) {
        delCache($(event.target).parent().find(".cacheItem").text());
    });

    $("#skillInfo").on("click", ".skill_info_div", function (event) {
        let targ = event.target;
        clickSkillInfo($(targ).find("button").attr("id"), $(targ).parent().attr("title"));
    });
    $("#skillInfo").on("click", ".skill_info_btn", function (event) {
        let targ = event.target;
        if ($(targ).prop("nodeName").toUpperCase() == "SPAN") {
            targ = $(targ).parent();
        }
        clickSkillInfo($(targ).attr("id"), $(targ).parent().parent().attr("title"));
        event.stopPropagation();
    });


}


function getSkillNameByHex(hex) {
    let sd = skill_data[hex];
    if (sd) {
        return sd["sname"];
    }
    return "";
}
function getSkillMaxByHex(hex) {
    let sd = skill_data[hex];
    return sd["max"];
}

function getArmorCostById(id) {
    id = id.split("_")[0];
    return armor_pool_cost[id]["cost"];
}

function getArmorPoolById(id) {
    id = id.split("_")[0];
    return armor_pool_cost[id]["pool"];
}
function getAddSkillListByCost(cost) {
    return cost_skill_hex["" + cost];
}

function getSkillAddByArmorId(id) {
    id = id.split("_")[0];
    let pool_id = armor_pool_cost[id]["pool"];
    return k_skill_add[pool_id.toString()];
}
function getDefStatusByPoolAndHex(pool_id, hex) {
    let name = "";
    let p = k_skill_add[pool_id.toString()];
    for (let i = 0; i < p.length; i++) {
        if (p[i]["hex"] == hex) {
            name = p[i]["name"];
            break;
        }
    }
    // { hex: "45", name: "防御+3", cost: 1 },    
    let dM = {
        "防御": "def_p",
        "火耐性": "def_f",
        "水耐性": "def_w",
        "雷耐性": "def_t",
        "冰耐性": "def_i",
        "龙耐性": "def_d",
    }
    let key = "", value = 0;
    if (name) {
        for (let x in dM) {
            if (new RegExp(x).test(name)) {
                key = dM[x];
                value = parseInt(name.split(x)[1]);
                break;
            }
        }

    }
    return [key, value];
}

function getArmorById(id) {
    return armor_list[id];
}
function getFastModeCostSkill() {


    // { sname: "壁面移動【翔】", hex: "81" },
    // { sname: "腹減り耐性", hex: "60" },       
    // { sname: "風圧耐性", hex: "3E" },
    // { "hex": "75", "sname": "狂龙症【蚀】", "cost": 12, "max": 3, "lvType": "", "p1Max": 0, "p2Max": 0 },

    let skm = { "81": null, "60": null, "3E": null, "75": null };
    for (let hex in skm) {
        skm[hex] = skill_data[hex];
    }
    return skm;
}

function getCharmSlotMap(sklvType) {
    //目前最多应该是411
    //暂时版本 所有技能组合都能出这类孔位
    return ["411", "331", "222"];
    let m = {
        "SS": ["411", "331", "222"],
        "SA": ["411", "331", "222"],
        "SB": ["411", "331", "222"],
        "SC": ["411", "331", "222"],
        "S": ["411", "331", "222"],
        "AS": ["411", "331", "222"],
        "AA": ["411", "331", "222"],
        "AB": ["411", "331", "222"],
        "AC": ["411", "331", "222"],
        "A": ["411", "331", "222"],
        "BS": ["411", "331", "222"],
        "BA": ["411", "331", "222"],
        "BB": ["411", "331", "222"],
        "BC": ["411", "331", "222"],
        "B": ["411", "331", "222"],
        "CS": ["411", "331", "222"],
        "CA": ["411", "331", "222"],
        "CB": ["411", "331", "222"],
        "CC": ["411", "331", "222"],
        "C": ["411", "331", "222"],
    }

    // let m = {
    //     "SS": ["400", "311"],
    //     "SA": ["400", "311"],
    //     "SB": ["400", "311"],
    //     "SC": ["400", "311"],
    //     "S": ["400", "311"],
    //     "AS": ["400", "311"],
    //     "AA": ["400", "311"],
    //     "AB": ["400", "311"],
    //     "AC": ["400", "311"],
    //     "A": ["400", "311"],
    //     "BS": ["400", "311"],
    //     "BA": ["400", "311"],
    //     "BB": ["400", "321"],
    //     "BC": ["400", "321"],
    //     "B": ["400", "321"],
    //     "CS": ["400", "311"],
    //     "CA": ["400", "311"],
    //     "CB": ["400", "321"],
    //     "CC": ["400", "321"],
    //     "C": ["400", "321"],
    // }
    return m[sklvType];
}

function getDecorationSelData(slot) {
    return DecoratrionSel["" + slot];
}



function initCharmSel() {
    for (let i = 0; i < CharmData["sel1"].length; i++) {
        let o = CharmData["sel1"][i];
        let opt = document.createElement("option");
        opt.value = "1_" + o["lvType"] + "_" + o["hex"] + "_" + o["p1Max"];
        opt.text = o["sname"] + " " + o["p1Max"];
        $("#charm_skill_select1").append(opt);
    }
    for (let i = 0; i < CharmData["sel2"].length; i++) {
        let o = CharmData["sel2"][i];
        let opt = document.createElement("option");
        opt.value = "2_" + o["lvType"] + "_" + o["hex"] + "_" + o["p2Max"];
        opt.text = o["sname"] + " " + o["p2Max"];;
        $("#charm_skill_select2").append(opt);
    }
}

function initCharmSlotSel() {
    let h = getCharmSlotMap(CharmData["skill1Type"] + CharmData["skill2Type"]);
    $("#charm_slot_select").html(`<option value="000">-----</option>`);
    if (h && h.length) {
        for (let i = 0; i < h.length; i++) {
            let o = h[i];
            let opt = document.createElement("option");
            opt.value = o;
            opt.text = o;
            $("#charm_slot_select").append(opt);
        }
    }
}

function initTable() {
    let str = "";
    for (let i = 0; i < 5; i++) {
        let partIdx = "" + (i + 1);
        str = str + `<tr>
            <td id ="armor_${partIdx}_name"></td>
            <td id="armor_${partIdx}_pos">${partIdx}</td>
            <td id="def_${partIdx}_p">0</td>
            <td id="def_${partIdx}_f">0</td>
            <td id="def_${partIdx}_w">0</td>
            <td id="def_${partIdx}_t">0</td>
            <td id="def_${partIdx}_i">0</td>
            <td id="def_${partIdx}_d">0</td>
            <td id="slot_${partIdx}">0</td>
            <td id="dec_${partIdx}"></td>
        </tr>`;
    }
    //护石
    str = str + `<tr>
        <td>护石</td>
        <td>-</td>
        <td >-</td>
        <td >-</td>
        <td >-</td>
        <td >-</td>
        <td >-</td>
        <td >-</td>
        <td id="slot_charms">0</td>
        <td id="dec_charms"></td>
    </tr>`
    str = str + `<tr>
        <td>合计</td>
        <td>-</td>
        <td id="def_total_p">0</td>
        <td id="def_total_f">0</td>
        <td id="def_total_w">0</td>
        <td id="def_total_t">0</td>
        <td id="def_total_i">0</td>
        <td id="def_total_d">0</td>
    </tr>`

    document.getElementById("def_table").innerHTML = str;
    document.getElementById("skill_table").innerHTML = "";//`<tr><td>-</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>`;

}

function initArmorSelect() {
    let serial = [];
    for (i in armor_list) {
        var o = armor_list[i];
        //R7防具
        if ((o["rank"] > 7 & o["bougyo"] > 0)) {
            if (!serial.includes(o["id"])) {
                serial.push(o["id"]);
            }
        }
    }
    serial.reverse();
    for (let i = 0; i < serial.length; i++) {
        let id = serial[i];
        for (let partIdx in PartIdxMap) {
            let o = armor_list[id + "_" + partIdx];
            if (o) {
                let p = o["parts_id"].toString();
                let opt = document.createElement("option");
                opt.value = o["id"].toString() + "_" + o["parts_id"].toString();
                opt.text = o["name"];
                let s = slot_simplify(o);
                let str = `孔位:${s}\n技能:`;
                for (let k = 0; k < o["skill"].length; k++) {
                    let sk = o["skill"][k];
                    str = str + `\n${sk["sname"]}:${sk["lv"]}`;
                }
                opt.title = str;
                $(".armor_select_" + p).append(opt);
            }

        }
    }
}

function initKSkillSelect(partIdx, armor_id) {
    let tb = $(".k_skill_tbody_" + partIdx);
    if (tb) {
        let tr = tb.find("tr");
        for (let i = 0; i < tr.length; i++) {
            //词条选择
            let sel = $(tr[i]).find("td").eq(0).find(".k_skill_select");
            sel.html(`<option value="${partIdx}_${i}_00_0">-----</option>`);
            let skillPool = getSkillAddByArmorId(armor_id);
            let count = 0;
            for (let j in skillPool) {
                let skData = skillPool[j];
                if (isFastMode) {
                    if (/防御|耐性/.test(skData["name"])) {
                        continue;
                    }
                }
                count++;
                let opt = document.createElement("option");
                opt.value = partIdx + "_" + i + "_" + skData["hex"] + "_" + skData["cost"];
                opt.text = skData["name"] + ":" + (skData["cost"] > 0 ? "-" : "+") + Math.abs((skData["cost"]));
                sel.append(opt);
                if (skData["cost"] > 0) {
                    sel.find("option").eq(count).css("color", "red");
                } else {
                    sel.find("option").eq(count).css("color", "green");
                }

            }

            //初始化上次选择的减技能，增技能的内容
            clearOldNewSkillSel(partIdx, i);
            //默认前三个是减技能 并且 减去无用技能 第四个增加3孔位
            if (isFastMode) {
                if (i < 3) {
                    sel.val(`${partIdx}_${i}_95_-10`);
                    sel.change();
                    let skillSel = $(tr[i]).find("td").eq(1).find(".k_skill_change");
                    skillSel.val(skillSel.find("option").eq(1).val());
                    skillSel.change();
                }
                if (i == 3) {
                    sel.val(`${partIdx}_${i}_8D_18`);
                    sel.change();
                }

            }

        }
    }
}
function onSelectArmor(armor_id) {
    // console.log(armor_id)
    if (armor_id == "-----") {
        //清空数据
        PartMap[partIdx] = null;
        return;
    }

    let partIdx = armor_id.split("_")[1];

    let data = PartMap[partIdx];
    if (!data || (data["eq_id"] != armor_id)) {
        data = createPartData(partIdx, armor_id);
    }

    PartMap[partIdx] = data;
    initKSkillSelect(partIdx, armor_id);
    initDecorationSel(partIdx);
    refreshShowArmorData();

}
function clearOldNewSkillSel(partIdx, idx) {
    idx = parseInt(idx);
    let v = `${partIdx}_${idx}_00_0`;
    $(".k_skill_tbody_" + partIdx).find("tr").eq(idx).find(".k_skill_change").html(`<option value="${v}">-----</option>`)

}
//选择怪异选项
function onSelectKSkill(value) {
    //idx 0-6
    let t_values = value.split('_');//event.target.value.split('_');
    let partIdx = t_values[0];
    let idx = t_values[1];
    let k_skill_hex = t_values[2];
    let k_skill_cost = parseInt(t_values[3]);

    clearOldNewSkillSel(partIdx, idx);

    let skillSel = $(".k_skill_tbody_" + partIdx).find("tr").eq(parseInt(idx)).find(".k_skill_change");
    let partData = PartMap[partIdx];
    let type = "";
    let type_def = 0;
    if (k_skill_hex == "00") {
        //没有选项
    } else if (k_skill_hex == "95") {
        //减技能 增加可用点数
        type = "skill";
        let skm = partData["eq_skill"];
        //该模式下 可以减去任意技能（包括非本装备的）
        if (isFastMode) {
            //注意这里应该使用的是 低cost废技能 例如饥饿耐性 风压耐性
            skm = getFastModeCostSkill();
        }
        for (let x in skm) {
            let d = skm[x];
            let sname = d["sname"];
            let slv = d["lv"];
            let skill_hex = d["hex"];
            let opt = document.createElement("option");
            opt.text = sname + " Lv: " + (slv ? slv : 1);
            opt.value = `${partIdx}_${idx}_${skill_hex}`;
            skillSel.append(opt);
        }
    } else if (["90", "91", "92", "93", "94"].includes(k_skill_hex)) {
        type = "skill";
        //增加技能 消耗点数        
        let cost_skill_list = getAddSkillListByCost(k_skill_cost);

        for (let j in cost_skill_list) {
            let d = cost_skill_list[j];

            let opt = document.createElement("option")
            let sname = d["sname"];
            let skill_hex = d["hex"];
            opt.value = `${partIdx}_${idx}_${skill_hex}`;
            opt.text = sname;
            skillSel.append(opt);
        }

    } else if (["8B", "8C", "8D"].includes(k_skill_hex)) {
        type = "slot";
    } else if (["45", "49", "4A", "4B", "4C", "3B", "3C", "46", "47", "48"].includes(k_skill_hex)) {
        //防御9-18-27-36
        if (["49", "4A", "4B", "4C"].includes(k_skill_hex)) {
            type_def = 2;
        }
        type = "def";
    } else {
        //耐性+ 1
        type = "def";
        if (k_skill_cost > 0) {
            type_def = 1;
        }
    }

    if (k_skill_cost > 0) {
        $(".k_skill_tbody_" + partIdx).find("tr").eq(parseInt(idx)).find(".k_skill_select").css("color", "red");
    } else {
        $(".k_skill_tbody_" + partIdx).find("tr").eq(parseInt(idx)).find(".k_skill_select").css("color", "green");
    }
    //该选项的hex 变更的技能编码 以及花费
    partData["k_skill"][idx]["k_skill_hex"] = k_skill_hex;
    partData["k_skill"][idx]["k_skill_edit_hex"] = "00";//变更的技能编码 +-一样 没选择技能时默认没有
    partData["k_skill"][idx]["k_skill_cost"] = k_skill_cost;
    partData["k_skill"][idx]["type"] = type;
    partData["k_skill"][idx]["type_def"] = type_def;


    //增加孔位 消耗点数      
    //对应增加的孔位
    let hnM = {
        "8B": 1, "8C": 2, "8D": 3
    }

    //重置数据
    partData["eq_k_slot"] = partData["eq_slot"];
    partData["eq_k_def"] = JSON.parse(JSON.stringify(partData["eq_def"]));
    partData["eq_k_skill"] = JSON.parse(JSON.stringify(partData["eq_skill"]));
    partData["eq_k_cost"] = partData["eq_cost"];

    //检查所有选项 计算孔位防御耐性
    let slotValue = 0;
    for (let i = 0; i < 7; i++) {
        let p = partData["k_skill"][i];
        let pHex = p["k_skill_hex"];
        let curType = p.type;
        if (["def"].includes(curType)) {
            let [key, value] = getDefStatusByPoolAndHex(partData.eq_pool_id, pHex);
            if (key) {
                partData["eq_k_def"][key] = partData["eq_k_def"][key] + value;
            }
        } else if (curType == "slot") {
            slotValue = slotValue + (hnM[pHex] || 0);
        } else if (curType == "skill") {


        }

        partData["eq_k_cost"] = partData["eq_k_cost"] - p["k_skill_cost"];
    }

    //在原装备上进行加减孔 用于显示
    if (slotValue > 0) {
        let v = slotValue;
        let k_slot_simple = partData["eq_slot"].split("").map(str => Number(str));
        for (let i = 0; i < 3; i++) {
            if (v > 0 && k_slot_simple[i] == 0) {
                k_slot_simple[i] = 1;
                v--;
            }
        }
        for (let i = 0; i < 3; i++) {
            if (v > 0 && k_slot_simple[i] < 4) {
                let tmp = k_slot_simple[i];
                if ((tmp + v) > 4) {
                    k_slot_simple[i] = 4;
                    v = tmp + v - 4;
                } else {
                    k_slot_simple[i] = tmp + v;
                    v = 0;
                }
            }
        }
        partData["eq_k_slot"] = k_slot_simple.join("");
    }
    initDecorationSel(partIdx);
    //加减技能 这里还没有选具体的选项 应当重新计算所有选项 并且选择技能后 重复该操作
    setToPartDataSkillsChange(partIdx);

    refreshShowArmorData();
}


function onSelectChangeSkill(value) {
    //选择增加技能 或者 减去旧技能
    // if(!value){
    //     return;
    // }
    let r = value.split("_");
    let partIdx = r[0], idx = parseInt(r[1]), hex = r[2];
    PartMap[partIdx]["k_skill"][idx]["k_skill_edit_hex"] = hex;
    setToPartDataSkillsChange(partIdx);
    refreshShowArmorData();
}

function onSelectCharmSkill(value) {
    let r = value.split("_");
    let p = r[0];
    let lvType = r[1];
    let hex = r[2];
    let lv = parseInt(r[3]);
    if (p == "1") {
        CharmData["skill1Hex"] = hex;
        CharmData["skill1Lv"] = lv;
        CharmData["skill1Type"] = lvType;

    } else {
        CharmData["skill2Hex"] = hex;
        CharmData["skill2Lv"] = lv;
        CharmData["skill2Type"] = lvType;
    }
    initCharmSlotSel();
    refreshShowArmorData();
}
function onSelectCharmSlot(value) {
    CharmData["slot"] = value;
    initDecorationSel("6");
    refreshShowArmorData();
}
function onInputDecoration(targ, value) {
    targ = $(targ);
    let id = targ.attr("id");
    id = id.split("_");
    let p = id[2];//decoration_input_6_1
    let idx = id[3];
    let v = value.split("_");
    let info = null;
    if (v.length > 1) {
        // 6C_2
        let r = value.split("_");
        let hex = r[0];
        let lv = parseInt(r[1]);
        // dname
        info = getDecorationDataByHexLv(hex, lv);
        if (info) {
            targ.val(info.dname);
        }
    } else {
        info = getDecorationDataByDName(value);
        if (value && !info) {
            targ.val("");
        }
    }

    // targ.data(info);

    let d = PartMap[p];
    if (p == "6") {
        d = CharmData;
    } else if (p == "7") {
        d = WeaponData;
    }

    d["decoration"][idx]["hex"] = info ? info.hex : "00";
    d["decoration"][idx]["lv"] = info ? info.lv : 0;
    refreshShowArmorData();

}
function onSelectDecoration(value) {
    //
    if (!value) return;
    let r = value.split("_");
    let p = r[0];
    let idx = parseInt(r[1]);
    let hex = r[2];
    let lv = parseInt(r[3]);
    // decoration:[
    //     {"hex":"00","lv":0},
    //     {"hex":"00","lv":0},
    //     {"hex":"00","lv":0},
    // ]
    let d = PartMap[p];
    if (p == "6") {
        d = CharmData;
    } else if (p == "7") {
        d = WeaponData;
    }

    d["decoration"][idx]["hex"] = hex;
    d["decoration"][idx]["lv"] = lv;
    refreshShowArmorData();
}

function setToPartDataSkillsChange(partIdx) {
    let partData = PartMap[partIdx];
    if (partData) {
        //先重置
        partData["eq_k_skill"] = JSON.parse(JSON.stringify(partData["eq_skill"]));
        for (let i = 0; i < 7; i++) {
            let p = partData["k_skill"][i];
            let pHex = p["k_skill_hex"];
            let curType = p.type;
            if (curType == "skill") {
                //加减技能 这里还没有选具体的选项 应当重新计算所有选项 并且选择技能后 重复该操作
                let k = partData["eq_k_skill"];
                let skill_hex = p["k_skill_edit_hex"];
                if (skill_hex && (skill_hex != "00")) {
                    if (!k[skill_hex]) {
                        k[skill_hex] = {
                            "sname": getSkillNameByHex(skill_hex),
                            "hex": skill_hex,
                            "lv": 0,
                        }
                    }
                    k[skill_hex]["lv"] = k[skill_hex]["lv"] + ((pHex == "95") ? -1 : 1);
                }
            }
        }
    }
}


function getBoxNumberHex(partIdx) {
    let iPlace = parseInt(partIdx) - 1;
    let eq_pos_hex = 32 + iPlace * 8;
    return eq_pos_hex.toString(16);
}


function initDecorationSel(partIdx) {
    let s = "";
    if (partIdx == "6") {
        s = CharmData["slot"];
    } else if (partIdx == "7") {
        s = WeaponData;
    } else {
        let partData = PartMap[partIdx];
        if (partData) {
            s = partData["eq_k_slot"] || "";
        }
    }

    if (s) {
        s = s.split("");
        //清空
        for (let idx = 0; idx < 3; idx++) {
            let si = parseInt(s[idx]);
            let pc = ".decoration_input_" + partIdx + "_" + idx;
            let orgVal = $(pc).val();
            $(pc).attr("list", "");

            if (!si || (si == 0)) {
                //禁用
            } else {
                $(pc).attr("list", "slot" + si);
                $(pc).attr("placeholder", `【${si}】`);
            }
            //检查前面的值 和当前的值 如果不一样则清空 或者先禁用
            // console.log("orgVal",orgVal);

            // let info = getDecorationDataByDName(orgVal);
            // if (info && si >= info["slot"]) {
            //     $(pc).val(orgVal);
            // }else{
            $(pc).val("");
            // }
            $(pc).trigger("change");
        }
    }
    refreshShowArmorData();
}


function slot_simplify(armor_data) {
    let slot = "";
    for (let i = 4; i > 0; i--) {
        let count = armor_data[`slotLv${i}`];
        for (let j = 0; j < count; j++) {
            slot = slot + i;
        }
    }
    if (slot.length < 3) {
        for (let i = 0; i < 4 - slot.length; i++) {
            slot = slot + "0";
        }
    }
    return slot;
}



function createPartData(partIdx, armor_id) {
    let armor_data = getArmorById(armor_id);

    let slot = slot_simplify(armor_data);
    let skm = {};
    for (let i = 0; i < armor_data["skill"].length; i++) {
        let s = armor_data["skill"][i];
        skm[s["hex"]] = { "sname": s["sname"], "lv": s["lv"], "hex": s["hex"] }
    }
    let skillOrg = JSON.parse(JSON.stringify(skm));
    let skillNew = JSON.parse(JSON.stringify(skm));

    let def = {
        def_p: armor_data["bougyo_max"],
        def_f: armor_data["def_f"],
        def_w: armor_data["def_w"],
        def_t: armor_data["def_t"],
        def_i: armor_data["def_i"],
        def_d: armor_data["def_d"]
    }

    //带k的是怪异化后的结果 无变化则是原来的值
    let data = {
        eq_id: armor_id,
        eq_partIdx: partIdx,
        eq_name: armor_data["name"],
        eq_pos: partIdx,
        eq_pos_hex: getBoxNumberHex(partIdx),
        eq_slot: slot,
        eq_k_slot: slot,
        eq_cost: getArmorCostById(armor_id),
        eq_k_cost: getArmorCostById(armor_id),
        eq_pool_id: "" + getArmorPoolById(armor_id),
        eq_def: def,
        eq_k_def: def,
        eq_skill: skillOrg,
        eq_k_skill: skillNew,
        k_skill: [
            { k_skill_hex: "00", k_skill_edit_hex: "00", k_skill_cost: 0 },
            { k_skill_hex: "00", k_skill_edit_hex: "00", k_skill_cost: 0 },
            { k_skill_hex: "00", k_skill_edit_hex: "00", k_skill_cost: 0 },
            { k_skill_hex: "00", k_skill_edit_hex: "00", k_skill_cost: 0 },
            { k_skill_hex: "00", k_skill_edit_hex: "00", k_skill_cost: 0 },
            { k_skill_hex: "00", k_skill_edit_hex: "00", k_skill_cost: 0 },
            { k_skill_hex: "00", k_skill_edit_hex: "00", k_skill_cost: 0 },
        ],
        decoration: [
            { "hex": "00", "lv": 0 },
            { "hex": "00", "lv": 0 },
            { "hex": "00", "lv": 0 },
        ]
    };
    return data;
}

/////////////////////////////////////////////////////更新界面信息//////////////////////////////////////////////////////////////


function refreshShowArmorData() {

    if (isStopRender) return;
    RefreshCount++;
    // console.log("come in ", RefreshCount);
    setTimeout(function () {
        RefreshCount--;
        if (RefreshCount) {
            // console.log("return", RefreshCount);
            return;
        }
        // console.log("doIt", RefreshCount);
        for (let partIdx in PartMap) {
            let data = PartMap[partIdx];
            if (data) {
                render_armor_slot(partIdx, data);
                render_armor_def(partIdx, data);
                render_armor_skill(partIdx, data["eq_k_skill"]);
                render_armor_cost(partIdx, data);
            }
        }
        render_total_table();
    }, 100)

}

function buildRenderData(hex) {
    return [getSkillNameByHex(hex), 0, 0, 0, 0, 0, 0, 0, 0, getSkillMaxByHex(hex)];
}
//更新表格的信息
function render_total_table() {
    let defTotal = { "p": 0, "f": 0, "w": 0, "t": 0, "i": 0, "d": 0 };
    let tt = ["p", "f", "w", "t", "i", "d"];
    let pnn = ["头", "身", "手", "腰", "腿", "护石", "武器"];
    let skillMap = {};
    for (let partIdx in PartMap) {
        let data = PartMap[partIdx];
        if (!data) continue;
        if (!data) data = {};
        document.getElementById(`armor_${partIdx}_name`).innerHTML = data["eq_name"] || pnn[parseInt(partIdx) - 1];
        document.getElementById(`armor_${partIdx}_pos`).innerHTML = data["eq_pos"] || partIdx;

        document.getElementById(`slot_${partIdx}`).innerHTML = data["eq_k_slot"] || "0";

        let defk = data["eq_k_def"] || {};
        for (let i = 0; i < tt.length; i++) {
            let t = tt[i];
            let d = defk[[`def_${t}`]] || 0;
            document.getElementById(`def_${partIdx}_${t}`).innerHTML = d;
            defTotal[t] = defTotal[t] + d;
        }

        //怪异后的技能（包括本体装备）
        let skm = data["eq_k_skill"];
        for (let skill_hex in skm) {
            let s = skm[skill_hex];
            if (s["lv"] <= 0) {
                //负数或0的 不处理
                continue;
            }
            let hex = s["hex"];
            if (!skillMap[hex]) {
                skillMap[hex] = buildRenderData(hex)
            }
            idx = parseInt(partIdx);
            skillMap[hex][idx] = skillMap[hex][idx] + s["lv"];
            //合计
            skillMap[hex][8] = skillMap[hex][8] + s["lv"];
        }

        for (let i = 0; i < data["decoration"].length; i++) {
            let d = data["decoration"][i];
            if (d["lv"]) {
                let hex = d["hex"];
                if (!skillMap[hex]) {
                    skillMap[hex] = buildRenderData(hex)
                }
                idx = parseInt(partIdx);
                skillMap[hex][idx] = skillMap[hex][idx] + d["lv"];
                //合计
                skillMap[hex][8] = skillMap[hex][8] + d["lv"];
            }


        }
    }
    if (CharmData.skill1Lv) {
        let hex = CharmData.skill1Hex;
        if (!skillMap[hex]) {
            skillMap[hex] = buildRenderData(hex)
        }
        skillMap[hex][6] = skillMap[hex][6] + CharmData.skill1Lv;
        skillMap[hex][8] = skillMap[hex][8] + CharmData.skill1Lv;
    }
    if (CharmData.skill2Lv) {
        let hex = CharmData.skill2Hex;
        if (!skillMap[hex]) {
            skillMap[hex] = buildRenderData(hex)
        }
        skillMap[hex][6] = skillMap[hex][6] + CharmData.skill2Lv;
        skillMap[hex][8] = skillMap[hex][8] + CharmData.skill2Lv;
    }
    for (let i = 0; i < CharmData["decoration"].length; i++) {
        let d = CharmData["decoration"][i];
        if (d["lv"]) {
            let hex = d["hex"];
            if (!skillMap[hex]) {
                skillMap[hex] = buildRenderData(hex)
            }
            skillMap[hex][7] = skillMap[hex][7] + d["lv"];
            //合计
            skillMap[hex][8] = skillMap[hex][8] + d["lv"];
        }

    }
    for (let i = 0; i < WeaponData["decoration"].length; i++) {
        let d = WeaponData["decoration"][i];
        if (d["lv"]) {
            let hex = d["hex"];
            if (!skillMap[hex]) {
                skillMap[hex] = buildRenderData(hex)
            }
            skillMap[hex][7] = skillMap[hex][7] + d["lv"];
            //合计
            skillMap[hex][8] = skillMap[hex][8] + d["lv"];
        }

    }

    let keys = Object.keys(skillMap);
    keys.sort(function (a, b) {
        return parseInt(a, 16) - parseInt(b, 16);
    });

    //会心率
    let critical = [];
    let criticalSum = 0;
    let tb = "";
    $(".skill_info_btn").attr("disabled", true);
    for (let i = 0; i < keys.length; i++) {
        let hex = keys[i];
        if (isSkipSkill(hex)) {
            continue;
        }
        let d = skillMap[hex];
        let sn = d[0];
        let cur = d[8];
        let max = d[9];
        let rs = getRateByHex(hex, cur < max ? cur : max);
        if (rs && rs.r) {
            criticalSum = criticalSum + rs.r;
            critical.push(`${rs.r}(${sn})`);
            // critical.push(rs.s);
            // rs.r
            // rs.s
            // console.log(rs);
        }

        // $("#skill_info_"+hex).addClass($("#skill_info_"+hex).attr("colorData"));
        $("#skill_info_" + hex).attr("disabled", false);
        $("#skill_info_" + hex).find(".skill_info_status").text(`${cur}/${max}`);
        tb = tb + `<tr class="" >        
        <td class="small">${d[1]}</td>
        <td class="small">${d[2]}</td>
        <td class="small">${d[3]}</td>
        <td class="small">${d[4]}</td>
        <td class="small">${d[5]}</td>
        <td class="small">${d[6]}</td>
        <td class="small">${d[7]}</td>
        <td class="small" style="text-align: right;">${sn}</td>
        <td class="small">${getProgressbar(cur, max)}</td>        
        </tr>`
    }
    // <div class="col list-group-item-warning rounded">雷: <span id="def_t">0</span></div>
    for (let i = 0; i < tt.length; i++) {
        let t = tt[i];
        document.getElementById(`def_total_${t}`).innerHTML = defTotal[t];;
    }

    // console.log(`${critical.join("+")}=${criticalSum}`)    
    document.getElementById("critical").innerHTML = `${critical.join("+")}=${criticalSum}` + getProgressbar(criticalSum, 100);
    document.getElementById("skill_table").innerHTML = tb;
}

function getProgressbar(cur, max) {
    let t = `${cur}/${max}`;
    let r = parseInt((cur / max) * 100);
    //info danger success warning
    let bg = "bg-warning";
    if (r == 100) {
        bg = "bg-info";
    }
    if ((r > 100)) {
        bg = "bg-danger";
    }
    let str = `
    <div class="progress">
    <div class="progress-bar ${bg}" role="progressbar"  style="width: ${r}%;height:100%" aria-valuenow="${r}" aria-valuemin="0" aria-valuemax="100">${t}</div>
    </div>
    `
    return str;

}


function render_armor_skill(partIdx, skills_array) {
    let ul = $(".armor_skill_" + partIdx);
    ul.html("");
    if (skills_array) {
        for (i in skills_array) {
            let sname = skills_array[i]["sname"];
            let lv = skills_array[i]["lv"];
            if (lv < 0) {
                continue;
            }
            let skill = `${sname}：Lv${lv}`;
            let skill_node = document.createElement("li");
            skill_node.className = "list-group-item";
            skill_node.textContent = skill;
            ul.append(skill_node);
        }
    }

}

function render_armor_def(partIdx, data) {
    if (!data) data = {};
    let def = data["eq_def"];//原值
    let def_k = data["eq_k_def"] || {};



    $(".def_p_" + partIdx).html(def_k["def_p"] || 0);
    $(".def_f_" + partIdx).html(def_k["def_f"] || 0);
    $(".def_w_" + partIdx).html(def_k["def_w"] || 0);
    $(".def_t_" + partIdx).html(def_k["def_t"] || 0);
    $(".def_i_" + partIdx).html(def_k["def_i"] || 0);
    $(".def_d_" + partIdx).html(def_k["def_d"] || 0);
}

function render_armor_slot(partIdx, data) {
    let slot = "";
    if (data) {
        slot = data["eq_slot"] || "000";
        if (slot != data["eq_k_slot"]) {
            slot = slot + " >>> " + data["eq_k_slot"];
        }
    }
    $(".armor_slot_" + partIdx).html(slot)
}

function render_armor_cost(partIdx, data) {
    let c = 0;
    if (data) {
        c = data["eq_k_cost"] || 0;
    }
    $(".armor_cost_" + partIdx).html(c);
}








/////////////////////////////////////////////////////生成模板//////////////////////////////////////////////////////////////
function genAllTemplate() {
    let str = "";
    for (let idx in PartMap) {

        let res = genArmorTemplate(PartMap[idx]);
        if (res) {
            str = str + "\n" + res;
        }
    }
    str = str + genCharmTemplate();

    document.getElementById("template_result").innerText = str;
}
function genArmorTemplate(data) {

    let str = "";
    if (data) {

        //防御耐性- 0 耐性+ 1 防御+ 2
        let template_title = `[第0${data["eq_pos"]}格： ${data["eq_name"]} ${data["remarks"] || ""}${AutoGen ? "(自动生成)" : ""}]`;
        // k_skill_step start at 0x20, step 8, max 0x50, total 7 items
        let template = "";
        // 0C1001F6  0C2001F6
        //0C1-0C5 头 胸 手 腰腿  001F6 系列
        let ei = data["eq_id"].split("_");

        let armor_hex = parseInt(ei[0]).toString(16).toUpperCase();
        while (armor_hex.length < 4) {
            armor_hex = "0" + armor_hex;
        }
        armor_hex = `0C${ei[1]}0` + armor_hex;

        let armCode = `
580F0000 ${version_code}
580F1000 00000088
580F1000 00000028
580F1000 00000010
580F1000 000000${data["eq_pos_hex"]}
780F0000 00000030
680F0000 ${armor_hex} 00000002`;
        for (i = 32; i < 88; i += 8) {
            let index = i / 8 - 4;

            let ks = data["k_skill"][index];
            let td = ks["type_def"] || 0;

            let k_skill_step = i.toString(16);

            let k_skill_hex = ks["k_skill_hex"];
            let k_skill_edit_hex = ks["k_skill_edit_hex"];
            //单个区block 暂时的规律是每个版本都会变开头的数据
            let template_block = `
${AutoGen ? armCode : ""}
580F0000 ${version_code}
580F1000 00000088
580F1000 00000028
580F1000 00000010
580F1000 000000${data["eq_pos_hex"]}
580F1000 000000A0
580F1000 000000${k_skill_step}
780F0000 00000010
680F0000 0000000${td} 000000${k_skill_hex}
780F0000 00000008
680F0000 00000000 000000${k_skill_edit_hex}`;
            template += template_block;
        }
        // str = template_title + armCode + template + "\n";
        str = template_title + template + "\n";
    }
    return str;
}

function genCharmTemplate() {
    let slot = [0, 0, 0, 0];//1,2,3,4
    var s = CharmData["slot"];
    let s1Hex = CharmData["skill1Hex"];
    let s2Hex = CharmData["skill2Hex"];
    let s1Lv = CharmData["skill1Lv"] || 0;
    let s2Lv = CharmData["skill2Lv"] || 0;
    if (!s) {
        return "";
    }
    let n1 = getSkillNameByHex(s1Hex) || "";
    let n2 = getSkillNameByHex(s2Hex) || "";
    let title = `[第06格${n1}${s1Lv}_${n2}${s2Lv}_S${s}]`;
    s = s.split("");
    for (let i = 0; i < s.length; i++) {
        let si = parseInt(s[i]);
        if (isNaN(si)) si = 0;
        if (si) {
            slot[si - 1]++;
        }
    }

    let slot1Num = slot[0] || 0;
    let slot2Num = slot[1] || 0;
    let slot3Num = slot[2] || 0;
    let slot4Num = slot[3] || 0;

    //400 311
    let box_pos_hex = "00000048";
    let charmType = "10100011";
    let b = `
${title}
580F0000 ${version_code}
580F1000 00000088
580F1000 00000028
580F1000 00000010
580F1000 ${box_pos_hex}
780F0000 00000030
680F0000 ${charmType} 00000003
580F0000 ${version_code}
580F1000 00000088
580F1000 00000028
580F1000 00000010
580F1000 ${box_pos_hex}
580F1000 00000080
780F0000 00000020
640F0000 00000000 0000${s2Hex}${s1Hex}
580F0000 ${version_code}
580F1000 00000088
580F1000 00000028
580F1000 00000010
580F1000 ${box_pos_hex}
580F1000 00000088
780F0000 00000020
680F0000 0000000${s2Lv} 0000000${s1Lv}
580F0000 ${version_code}
580F1000 00000088
580F1000 00000028
580F1000 00000010
580F1000 ${box_pos_hex}
580F1000 00000078
780F0000 00000020
680F1000 0000000${slot1Num} 00000000
680F1000 0000000${slot3Num} 0000000${slot2Num}
680F0000 00000000 0000000${slot4Num}`;
    return b;
}



function copyToClipboard() {
    let content = document.getElementById("template_result").innerText;
    navigator.clipboard.writeText(content);
    document.getElementById("copy_result").innerText = "copied!";
}
function downloadTxt() {
    let content = document.getElementById("template_result").innerText;
    const blob = new Blob([content], {
        type: "text/plain;charset=utf-8"
    })
    // 根据 blob生成 url链接
    const objectURL = URL.createObjectURL(blob)
    // 创建一个 a 标签Tag
    const aTag = document.createElement('a')
    // 设置文件的下载地址
    aTag.href = objectURL
    // 设置保存后的文件名称
    aTag.download = `${BID}.txt`;
    // 给 a 标签添加点击事件
    aTag.click();

}

function compare() {

    let str = "";
    for (let idx in PartMap) {

        let res = genArmorTemplate(PartMap[idx]);
        if (res) {
            str = str + "\n" + res;
        }
    }
    let data1 = str + genCharmTemplate();


    let data2 = CmpTmp2;
    data1 = data1.split("\n");
    data2 = data2.split("\n");
    let f = true;
    for (let i = 0; i < data1.length; i++) {
        if (data1[i].trim() != data2[i].trim()) {
            f = false;
            console.log("块不一致", i, data1[i], data2[i]);
        }
    }
    console.log("匹配完成", f);

}

var CmpTmp2 = `
[第01格脉动帝王双角]  
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000020 
580F1000 000000A0 
580F1000 00000020 
780F0000 00000010 
680F0000 00000000 00000095
780F0000 00000008 
680F0000 00000000 00000060
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000020 
580F1000 000000A0 
580F1000 00000028 
780F0000 00000010 
680F0000 00000000 00000095
780F0000 00000008 
680F0000 00000000 00000060
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000020 
580F1000 000000A0 
580F1000 00000030 
780F0000 00000010 
680F0000 00000000 00000095
780F0000 00000008 
680F0000 00000000 00000060
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000020 
580F1000 000000A0 
580F1000 00000038 
780F0000 00000010 
680F0000 00000000 0000008C
780F0000 00000008 
680F0000 00000000 00000000
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000020 
580F1000 000000A0 
580F1000 00000040 
780F0000 00000010 
680F0000 00000000 00000092
780F0000 00000008 
680F0000 00000000 00000086
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000020 
580F1000 000000A0 
580F1000 00000048 
780F0000 00000010 
680F0000 00000000 00000092
780F0000 00000008 
680F0000 00000000 00000086
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000020 
580F1000 000000A0 
580F1000 00000050 
780F0000 00000010 
680F0000 00000000 00000092
780F0000 00000008 
680F0000 00000000 00000086
  
[第02格水行・醒【宿衣】]  
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000028 
580F1000 000000A0 
580F1000 00000020 
780F0000 00000010 
680F0000 00000000 00000095
780F0000 00000008 
680F0000 00000000 00000060
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000028 
580F1000 000000A0 
580F1000 00000028 
780F0000 00000010 
680F0000 00000000 00000095
780F0000 00000008 
680F0000 00000000 00000060
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000028 
580F1000 000000A0 
580F1000 00000030 
780F0000 00000010 
680F0000 00000000 00000095
780F0000 00000008 
680F0000 00000000 00000060
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000028 
580F1000 000000A0 
580F1000 00000038 
780F0000 00000010 
680F0000 00000000 0000008D
780F0000 00000008 
680F0000 00000000 00000000
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000028 
580F1000 000000A0 
580F1000 00000040 
780F0000 00000010 
680F0000 00000000 00000090
780F0000 00000008 
680F0000 00000000 00000039
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000028 
580F1000 000000A0 
580F1000 00000048 
780F0000 00000010 
680F0000 00000000 00000091
780F0000 00000008 
680F0000 00000000 00000041
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000028 
580F1000 000000A0 
580F1000 00000050 
780F0000 00000010 
680F0000 00000000 00000093
780F0000 00000008 
680F0000 00000000 00000075
  
[第03格水行・醒【大袖】]  
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000030 
580F1000 000000A0 
580F1000 00000020 
780F0000 00000010 
680F0000 00000000 00000095
780F0000 00000008 
680F0000 00000000 00000060
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000030 
580F1000 000000A0 
580F1000 00000028 
780F0000 00000010 
680F0000 00000000 00000095
780F0000 00000008 
680F0000 00000000 00000060
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000030 
580F1000 000000A0 
580F1000 00000030 
780F0000 00000010 
680F0000 00000000 00000095
780F0000 00000008 
680F0000 00000000 00000060
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000030 
580F1000 000000A0 
580F1000 00000038 
780F0000 00000010 
680F0000 00000000 0000008D
780F0000 00000008 
680F0000 00000000 00000000
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000030 
580F1000 000000A0 
580F1000 00000040 
780F0000 00000010 
680F0000 00000000 00000090
780F0000 00000008 
680F0000 00000000 0000003A
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000030 
580F1000 000000A0 
580F1000 00000048 
780F0000 00000010 
680F0000 00000000 00000091
780F0000 00000008 
680F0000 00000000 00000051
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000030 
580F1000 000000A0 
580F1000 00000050 
780F0000 00000010 
680F0000 00000000 00000093
780F0000 00000008 
680F0000 00000000 00000070
  
[第04格水行・醒【圆带】]  
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000038 
580F1000 000000A0 
580F1000 00000020 
780F0000 00000010 
680F0000 00000000 00000095
780F0000 00000008 
680F0000 00000000 00000060
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000038 
580F1000 000000A0 
580F1000 00000028 
780F0000 00000010 
680F0000 00000000 00000095
780F0000 00000008 
680F0000 00000000 00000060
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000038 
580F1000 000000A0 
580F1000 00000030 
780F0000 00000010 
680F0000 00000000 00000095
780F0000 00000008 
680F0000 00000000 00000060
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000038 
580F1000 000000A0 
580F1000 00000038 
780F0000 00000010 
680F0000 00000000 0000008C
780F0000 00000008 
680F0000 00000000 00000000
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000038 
580F1000 000000A0 
580F1000 00000040 
780F0000 00000010 
680F0000 00000000 00000091
780F0000 00000008 
680F0000 00000000 00000042
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000038 
580F1000 000000A0 
580F1000 00000048 
780F0000 00000010 
680F0000 00000000 00000092
780F0000 00000008 
680F0000 00000000 0000007D
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000038 
580F1000 000000A0 
580F1000 00000050 
780F0000 00000010 
680F0000 00000000 00000093
780F0000 00000008 
680F0000 00000000 00000088
  
[第05格脉动钢龙踏实]  
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000040 
580F1000 000000A0 
580F1000 00000020 
780F0000 00000010 
680F0000 00000000 00000095
780F0000 00000008 
680F0000 00000000 00000060
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000040 
580F1000 000000A0 
580F1000 00000028 
780F0000 00000010 
680F0000 00000000 00000095
780F0000 00000008 
680F0000 00000000 00000060
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000040 
580F1000 000000A0 
580F1000 00000030 
780F0000 00000010 
680F0000 00000000 00000095
780F0000 00000008 
680F0000 00000000 00000060
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000040 
580F1000 000000A0 
580F1000 00000038 
780F0000 00000010 
680F0000 00000000 0000008C
780F0000 00000008 
680F0000 00000000 00000000
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000040 
580F1000 000000A0 
580F1000 00000040 
780F0000 00000010 
680F0000 00000000 00000092
780F0000 00000008 
680F0000 00000000 00000078
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000040 
580F1000 000000A0 
580F1000 00000048 
780F0000 00000010 
680F0000 00000000 00000092
780F0000 00000008 
680F0000 00000000 00000078
580F0000 12400610 
580F1000 00000088 
580F1000 00000028 
580F1000 00000010 
580F1000 00000040 
580F1000 000000A0 
580F1000 00000050 
780F0000 00000010 
680F0000 00000000 00000092
780F0000 00000008 
680F0000 00000000 00000078
`
// compare()



async function showMsg(msg) {
    MsgAry.push(msg);
    if (MsgLooping) {
        return;
    }
    MsgLooping = true;
    while (MsgAry.length) {
        let curMmsg = MsgAry.shift();
        if (curMmsg) {
            MsgCount++;
            let m = "msghint" + MsgCount;
            let color = (MsgCount % 2 == 0) ? "alert-primary " : "alert-info";
            let s = `
                <div class="msghint ${m} alert ${color} align-items-center fade show" role="alert">            
                <div>${curMmsg}</div>
                </div>`
            $("body").append(s);
            setTimeout(function () {
                $(`.${m}`).remove();
            }, 6000);
            await timeLag(350);
        }
    }
    MsgLooping = false;

}

function timeLag(t) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(true);
        }, t)
    });
}

//日期时间处理
function format(date, fmt) {
    var args = arguments;
    if (args.length == 1) {
        date = args[0];

    }
    if (!fmt) {
        fmt = "yyyy-MM-dd hh:mm:ss";
    }
    if (Object.prototype.toString.call(fmt) == "[object Date]") {
        var str = date;
        date = fmt;
        fmt = str;
    }
    var time;
    if (!date) return "";
    if (typeof date === 'string') {
        time = new Date(date.replace(/-/g, '/').replace(/T|Z/g, ' ').replace(/.000/g, ' ').trim());
    } else if (date instanceof Date) {
        time = new Date(date);
    }
    var o = {
        "M+": time.getMonth() + 1, //月份
        "d+": time.getDate(), //日
        "h+": time.getHours(), //小时
        "m+": time.getMinutes(), //分
        "s+": time.getSeconds(), //秒
        "q+": Math.floor((time.getMonth() + 3) / 3), //季度
        "S": time.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
    return fmt;
}



function getRateByHex(hex, curLv) {
    let ug = {
        "01": {
            "always": true, "sit": "",
            "upg": [
                { "lv": 1, "atk": 3, "atk_rate": 0, "critical": 0, },
                { "lv": 1, "atk": 6, "atk_rate": 0, "critical": 0, },
                { "lv": 1, "atk": 9, "atk_rate": 0, "critical": 0, },
                { "lv": 1, "atk": 7, "atk_rate": 1.05, "critical": 0, },
                { "lv": 1, "atk": 8, "atk_rate": 1.06, "critical": 0, },
                { "lv": 1, "atk": 9, "atk_rate": 1.08, "critical": 0, },
                { "lv": 1, "atk": 10, "atk_rate": 1.1, "critical": 0, }
            ],
        },
        "02": {
            "always": false, "sit": "愤怒",
            "upg": [
                { "lv": 1, "atk": 4, "atk_rate": 0, "critical": 3, },
                { "lv": 1, "atk": 8, "atk_rate": 0, "critical": 5, },
                { "lv": 1, "atk": 12, "atk_rate": 0, "critical": 7, },
                { "lv": 1, "atk": 16, "atk_rate": 0, "critical": 10, },
                { "lv": 1, "atk": 20, "atk_rate": 0, "critical": 15, },
            ]
        },
        "03": {
            "always": false, "sit": "无伤",
            "upg": [
                { "lv": 1, "atk": 5, "atk_rate": 0, "critical": 0, },
                { "lv": 1, "atk": 10, "atk_rate": 0, "critical": 0, },
                { "lv": 1, "atk": 20, "atk_rate": 0, "critical": 0, },
            ]
        },
        "04": {
            "always": false, "sit": "红血",
            "upg": [
                { "lv": 1, "atk": 5, "atk_rate": 0, "critical": 0, },
                { "lv": 1, "atk": 10, "atk_rate": 0, "critical": 0, },
                { "lv": 1, "atk": 15, "atk_rate": 0, "critical": 0, },
                { "lv": 1, "atk": 20, "atk_rate": 0, "critical": 0, },
                { "lv": 1, "atk": 25, "atk_rate": 0, "critical": 0, },
            ]
        },
        "05": {
            "always": false, "sit": "异常状态",
            "upg": [
                { "lv": 1, "atk": 5, "atk_rate": 0, "critical": 0, },
                { "lv": 1, "atk": 10, "atk_rate": 0, "critical": 0, },
                { "lv": 1, "atk": 20, "atk_rate": 0, "critical": 0, },
            ]
        },

        "06": {
            "always": true, "sit": "",
            "upg": [
                { "lv": 1, "atk": 0, "atk_rate": 0, "critical": 5, },
                { "lv": 1, "atk": 0, "atk_rate": 0, "critical": 10, },
                { "lv": 1, "atk": 0, "atk_rate": 0, "critical": 15, },
                { "lv": 1, "atk": 0, "atk_rate": 0, "critical": 20, },
                { "lv": 1, "atk": 0, "atk_rate": 0, "critical": 25, },
                { "lv": 1, "atk": 0, "atk_rate": 0, "critical": 30, },
                { "lv": 1, "atk": 0, "atk_rate": 0, "critical": 40, }
            ],
        },
        "08": {
            "always": false, "sit": "弱点",
            "upg": [
                { "lv": 1, "atk": 0, "atk_rate": 0, "critical": 15, },
                { "lv": 1, "atk": 0, "atk_rate": 0, "critical": 30, },
                { "lv": 1, "atk": 0, "atk_rate": 0, "critical": 50, },
            ],
        },
        "09": {
            "always": false, "sit": "力量解放",
            "upg": [
                { "lv": 1, "atk": 0, "atk_rate": 0, "critical": 10, },
                { "lv": 1, "atk": 0, "atk_rate": 0, "critical": 20, },
                { "lv": 1, "atk": 0, "atk_rate": 0, "critical": 30, },
                { "lv": 1, "atk": 0, "atk_rate": 0, "critical": 40, },
                { "lv": 1, "atk": 0, "atk_rate": 0, "critical": 50, },
            ],
        },

        "0A": {
            "always": false, "sit": "满耐力",
            "upg": [
                { "lv": 1, "atk": 0, "atk_rate": 0, "critical": 10, },
                { "lv": 1, "atk": 0, "atk_rate": 0, "critical": 20, },
                { "lv": 1, "atk": 0, "atk_rate": 0, "critical": 30, },
            ],
        },
        "25": {
            "always": false, "sit": "GP防御成功",
            "upg": [
                { "lv": 1, "atk": 0, "atk_rate": 1.05, "critical": 0, },
                { "lv": 1, "atk": 0, "atk_rate": 1.10, "critical": 0, },
                { "lv": 1, "atk": 0, "atk_rate": 1.15, "critical": 0, },
            ],
        },
        "26": {
            "always": false, "sit": "拔刀后2s？",
            "upg": [
                { "lv": 1, "atk": 0, "atk_rate": 0, "critical": 15, },
                { "lv": 1, "atk": 0, "atk_rate": 0, "critical": 30, },
                { "lv": 1, "atk": 0, "atk_rate": 0, "critical": 60, },
            ],
        },
        "27": {
            "always": false, "sit": "拔刀第一刀",
            "upg": [
                { "lv": 1, "atk": 3, "atk_rate": 0, "critical": 0, },
                { "lv": 1, "atk": 5, "atk_rate": 0, "critical": 0, },
                { "lv": 1, "atk": 7, "atk_rate": 0, "critical": 0, },
            ],
        },
        "5B": {
            "always": false, "sit": "体力在最大值的35%以下时",
            "upg": [
                { "lv": 1, "atk": 0, "atk_rate": 0, "critical": 0, },
                { "lv": 1, "atk": 0, "atk_rate": 1.05, "critical": 0, },
                { "lv": 1, "atk": 0, "atk_rate": 1.05, "critical": 0, },
                { "lv": 1, "atk": 0, "atk_rate": 1.1, "critical": 0, },
                { "lv": 1, "atk": 0, "atk_rate": 1.3, "critical": 0, },
            ],
        },
        "5C": {
            "always": false, "sit": "猫车后（每次触发 做多2次）",
            "upg": [
                { "lv": 1, "atk": 0, "atk_rate": 1.1, "critical": 0, },
            ],
        },
        "67": {
            "always": false, "sit": "体力在最大值的70%-80%以下时",
            "upg": [
                { "lv": 1, "atk": 0, "atk_rate": 0, "critical": 0, },
                { "lv": 1, "atk": 0, "atk_rate": 0, "critical": 0, },
                { "lv": 1, "atk": 0, "atk_rate": 0, "critical": 0, },
                { "lv": 1, "atk": 0, "atk_rate": 1.05, "critical": 0, },
                { "lv": 1, "atk": 0, "atk_rate": 1.1, "critical": 0, },
            ],
        },

        "6A": {
            "always": false, "sit": "被击飞后",
            "upg": [
                { "lv": 1, "atk": 10, "atk_rate": 0, "critical": 0, },
                { "lv": 1, "atk": 15, "atk_rate": 0, "critical": 0, },
                { "lv": 1, "atk": 25, "atk_rate": 0, "critical": 0, },
            ],
        },
        "71": {
            "always": false, "sit": "蓝书 啮生虫越多，攻击性能则会进一步上升 15/20/25、20/25/30、25/30/35",
            "upg": [
                { "lv": 1, "atk": 25, "atk_rate": 0, "critical": 0, },
                { "lv": 1, "atk": 30, "atk_rate": 0, "critical": 0, },
                { "lv": 1, "atk": 35, "atk_rate": 0, "critical": 0, },
            ],
        },
        "73": {
            "always": false, "sit": "红书  15/20/35",
            "upg": [
                { "lv": 1, "atk": 15, "atk_rate": 0, "critical": 0, },
                { "lv": 1, "atk": 20, "atk_rate": 0, "critical": 0, },
                { "lv": 1, "atk": 35, "atk_rate": 0, "critical": 0, },
            ],
        },
        "74": {
            "always": false, "sit": "异常恢复",
            "upg": [
                { "lv": 1, "atk": 12, "atk_rate": 0, "critical": 0, },
                { "lv": 1, "atk": 15, "atk_rate": 0, "critical": 0, },
                { "lv": 1, "atk": 18, "atk_rate": 0, "critical": 0, },
            ],
        },
        "75": {
            "always": false, "sit": "感染增加攻击克服增加会心",
            "upg": [
                { "lv": 1, "atk": 10, "atk_rate": 0, "critical": 20, },
                { "lv": 1, "atk": 20, "atk_rate": 0, "critical": 25, },
                { "lv": 1, "atk": 20, "atk_rate": 0, "critical": 25, },
            ],
        },

        "77": {
            "always": false, "sit": "背后攻击",
            "upg": [
                { "lv": 1, "atk": 0, "atk_rate": 1.05, "critical": 0, },
                { "lv": 1, "atk": 0, "atk_rate": 1.1, "critical": 0, },
                { "lv": 1, "atk": 0, "atk_rate": 1.2, "critical": 0, },
            ],
        },
        "78": {
            "always": false, "sit": "精确回避",
            "upg": [
                { "lv": 1, "atk": 10, "atk_rate": 0, "critical": 0, },
                { "lv": 1, "atk": 15, "atk_rate": 0, "critical": 0, },
                { "lv": 1, "atk": 30, "atk_rate": 0, "critical": 0, },
            ],
        },
        "7D": {
            "always": false, "sit": "怪物异常眠麻毒爆",
            "upg": [
                { "lv": 1, "atk": 10, "atk_rate": 0, "critical": 0, },
                { "lv": 1, "atk": 10, "atk_rate": 0, "critical": 10, },
                { "lv": 1, "atk": 15, "atk_rate": 0, "critical": 20, },
            ],
        },
        "83": {
            "always": false, "sit": "连续命中",
            "upg": [
                { "lv": 1, "atk": 5, "atk_rate": 0, "critical": 0, },
                { "lv": 1, "atk": 5, "atk_rate": 0, "critical": 0, },
                { "lv": 1, "atk": 5, "atk_rate": 0, "critical": 0, },
            ],
        },
        "88": {
            "always": false, "sit": "触发异常攻击时",
            "upg": [
                { "lv": 1, "atk": 0, "atk_rate": 1.1, "critical": 0, },
                { "lv": 1, "atk": 0, "atk_rate": 1.15, "critical": 0, },
                { "lv": 1, "atk": 0, "atk_rate": 1.2, "critical": 0, },
            ],
        },
        "8C": {
            "always": false, "sit": "寒气槽存在时 按阶段增加",
            "upg": [
                { "lv": 1, "atk": 0, "atk_rate": 1.05, "critical": 0, },
                { "lv": 1, "atk": 0, "atk_rate": 1.2, "critical": 0, },
                { "lv": 1, "atk": 0, "atk_rate": 1.3, "critical": 0, },
            ],
        },
        "91": {
            "always": false, "sit": "按红槽长度",
            "upg": [
                { "lv": 1, "atk": 0, "atk_rate": 0, "critical": 10, },
                { "lv": 1, "atk": 0, "atk_rate": 0, "critical": 15, },
                { "lv": 1, "atk": 0, "atk_rate": 0, "critical": 20, },
            ],
        }


    };

    if (ug[hex]) {
        let d = ug[hex];
        let c = d["upg"][curLv - 1];
        // console.log(d,curLv);
        let r = c["critical"] || 0;
        let s = d["sit"];
        return { r, s };
    }
    return null;
}


function initSkillInfo() {
    // let str = "";

    // let c = ["list-group-item-success", "list-group-item-danger", "list-group-item-primary", "list-group-item-warning", "list-group-item-info", "list-group-item-dark"];
    let c = ["btn-success", "btn-danger", "btn-primary", "btn-warning", "btn-info", "btn-dark"];
    // let idx = 0;
    {/* <button type="button" class="btn btn-primary">Primary</button> */ }
    let s = Object.keys(skill_data);
    s.sort();

    let arrM = {};
    for (let i = 0; i < s.length; i++) {
        let hex = s[i];
        let d = skill_data[hex];
        if (isSkipSkill(hex)) {
            continue;
        }
        let t = d["tag"][0];
        if (!arrM[t]) {
            arrM[t] = [];

        }
        arrM[t].push([hex, d["sname"]]);
    }
    let ctx = "";
    for (let t in arrM) {
        let a = arrM[t];
        let str = `<div class="m-1 row" title="${t}">${t}</div>`
        let idx = 0;
        for (let i = 0; i < a.length; i++) {
            if (idx == 0) {
                str = str + `<div class="m-1 row" title="${t}">`;
            }
            let hex = a[i][0];
            let name = a[i][1];

            // <button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="<em>Tooltip</em> <u>with</u> <b>HTML</b>">
            // Tooltip with HTML
            // </button>
            let desc = skill_desc[hex]["desc"] + "\n";
            $(skill_desc[hex]["effect"]).find("li").each(function (idx, elm) {
                desc = desc + $(elm).text() + "\n";

            });
            str = str + `            
            <div class="col col-2 row skill_info_div" title="${desc}");>
            <button type="button" disabled id="skill_info_${hex}" class="skill_info_btn btn  ${c[idx]} rounded">
            <span>${name}</span><span class="skill_info_status">0/0</span>
            </button>            
            </div>
            `
            idx++;
            if (idx == c.length) {
                idx = 0;
                str = str + `</div>`;
            }
        }
        if (idx > 0) {
            str = str + `</div>`;
        }
        ctx = ctx + str;
    }
    // console.log(arrM)
    $("#skillInfo").html(ctx);
}

function clickSkillInfo(id, title) {
    // console.log(id, title);
    if ($("#" + id).hasClass("border")) {
        $("#" + id).removeClass("border");
        $("#" + id).removeClass("border-5");
    } else {
        $("#" + id).addClass("border");
        $("#" + id).addClass("border-5");
    }
}
