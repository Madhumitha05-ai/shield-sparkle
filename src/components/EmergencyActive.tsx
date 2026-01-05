import { motion } from "framer-motion";
import { Heart, Shield, Phone } from "lucide-react";

interface EmergencyActiveProps {
  onCancel: () => void;
}

const EmergencyActive = ({ onCancel }: EmergencyActiveProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/20 to-accent/10"
        animate={{
          background: [
            "linear-gradient(135deg, hsl(340, 75%, 65%, 0.1) 0%, hsl(270, 50%, 85%, 0.2) 50%, hsl(20, 85%, 75%, 0.1) 100%)",
            "linear-gradient(135deg, hsl(270, 50%, 85%, 0.2) 0%, hsl(20, 85%, 75%, 0.1) 50%, hsl(340, 75%, 65%, 0.1) 100%)",
            "linear-gradient(135deg, hsl(20, 85%, 75%, 0.1) 0%, hsl(340, 75%, 65%, 0.1) 50%, hsl(270, 50%, 85%, 0.2) 100%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        {/* Pulsing Heart/Shield */}
        <div className="relative mb-12">
          {/* Pulse rings */}
          <motion.div
            className="absolute inset-0 w-40 h-40 rounded-full bg-primary/20"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 w-40 h-40 rounded-full bg-primary/20"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          />
          <motion.div
            className="absolute inset-0 w-40 h-40 rounded-full bg-primary/20"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
          />

          {/* Main icon */}
          <motion.div
            className="w-40 h-40 rounded-full gradient-primary flex items-center justify-center shadow-glow"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Shield className="w-20 h-20 text-primary-foreground" />
          </motion.div>
        </div>

        {/* Main Message */}
        <motion.div
          className="text-center space-y-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold font-display text-foreground">
            Help is on the way
          </h1>
          <p className="text-xl text-muted-foreground max-w-xs">
            Stay strong. Your location has been shared with nearby officers.
          </p>
        </motion.div>

        {/* Status Cards */}
        <motion.div
          className="w-full max-w-sm space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Officer Status */}
          <div className="bg-card/80 backdrop-blur-xl rounded-2xl p-4 shadow-soft flex items-center gap-4">
            <motion.div
              className="w-12 h-12 rounded-xl gradient-success flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Shield className="w-6 h-6 text-success-foreground" />
            </motion.div>
            <div className="flex-1">
              <p className="text-foreground font-medium">Officer Responding</p>
              <p className="text-sm text-muted-foreground">ETA: ~4 minutes</p>
            </div>
            <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
          </div>

          {/* Emergency Contacts */}
          <div className="bg-card/80 backdrop-blur-xl rounded-2xl p-4 shadow-soft flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/30 flex items-center justify-center">
              <Phone className="w-6 h-6 text-accent-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-foreground font-medium">Contacts Notified</p>
              <p className="text-sm text-muted-foreground">3 emergency contacts alerted</p>
            </div>
          </div>
        </motion.div>

        {/* Calming Message */}
        <motion.div
          className="mt-12 flex items-center gap-2 text-muted-foreground"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Heart className="w-4 h-4 text-primary" />
          <span>You are not alone</span>
          <Heart className="w-4 h-4 text-primary" />
        </motion.div>

        {/* Cancel Button */}
        <motion.button
          onClick={onCancel}
          className="mt-8 px-8 py-3 rounded-2xl bg-muted text-muted-foreground font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Cancel Emergency
        </motion.button>
      </div>
    </div>
  );
};

export default EmergencyActive;
