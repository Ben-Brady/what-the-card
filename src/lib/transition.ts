export const transition = (callback: () => void) => {
    if ("startViewTransition" in document) {
        document.startViewTransition(callback);
    } else {
        callback();
    }
};
