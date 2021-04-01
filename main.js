//TIP CONTROLLER 
let  tipController = (() => {
     // 1. calculate tips
     let services = [
          {type : 'exellent', num : 0.20},
          {type : 'good', num : 0.15},
          {type : 'ok', num : 0.10},
          {type : 'bad', num : 0.05}
     ];

     return {
          calculate : (amount, service, people) => {
               let res = services.filter(item => {
                    if (item.type === service){
                         return item.num
                    }
               });
               return parseFloat((amount * res[0].num) / people);
          }
     }
})();
  

//UI CONTROLLER 
let  uiController = (() => {
     
     let DOMstring = {
          inputAmount : "#bill_amount",
          inputService : '#service_option',
          inputPeople : '#people',
          totalAmount : '.total',
          clearFields : '.clear',
          submit : '.submit'
     };

     return {
          // 1. GET INPUT VALUES
          getInput : () => {
               return {
                    amount : parseFloat(document.querySelector(DOMstring.inputAmount).value),
                    service : document.querySelector(DOMstring.inputService).value,
                    people : parseInt(document.querySelector(DOMstring.inputPeople).value)
               }
          },
          // 2.DISPLAY TOTAL AMOUNT 
          displayTip : (sum) => {
               document.querySelector(DOMstring.totalAmount).textContent = `Total per person $${Math.round(sum * 100)/100}`;
          },
          // 2. RESET INPUT VALUES AND MAKE AMOUNT INPUT  
          clearFields : () => {
               let fields = [
                    document.querySelector(DOMstring.inputAmount),
                    document.querySelector(DOMstring.inputService),
                    document.querySelector(DOMstring.inputPeople),
               ];
               document.querySelector(DOMstring.inputAmount).focus();
               document.querySelector(DOMstring.totalAmount).textContent = '$0';
               return fields.map(field => field.value = '');
          },

          getDOMstrings : () => {
               return DOMstring;
          }
     };
})();

// APP CONTROLLER
let appCtrl = ((tipCtrl, uiCtrl) => {
     // INIT
     let DOMstring = uiCtrl.getDOMstrings();

     let init = () => {
          let dom = uiCtrl.getInput();
          let sum = tipCtrl.calculate(dom.amount, dom.service, dom.people);
          uiCtrl.displayTip(sum);
     };
     document.querySelector(DOMstring.submit).addEventListener('click', init);
     
     let clear = () => {
          uiCtrl.clearFields();
     };
     document.querySelector(DOMstring.clearFields).addEventListener('click', clear);
})(tipController, uiController);