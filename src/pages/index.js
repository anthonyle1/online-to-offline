import Image from "next/image";
import localFont from "next/font/local";

export default function Home() {
  return (
    // home page: 
    <div class="bg-white  text-center text-black h-screen justify-center">
      <img src="./logo-subtext.png" class="h-1/6 inline-block my-9"/>
      <div class="align-middle">
      <div class="mx-10 mb-6 px-56 py-28 w-auto h-auto bg-slate-200 rounded-lg border-2 border-black justify-self-center">
       getting gamers bitches in 2024
       </div>
       <div>
        <button class="title-button">Connect with others!</button>
        <button class="title-button xanh-mono-regular">Join the Discord!</button>
       </div>
      </div>
    </div>
  );
}
