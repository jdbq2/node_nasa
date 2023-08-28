export const isCorrectDateFormat = (value: Date) => {
    const launchDate = value;
    if (!launchDate) {
        throw new Error("launchDate value is mandatory");
    }
    const date = new Date(launchDate);
    if (isNaN(date.valueOf())) {
        throw new Error("launchDate value is not a correct format date");
    }
    return true;
};
