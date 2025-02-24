import { IUser } from "../frameworks/user.Model";
import { IUserRepository } from "../interfaces/respository/IUser.repository";
import IUserUseCase from "../interfaces/useCase/IUser.usecase";
import bcrypt from 'bcryptjs'



export interface RegisterUserResponse {
  success: boolean;
  user?: IUser; // Present only when success is true
  errors?: string[]; // Present only when success is false
}

export class UserUseCase implements IUserUseCase {
  private userRepository
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }
  async registerUser(data: any): Promise<RegisterUserResponse> {
    const errors: string[] = [];
  
    // 🔴 Step 1: Basic Validation
    if (!data.email || !data.email.trim()) errors.push("Email is required.");
    if (!data.phone || !data.phone.trim()) errors.push("Phone number is required.");
    if (!data.password || !data.password.trim()) errors.push("Password is required.");
    if (!data.confirmPassword || !data.confirmPassword.trim()) errors.push("Confirm password is required.");
    if (data.password !== data.confirmPassword) errors.push("Passwords do not match.");
    
    if (!data.name || !data.name.trim()) errors.push("Name is required.");
    if (!data.dob || !data.dob.trim()) errors.push("Date of birth is required.");
    if (!data.currentAddress || !data.currentAddress.trim()) errors.push("Current address is required.");
    if (!data.durationAtAddress || !data.durationAtAddress.trim()) errors.push("Lived duration is required.");
    if (!data.aboutYourself || !data.aboutYourself.trim()) errors.push("Tell us about yourself.");
    if (!data.employmentStatus || !data.employmentStatus.trim()) errors.push("Employment status is required.");
    if (data.savingsInvestments === undefined || data.savingsInvestments === null) {
      errors.push("Savings or investments field is required.");
    }
  
    const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z\d])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!strongPasswordRegex.test(data.password)) {
      errors.push("Password must be at least 6 characters long, contain at least one uppercase letter and one number.");
    }
  
    // 🔴 Step 2: Validate Date of Birth
    const dob = new Date(data.dob);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();
  
    if (isNaN(dob.getTime())) {
      errors.push("Invalid Date of Birth format.");
    } else if (dob > today) {
      errors.push("Date of Birth cannot be in the future.");
    }
  console.log("hi errors",errors);
  
    if (errors.length > 0) {
      throw new Error("Invalid data")
    }
  
    // 🔴 Step 3: Check If Email or Phone Exists
    const emailExists = await this.userRepository.checkEmailExists(data.email);
    if (emailExists) {
      throw new Error("Email is already registered")
    }
  
    const phoneExists = await this.userRepository.phoneNumberExists(data.phone);
    if (phoneExists) {
      throw new Error("phone number is already taken")
    }
  
    // 🔴 Step 4: Hash Password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    data.password = hashedPassword;
    data.confirmPassword = undefined; // Remove confirmPassword before saving
  
    // 🔴 Step 5: Properly Structure `personalInfo` and `financialInfo
  
    try {
      console.log("usercase",data);
      
      const user = await this.userRepository.createUser(data);
      return { success: true, user };
    } catch (error) {
      console.error("Error registering user:", error);
      return { success: false, errors: ["Error registering user"] };
    }
  }
  

}