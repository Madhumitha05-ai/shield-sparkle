import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowRight, CheckCircle, Sparkles } from "lucide-react";

interface OfficerLoginProps {
  onSuccess: () => void;
  onBack: () => void;
}

const OfficerLogin = ({ onSuccess, onBack }: OfficerLoginProps) => {
  const [step, setStep] = useState<"phone" | "otp" | "success">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handlePhoneSubmit = () => {
    if (phone.length >= 10) {
      setStep("otp");
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }

      // Check if OTP is complete
      if (newOtp.every((digit) => digit !== "") && index === 5) {
        setTimeout(() => setStep("success"), 500);
        setTimeout(onSuccess, 2000);
      }
    }
  };

  return (
    <div className="min-h-screen gradient-calm px-4 py-8">
      {/* Header */}
      <motion.div
        className="flex items-center gap-4 mb-8"
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
        <h1 className="text-2xl font-bold font-display text-foreground">Officer Login</h1>
      </motion.div>

      <AnimatePresence mode="wait">
        {step === "phone" && (
          <motion.div
            key="phone"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Icon */}
            <motion.div
              className="w-24 h-24 mx-auto rounded-3xl gradient-primary flex items-center justify-center shadow-glow"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Phone className="w-12 h-12 text-primary-foreground" />
            </motion.div>

            <div className="text-center">
              <h2 className="text-xl font-bold font-display text-foreground">
                Enter your phone number
              </h2>
              <p className="text-muted-foreground mt-2">
                We'll send you a verification code
              </p>
            </div>

            {/* Phone Input */}
            <div className="bg-card rounded-2xl p-4 shadow-soft">
              <label className="text-sm text-muted-foreground mb-2 block">
                Phone Number
              </label>
              <div className="flex items-center gap-3">
                <div className="px-4 py-3 bg-muted rounded-xl text-foreground font-medium">
                  +91
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="Enter 10 digit number"
                  className="flex-1 bg-muted rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              onClick={handlePhoneSubmit}
              disabled={phone.length < 10}
              className="w-full py-4 rounded-2xl gradient-primary text-primary-foreground font-bold text-lg shadow-glow flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}

        {step === "otp" && (
          <motion.div
            key="otp"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-xl font-bold font-display text-foreground">
                Verify your number
              </h2>
              <p className="text-muted-foreground mt-2">
                Enter the 6-digit code sent to +91 {phone}
              </p>
            </div>

            {/* OTP Inputs */}
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <motion.input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-12 h-14 bg-card rounded-xl text-center text-2xl font-bold text-foreground shadow-soft focus:outline-none focus:ring-2 focus:ring-primary"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                />
              ))}
            </div>

            {/* Resend */}
            <p className="text-center text-muted-foreground">
              Didn't receive code?{" "}
              <button className="text-primary font-medium">Resend</button>
            </p>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 pt-12"
          >
            <motion.div
              className="w-32 h-32 mx-auto rounded-full gradient-success flex items-center justify-center shadow-success-glow"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              <CheckCircle className="w-16 h-16 text-success-foreground" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold font-display text-foreground">
                Welcome, Officer!
              </h2>
              <div className="flex items-center justify-center gap-2 mt-2 text-muted-foreground">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>You're ready to protect lives</span>
                <Sparkles className="w-4 h-4 text-accent" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OfficerLogin;
