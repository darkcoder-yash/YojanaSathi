import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { ArrowLeft, Shield } from "lucide-react";
import logo from "@/assets/logo.png";
import { translations } from "@/data/translations";

const OTPVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useApp();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isExpired, setIsExpired] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const t = translations[language].otp;

  // Upgrade 1: Read stored data for refresh fallback
  const storedData = JSON.parse(localStorage.getItem("otpData") || "{}");
  const input = location.state?.input || storedData.value || "";
  const method = location.state?.method || storedData.method || "phone";

  useEffect(() => {
    // Redirect back to login if no state or local data is provided
    if (!input) {
      navigate("/login");
      return;
    }
    
    // Upgrade 5: Focus first box on page load
    inputRefs.current[0]?.focus();
  }, [input, navigate]);

  const performVerification = (enteredOTP: string) => {
    if (enteredOTP.length < 6) {
      setError(t.errorComplete);
      return;
    }

    try {
      const storedDataStr = localStorage.getItem("otpData");
      if (!storedDataStr) {
        setError(t.errorExpired);
        return;
      }

      const currentStoredData = JSON.parse(storedDataStr);

      // Upgrade 4: Better OTP Expiry Handling
      if (Date.now() > currentStoredData.expiry) {
        setError("OTP expired. Please request a new one.");
        setIsExpired(true);
        return;
      }

      if (enteredOTP !== currentStoredData.otp) {
        setError(t.errorInvalid);
        return;
      }

      // Valid OTP
      localStorage.removeItem("otpData");
      navigate("/profile-setup");
    } catch (err) {
      setError("An error occurred during verification.");
    }
  };

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    setError("");

    // Move to next input if there's a value
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }

    // Upgrade 3: Auto verify when 6 digits entered
    if (newOtp.join("").length === 6) {
      performVerification(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      if (i < 6) newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    setError("");

    // Upgrade 3: Auto verify on paste if 6 digits
    if (newOtp.join("").length === 6) {
      performVerification(newOtp.join(""));
      return;
    }

    // Focus last filled input or next empty one
    const focusIndex = Math.min(pastedData.length, 5);
    if (inputRefs.current[focusIndex]) {
        inputRefs.current[focusIndex]?.focus();
    } else if (inputRefs.current[5]) {
        inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    performVerification(otp.join(""));
  };

  const handleResend = () => {
    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    
    localStorage.setItem(
      "otpData",
      JSON.stringify({
        value: input,
        method: method,
        otp: generatedOTP,
        expiry: Date.now() + 2 * 60 * 1000
      })
    );

    console.log("New Demo OTP:", generatedOTP);
    setOtp(["", "", "", "", "", ""]);
    setError("");
    setIsExpired(false); // Upgrade 4: Reset expiry state
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col px-4 py-6">
      <button
        onClick={() => navigate("/login")}
        className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors mb-6 self-start"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">{t.backToLogin}</span>
      </button>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm mx-auto animate-slide-up">
        {/* Logo small */}
        <div className="w-16 h-16 rounded-full bg-card shadow-card flex items-center justify-center mb-6 overflow-hidden">
          <img src={logo} alt="YojanaSathi" className="w-12 h-12 object-contain" />
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-1">{t.title}</h2>
        <p className="text-sm text-muted-foreground mb-8 text-center">
          {t.subtitle}<br/>
          <span className="font-medium text-foreground">{input}</span>
        </p>

        {/* OTP Form */}
        <div className="w-full bg-card rounded-xl shadow-card p-6 mb-4">
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={`w-12 h-14 text-center text-xl font-bold bg-background border ${error ? 'border-red-500' : 'border-input'} rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all`}
                  maxLength={1}
                />
              ))}
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              disabled={isExpired}
              className={`w-full gradient-saffron text-primary-foreground font-semibold py-3.5 rounded-lg hover:opacity-90 active:scale-[0.98] transition-all text-sm ${isExpired ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {t.verify}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">{t.didNotReceive}</p>
            <button
              type="button"
              onClick={handleResend}
              className="text-sm font-semibold text-secondary hover:text-secondary/80 transition-colors"
            >
              {t.resend}
            </button>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="flex items-center gap-2 mt-auto px-4 py-3 rounded-lg bg-green-light">
          <Shield className="w-4 h-4 text-secondary flex-shrink-0" />
          <p className="text-xs text-foreground">
            {t.privacy}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
