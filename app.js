(async function () {
    const data = await fetch("./data.json")
    const res = await data.json()

    let employees = res;
    let selectedEmployeeId = employees[0].id;
    let selectedEmployee = employees[0];
  
    const employeeList = document.querySelector(".employees__names--list");
    const employeeInfo = document.querySelector(".employees__single--info");
  
    // Add Employee - START
    const createEmployee = document.querySelector(".createEmployee");
    const addEmployeeModal = document.querySelector(".addEmployee");
    const addEmployeeForm = document.querySelector(".addEmployee_create");
    
    createEmployee.addEventListener("click", () => {
      addEmployeeModal.style.display = "flex";
    });
  
    addEmployeeModal.addEventListener("click", (e) => { 
      if (e.target.className === "addEmployee") {
        addEmployeeModal.style.display = "none";
      }
    });
  
    // Set Employee age to be entered minimum 18 years
    const dobInput = document.querySelector(".addEmployee_create--dob");
    dobInput.max = `${new Date().getFullYear() - 18}-${new Date().toISOString().slice(5, 10)}`  
  
    addEmployeeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(addEmployeeForm);
      const values = [...formData.entries()];
      
      let empData = {};
      values.forEach((val) => {
        empData[val[0]] = val[1];
      });
      empData.id = employees[employees.length - 1].id + 1;
      empData.age =
        new Date().getFullYear() - parseInt(empData.dob.slice(0, 4), 10);
      empData.imageUrl =
        empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";
      employees.push(empData);
      renderEmployees();
      addEmployeeForm.reset();
      addEmployeeModal.style.display = "none";
    });
    // Add Employee - END
  
    employeeList.addEventListener("click", (e) => {
      // Select Employee Logic - START
      if (e.target.tagName === "SPAN" && selectedEmployeeId !== e.target.id) {
        selectedEmployeeId = e.target.id; //important
        console.log(typeof( selectedEmployeeId))
        console.log(employees)
        renderEmployees();
        renderSingleEmployee();
      }
      // Select Employee Logic - END
  
      // Employee Delete Logic - START
      if (e.target.tagName === "I") {
        employees = employees.filter((emp)=>{
            if(String(emp.id) !== e.target.parentNode.id){
                return employees
            }
        }                                
                                            // employees = employees.filter(
                                            // (emp) => String(emp.id) !== e.target.parentNode.id    
        );
        console.log(typeof(selectedEmployeeId))
        console.log(employees)
        if (String(selectedEmployeeId) === e.target.parentNode.id) {
          selectedEmployeeId = employees[0]?.id || -1;
          selectedEmployee = employees[0] || {};
          renderSingleEmployee();
        }
        renderEmployees();
      }
      // Employee Delete Logic - END
    });
  
    // Render All Employees Logic - START
    const renderEmployees = () => {
      employeeList.innerHTML = "";
      employees.forEach((emp) => {
        const employee = document.createElement("span");
        employee.classList.add("employees__names--item");
        if (parseInt(selectedEmployeeId, 10) === emp.id) {
          employee.classList.add("selected");
          selectedEmployee = emp;
        }
        employee.setAttribute("id", emp.id);
        employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="employeeDelete">❌</i>`;
        employeeList.append(employee);
      });
    };
    // Render All Employees Logic - END
  
    // Render Single Employee Logic - START
    const renderSingleEmployee = () => {
      // Employee Delete Logic - START
      if (selectedEmployeeId === -1) {
        employeeInfo.innerHTML = "";
        return;
      }
      // Employee Delete Logic - END
  
      employeeInfo.innerHTML = `
        <img src="${selectedEmployee.imageUrl}" />
        <span class="employees__single--heading">
        ${selectedEmployee.firstName} ${selectedEmployee.lastName} (${selectedEmployee.age})
        </span>
        <span>${selectedEmployee.address}</span>
        <span>${selectedEmployee.email}</span>
        <span>Mobile - ${selectedEmployee.contactNumber}</span>
        <span>DOB - ${selectedEmployee.dob}</span>
      `;
    };
    // Render Single Employee Logic - END
  
    renderEmployees();
    if (selectedEmployee) renderSingleEmployee();
  })();









// const url="./data.json"
// const emp=document.getElementById("emp")
// const details=document.getElementById("indivisualEmpdata")
// const myfetch=async function(){
//     try{
//         let count=0;
//         const response=await fetch(url)
//         let data=await response.json()
//         let mydata=data
//         let defaultemp=data[0]
//         let defaultid=data[0].id
//         emp.addEventListener("click",(e)=>{
//             console.log("clicked")
//             if(e.target.tagName==="SPAN" && parseInt(defaultid,10)!=e.target.id){
//                 defaultid=e.target.id;
//                 ++count;
//                 showempData();
//                 showIndivisualempData();
//                 console.log(typeof(mydata))
//             }
//             else{
//                 showIndivisualempData();
//                 if(count===0){
//                     showempData();
//                 }
//             }
//          if(e.target.tagName="I"){
//          }
            
         
         
       
//              //jaha pe ye conditin true hogi wahi filter hoga
             
//         })
//         //    console.log(mydata)
//         //    if(String(defaultid)===e.target.parentNode.id ){
//         //     console.log("ive")
//         //     defaultid=mydata[0]?.id||-1;
//         //     defaultemp=mydata[0]||{};
//         //     showIndivisualempData();
//         //    }
//         //    showempData();
//         // }
        
        
//         const showempData=function(){
//             emp.innerHTML="";
//            data.forEach((empdata)=>{
//             let myemp=document.createElement("span")
//             myemp.classList.add("listofemp")
//             if(parseInt(defaultid,10) === empdata.id){
//                 defaultemp=empdata;
//                 myemp.classList.add("selectedEmp")
//             }
//             myemp.setAttribute("id",empdata.id)
//             myemp.innerHTML=`${empdata.firstName} ${empdata.lastName}<i class="employeeDelete">❌</i><br>`
//             emp.appendChild(myemp)
//             console.log(emp)
//            })
//         }
        
//         showempData();
//         showIndivisualempData=function(){
            
//            details.innerHTML=`
//            <div><h5 class="head">Employee-Details</h5></div>
//            <div class=ed>
//            <img src="${defaultemp.imageUrl}" class="img" /><br>
//         <span class="employees__single--heading">
//       ${defaultemp.firstName} ${defaultemp.lastName} (${defaultemp.age})
//       </span><br>
//       <span>${defaultemp.address}</span><br>
//       <span>${defaultemp.email}</span><br>
//       <span>Mobile - ${defaultemp.contactNumber}</span><br>
//       <span>DOB - ${defaultemp.dob}</span><br>     
//      </div> `
//         }
//         if(count===0){
//             showIndivisualempData();
//         }  
//     }
//     catch(error){
//         console.log(error)
//     }
// }

// myfetch();



