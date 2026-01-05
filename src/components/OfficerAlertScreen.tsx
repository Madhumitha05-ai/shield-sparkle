import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, MapPin, Clock } from "lucide-react";

interface OfficerAlertScreenProps {
  onConfirm: () => void;
  onBack: () => void;
}

const OfficerAlertScreen = ({ onConfirm, onBack }: OfficerAlertScreenProps) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const alertId = "WS-2024-0847";

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        const nextInput = document.getElementById(`alert-otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleConfirm = () => {
    if (otp.every((digit) => digit !== "")) {
      setIsConfirmed(true);
      setTimeout(onConfirm, 2000);
    }
  };

  if (isConfirmed) {
    return (
      <div className="min-h-screen gradient-calm flex items-center justify-center px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            className="w-32 h-32 mx-auto rounded-full gradient-success flex items-center justify-center shadow-success-glow mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
          >
            <CheckCircle className="w-16 h-16 text-success-foreground" />
          </motion.div>
          <h2 className="text-2xl font-bold font-display text-foreground">
            Response Confirmed
          </h2>
          <p className="text-muted-foreground mt-2">
            Help is on the way! Thank you, Officer.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-calm px-4 py-8">
      {/* Pulsing Alert Header */}
      <motion.div
        className="bg-destructive/10 rounded-3xl p-6 mb-6 border-2 border-destructive/30"
        animate={{ borderColor: ["hsl(0, 75%, 55%, 0.3)", "hsl(0, 75%, 55%, 0.6)", "hsl(0, 75%, 55%, 0.3)"] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="flex items-center gap-4">
          <motion.div
            className="w-16 h-16 rounded-2xl gradient-emergency flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <AlertTriangle className="w-8 h-8 text-destructive-foreground" />
          </motion.div>
          <div>
            <p className="text-destructive font-bold text-lg">EMERGENCY ALERT</p>
            <p className="text-foreground font-display text-xl font-bold">
              ID: {alertId}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Alert Details */}
      <motion.div
        className="bg-card rounded-3xl p-6 shadow-soft mb-6 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Location</p>
            <p className="text-foreground font-medium">Sector 15, Gurugram</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
            <Clock className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Time Elapsed</p>
            <p className="text-foreground font-medium">2 minutes ago</p>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="h-32 bg-muted rounded-2xl flex items-center justify-center">
          <p className="text-muted-foreground">Map View</p>
        </div>
      </motion.div>

      {/* OTP Verification */}
      <motion.div
        className="bg-card rounded-3xl p-6 shadow-soft"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-bold font-display text-foreground text-center mb-4">
          Enter Confirmation OTP
        </h3>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Verify that you're responding to this alert
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-4 mb-6">
          {otp.map((digit, index) => (
            <motion.input
              key={index}
              id={`alert-otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              className="w-14 h-16 bg-muted rounded-2xl text-center text-2xl font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-destructive"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
            />
          ))}
        </div>

        {/* Confirm Button */}
        <motion.button
          onClick={handleConfirm}
          disabled={!otp.every((digit) => digit !== "")}
          className="w-full py-4 rounded-2xl gradient-success text-success-foreground font-bold text-lg shadow-success-glow flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <CheckCircle className="w-5 h-5" />
          Confirm Response
        </motion.button>
      </motion.div>

      {/* Back Button */}
      <motion.button
        onClick={onBack}
        className="w-full mt-4 py-3 rounded-2xl bg-muted text-muted-foreground font-medium"
        whileTap={{ scale: 0.98 }}
      >
        Go Back
      </motion.button>
    </div>
  );
};

export default OfficerAlertScreen;
