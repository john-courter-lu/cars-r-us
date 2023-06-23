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


export const getPaints = () => {
    return database.paints.map(obj => ({ ...obj }))
}

export const getInteriors = () => {
    return database.interiors.map(obj => ({ ...obj }));
}

export const getTechnologies = () => {
    return database.technologies.map(obj => ({ ...obj }));
}

export const getWheels = () => {
    return database.wheels.map(obj => ({ ...obj }));
}

export const getOrders = () => {
    return database.orders.map(obj => ({ ...obj }));
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
export const savingUserChoiceToOrders = () => {
    const newOrder = { ...database.userChoice } //这里直接用了spread syntax，没用map method
        newOrder.id = database.orders[database.orders.length - 1].id + 1
        newOrder.timestamp = Date.now()
    database.orders.push(newOrder)

    database.userChoice = {}

    document.dispatchEvent(new CustomEvent('stateChanged'))
}