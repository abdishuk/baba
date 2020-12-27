import bcrypt from 'bcryptjs'
const users=[{
   name:'Admin User',
   email:'admin@example.com',
   password:bcrypt.hashSync('123456',10),
   isAdmin:true,
   contact:'+254725224872'


},
{
    name:'Abdishukri Yussuf',
    email:'yussuf@example.com',
    password:bcrypt.hashSync('123456',10),
    isAdmin:true,
    contact:'+254725224872'

},
{
    name:'Khalid',
    email:'khalid@example.com',
    password:bcrypt.hashSync('123456',10),
    isAdmin:true,
    contact:'+254725224872'

}

]
export default users