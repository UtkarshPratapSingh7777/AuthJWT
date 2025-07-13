
async function loginauth(){
    const username=document.getElementById("nameinput").value;
    const password=document.getElementById("passinput").value;
    const response=await axios.post("http://localhost:3000/signin",{
        username:username,
        password:password
    })
    if(response.data.message){
        alert("login success")
        setTimeout(()=>{
            window.location.href="http://google.com"
        },2000)

    }
    else{
        alert("wrong credentials");
    }


}
async function signup() {
    const username=document.getElementById("nameinput").value;
    const password=document.getElementById("passinput").value;
    const response=await axios.post("http://localhost:3000/signup",{
        username,
        password
    })
    if(response.data.message){
        alert("signup success , now you can signin")
    }
    else{
        alert("usesname already exists , try with a diff username");
    }
}