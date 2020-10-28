var lemonadeChange = function(bills) {
    let fives = 0, tens = 0;
    for (let bill of bills) {
        if (bill === 5) {
            fives++;
        }
        else if (bill === 10) {
            fives--;
            tens++;
        } else if (bill === 20 && tens > 0) {
            fives--;
            tens--;
        } else {
            fives-=3;
        }
        if (fives < 0) return false ;
    }
    return true;
};
