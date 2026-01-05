import { useState } from "react";
import { motion } from "framer-motion";
import { Power, Bell, Shield, Heart } from "lucide-react";

interface OfficerDashboardProps {
  onAlert: () => void;
  onBack: () => void;
}

const OfficerDashboard = ({ onAlert, onBack }: OfficerDashboardProps) => {
  const [isOnDuty, setIsOnDuty] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleDutyToggle = () => {
    setIsOnDuty(!isOnDuty);
  };

  const simulateAlert = () => {
    if (isOnDuty) {
      setShowAlert(true);
      setTimeout(() => onAlert(), 500);
    }
  };

  return (
    <div className="min-h-screen gradient-calm px-4 py-8">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
          >
            <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-bold font-display text-foreground">Officer Panel</h1>
            <p className="text-sm text-muted-foreground">Ready to serve</p>
          </div>
        </div>

        {/* Status Badge */}
        <motion.div
          className={`px-4 py-2 rounded-full flex items-center gap-2 ${
            isOnDuty ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
          }`}
          animate={{ scale: isOnDuty ? [1, 1.05, 1] : 1 }}
          transition={{ duration: 2, repeat: isOnDuty ? Infinity : 0 }}
        >
          <div className={`w-2 h-2 rounded-full ${isOnDuty ? "bg-success" : "bg-muted-foreground"}`} />
          <span className="text-sm font-medium">{isOnDuty ? "On Duty" : "Off Duty"}</span>
        </motion.div>
      </motion.div>

      {/* Main Duty Button */}
      <motion.div
        className="flex flex-col items-center justify-center py-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Glow effect */}
        {isOnDuty && (
          <motion.div
            className="absolute w-48 h-48 rounded-full bg-success/20 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        <motion.button
          onClick={handleDutyToggle}
          className={`relative w-44 h-44 rounded-full flex items-center justify-center transition-all duration-500 ${
            isOnDuty
              ? "gradient-success shadow-success-glow"
              : "bg-card border-4 border-primary/30 shadow-soft"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Ripple effect when on duty */}
          {isOnDuty && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-success"
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-success"
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              />
            </>
          )}

          <Power
            className={`w-16 h-16 ${isOnDuty ? "text-success-foreground" : "text-primary"}`}
          />
        </motion.button>

        <motion.p
          className="mt-6 text-lg font-medium text-foreground text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {isOnDuty ? (
            <span className="flex items-center gap-2">
              You're protecting lives <Heart className="w-5 h-5 text-destructive animate-heartbeat" />
            </span>
          ) : (
            "Tap to go on duty"
          )}
        </motion.p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-2 gap-4 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="bg-card rounded-2xl p-4 shadow-soft">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">12</p>
          <p className="text-sm text-muted-foreground">Alerts Today</p>
        </div>

        <div className="bg-card rounded-2xl p-4 shadow-soft">
          <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center mb-3">
            <Shield className="w-5 h-5 text-success" />
          </div>
          <p className="text-2xl font-bold text-foreground">48</p>
          <p className="text-sm text-muted-foreground">Lives Protected</p>
        </div>
      </motion.div>

      {/* Simulate Alert Button (for demo) */}
      {isOnDuty && (
        <motion.button
          onClick={simulateAlert}
          className="w-full mt-8 py-4 rounded-2xl bg-destructive/10 border-2 border-destructive/30 text-destructive font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Simulate Incoming Alert
        </motion.button>
      )}
    </div>
  );
};

export default OfficerDashboard;
