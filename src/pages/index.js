import Image from "next/image";
import localFont from "next/font/local";


export default function Home() {
  return (
    // home page: 

    <div class="bg-white  text-center text-black h-screen justify-center">
      <img src="./logo-subtext.png" class="h-1/6 inline-block my-9"/>
      <div class="align-middle">
      <div class="mx-10 mb-6 px-56 py-28 w-auto h-auto bg-slate-200 rounded-lg border-2 border-black justify-self-center">
       really cool and fun flavor text, nothing bad to say here!
       </div>

       <div>
        <a href="./connect">        
          <button class="xanh-mono-regular-bold title-button">
            Connect with others!</button>
        </a>
        <a href="https://github.com/anthonyle1/online-to-offline">
          <button class="xanh-mono-regular-bold title-button" >
            View the GitHub Repo!</button>  
        </a>
       </div>
       
      </div>
    </div>
  );
}
