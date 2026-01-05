import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, UserPlus, ArrowRight, Trash2, CheckCircle, Heart } from "lucide-react";
import { z } from "zod";

interface EmergencyContact {
  name: string;
  phone: string;
}

interface UserRegistrationProps {
  onComplete: (data: { name: string; phone: string; emergencyContacts: EmergencyContact[] }) => void;
  onBack: () => void;
}

const phoneSchema = z.string().regex(/^\d{10}$/, "Enter valid 10-digit number");
const nameSchema = z.string().min(2, "Name too short").max(50, "Name too long");

const UserRegistration = ({ onComplete, onBack }: UserRegistrationProps) => {
  const [step, setStep] = useState<"name" | "phone" | "contacts" | "success">("name");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    { name: "", phone: "" },
  ]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateName = () => {
    const result = nameSchema.safeParse(name.trim());
    if (!result.success) {
      setErrors({ name: result.error.errors[0].message });
      return false;
    }
    setErrors({});
    return true;
  };

  const validatePhone = () => {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      setErrors({ phone: result.error.errors[0].message });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateContacts = () => {
    const validContacts = emergencyContacts.filter(
      (c) => c.name.trim() && c.phone.length === 10
    );
    if (validContacts.length === 0) {
      setErrors({ contacts: "Add at least one emergency contact" });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleNameSubmit = () => {
    if (validateName()) {
      setStep("phone");
    }
  };

  const handlePhoneSubmit = () => {
    if (validatePhone()) {
      setStep("contacts");
    }
  };

  const handleContactsSubmit = () => {
    if (validateContacts()) {
      setStep("success");
      const validContacts = emergencyContacts.filter(
        (c) => c.name.trim() && c.phone.length === 10
      );
      setTimeout(() => {
        onComplete({
          name: name.trim(),
          phone,
          emergencyContacts: validContacts,
        });
      }, 2000);
    }
  };

  const addContact = () => {
    if (emergencyContacts.length < 5) {
      setEmergencyContacts([...emergencyContacts, { name: "", phone: "" }]);
    }
  };

  const removeContact = (index: number) => {
    if (emergencyContacts.length > 1) {
      setEmergencyContacts(emergencyContacts.filter((_, i) => i !== index));
    }
  };

  const updateContact = (index: number, field: "name" | "phone", value: string) => {
    const updated = [...emergencyContacts];
    if (field === "phone") {
      updated[index][field] = value.replace(/\D/g, "").slice(0, 10);
    } else {
      updated[index][field] = value;
    }
    setEmergencyContacts(updated);
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
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">Set Up Profile</h1>
          <p className="text-sm text-muted-foreground">Your safety starts here</p>
        </div>
      </motion.div>

      {/* Progress Indicator */}
      <motion.div
        className="flex items-center justify-center gap-2 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {["name", "phone", "contacts"].map((s, i) => (
          <div key={s} className="flex items-center">
            <motion.div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step === s || (step === "success" && i < 3)
                  ? "gradient-primary text-primary-foreground"
                  : step === "success" || 
                    (step === "phone" && i === 0) ||
                    (step === "contacts" && i <= 1)
                  ? "bg-success text-success-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
              animate={step === s ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {(step === "success" || 
                (step === "phone" && i === 0) ||
                (step === "contacts" && i <= 1)) ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                i + 1
              )}
            </motion.div>
            {i < 2 && (
              <div
                className={`w-8 h-0.5 mx-1 ${
                  (step === "phone" && i === 0) ||
                  (step === "contacts" && i <= 1) ||
                  step === "success"
                    ? "bg-success"
                    : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        {/* Step 1: Name */}
        {step === "name" && (
          <motion.div
            key="name"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <motion.div
              className="w-20 h-20 mx-auto rounded-2xl gradient-primary flex items-center justify-center shadow-glow"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <User className="w-10 h-10 text-primary-foreground" />
            </motion.div>

            <div className="text-center">
              <h2 className="text-xl font-bold font-display text-foreground">
                What's your name?
              </h2>
              <p className="text-muted-foreground mt-2">
                We'll use this to personalize your experience
              </p>
            </div>

            <div className="bg-card rounded-2xl p-4 shadow-soft">
              <label className="text-sm text-muted-foreground mb-2 block">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-muted rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                maxLength={50}
              />
              {errors.name && (
                <p className="text-destructive text-sm mt-2">{errors.name}</p>
              )}
            </div>

            <motion.button
              onClick={handleNameSubmit}
              disabled={!name.trim()}
              className="w-full py-4 rounded-2xl gradient-primary text-primary-foreground font-bold text-lg shadow-glow flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}

        {/* Step 2: Phone */}
        {step === "phone" && (
          <motion.div
            key="phone"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <motion.div
              className="w-20 h-20 mx-auto rounded-2xl gradient-primary flex items-center justify-center shadow-glow"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Phone className="w-10 h-10 text-primary-foreground" />
            </motion.div>

            <div className="text-center">
              <h2 className="text-xl font-bold font-display text-foreground">
                Your phone number
              </h2>
              <p className="text-muted-foreground mt-2">
                This helps officers reach you during emergencies
              </p>
            </div>

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
                  placeholder="10 digit number"
                  className="flex-1 bg-muted rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                />
              </div>
              {errors.phone && (
                <p className="text-destructive text-sm mt-2">{errors.phone}</p>
              )}
            </div>

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

        {/* Step 3: Emergency Contacts */}
        {step === "contacts" && (
          <motion.div
            key="contacts"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <motion.div
              className="w-20 h-20 mx-auto rounded-2xl gradient-primary flex items-center justify-center shadow-glow"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-10 h-10 text-primary-foreground" />
            </motion.div>

            <div className="text-center">
              <h2 className="text-xl font-bold font-display text-foreground">
                Emergency Contacts
              </h2>
              <p className="text-muted-foreground mt-2">
                They'll be notified during emergencies
              </p>
            </div>

            <div className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <motion.div
                  key={index}
                  className="bg-card rounded-2xl p-4 shadow-soft"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-foreground">
                      Contact {index + 1}
                    </span>
                    {emergencyContacts.length > 1 && (
                      <button
                        onClick={() => removeContact(index)}
                        className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <input
                      type="text"
                      value={contact.name}
                      onChange={(e) => updateContact(index, "name", e.target.value)}
                      placeholder="Contact name"
                      className="w-full bg-muted rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      maxLength={50}
                    />
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-3 bg-muted rounded-xl text-foreground text-sm">
                        +91
                      </div>
                      <input
                        type="tel"
                        value={contact.phone}
                        onChange={(e) => updateContact(index, "phone", e.target.value)}
                        placeholder="Phone number"
                        className="flex-1 bg-muted rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {errors.contacts && (
              <p className="text-destructive text-sm text-center">{errors.contacts}</p>
            )}

            {emergencyContacts.length < 5 && (
              <button
                onClick={addContact}
                className="w-full py-3 rounded-2xl border-2 border-dashed border-primary/30 text-primary font-medium flex items-center justify-center gap-2"
              >
                <UserPlus className="w-5 h-5" />
                Add Another Contact
              </button>
            )}

            <motion.button
              onClick={handleContactsSubmit}
              className="w-full py-4 rounded-2xl gradient-primary text-primary-foreground font-bold text-lg shadow-glow flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Complete Setup
              <CheckCircle className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}

        {/* Success */}
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
                Welcome, {name}!
              </h2>
              <p className="text-muted-foreground mt-2">
                Your safety profile is ready 🌸
              </p>
            </motion.div>

            <motion.div
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span>{emergencyContacts.filter(c => c.name && c.phone).length} emergency contacts added</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserRegistration;
