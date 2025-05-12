export default function classNames(...args: unknown[]): string {
    return args
        .map<string>((arg) => {
            // string: "a"
            if (typeof arg === "string") {
                return arg;
            }

            // falsy value: undefined | null | false | 0 | ""
            if (!arg || typeof arg !== "object") {
                return "";
            }

            // array: ["a", "b", "c"]
            if (Array.isArray(arg)) {
                return classNames(...arg);
            }

            // object with a custom toString method
            if (
                /* has a custom toString method */
                arg.toString !== Object.prototype.toString &&
                /* and is not a native toString */
                !arg.toString.toString().includes("[native code]")
            ) {
                return arg.toString();
            }

            // object: {"a": false, "b": true}
            return Object.keys(arg as object)
                .filter(
                    (key) =>
                        (arg as Record<string, string>)[key] &&
                        Object.prototype.hasOwnProperty.call(arg, key),
                )
                .join(" ");
        })
        .filter((v) => v) // remove empty strings
        .join(" ");
}
