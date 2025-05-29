import React from "react";
import ContactCard from "../organisms/ContactCard.tsx";

export default function ContactSection() {
  return (
    <div
      className="min-h-fit w-full flex flex-col items-center justify-center text-center overflow-hidden relative"
      id="contact"
    >
      <div className="w-4/5 text-center">
        <ContactCard />
      </div>
    </div>
  );
}
