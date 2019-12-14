function findArmy(hourse, elephant, armour, sling) {
    let hourseCount = 0;
    let elephantCount = 0;
    let armourCount = 0;
    let slingCount = 0;
    const hourseResponse = findIndivigual(hourse, max.hourse, hourseCount, elephantCount, '', max.elephant);
    hourseCount = hourseResponse.current;
    elephantCount = hourseResponse.next;
    const elephantResponse  = findIndivigual(elephant, max.elephant, elephantCount, armourCount, hourseCount, max.armour, max.hourse);
    hourseCount = elephantResponse.previous;
    elephantCount = elephantResponse.current;
    armourCount = elephantResponse.next ? elephantResponse.next : 0;
    const armourResponse = findIndivigual(armour, max.armour, armourCount, slingCount, elephantCount, max.sling, max.elephant);
    elephantCount = armourResponse.previous;
    armourCount = armourResponse.current;
    slingCount = armourResponse.next ? armourResponse.next : 0;
    const slingResponse = findIndivigual(sling, max.sling, slingCount, '', armourCount, undefined, max.armour);
    armourCount = slingResponse.previous;
    slingCount = slingResponse.current;
    console.log("number of house:", hourseCount, "elephant:", elephantCount, "armour:", armourCount, "sling:", slingCount);
}

function findIndivigual(entry, max, current, next, previous, nextMax, previousMax) {
    if(entry<=2*max) {
        current = entry%2 ===0 ? entry/2+current : ((entry+1)/2)+current;
    } else if(previous) {
        if(previous < previousMax) {
            current = max;
            if(previousMax-previous > 2*(((entry+1)/2)-max)) {
                previous = previous + 2*(entry-previousMax);
                return {current, previous};
            } else {
                current = max;
                previous = previousMax;
            }
        } else {
            current = max;
            previous = previousMax;
        }
    }
    else if(nextMax){
        current = max;
        if((nextMax - next) > (((entry+1)/2)-max)/2) {
            const temp = ((((entry+1)/2)-max)/2);
            next = temp%2 === 0 ? next + temp : next + temp+1; 
        } else {
            next = nextMax;
        }
    }
    return {current, previous, next};
}

const max = {hourse: 100, elephant:50, armour:10, sling:5};

findArmy(100, 101, 20, 5);

findArmy(150, 96, 26, 8);

findArmy(250, 50, 20, 15);


