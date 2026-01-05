import { motion } from "framer-motion";
import { Shield, UserCheck } from "lucide-react";

interface RoleCardProps {
  role: "officer" | "user";
  title: string;
  description: string;
  onClick: () => void;
}

const RoleCard = ({ role, title, description, onClick }: RoleCardProps) => {
  const isOfficer = role === "officer";

  return (
    <motion.button
      onClick={onClick}
      className={`w-full p-6 rounded-3xl glass-card shadow-soft transition-all duration-300 text-left group`}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <motion.div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
            isOfficer
              ? "bg-gradient-to-br from-secondary to-primary/30"
              : "bg-gradient-to-br from-accent/50 to-primary/30"
          }`}
          whileHover={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.5 }}
        >
          {isOfficer ? (
            <Shield className="w-8 h-8 text-primary" />
          ) : (
            <UserCheck className="w-8 h-8 text-primary" />
          )}
        </motion.div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-xl font-bold font-display text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>

        {/* Arrow */}
        <motion.div
          className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"
          whileHover={{ x: 4 }}
        >
          <svg
            className="w-5 h-5 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.div>
      </div>

      {/* Decorative gradient line */}
      <motion.div
        className="h-1 rounded-full mt-4 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

export default RoleCard;
