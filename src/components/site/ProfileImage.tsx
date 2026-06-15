import { useState, type ImgHTMLAttributes } from "react";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  name: string;
}

export function ProfileImage({ name, className = "", style, ...img }: Props) {
  const [errored, setErrored] = useState(false);
  const initials = name.split(" ").map(s => s[0]).join("").slice(0, 2).toUpperCase();

  if (errored || !img.src) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-primary/80 to-primary text-primary-foreground font-bold ${className}`}
        style={style}
        aria-label={name}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      {...img}
      className={className}
      style={style}
      alt={img.alt ?? name}
      onError={() => setErrored(true)}
      loading="lazy"
    />
  );
}
