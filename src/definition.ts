export type Data = {
    label: string,
    direction: 'upward' | 'downward',
    form: 'linear' | 'horizontal' | 'bell' | 'exp' | 'log';
    density: 'infinite' | number,
    color: string;
};

export type Definition = {
    title: string,
    xAxis: string,
    yAxis: string,
    data: Data[]
}

export function empty(): Definition {
    return newData({
        title: "",
        xAxis: "",
        yAxis: "",
        data: []
    });
}

export function newData(defs: Definition): Definition {
    const newData: Data = {
        label: "",
        direction: 'upward',
        form: 'linear',
        color: "#000000",
        density: 'infinite'
    };
    return {
        ...defs,
        data: [...defs.data, newData],
    }
}

export function toDirection(dir: String): Data["direction"] {
    switch (dir) {
        case "downward": return "downward";
        default: return "upward";
    }
}
export function toForm(dir: string): Data["form"] {
    switch (dir) {
        case "bell": return "bell";
        case "horizontal": return "horizontal";
        case "exp": return "exp";
        case "log": return "log";
        default: return "linear";
    }
}

const maxBound = 6;
export function density_(val: Data["density"]): number {
    return val === 'infinite' ? maxBound : val;
}

export function _density(s: string): Data["density"] {
    const val = Number(s);
    return val === maxBound ? 'infinite' : val;
}