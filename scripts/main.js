//这里包括所有的eventlistener

import { setPaints,setInteriors,setTechnologies,setWheels } from "./database.js"
import { renderMainContainerHTML } from "./renderHTML.js"
import { savingUserChoiceToOrders } from "./database.js"


//分步：调用renderMainContainerHTML

renderMainContainerHTML()

//分步：Saving User Choices to State 这里的state是transient state，对应database中的userChoice这个object
/**
 * 这是storing transient state的第二部分
 * 第一部分是在database中建一个object叫做userChoice；并设置setter functions来连接用户选择到userChoice
 * 第二部分是用eventlistener来监控用户选择，并invoke setter functions来把value传送到database.userChoice
*/

document.addEventListener('change', event => {
    if (event.target.id === 'paint') {
        setPaints(Number(event.target.value))
    } else if (event.target.id === 'interior') {
        setInteriors(Number(event.target.value));
    } else if (event.target.id === 'technology') {
        setTechnologies(Number(event.target.value));
    } else if (event.target.id === 'wheel') {
        setWheels(Number(event.target.value));
        window.alert(`You've made your choice, time to click the submit button to submit your order!`)
    }
  //💡🙄试试检查if userChoice有4个properties，then window.alert('All options are chosen. Time to submit your order.')
})

//分步：现在要在用户点击按钮时，把transient state转换为永久state
document.addEventListener('click',event=>{
    if(event.target.id==="orderSubmitButton"){
        savingUserChoiceToOrders()
    }
})

//分步：上面引发了新CustomEvent，我要做两件事，1 console.log 2. re-render HTML
document.addEventListener('stateChanged',()=>{
    console.log('state changed. re-rendering HTML')
    renderMainContainerHTML()
})

// 增加标识完成的feature  第2步: 监听complete button

document.addEventListener("click", (event) => {
    const { name, id } = event.target;
    if (name === "complete") {
      completeOrder(id);
    }
  });

// 增加标识完成的feature  第3步: 设置completeOrder function

export const completeOrder = async (orderId) => {
    await fetch(`https://localhost:7153/orders/${orderId}/fulfill`, {
      method: "POST",
    });
    document.dispatchEvent(new CustomEvent("stateChanged"));
  };