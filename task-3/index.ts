// 1. Define the User interface
interface User {
    name: string;      
    age?: number;      
  }
  
  // 2. Create the getUserInfo function
  function getUserInfo(user: User) {
    return {
      name: user.name,
      age: user.age ?? 'Age not provided' 
    };
  }
  
  const userWithAge = { name: 'shreyash', age: 21};
  const userWithoutAge = { name: 'khillare' };
  
  // 4. Call the function with both user objects
  console.log(getUserInfo(userWithAge)); // Output: { name: 'John', age: 30 }
  console.log(getUserInfo(userWithoutAge)); // Output: { name: 'Jane', age: 'Age not provided' }
  