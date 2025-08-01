import { Dock, DockIcon } from "~/components/magicui/dock";
import { ModeToggle } from "~/components/ModeToggle";
import { buttonVariants } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { DATA } from "~/data/resume";
import { cn } from "~/lib/utils";
import { Link } from "react-router";

export default function Navbar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
      {/* Keep original background blur layer */}
      <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>

      <Dock
        className={cn(
          "z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1",
          // Keep original dock styling
          "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
          // Add glassmorphism on top of original styling
          "backdrop-blur-xl backdrop-saturate-150",
          "bg-white/10 dark:bg-black/20",
          "border-white/20 dark:border-white/10",
          // Glass highlight effect
          "before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-b before:from-white/5 before:to-transparent before:pointer-events-none",
          "overflow-hidden"
        )}
      >
        {DATA.navbar.map((item) => (
          <DockIcon key={item.href}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12 rounded-full",
                    // Subtle glass button effect
                    "hover:bg-white/10 dark:hover:bg-white/5",
                    "active:bg-white/20 dark:active:bg-white/10",
                    "transition-all duration-200"
                  )}
                >
                  <item.icon className="size-4" />
                </Link>
              </TooltipTrigger>
              {/* Keep original tooltip styling */}
              <TooltipContent>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}

        <Separator orientation="vertical" className="h-full opacity-30" />

        {Object.entries(DATA.contact.social)
          .filter(([_, social]) => social.navbar)
          .map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={social.url}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12",
                      // Subtle glass button effect
                      "hover:bg-white/10 dark:hover:bg-white/5",
                      "active:bg-white/20 dark:active:bg-white/10",
                      "transition-all duration-200"
                    )}
                  >
                    <social.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                {/* Keep original tooltip styling */}
                <TooltipContent>
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}

        <Separator orientation="vertical" className="h-full py-2 opacity-30" />

        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  "rounded-full p-2", // Circular wrapper for ModeToggle
                  "hover:bg-accent hover:text-accent-foreground",
                  "transition-all duration-200"
                )}
              >
                <ModeToggle />
              </div>
            </TooltipTrigger>
            {/* Keep original tooltip styling */}
            <TooltipContent>
              <p>Theme</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      </Dock>
    </div>
  );
}
