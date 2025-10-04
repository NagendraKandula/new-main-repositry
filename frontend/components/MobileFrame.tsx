import { cn } from "../utils";

interface MobileFrameProps {
  children: React.ReactNode;
  platform: string;
}

export function MobileFrame({ children, platform }: MobileFrameProps) {
  return (
    <div
      className={cn(
        "relative w-full h-full rounded-[3rem] shadow-2xl transition-all duration-300 ease-in-out z-10",
        "border-[10px] border-[#111] bg-[#333]",
        {
          "border-[#222] rounded-[3.5rem] shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_0_0_10px_#222]": platform === 'instagram' || platform === 'threads',
          "border-[#444] border-[15px] rounded-[2rem]": platform === 'twitter' || platform === 'linkedin' || platform === 'pinterest',
          "border-transparent": platform === 'youtube' || platform === 'facebook'
        }
      )}
    >
      <div className="relative w-full h-full overflow-hidden bg-white">
        {children}
      </div>
      {(platform === 'instagram' || platform === 'threads') && (
        <div className="absolute top-[15px] left-1/2 -translate-x-1/2 w-[120px] h-[25px] bg-[#111] rounded-[1rem]"></div>
      )}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-gray-600 rounded-full"></div>
    </div>
  );
}