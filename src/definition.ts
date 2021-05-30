export type Data = {
    label: string,
    direction: 'upward' | 'downward',
    form: 'linear' | 'bell' | 'exp' | 'log';
    color: string;
};

export type Definition = {
    title: string,
    xAxis: string,
    yAxis: string,
    data: Data[]
}

export function empty(): Definition {
    return {
        title: "",
        xAxis: "",
        yAxis: "",
        data: []
    };
}

export function newData(defs: Definition): Definition {
    const newData: Data = { label: "", direction: 'upward', form: 'linear', color: "#000000" };
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
export function toForm(dir: String): Data["form"] {
    switch (dir) {
        case "bell": return "bell";
        case "exp": return "exp";
        case "log": return "log";
        default: return "linear";
    }
}