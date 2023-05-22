var version_list = {
    "15.0.0": "129E11D8",
    "15.0.1": "129E11F8",
}

var version_code = version_list["15.0.1"];

var slot_list = {
    "4-1-1": [2, 0, 0, 1],
    "4-1-0": [1, 0, 0, 1],
    "4-0-0": [0, 0, 0, 1],
    "3-3-1": [1, 0, 2, 0],
    "3-3-0": [0, 0, 2, 0],
    "3-2-1": [1, 1, 1, 0],
    "3-2-0": [0, 1, 1, 0],
    "3-1-1": [2, 0, 1, 0],
    "3-1-0": [1, 0, 1, 0],
    "3-0-0": [0, 0, 1, 0],
    "2-2-2": [0, 3, 0, 0],
    "2-2-1": [1, 2, 0, 0],
    "2-2-0": [0, 2, 0, 0],
    "2-1-0": [1, 1, 0, 0],
    "1-1-1": [3, 0, 0, 0],
}

var talisman = {
    pos: 1, //positioin 1, start 0x20, step 0x8
    slot_type: "0-0-0",
    slot: [0, 0, 0, 0], // lv1, lv2, lv3, lv4 - [2, , 0, 1] -> 4-1-1
    s1: {hex: "00", sname:"", lv: 0},
    s2: {hex: "00", sname:"", lv: 0},
};

var talisman_class = {
    "rar_10": {
        "Divine Talisman": "0D",
        "Boon Talisman": "0E",
        "Discipline Talisman": "0F",
        "Wisdom Talisman": "11",
    },
}

var talisman_resutl = {};


slot_sel = document.getElementById("slot_select");
for (i in slot_list) {
    let opt = document.createElement("option");
    opt.text = i;
    opt.value = slot_list[i];
    slot_sel.appendChild(opt);
}
slot_sel.addEventListener("change", (event) => { 
    talisman["slot_type"] = slot_sel.options[slot_sel.selectedIndex].text;
    
    let slot_value = event.target.value.split(",");
    talisman["slot"] = slot_value;
});

talisman_pos_sel = document.getElementById("talisman_pos");
for (let i = 0; i < 20; i++) {
    let opt = document.createElement("option");
    opt.value = `${i+1}`;
    opt.text = `${i+1}`;
    talisman_pos_sel.appendChild(opt);
}
talisman_pos_sel.addEventListener("change", (event) => { 
    talisman["pos"] = parseInt(event.target.value);
});

s1_sel = document.getElementById("skill_1");
for (i in talisman_skill) {
    let o = talisman_skill[i];
    if (o["s1_min"] != -1) {
        let opt = document.createElement("option");
        opt.value = i;
        opt.text = o["skill_name_japanese"];
        s1_sel.appendChild(opt);
    }
}
s1_sel.addEventListener("change", (event) => {
    let skill_id = event.target.value;
    talisman["s1"]["hex"] = parseInt(skill_id).toString(16).toUpperCase().padStart(2, "0");
    
    s1_sel_new = document.getElementById("skill_1_lv");
    s1_sel_new.innerHTML = `<option value="0">-----</option>`;

    s1_lv_sel = document.getElementById("skill_1_lv");
    let s1_skill = talisman_skill[skill_id];
    talisman["s1"]["sname"] = s1_skill["skill_name_japanese"];
    for (i = s1_skill["s1_min"]; i <= s1_skill["s1_max"]; i++) {
        if (i == 0) continue;
        let opt = document.createElement("option");
        opt.value = i;
        opt.text = i;
        s1_lv_sel.appendChild(opt);
    }
    s1_lv_sel.addEventListener("change", (event) => {
        talisman["s1"]["lv"] = event.target.value;
    });
});

s2_sel = document.getElementById("skill_2");
for (i in talisman_skill) {
    let o = talisman_skill[i];
    if (o["s2_min"] != -1) {
        let opt = document.createElement("option");
        opt.value = i;
        opt.text = o["skill_name_japanese"];
        s2_sel.appendChild(opt);
    }
}
s2_sel.addEventListener("change", (event) => { 
    let skill_id = event.target.value;
    talisman["s2"]["hex"] = parseInt(skill_id).toString(16).toUpperCase().padStart(2, "0");
    s2_sel_new = document.getElementById("skill_2_lv");
    s2_sel_new.innerHTML = `<option value="0">-----</option>`;

    s2_lv_sel = document.getElementById("skill_2_lv");
    let s2_skill = talisman_skill[skill_id];
    talisman["s2"]["sname"] = s2_skill["skill_name_japanese"];
    for (i = s2_skill["s2_min"]; i <= s2_skill["s2_max"]; i++) {
        if (i == 0) continue;
        let opt = document.createElement("option");
        opt.value = i;
        opt.text = i;
        s2_lv_sel.appendChild(opt);
    }
    s2_lv_sel.addEventListener("change", (event) => {
        talisman["s2"]["lv"] = event.target.value;
    });
});

function skill_check() {
    let s1 = document.getElementById(s1_sel.options.selectedIndex).value;
    let s2 = document.getElementById(s2_sel.options.selectedIndex).value;
    if (s1 == s2) {
        console.log("fuck");
    }
}

function genCharmTemplate() {
    let template_title = `[ 位置${talisman["pos"]}, ${talisman["s1"]["sname"]}${talisman["s1"]["lv"]}, ${talisman["s2"]["sname"]}${talisman["s2"]["lv"]}, ${talisman["slot_type"]}]`;
    
    // start at 0x20, step 8,
    let talisman_pos = ((talisman["pos"] + 3) * 8).toString(16);
    
    let template = "";
    template = `
    580F0000 ${version_code}
    580F1000 00000088
    580F1000 00000028
    580F1000 00000010
    580F1000 000000${talisman_pos}
    780F0000 00000030
    680F0000 101000${talisman_class["rar_10"]["Wisdom Talisman"]} 00000003
    580F0000 ${version_code}
    580F1000 00000088
    580F1000 00000028
    580F1000 00000010
    580F1000 000000${talisman_pos}
    580F1000 00000080
    780F0000 00000020
    640F0000 00000000 0000${talisman["s2"]["hex"]}${talisman["s1"]["hex"]}
    580F0000 ${version_code}
    580F1000 00000088
    580F1000 00000028
    580F1000 00000010
    580F1000 000000${talisman_pos}
    580F1000 00000088
    780F0000 00000020
    680F0000 0000000${talisman["s2"]["lv"]} 0000000${talisman["s1"]["lv"]}
    580F0000 ${version_code}
    580F1000 00000088
    580F1000 00000028
    580F1000 00000010
    580F1000 000000${talisman_pos}
    580F1000 00000078
    780F0000 00000024
    680F1000 0000000${talisman["slot"][1]} 0000000${talisman["slot"][0]}
    680F0000 0000000${talisman["slot"][3]} 0000000${talisman["slot"][2]}
`;
    
    document.getElementById("template_result").innerText = template_title + template + "\n";
}

function copyToClipboard() {
    let content = document.getElementById("template_result").innerText;
    navigator.clipboard.writeText(content);
    document.getElementById("copy_result").innerText = "copied!";
}