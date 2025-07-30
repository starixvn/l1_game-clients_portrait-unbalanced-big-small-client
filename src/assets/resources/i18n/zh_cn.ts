const win = window as any;
export const languages = {
    "Common": {},
    "UnbalancedBigSmall4": {
        "game_name": "蒙特卡罗大小"
    },
    "BigSmall": {}
};

if (!win.languages) {
    win.languages = {};
}

win.languages.zh_cn = languages;