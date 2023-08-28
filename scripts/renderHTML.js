//这里包括option sections 和 order sections的html rendoring functions

import { getPaints, getInteriors, getTechnologies, getWheels, getOrders } from "./database.js";

const paints = await getPaints();
const interiors = await getInteriors();
const technologies = await getTechnologies();
const wheels = await getWheels();



//第1部分：option sections的html rendering functions
export const renderSectionHTML = (sectionIdString, sectionArray) => {

    let html = `<select id='${sectionIdString}'> <option value='0'> Please choose an option </option>`

    //for intergation of API data with different names representing option
    let option = "option";
    switch (sectionArray) {
        case (paints): { option = "color"; break }
        case (interiors): { option = "material"; break}
        case (technologies): { option = "package"; break }
        case (wheels): { option = "style"; break }
    }

    const optionInSelect = sectionArray.map(obj => `<option value='${obj.id}'> ${obj[option]} </option>`)
    html += optionInSelect.join('')
    html += `</select>`

    return html //注释：One string template可以把整个arrow function只写一句return，返回一个string
}

//第2部分：renderOrderHTML
//2-1 //同时也是最后一部分：用find找各个section的价格，add总价 

/* 这是API without composition 时要用的

export const mapDetailFunction = (order) => {

    const paint = paints.find((p) => p.id === order.paintId);
    const technology = technologies.find((t) => t.id === order.technologyId);
    const interior = interiors.find((i) => i.id === order.interiorId);
    const wheel = wheels.find((w) => w.id === order.wheelId);

    return `<li>Order ${order.id} was placed on ${new Date(order.timestamp).toLocaleDateString()}.

    Details:
    ${paint.color} car with
    ${wheel.style} wheels,
    ${interior.material} interior,
    and the ${technology.package}.
    
    Price: ${(
                  paint.price +
                  technology.price +
                  interior.price +
                  wheel.price
    ).toLocaleString('en-US',{style:"currency",currency:'USD'})
        }
    </li>`

} 

*/

// 下面是API mapGET 加入了 composition, 也就是根据paintId 直接显示 paint , (用 .FirstOrDefault 在endpoint的lamda function中已经找好了 )

export const mapDetailFunction = (order) => {

    return `<li>Order ${order.id} was placed on ${new Date(order.timestamp).toLocaleDateString()}.

    Details:
    ${order.paint.color} car with
    ${order.wheels.style} wheels,
    ${order.interior.material} interior,
    and the ${order.technology.package}.

    Price: ${(
        order.paint.price +
        order.technology.price +
        order.interior.price +
        order.wheels.price
    ).toLocaleString('en-US',{style:"currency",currency:'USD'})
        }
    </li>`

}
// 注意, 这里的order.wheels是遵循API中的定义. 所有的这些直接引用如order.paint都是因为API中的.FirstOrDefault, 所以要遵循API中的命名和Order.cs的collection中的命名

//2-2

export const renderOrderHTML = async () => {
    const orders = await getOrders();
    //we have to get the orders inside the Orders function, otherwise the orders won't refresh when we re-render them
    //若要保证re-render的时候, 能pull最新的order data, 必须要把 这个orders 定义在这个function中, 这样 re-render 会invoke/call 这个function, 于是会pull 最新data

    let html = '<ul class="orderDisplayDetail">'
    const listIn = orders.map(mapDetailFunction)
    html += listIn.join('')
    html += '</ul>'

    return html
}
/*
这个其实啰嗦了, 两个地方, 一是mapDetailFunction不需要, 可以直接  在const orders 之后

return `${orders
    .map((order) => {
        先定义必须的variables
        然后 return 全部html
     }
}`
        
*/



//第3部分：renderMainContainerHTML
export const renderMainContainerHTML = async () => {
    let html = `
<article class='optionContainer'>

    <section class='option'>
    <h2>Paint Options</h2>
    ${renderSectionHTML("paint", paints)}
    </section>

    <section class='option'>
    <h2>Interior Options</h2>
    ${renderSectionHTML("interior", interiors)}
    </section>

    <section class='option'>
    <h2>Technology Options</h2>
    ${renderSectionHTML("technology", technologies)}
    </section>

    <section class='option'>
    <h2>Wheel Options</h2>
    ${renderSectionHTML("wheel", wheels)}
    </section>
</article>

<article class='orderButtonContainer'>
    <button id="orderSubmitButton">Submit Your Order</button>
</article>

<article class='orderDisplayContainer'>
    
    <h2>Orders</h2>
    ${await renderOrderHTML()}
    
</article>
    `

    document.getElementById('Container').innerHTML = html
    //👨‍💼上面的段落实际上只是“生成”/"generate" html，这一步才是“render”html
}

//the async/await syntax requires any functions that call an async function to also be async
//所有call 异步函数的函数 都必须也是 异步函数