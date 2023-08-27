//这里包括option sections 和 order sections的html rendoring functions

import { getPaints, getInteriors, getTechnologies, getWheels, getOrders } from "./database.js";

const paints = getPaints();
const interiors = getInteriors();
const technologies = await getTechnologies();
const wheels = getWheels();



//第1部分：option sections的html rendering functions
export const renderSectionHTML = (sectionIdString, sectionArray) => {

    let html = `<select id='${sectionIdString}'> <option value='0'> Please choose an option </option>`

    //for intergation of API data with different names representing option
    let option = "option";
    switch (sectionArray) {
        case (technologies): { option = "package" }
    }

    const optionInSelect = sectionArray.map(obj => `<option value='${obj.id}'> ${obj[option]} </option>`)
    html += optionInSelect.join('')
    html += `</select>`

    return html //注释：One string template可以把整个arrow function只写一句return，返回一个string
}

//第2部分：renderOrderHTML
//2-1 //同时也是最后一部分：用find找各个section的价格，add总价
export const mapDetailFunction = (order) => {

    return `<li>Order ${order.id} was placed on ${new Date(order.timestamp).toLocaleDateString()}.
    Price: ${(
        paints.find(obj => obj.id === order.paintId).price + 
        interiors.find(obj => obj.id === order.interiorId).price +
        technologies.find(obj => obj.id === order.technologyId).price +
        wheels.find(obj => obj.id === order.wheelId).price
    ).toLocaleString('en-US',{style:"currency",currency:'USD'})
        }
    </li>`

}

//2-2
export const renderOrderHTML = () => {

    const orders = getOrders();

    let html = '<ul class="orderDisplayDetail">'
    const listIn = orders.map(mapDetailFunction)
    html += listIn.join('')
    html += '</ul>'

    return html
}




//第3部分：renderMainContainerHTML
export const renderMainContainerHTML = () => {
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
    ${renderOrderHTML()}
    
</article>
    `

    document.getElementById('Container').innerHTML = html
    //👨‍💼上面的段落实际上只是“生成”html，这一步才是“render”html
}
