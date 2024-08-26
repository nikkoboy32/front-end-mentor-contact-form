import { useState, useEffect } from "react"
import React from "react"
import SuccessMsg from "./SuccessMsg"

export default function Form() {


    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        query: "",
        message: "",
        consent: false
    })

    const [validate, setValidate] = useState({
        firstName: false,
        lastName: false,
        email: false,
        query: false,
        message: false,
        consent: false
    })
    const [success, setSuccess] = useState(false)
    

    useEffect(() => {
        if (success) {
          const timer = setTimeout(() => {
            setSuccess(false);
          }, 5000);
    
          return () => clearTimeout(timer); 
        }
      }, [success]);


    function handleChange(e) {
        const {name, checked, value, type} = e.target
       setFormData(prevData => {
        return {
            ...prevData,
            [name] : type === "checkbox" ? checked : value
        }
       })
    }

  

    function handleSubmit(e) {
        e.preventDefault()

        const newValidate = {
            firstName: formData.firstName === "",
            lastName: formData.lastName === "",
            email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
            query: formData.query === "",
            message: formData.message === "",
            consent: !formData.consent
        }

        setValidate(newValidate)
        const result = Object.values(newValidate).every(item => {
            return item === false
         })
       
         if(result) {
            setSuccess(true)
         } else {
            console.log("error")
         }

    }
   


    return (
        <div className="form_container">
            {success && <SuccessMsg/>}
            <h2>Contact Us</h2>
            <form className="form" onSubmit={handleSubmit}>
                    <div className={`first_and_last`}>
                        <div className="first_name_con">
                            <label htmlFor="first-name">First Name <span className="required">*</span></label>
                            <input type="text" id="first-name" name="firstName" onChange={handleChange} value={formData.firstName} className={`${validate.firstName ? "error_border" : "" }`}/>
                           {validate.firstName && <span className="error">This field is required</span>}
                        </div>
                       <div className="last_name_con">
                            <label htmlFor="last-name">Last Name <span className="required">*</span></label>
                            <input type="text" id="last-name" name="lastName" onChange={handleChange} value={formData.lastName}  className={`${validate.lastName ? "error_border" : "" }`}/>
                            {validate.lastName && <span className="error">This field is required</span>}
                        </div>
                     </div>
                        <div className="email_con">
                            <label htmlFor="email">Email <span className="required">*</span></label>
                            <input type="email" id="email" name="email" onChange={handleChange} value={formData.email}  className={`${validate.email ? "error_border" : "" }`}/>
                            {validate.email && <span className="error">Please enter a valid email address</span>}
                        </div>

                    <div className="query-type">
                        <label>Query Type <span className="required">*</span></label>  
                        <div className="query_con">
                            <div className="general-enquiry">
                                <input type="radio" id="general" name="query" value="general" onChange={handleChange}/>
                                <label htmlFor="general">General Enquiry</label>   
                            </div>  
                            <div className="support-request">
                                <input type="radio" id="support" name="query" value="support" onChange={handleChange}/>
                                <label htmlFor="support">Support Request</label>   
                            </div>  
                        </div>
                        {validate.query && <span className="error">Please select a query type</span>}
                    </div>   

                    <div className="message_con">
                        <label htmlFor="comment">Message <span className="required">*</span></label>
                        <textarea name="message" id="comment" onChange={handleChange} value={formData.message}  className={`${validate.message ? "error_border" : "" }`}/>
                        {validate.message && <span className="error">This field is required</span>}
                    </div>

                    <div className="checkbox_con">
                        <input type="checkbox" id="check-box" checked={formData.consent} onChange={handleChange} name="consent"  className={`${validate.consent ? "error_border" : "" }`}/>
                        <label htmlFor="check-box">I consent to being contacted by the team <span className="required">*</span></label>
                        {validate.consent && <span className="error">To submit this form, please consent to being contacted</span>}
                    </div>

                    <button>Submit</button>
            </form>
            
        </div>
    )
}