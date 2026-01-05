import { useState } from "react";
import { motion } from "framer-motion";
import { Watch, AlertTriangle, Calendar, Settings, Users } from "lucide-react";
import StreakCalendar from "./StreakCalendar";
import EmergencyActive from "./EmergencyActive";

interface EmergencyContact {
  name: string;
  phone: string;
}

interface UserProfile {
  name: string;
  phone: string;
  emergencyContacts: EmergencyContact[];
}

interface UserDashboardProps {
  userProfile: UserProfile | null;
  onBack: () => void;
}

const UserDashboard = ({ userProfile, onBack }: UserDashboardProps) => {
  const [isEmergency, setIsEmergency] = useState(false);
  const [streak] = useState(5);
  const [connectedDays] = useState([true, true, true, true, true, false, false]);

  if (isEmergency) {
    return <EmergencyActive onCancel={() => setIsEmergency(false)} />;
  }

  return (
    <div className="min-h-screen gradient-calm px-4 py-8 pb-24">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-6"
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
            <h1 className="text-xl font-bold font-display text-foreground">
              {userProfile ? `Hi, ${userProfile.name.split(' ')[0]}` : 'My Safety'}
            </h1>
            <p className="text-sm text-muted-foreground">Always protected 🌸</p>
          </div>
        </div>

        <button className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center">
          <Settings className="w-5 h-5 text-muted-foreground" />
        </button>
      </motion.div>

      {/* User Info Card */}
      {userProfile && (
        <motion.div
          className="bg-card rounded-3xl p-5 shadow-soft mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                {userProfile.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <p className="font-bold text-foreground">{userProfile.name}</p>
              <p className="text-sm text-muted-foreground">+91 {userProfile.phone}</p>
            </div>
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary/50">
              <Users className="w-4 h-4 text-secondary-foreground" />
              <span className="text-sm font-medium text-secondary-foreground">
                {userProfile.emergencyContacts.length}
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Connection Status */}
      <motion.div
        className="bg-card rounded-3xl p-6 shadow-soft mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-4">
          <motion.div
            className="w-14 h-14 rounded-2xl gradient-success flex items-center justify-center shadow-success-glow"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Watch className="w-7 h-7 text-success-foreground" />
          </motion.div>
          <div className="flex-1">
            <p className="font-bold text-foreground">Smartwatch Connected</p>
            <p className="text-sm text-muted-foreground">Device ID: WS-USR-7829</p>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm text-success font-medium">Active</span>
          </div>
        </div>
      </motion.div>

      {/* Streak Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <StreakCalendar streak={streak} connectedDays={connectedDays} />
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        className="grid grid-cols-2 gap-4 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="bg-card rounded-2xl p-4 shadow-soft">
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center mb-3">
            <Calendar className="w-5 h-5 text-secondary-foreground" />
          </div>
          <p className="text-2xl font-bold text-foreground">{streak}</p>
          <p className="text-sm text-muted-foreground">Days Protected</p>
        </div>

        <div className="bg-card rounded-2xl p-4 shadow-soft">
          <div className="w-10 h-10 rounded-xl bg-accent/30 flex items-center justify-center mb-3">
            <AlertTriangle className="w-5 h-5 text-accent-foreground" />
          </div>
          <p className="text-2xl font-bold text-foreground">0</p>
          <p className="text-sm text-muted-foreground">Alerts This Week</p>
        </div>
      </motion.div>

      {/* Emergency Button - Fixed at Bottom */}
      <motion.div
        className="fixed bottom-6 left-4 right-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          onClick={() => setIsEmergency(true)}
          className="w-full py-5 rounded-2xl gradient-emergency text-destructive-foreground font-bold text-lg shadow-emergency-glow flex items-center justify-center gap-3"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
        >
          <AlertTriangle className="w-6 h-6" />
          EMERGENCY SOS
        </motion.button>
      </motion.div>
    </div>
  );
};

export default UserDashboard;
