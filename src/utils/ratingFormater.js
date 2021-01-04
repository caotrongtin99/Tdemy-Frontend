const formater = (number) => {
    var split_looptijden_1 =
    [
        (number > 0) ? Math.floor(number) : Math.ceil(number)
    ];
    const integerPart = split_looptijden_1[0];
    if (number < integerPart + 0.25) {
        return integerPart
    } else if (number < integerPart + 0.5 || number < integerPart + 0.75) {
        return integerPart + 0.5
    } 
    return integerPart + 1;
}

export default formater;