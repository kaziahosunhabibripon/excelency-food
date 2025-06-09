"use client";
import React from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
export default function Whatsapp() {
  return (
    <div className="p-3 fixed bootom-0 right-0 z-1">
      <FloatingWhatsApp
        phoneNumber="+8801757040046"
        accountName="Ripon"
        allowEsc={true}
        allowClickAway={true}
        notification={true}
        notificationSound={true}
      />
    </div>
  );
}
