// import bcrypt from 'bcrypt';

// export const hashValue=async(value:string,saltRounds?:number)=>
//     bcrypt.hash(value,saltRounds || 10);

// export const compareValue=async(value:string,hashValue:string)=>{
//     bcrypt.compare(value,hashValue).catch(()=>false)
// }

import bcrypt from "bcrypt";

export const hashValue = async (value: string, saltRounds = 10) => {
  return bcrypt.hash(value, saltRounds);
};

export const compareValue = async (value: string, hashedValue: string) => {
  try {
    return await bcrypt.compare(value, hashedValue);
  } catch {
    return false;
  }
};
