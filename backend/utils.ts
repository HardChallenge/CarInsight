export const mapRoutes = (app: { _router: { stack: any[]; }; }) => {
    const allRoutes = app._router.stack.filter((layer: { route: any; }) => layer.route).map((layer: { route: { path: any; stack: { method: any; }[]; }; }) => [layer.route.path, layer.route.stack[0].method]);
    const map = new Map();

    for (let i = 0; i < allRoutes.length; i++) {
        const [path, method] = allRoutes[i];
        if (map.has(path)) {
            map.get(path).push(method);
        } else {
            map.set(path, [method]);
        }
    }

    return map;
}

export const generateRandom = (count: number) => {
    let data: { type: string; brand: string; year: number; color: string; vin: string; }[] = [];
    let types = ['car', 'truck', 'motorcycle'];
    let brands = ['ford', 'toyota', 'honda', 'chevrolet', 'nissan'];
    let colors = ['red', 'blue', 'green', 'yellow', 'black', 'white'];
    for (let i = 0; i < count; i++) {
        let type = types[Math.floor(Math.random() * types.length)];
        let brand = brands[Math.floor(Math.random() * brands.length)];
        let year = Math.floor(Math.random() * (2021 - 1900 + 1)) + 1900;
        let color = colors[Math.floor(Math.random() * colors.length)];
        let vin = Math.random().toString(36).substring(2, 15).toUpperCase();
        data.push({type, brand, year, color, vin});
    }
    return data;
}