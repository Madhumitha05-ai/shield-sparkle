import { motion } from "framer-motion";

type IconState = "safe" | "connected" | "emergency" | "inactive";

interface DynamicAppIconProps {
  state: IconState;
  streak?: number;
  size?: "sm" | "md" | "lg";
}

const DynamicAppIcon = ({ state, streak = 0, size = "md" }: DynamicAppIconProps) => {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  const iconSize = {
    sm: 32,
    md: 48,
    lg: 64,
  };

  const getIconStyles = () => {
    switch (state) {
      case "safe":
        return {
          gradient: "from-primary to-secondary",
          glow: "shadow-glow",
          emoji: "😊",
        };
      case "connected":
        return {
          gradient: "from-success to-primary",
          glow: "shadow-success-glow",
          emoji: "⌚",
        };
      case "emergency":
        return {
          gradient: "from-destructive to-primary",
          glow: "shadow-emergency-glow",
          emoji: "🚨",
        };
      case "inactive":
        return {
          gradient: "from-muted to-secondary/50",
          glow: "",
          emoji: "💤",
        };
    }
  };

  const styles = getIconStyles();

  return (
    <motion.div
      className={`relative ${sizeClasses[size]}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      {/* Background glow */}
      {state !== "inactive" && (
        <motion.div
          className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${styles.gradient} opacity-30 blur-xl`}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Main icon container */}
      <motion.div
        className={`relative ${sizeClasses[size]} rounded-3xl bg-gradient-to-br ${styles.gradient} ${styles.glow} flex items-center justify-center overflow-hidden`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Shield shape */}
        <svg
          width={iconSize[size]}
          height={iconSize[size]}
          viewBox="0 0 64 64"
          fill="none"
          className="drop-shadow-lg"
        >
          <path
            d="M32 4L8 14V30C8 45.464 18.536 58.464 32 62C45.464 58.464 56 45.464 56 30V14L32 4Z"
            fill="white"
            fillOpacity={0.9}
          />
          <path
            d="M32 8L12 16.5V30C12 43.255 21.255 54.255 32 57.5C42.745 54.255 52 43.255 52 30V16.5L32 8Z"
            fill="url(#shieldGradient)"
          />
          {/* Face for safe state */}
          {state === "safe" && (
            <>
              <circle cx="24" cy="28" r="3" fill="hsl(320, 30%, 20%)" />
              <circle cx="40" cy="28" r="3" fill="hsl(320, 30%, 20%)" />
              <path
                d="M24 38C24 38 28 44 32 44C36 44 40 38 40 38"
                stroke="hsl(320, 30%, 20%)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </>
          )}
          {/* Watch icon for connected */}
          {state === "connected" && (
            <g transform="translate(20, 24)">
              <rect x="4" y="0" width="16" height="20" rx="3" fill="hsl(320, 30%, 20%)" />
              <rect x="6" y="2" width="12" height="12" rx="2" fill="hsl(150, 60%, 45%)" />
              <rect x="8" y="-4" width="8" height="4" rx="1" fill="hsl(320, 30%, 20%)" />
              <rect x="8" y="20" width="8" height="4" rx="1" fill="hsl(320, 30%, 20%)" />
            </g>
          )}
          {/* Alert waves for emergency */}
          {state === "emergency" && (
            <g>
              <motion.circle
                cx="32"
                cy="32"
                r="8"
                fill="hsl(0, 75%, 55%)"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
              <motion.circle
                cx="32"
                cy="32"
                r="14"
                stroke="hsl(0, 75%, 55%)"
                strokeWidth="2"
                fill="none"
                animate={{ scale: [1, 1.3], opacity: [0.6, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <motion.circle
                cx="32"
                cy="32"
                r="20"
                stroke="hsl(0, 75%, 55%)"
                strokeWidth="1.5"
                fill="none"
                animate={{ scale: [1, 1.3], opacity: [0.4, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
              />
            </g>
          )}
          {/* Inactive face */}
          {state === "inactive" && (
            <>
              <circle cx="24" cy="28" r="2" fill="hsl(320, 20%, 45%)" />
              <circle cx="40" cy="28" r="2" fill="hsl(320, 20%, 45%)" />
              <path
                d="M26 40H38"
                stroke="hsl(320, 20%, 45%)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </>
          )}
          <defs>
            <linearGradient id="shieldGradient" x1="12" y1="8" x2="52" y2="57.5">
              <stop stopColor="hsl(340, 75%, 65%)" />
              <stop offset="1" stopColor="hsl(270, 50%, 70%)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Streak badge */}
        {state === "safe" && streak > 0 && (
          <motion.div
            className="absolute -top-1 -right-1 bg-gradient-to-br from-accent to-primary rounded-full px-2 py-0.5 flex items-center gap-0.5 shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            <span className="text-xs">🔥</span>
            <span className="text-xs font-bold text-primary-foreground">{streak}</span>
          </motion.div>
        )}

        {/* Connected indicator ring */}
        {state === "connected" && (
          <motion.div
            className="absolute inset-0 rounded-3xl border-4 border-success"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default DynamicAppIcon;
