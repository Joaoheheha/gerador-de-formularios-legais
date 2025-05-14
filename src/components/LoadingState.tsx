
import React from "react";
import { CircleCheck, Search, Star } from "lucide-react";

interface LoadingStateProps {
  message: string;
}

const LoadingState = ({ message }: LoadingStateProps) => {
  return (
    <div className="w-full h-64 flex flex-col items-center justify-center animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
        <div className="flex space-x-2 mb-4">
          <Search className="h-8 w-8 text-indigo-500 animate-pulse" />
          <CircleCheck className="h-8 w-8 text-purple-500 animate-pulse delay-300" />
          <Star className="h-8 w-8 text-blue-500 animate-pulse delay-700" />
        </div>
      </div>
      <p className="mt-16 text-lg font-medium text-gray-600">{message}</p>
    </div>
  );
};

export default LoadingState;
