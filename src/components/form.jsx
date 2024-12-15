import React, { useState,useEffect } from "react";
//https://medium.com/@nohanabil/building-a-multilingual-static-website-a-step-by-step-guide-7af238cc8505 leer sobre esto
//https://web3forms.com/
//The form is using WEB3Forms, there you have to create your access Key, and modify the line 48
import {getI18N,languages} from '../i18n/index'
import {  defaultLang } from '../i18n/ui';


function App() {

  const [lang,setLang]= useState('')
  useEffect(()=>{
    
    const currentUrl = window.location.pathname;
    const [, lang] = currentUrl.split('/');
    if (lang in languages){ 
                    setLang(lang)

                  }
    else{
      setLang(defaultLang)
    };
  
  },[])
  
   
    const i18n = getI18N({ currentLocale: lang });
    console.log(i18n)


  console.log(lang);
  

  const [result, setResult] = useState('');
  useEffect(()=>{
    setResult(i18n.placeholder.button.send)
  },[lang])





  const onSubmit = async (event) => {
    event.preventDefault();
    setResult(i18n.placeholder.button.sending);
    const formData = new FormData(event.target);

    formData.append("access_key", "________-____-____-____-____________");//Here goes your access_key

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult(i18n.placeholder.button.sent);
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  }; 
   const form =(  
     <form onSubmit={onSubmit} className="w-80 max-w-sm">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
            </svg>
          </div>
          <input  type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
           focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-800 dark:border-gray-600
            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
            dark:focus:border-blue-500" 
          placeholder={i18n.placeholder.email} required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/>
        </div>
        <div>
          <textarea name="message" className=" p-7 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500
           focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400
            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
         placeholder={i18n.placeholder.text} required></textarea>
        </div>
        <button
          type="submit" 
          className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
            focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5
            text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              {result}
          </button>
      </form>

    );
  return form;
}

export default App;