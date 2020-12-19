export const coClass = (...classes: string[]) => {
    let cssClass = "";

    for (const c of classes) {
        if (c) {
            if (cssClass) {
                cssClass += " " + c;
            } else {
                cssClass += c;
            }
        }
    }

    return cssClass;
}
