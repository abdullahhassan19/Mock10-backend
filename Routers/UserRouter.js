const { Router } = require("express");
const { Mock10users } = require("../Models/User.Model");
const UserRouter = Router();


UserRouter.post("/regester",(req,res)=>{

    const { name, email, password } = req.body

    const newcoustomer = new Mock10users({
      name,
      email,
      password,
    });
    console.log(newcoustomer);
    try {
        
        newcoustomer.save();
        res.send({ msg: "Sign up Sucessfully" });
    }
    catch {

        res.send({ msg: "Error in Signup" });
    }
})


UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const coustomer = await Mock10users.findOne({ email });
  if (!coustomer) {
    return res.send({ msg: "Invalid Credentials" });
  }
  else{
    if(coustomer.password===password){
        return res.send({
            messege: "Login Sucessful",
        });
    }
  }
});

UserRouter.get("/getprofile", async (req, res) => {
  const { email } = req.body;
  const coustomer = await Mock10users.findOne({ email });
  if (!coustomer) {
    return res.send({ msg: "Invalid Credentials" });
  }
  res.send({ msg: "User Logged in ", coustomer: coustomer });


});

UserRouter.post("/calculateEMI", (req, res) => {
  const { P, R, N } = req.body;
  let r=R/12/100
//   console.log({"p":P,"R":R,"N":N,"r":r})
//   P x r x ( 1 + r )n / ( ( 1 + r )n - 1 ) 
  let E = P * r * (1 + r) ** N / ((1 + r) ** N - 1)
//   console.log(100000 * 0.011667* (1 + 0.011667)**36 / ((1 + 0.011667)**36 - 1) )
//   console.log({"E":E})
  let total = E*N
  let interest = total-P;
//   console.log({ total: total, E: E, interest: interest });
  res.send({
    msg: "Successful",
    EMI: E,
    "Interest Payable": interest,
    "Total Payment": total,
  });
});
UserRouter.post("/logout",  (req, res) => {
 
      return res.send({
        messege: "Logout Sucessful",
      });
});
module.exports = { UserRouter };
