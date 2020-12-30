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

export const formatDate = (date: Date): string => {
    if (!date) return "";

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    return date.toLocaleDateString("en-US", options)
}
