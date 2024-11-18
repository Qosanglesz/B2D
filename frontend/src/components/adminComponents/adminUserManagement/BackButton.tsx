"use client"

import {useRouter} from "next/navigation";
import React from "react";

const BackButton: React.FC = () => {
  const router = useRouter();
  return (

      <button
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => router.push("/admin/user")}
      >
        Back to User Management
      </button>
  )
};

export default BackButton;