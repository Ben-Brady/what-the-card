const ENABLED = false;

const getElement = (): HTMLElement => {
    const existingElement = document.getElementById("debug-text");
    if (existingElement) return existingElement;

    const element = document.createElement("span");
    element.id = "debug-text";
    element.style.position = "absolute";
    element.style.top = "20px";
    element.style.left = "20px";
    element.style.color = "black";
    document.body.append(element);

    return element;
};

const lines: string[] = [];

export const debugLog = (text: string) => {
    if (!ENABLED) return;
    lines.push(text.toString());
    if (lines.length > 5) lines.shift();

    const element = getElement();
    element.innerText = lines.join("\n");
};
