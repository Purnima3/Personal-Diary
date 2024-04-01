
const config = {v : "localhost",port: 4000}

const user= JSON.parse(localStorage.getItem('data'))?JSON.parse(localStorage.getItem('data')):{};

const fun = async (cus)=>{
    
    user.name =cus.name;
    user.id = cus.id;
    user.roleid =cus.role;
    
    
    localStorage.setItem('data',JSON.stringify(user));

}

const fun2 = async ()=>{
    user.name ="";
    user.id = -1;
    user.roleid =-1;
    localStorage.setItem('data',JSON.stringify(user));
}
export default {config,fun,fun2,user};