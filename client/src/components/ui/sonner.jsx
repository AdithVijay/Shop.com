import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";

const Toaster = (props) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme === "green" ? "green" : theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-green-600 group-[.toaster]:text-white group-[.toaster]:border-green-800 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-gray-400",
          actionButton:
            "group-[.toast]:bg-green-500 group-[.toast]:text-white", // Green for success
          cancelButton:
            "group-[.toast]:bg-red-500 group-[.toast]:text-white", // Red for error
        },
      }}
      icons={{
        success: <CheckCircle className="w-6 h-6 text-green-500" />, // Green for success
        error: <XCircle className="w-6 h-6 text-red-500" />,         // Red for error
      }}
      {...props}
    />
  );
};

export { Toaster };
