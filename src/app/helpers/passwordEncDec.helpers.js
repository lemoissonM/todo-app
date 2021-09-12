import * as bcrypt from 'bcrypt';

export const encryptPassword = async(password) =>{
    const saltRounds = 10;
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    return hashedPassword;
}

export const isPasswordTrue = async (currentPassword, hashedPassword)=>{
    const isPasswordChecked = await bcrypt.compareSync(currentPassword,hashedPassword);
    return isPasswordChecked;
}