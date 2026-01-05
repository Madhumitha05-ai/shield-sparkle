import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Watch, Smartphone, CheckCircle, Wifi } from "lucide-react";

interface UserConnectionProps {
  onConnected: () => void;
  onBack: () => void;
}

const UserConnection = ({ onConnected, onBack }: UserConnectionProps) => {
  const [step, setStep] = useState<"detecting" | "connecting" | "connected">("detecting");
  const [deviceId] = useState("WS-USR-7829");

  useEffect(() => {
    // Simulate device detection
    const timer1 = setTimeout(() => setStep("connecting"), 2000);
    const timer2 = setTimeout(() => setStep("connected"), 4000);
    const timer3 = setTimeout(onConnected, 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onConnected]);

  return (
    <div className="min-h-screen gradient-calm px-4 py-8">
      {/* Header */}
      <motion.div
        className="flex items-center gap-4 mb-12"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
        >
          <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold font-display text-foreground">Device Setup</h1>
      </motion.div>

      {/* Animation Container */}
      <div className="flex flex-col items-center justify-center py-8">
        {/* Device Icons Animation */}
        <div className="relative w-64 h-40 flex items-center justify-center mb-12">
          {/* Phone */}
          <motion.div
            className="absolute left-0 w-20 h-28 bg-card rounded-2xl shadow-soft flex items-center justify-center"
            animate={
              step === "connecting" || step === "connected"
                ? { x: 30 }
                : { x: 0 }
            }
            transition={{ duration: 0.5 }}
          >
            <Smartphone className="w-10 h-10 text-primary" />
          </motion.div>

          {/* Connection Waves */}
          {step === "connecting" && (
            <>
              <motion.div
                className="absolute w-8 h-8 rounded-full bg-primary/30"
                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <motion.div
                className="absolute w-8 h-8 rounded-full bg-primary/30"
                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
              />
            </>
          )}

          {/* Connected Line */}
          {step === "connected" && (
            <motion.div
              className="absolute w-24 h-1 rounded-full bg-gradient-to-r from-primary to-success"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}

          {/* Watch */}
          <motion.div
            className={`absolute right-0 w-16 h-20 rounded-2xl flex items-center justify-center ${
              step === "connected"
                ? "bg-success shadow-success-glow"
                : "bg-card shadow-soft"
            }`}
            animate={
              step === "connecting" || step === "connected"
                ? { x: -30 }
                : { x: 0 }
            }
            transition={{ duration: 0.5 }}
          >
            <Watch
              className={`w-8 h-8 ${
                step === "connected" ? "text-success-foreground" : "text-primary"
              }`}
            />
          </motion.div>
        </div>

        {/* Status Text */}
        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {step === "detecting" && (
            <>
              <div className="flex items-center justify-center gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <motion.div
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                />
              </div>
              <h2 className="text-xl font-bold font-display text-foreground">
                Detecting your device...
              </h2>
              <p className="text-muted-foreground">
                Please keep your smartwatch nearby
              </p>
            </>
          )}

          {step === "connecting" && (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Wifi className="w-8 h-8 text-primary mx-auto" />
              </motion.div>
              <h2 className="text-xl font-bold font-display text-foreground">
                Connecting...
              </h2>
              <p className="text-muted-foreground">
                Establishing secure connection
              </p>
            </>
          )}

          {step === "connected" && (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
              >
                <CheckCircle className="w-12 h-12 text-success mx-auto" />
              </motion.div>
              <h2 className="text-xl font-bold font-display text-foreground">
                Connected!
              </h2>
              <p className="text-muted-foreground">
                Your safety is now active 🌸
              </p>
            </>
          )}
        </motion.div>

        {/* Device ID Card */}
        <motion.div
          className="bg-card rounded-2xl p-4 shadow-soft mt-8 w-full max-w-xs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-muted-foreground">Device ID</p>
          <p className="text-lg font-mono font-bold text-foreground">{deviceId}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default UserConnection;
