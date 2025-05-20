export const transition = (callback: () => void): Promise<void> => {
    if ("startViewTransition" in document) {
        const transition = document.startViewTransition(callback);
        return transition.finished;
    } else {
        callback();
        return Promise.resolve();
    }
};
