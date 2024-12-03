import Image from "next/image";
import localFont from "next/font/local";
import React from 'react';

let name = "Anthony";
let image = "Screenshot 2024-11-27 005249.png"

export default function connect() {
  return (

    <div class="bg-white  text-left text-black h-screen justify-center">
      <div class="block">
      <div class="flex items-center justify-between">
        <a href="./">        
          <img src="logo.svg" class="inline-block w-2/3 pt-5 text-left pl-6"/>
        </a>
      <div class="flex justify-end w-10/12 mr-6">
        <p class="xanh-mono-regular-bold text-right align-middle pt-4">
          hello, {name}!</p>
      </div>
      <div>
      </div>
    </div>

      <hr class="inline-block w-full border-black border-1 rounded-full m-0 p-0"></hr> 
      </div>
      <div class="mx-8">
        <img src={image} class="mt-10 w-36 h-36 border-black border-2 rounded-full"/>
        <p class="roboto-medium text-3xl">{name}</p>
        <p class="xanh-mono-regular text-sm">@blubtatu</p>
      </div>

      <div class="flex flex-1">
        <aside class="bg-slate-200 text-black w-1/4 p-6 flex flex-col items-center m-4 rounded-lg">
        <div>
          <h2 className="roboto-medium text-2xl">Pairings</h2>
        </div>  
        </aside>

      <main class="flex-1 p-6">
        <section class="bg-slate-200 text-black w-7/8 p-6 flex flex-col items-center mt-2 rounded-lg">
          <h2 class="roboto-medium text-2xl mb-4">Recent Genres</h2>
          <div class="grid grid-cols-5 gap-4">
            <div class="bg-white p-4 rounded-lg">Genre 1</div>
            <div class="bg-white p-4 rounded-lg">Genre 2</div>
            <div class="bg-white p-4 rounded-lg">Genre 3</div>
            <div class="bg-white p-4 rounded-lg">Genre 4</div>
            <div class="bg-white p-4 rounded-lg">Genre 5</div>
          </div>
        </section>

        <section class="bg-slate-200 text-black w-7/8 p-6 flex flex-col items-center mt-4 rounded-lg">
          <h2 class="roboto-medium text-2xl mb-4">Recent Games Played</h2>
          <div class="grid grid-cols-5 gap-4">
          </div>
        </section>
      </main>
      </div>
    
    </div>

  );
};

