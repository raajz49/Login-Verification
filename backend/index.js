// app.js
const express = require('express');
const cors = require('cors');

const {PrismaClient}=require('@prisma/client')

const app = express();
const prisma=new PrismaClient();

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());


// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find the user with the provided email and password
  const foundUser = await prisma.user.findFirst({
     where: {
      email: email,
      password: password
    }
  });

  if (foundUser) {
    // User found, send the user data in the response
    res.json(foundUser);
  } else {
    // User not found, send an error response
    res.status(404).json({ error: "User not found" });
  }
});

// Routes
app.get('/', async(req, res) => {
  const allUsers=await prisma.user.findMany();
  // res.send('Welcome to my e-commerce app!');
  res.json(allUsers);
});


app.post('/',async(req,res)=>{
  const newUsers=await prisma.user.create({data:req.body});
  res.json(newUsers);  
})



app.put('/:id', async (req, res) => {
  const id= req.params.id;
  const newAge=req.body.age;
  const newFirstname=req.body.firstName;
  const newLastname=req.body.lastName;
  const newEmail=req.body.email;
  const newPassword=req.body.password;
  const updatedUser=await prisma.user.update({
    where:{id:parseInt(id)}, 
    data:{age:newAge,firstName:newFirstname,lastName:newLastname,email:newEmail,password:newPassword},
  });
  res.json(updatedUser);
});

app.delete('/:id', async (req, res) => {
  const id= req.params.id;
  const deletedUser=await prisma.user.delete({
    where:{id:parseInt(id)}, 
  });
  res.json(deletedUser);
});


// Start server
app.listen(3001, () => {
  console.log(`Server is running on ${3001}`);
});
