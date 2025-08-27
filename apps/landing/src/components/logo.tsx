import Image from "next/image";

interface LogoProps {
  variant?: "default" | "text" | "icon";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  theme?: "light" | "dark";
}

export function Logo({
  variant = "text",
  size = "md",
  className = "",
  theme = "light",
}: LogoProps) {
  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-12",
    xl: "h-16",
  };

  if (variant === "icon") {
    return (
      <div className={`${sizeClasses[size]} ${className}`}>
        <Image
          src="/logo_icon.svg"
          alt="DeskGrid"
          width={80}
          height={80}
          className="h-full w-auto"
        />
      </div>
    );
  }

  if (variant === "text") {
    return (
      <div className={`${sizeClasses[size]} ${className}`}>
        <Image
          src={theme === "light" ? "/logo_text.svg" : "/logo_text_dark.svg"}
          alt="DeskGrid"
          width={200}
          height={40}
          className="h-full w-auto"
        />
      </div>
    );
  }

  // Default variant with icon + text
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={sizeClasses[size]}>
        <Image
          src={theme === "light" ? "/logo.svg" : "/logo_dark.svg"}
          alt="DeskGrid"
          width={100}
          height={100}
          className="h-full w-auto"
        />
      </div>
    </div>
  );
}
