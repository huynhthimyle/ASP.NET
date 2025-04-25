import React from "react";

export default function GoogleMap() {
  return (
    <div className="relative z-10 max-w-6xl mx-auto bg-white p-8 shadow-lg rounded-3xl mt-4 mb-5 h-[600px]">
      <iframe
        src="https://www.google.com/maps/place/Ga+D%C4%A9+An/@10.9135734,106.7645209,15.5z/data=!4m15!1m8!3m7!1s0x3174d91eb88b3a0d:0xc29bee41fcab904c!2zRMSpIEFuLCBCw6xuaCBExrDGoW5nLCBWaeG7h3QgTmFt!3b1!8m2!3d10.8964757!4d106.7527418!16s%2Fm%2F03c314z!3m5!1s0x3174d85634ad2ac1:0x2248ae1fe871b6a5!8m2!3d10.9079211!4d106.7694136!16s%2Fm%2F0cc89t9?entry=ttu&g_ep=EgoyMDI1MDQyMS4wIKXMDSoASAFQAw%3D%3D"
        className="absolute top-0 left-0 w-full h-full rounded-3xl"
        frameBorder="0"
        allowFullScreen
        loading="lazy"
        title="Google Map Location - Dĩ An, Bình Dương"
      ></iframe>
    </div>
  );
}
