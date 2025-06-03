
export function calculateMasonryColumns<T>({
    items,
    columnCount,
    calculateHeight,
}: {
    columnCount: number;
    items: T[];
    calculateHeight: (value: T) => number;
}): T[][] {
    type Column = {
        height: number;
        items: T[];
    };

    const columns: Column[] = Array.from({ length: columnCount }, () => ({
        height: 0,
        items: [],
    }));

    for (const item of items) {
        const shortestColumn = columns.sort((a, b) => a.height - b.height)[0];

        shortestColumn.height += calculateHeight(item);
        shortestColumn.items.push(item);
    }

    return columns.map((v) => v.items);
}
