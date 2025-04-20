export default function Logo() {
  return (
    <div className="w-10 h-10 relative">
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        <path
          fill="#d6ff00"
          d="M20,30 C20,20 30,10 40,10 L60,10 C70,10 80,20 80,30 L80,70 C80,80 70,90 60,90 L40,90 C30,90 20,80 20,70 Z"
        ></path>
        <path
          fill="#000"
          d="M35,30 L35,70 M45,20 L45,80 M55,30 L55,70 M65,20 L65,80"
        ></path>
      </svg>
    </div>
  );
}
