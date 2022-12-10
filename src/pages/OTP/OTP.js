import React, {useState} from 'react'
import "../Register/Register.css"
import registerbg from '../../assets/registerbg.svg'
import Card from '../../components/card/Card'
import OTPInputField from "react-otp-input"
import { useAuth } from '../../context/authcontext'
import "./OTP.css"

const OTP = () => {
    const {OTPConfig, ResendOTP} = useAuth();
    const [otp, setOtp] = useState("")
    console.log(otp);
    const handleChange = (otp) =>{
        setOtp(otp)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        const getSignature = localStorage.getItem("signature")
        OTPConfig(otp,getSignature)
    }

    const handleResendOTP = () => {
        const getSignature = localStorage.getItem("signature")
        ResendOTP(getSignature)
    }
 

  return (
    <div className="register-container"> 
        <div className ="bg-background">
          <img src={registerbg} alt=" " />
        </div>
        <div className='form-style'>
        <Card>
            <h3>OTP Verification</h3>
            <p>Fill in your OTP Verification code</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="otp">OTP</label>
                    <OTPInputField
                        value={otp}
                        onChange={handleChange}
                        numInputs={5}
                        inputStyle={{
                            boxSizing:"border-box",
                            width: "2.8rem",
                            padding:"14px",
                            margin:"10px 0",
                            border: "1px solid #000",
                            outline:"none"
                        }}
                    />
                </div>
                <div>
                    <div></div>
                    <div className='btn-container'>
                        <button type="submit">Verify</button>
                    </div>
                </div>
            </form>
            <p>Did not get an OTP? <span onClick={handleResendOTP}>Resend OTP</span></p>
            
        </Card>
        </div>
    </div>
  )
}

export default OTP