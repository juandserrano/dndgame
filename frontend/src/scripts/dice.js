function d(sides) {
    return Math.floor(Math.random() * sides + 1);
};

function attackRoll(modifier, constitution) {
    let check = d(20) + modifier;
    console.log(check, constitution)
    if(check >= constitution){
        return true;
    }else{
        return false;
    }
};

function damageRoll(qty, sides, mod, save){
    if(attackRoll(mod, save)){
        let dmg = 0;
        for (i = 0 ; i < qty ; i++){
            dmg += d(sides)
        };
        return dmg;
    }else{return 0}
};

function weaponAttack(weapon){
    let dmg = Number;
    switch (weapon) {
        case 'shortsword': 
            dmg = d(6);
            break;
        case 'handaxe':
            dmg = d(6)
            break;
        case 'dagger':
            dmg = d(4);
            break;
        case 'shortbow':
            dmg = d(6);
            break;
        case 'battleaxe':
            dmg = d(8);
            break;
        case 'greatsword':
            dmg = d(6) + d(6);
            break;
        case 'monster':
            dmg = d(6) + d(4) + d(6);
            break;
    };
    return dmg;
};
    


module.exports = {d, attackRoll, damageRoll, weaponAttack}