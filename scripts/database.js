const database =
{
    paints: [
        {
            id: 1,
            option: 'Silver',
            price: 1000.00
        },
        {
            id: 2,
            option: 'Midnight Blue',
            price: 1200.00
        },
        {
            id: 3,
            option: 'Firebrick Red',
            price: 1100.00
        },
        {
            id: 4,
            option: 'Spring Green',
            price: 1050.00
        }
    ],
    interiors: [
        {
            id: 1,
            option: 'Beige Fabric',
            price: 500.00
        },
        {
            id: 2,
            option: 'Charcoal Fabric',
            price: 550.00
        },
        {
            id: 3,
            option: 'White Leather',
            price: 800.00
        },
        {
            id: 4,
            option: 'Black Leather',
            price: 850.00
        }
    ],
    technologies: [
        {
            id: 1,
            option: 'Basic Package (basic sound system)',
            price: 1000.00
        },
        {
            id: 2,
            option: 'Navigation Package (includes integrated navigation controls)',
            price: 1500.00
        },
        {
            id: 3,
            option: 'Visibility Package (includes side and rear cameras)',
            price: 2000.00
        },
        {
            id: 4,
            option: 'Ultra Package (includes navigation and visibility packages)',
            price: 2500.00
        }
    ],
    wheels: [
        {
            id: 1,
            option: '17-inch Pair Radial',
            price: 800.00
        },
        {
            id: 2,
            option: '17-inch Pair Radial Black',
            price: 900.00
        },
        {
            id: 3,
            option: '18-inch Pair Spoke Silver',
            price: 1000.00
        },
        {
            id: 4,
            option: '18-inch Pair Spoke Black',
            price: 1100.00
        }
    ],
    orders: [
        {
            id: 1,
            paintId: 2,
            interiorId: 3,
            technologyId: 4,
            wheelId: 1,
            timestamp: 1624367890
        }
    ],
    userChoice: {}
}


export const getPaints = async () => {
    const res = await fetch("https://localhost:7153/paintcolors");
    const data = await res.json();
    return data;
}

export const getInteriors = async () => {
    const res = await fetch("https://localhost:7153/interiors");
    const data = await res.json();
    return data;
}

export const getTechnologies = async () => {
    const res = await fetch("https://localhost:7153/technologies");
    const data = await res.json();
    return data;
  };

  /*  before the intergration with ASP.NET backend:

    export const getTechnologies = () => {
    return [...database.technologies]
    } 
    
    */

export const getWheels = async () => {
    const res = await fetch("https://localhost:7153/wheels");
    const data = await res.json();
    return data;
}

export const getOrders = async () => {
    const res = await fetch("https://localhost:7153/orders");
    const data = await res.json();
    return data;
}

//setter functions: storing userChoice 
export const setPaints = (id) => {
    database.userChoice.paintId = id
}

export const setInteriors = (id) => {
    database.userChoice.interiorId = id;
}

export const setTechnologies = (id) => {
    database.userChoice.technologyId = id;
}

export const setWheels = (id) => {
    database.userChoice.wheelId = id;
}

// 还需要用 change event listener 来监控用户改变选择框做出选择时 invoke setter functions

// savingUserChoiceToOrders
/* before the intergration with ASP.NET backend:

export const savingUserChoiceToOrders = () => {
    const newOrder = { ...database.userChoice } //这里直接用了spread syntax，没用map method
        newOrder.id = database.orders[database.orders.length - 1].id + 1
        newOrder.timestamp = Date.now()
    database.orders.push(newOrder)

    database.userChoice = {}

    document.dispatchEvent(new CustomEvent('stateChanged'))
} 

*/

export const savingUserChoiceToOrders = async () => {
    const newOrder = { ...database.userChoice } //这里直接用了spread syntax，没用map method

    await fetch(`https://localhost:7153/orders`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
    });
    //上面使用POST fetch来替代vanilla js的三行代码

    database.userChoice = {}

    document.dispatchEvent(new CustomEvent('stateChanged'))
}

// 下一步: 还是需要刷新页面才能看到最新的order. 那我要用 很多 async和await 来保证一submit就显示最新order, 不需要刷新页面. 