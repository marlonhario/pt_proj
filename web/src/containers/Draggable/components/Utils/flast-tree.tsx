import { between } from "./handy";
import { getPathOnLevel, hasSameParent, isTopOfSubtree, moveAfterPath } from "./path";

export const getFlatItemPath = (flattenedTree, sourceIndex) =>
    flattenedTree[sourceIndex].path

export const getSourcePath = getFlatItemPath

export const getDestinationPath = (
    flattenedTree,
    sourceIndex,
    destinationIndex,
    // level on the tree, starting from 1.
    level
) => {
    // Moving down
    const down = destinationIndex > sourceIndex;
    // Path of the source location
    const sourcePath = getSourcePath(flattenedTree, sourceIndex);
    // Stayed at the same place
    const sameIndex = destinationIndex === sourceIndex;
    // Path of the upper item where the item was dropped
    const upperPath = down
        ? flattenedTree[destinationIndex].path
        : flattenedTree[destinationIndex - 1] &&
        flattenedTree[destinationIndex - 1].path;
    // Path of the lower item where the item was dropped
    const lowerPath =
        down || sameIndex
            ? flattenedTree[destinationIndex + 1] &&
            flattenedTree[destinationIndex + 1].path
            : flattenedTree[destinationIndex].path;

    /*
      We are going to differentiate 4 cases:
        - item didn't change position, only moved horizontally
        - item moved to the top of a list
        - item moved between two items on the same level
        - item moved to the end of list. This is an ambiguous case.
    */

    // Stayed in place, might moved horizontally
    if (sameIndex) {
        if (typeof level !== "number") {
            return sourcePath;
        }
        if (!upperPath) {
            // Not possible to move
            return sourcePath;
        }
        const minLevel = lowerPath ? lowerPath.length : 1;
        const maxLevel = Math.max(sourcePath.length, upperPath.length);
        const finalLevel = between(minLevel, maxLevel, level);
        const sameLevel = finalLevel === sourcePath.length;
        if (sameLevel) {
            // Didn't change level
            return sourcePath;
        }
        const previousPathOnTheFinalLevel = getPathOnLevel(upperPath, finalLevel);
        return moveAfterPath(previousPathOnTheFinalLevel, sourcePath);
    }

    // Moved to top of the list
    if (lowerPath && isTopOfSubtree(lowerPath, upperPath)) {
        return lowerPath;
    }

    // Moved between two items on the same level
    if (upperPath && lowerPath && hasSameParent(upperPath, lowerPath)) {
        if (down && hasSameParent(upperPath, sourcePath)) {
            // if item was moved down within the list, it will replace the displaced item
            return upperPath;
        }
        return lowerPath;
    }

    // Moved to end of list
    if (upperPath) {
        // this means that the upper item is deeper in the tree.
        const finalLevel = calculateFinalLevel(
            sourcePath,
            upperPath,
            lowerPath,
            level
        );
        // Insert to higher levels
        const previousPathOnTheFinalLevel = getPathOnLevel(upperPath, finalLevel);
        return moveAfterPath(previousPathOnTheFinalLevel, sourcePath);
    }

    // In case of any other impossible case
    return sourcePath;
}

const calculateFinalLevel = (sourcePath, upperPath, lowerPath, level) => {
    const upperLevel = upperPath.length;
    const lowerLevel = lowerPath ? lowerPath.length : 1;
    const sourceLevel = sourcePath.length;
    if (typeof level === "number") {
        // Explicit disambiguation based on level
        // Final level has to be between the levels of bounding items, inclusive
        return between(lowerLevel, upperLevel, level);
    }
    // Automatic disambiguation based on the initial level
    return sourceLevel <= lowerLevel ? lowerLevel : upperLevel;
};

export const getItemById = (flattenedTree, id) =>
    flattenedTree.find(item => item.item.id === id)

export const getIndexById = (flattenedTree, id) =>
    flattenedTree.findIndex(item => item.item.id === id)  