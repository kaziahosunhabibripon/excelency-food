"use client";

import AppSpinner from "@/helpers/ui/AppSpinner";

const Loading: React.FC = () => (
  <div className="h-screen flex items-center justify-center">
    <AppSpinner clsname="" />
  </div>
);

export default Loading;
