import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface StreakCalendarProps {
  streak: number;
  connectedDays: boolean[];
}

const StreakCalendar = ({ streak, connectedDays }: StreakCalendarProps) => {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  
  const motivationalMessages = [
    { threshold: 0, message: "Start your safety journey today 🌱" },
    { threshold: 3, message: "Great start! Keep it going 💪" },
    { threshold: 5, message: "You're consistent! 🌷" },
    { threshold: 7, message: "One week protected! Amazing 🌟" },
    { threshold: 14, message: "Two weeks strong! You're unstoppable 💜" },
    { threshold: 30, message: "Safety champion! 30 days! 👑" },
  ];

  const getMessage = () => {
    const sorted = [...motivationalMessages].sort((a, b) => b.threshold - a.threshold);
    return sorted.find((m) => streak >= m.threshold)?.message || motivationalMessages[0].message;
  };

  return (
    <motion.div
      className="bg-card rounded-3xl p-6 shadow-soft"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Streak Header */}
      <div className="text-center mb-6">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/20 to-primary/20"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-2xl">🔥</span>
          <span className="text-3xl font-bold font-display text-foreground">{streak}</span>
          <span className="text-muted-foreground font-medium">day streak</span>
        </motion.div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {days.map((day, index) => (
          <div key={index} className="text-center">
            <span className="text-xs text-muted-foreground font-medium">{day}</span>
            <motion.div
              className={`w-10 h-10 mx-auto mt-2 rounded-xl flex items-center justify-center ${
                connectedDays[index]
                  ? "bg-gradient-to-br from-success to-success/70"
                  : "bg-muted"
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              {connectedDays[index] ? (
                <Check className="w-5 h-5 text-success-foreground" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
              )}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Motivational Message */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-lg font-medium text-foreground">{getMessage()}</p>
        <p className="text-sm text-muted-foreground mt-1">
          Your smartwatch keeps you protected
        </p>
      </motion.div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Weekly goal</span>
          <span>{Math.min(streak, 7)}/7 days</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((streak / 7) * 100, 100)}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default StreakCalendar;
