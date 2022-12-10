import React, { createContext} from "react";
import { apiGet, apiPost } from "../utils/api/axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const dataContext = createContext();

const DataProvider = ({children}) => {
const [getVendors, setGetVendors] = React.useState([])
const [getVendorFood, setGetVendorFood] = React.useState([])

/**================== Register ================== */

  const registerConfig = async(formData) => {
    try{
      const registerData = {
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirm_password, 
        phone: formData.phone
      }
   await apiPost('/users/signup', registerData).then((res) =>{
        console.log(res.data)
        toast.success(res.data.message);
        localStorage.setItem("signature", res.data.signature)
        setTimeout(()=>{
          window.location.href = "/otp";
        }, 2000)
      })
    }catch(err){
      console.log(err)
      toast.error(err.response.data.Error)
    }
  }

/**================== OTP ================== */
  const OTPConfig = async(formData, signature) => {
    try{
      const otpData ={
        otp:formData
      }
      await apiPost(`/users/verify/${signature}`, otpData).then((res) =>{
        toast.success(res.data.message);
        // localStorage.setItem("signature", res.data.signature)
        setTimeout(()=>{
          window.location.href = "/login";
        }, 2000)
      })
    }catch(err){
      console.log(err)
      toast.error(err.response.data.Error)
    }
  }

  /**================== RESEND OTP ================== */
  const ResendOTP = async(signature) => {
    try{
      await apiGet(`/users/resend-otp/${signature}`).then((res) =>{
      toast.success(res.data.message);
      // localStorage.setItem("signature", res.data.signature)
      setTimeout(()=>{
        window.location.href = "/otp";
      }, 2000)
    })
  }catch(err){
    console.log(err)
    toast.error(err.response.data.Error)
  }
  }

   /**================== LOGIN ================== */
   const loginConfig = async(formData) => {
    try{
      const LoginData = {
        email: formData.email,
        password: formData.password,
      }
      await apiPost(`/users/login`, LoginData).then((res) =>{
      toast.success(res.data.message);
      console.log(res.data)
      localStorage.setItem("signature", res.data.signature)
      localStorage.setItem("role", res.data.role)
      setTimeout(()=>{
        if(res.data.role === "admin" || res.data.role === "superadmin"){
          window.location.href = "/admin/Dashboard";
        }else if(res.data.role === "vendor"){
          window.location.href = "/vendor/dasboard";
        }else{
          window.location.href = "/";
        }
      }, 2000)
    })
  }catch(err){
    console.log(err)
    toast.error(err.response.data.Error)
  }
   }

/**================== LOGOUT ================== */
   const Logout = () =>{
    localStorage.clear()
    window.location.href="/login"
   }

    /**================== GET ALL VENDORS ================== */
  const GetAllVendors = async(signature) => {
    try{
      await apiGet(`/vendors/get-all-vendors`).then((res) =>{
      setGetVendors([...res.data.vendor])
      // localStorage.setItem("signature", res.data.signature
    })
  }catch(err){
    console.log(err)
    // toast.error(err.response.data.Error)
  }
  }

   /**================== GET ALL VENDORS ================== */
   const GetAllVendorsFood = async(vendorId) => {
    try{
      await apiGet(`/vendors/get-vendor-food/${vendorId}`).then((res) =>{
        setGetVendorFood([...res.data.Vendor.food])
      // localStorage.setItem("signature", res.data.signature
    })
  }catch(err){
    console.log(err)
    // toast.error(err.response.data.Error)
  }
  }

  return <dataContext.Provider value={{ registerConfig, OTPConfig, ResendOTP, loginConfig, Logout,  GetAllVendors, getVendors, GetAllVendorsFood, getVendorFood }}>
      {children}
  </dataContext.Provider>;
};


 

export const useAuth = () => {
  const context = React.useContext(dataContext);
  if (context === "undefined") {
    throw new Error("useAuth must be used within the auth provider");
  }
  return context;
};

export default DataProvider;


