import { useState } from "react";
import { motion } from "framer-motion";
import DynamicAppIcon from "../components/DynamicAppIcon";
import RoleCard from "../components/RoleCard";
import OfficerLogin from "../components/OfficerLogin";
import OfficerDashboard from "../components/OfficerDashboard";
import OfficerAlertScreen from "../components/OfficerAlertScreen";
import UserConnection from "../components/UserConnection";
import UserRegistration from "../components/UserRegistration";
import UserDashboard from "../components/UserDashboard";

interface EmergencyContact {
  name: string;
  phone: string;
}

interface UserProfile {
  name: string;
  phone: string;
  emergencyContacts: EmergencyContact[];
}

type Screen =
  | "home"
  | "officer-login"
  | "officer-dashboard"
  | "officer-alert"
  | "user-connection"
  | "user-registration"
  | "user-dashboard";

type IconState = "safe" | "connected" | "emergency" | "inactive";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [iconState, setIconState] = useState<IconState>("safe");
  const [streak] = useState(5);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const renderScreen = () => {
    switch (currentScreen) {
      case "officer-login":
        return (
          <OfficerLogin
            onSuccess={() => setCurrentScreen("officer-dashboard")}
            onBack={() => setCurrentScreen("home")}
          />
        );
      case "officer-dashboard":
        return (
          <OfficerDashboard
            onAlert={() => setCurrentScreen("officer-alert")}
            onBack={() => setCurrentScreen("home")}
          />
        );
      case "officer-alert":
        return (
          <OfficerAlertScreen
            onConfirm={() => setCurrentScreen("officer-dashboard")}
            onBack={() => setCurrentScreen("officer-dashboard")}
          />
        );
      case "user-connection":
        return (
          <UserConnection
            onConnected={() => {
              setCurrentScreen("user-registration");
            }}
            onBack={() => setCurrentScreen("home")}
          />
        );
      case "user-registration":
        return (
          <UserRegistration
            onComplete={(data) => {
              setUserProfile(data);
              setIconState("connected");
              setCurrentScreen("user-dashboard");
            }}
            onBack={() => setCurrentScreen("home")}
          />
        );
      case "user-dashboard":
        return <UserDashboard userProfile={userProfile} onBack={() => setCurrentScreen("home")} />;
      default:
        return (
          <HomeScreen
            streak={streak}
            iconState={iconState}
            onOfficerClick={() => setCurrentScreen("officer-login")}
            onUserClick={() => setCurrentScreen("user-connection")}
            onIconStateChange={setIconState}
          />
        );
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-background">
      {renderScreen()}
    </div>
  );
};

interface HomeScreenProps {
  streak: number;
  iconState: IconState;
  onOfficerClick: () => void;
  onUserClick: () => void;
  onIconStateChange: (state: IconState) => void;
}

const HomeScreen = ({
  streak,
  iconState,
  onOfficerClick,
  onUserClick,
  onIconStateChange,
}: HomeScreenProps) => {
  const iconStates: IconState[] = ["safe", "connected", "emergency", "inactive"];

  return (
    <div className="min-h-screen gradient-calm px-4 py-8">
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold font-display text-foreground">
          Women Safety
        </h1>
        <p className="text-muted-foreground mt-1">Your protection, simplified</p>
      </motion.div>

      {/* Dynamic App Icon */}
      <motion.div
        className="flex flex-col items-center mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <DynamicAppIcon state={iconState} streak={streak} size="lg" />

        {/* Icon State Switcher (for demo) */}
        <div className="flex gap-2 mt-6">
          {iconStates.map((state) => (
            <button
              key={state}
              onClick={() => onIconStateChange(state)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                iconState === state
                  ? "gradient-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {state}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Streak Display */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card shadow-soft">
          <span className="text-xl">🔥</span>
          <span className="text-2xl font-bold font-display text-foreground">
            {streak}
          </span>
          <span className="text-muted-foreground">day streak</span>
        </div>
      </motion.div>

      {/* Role Cards */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <RoleCard
          role="officer"
          title="Officer"
          description="Respond to emergencies and protect lives"
          onClick={onOfficerClick}
        />
        <RoleCard
          role="user"
          title="User"
          description="Stay protected with your smartwatch"
          onClick={onUserClick}
        />
      </motion.div>

      {/* Motivational Footer */}
      <motion.p
        className="text-center text-muted-foreground mt-12 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Your safety is always active 🌸
      </motion.p>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 right-8 w-20 h-20 rounded-full bg-primary/5 blur-2xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-40 left-8 w-32 h-32 rounded-full bg-secondary/10 blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
    </div>
  );
};

export default Index;
