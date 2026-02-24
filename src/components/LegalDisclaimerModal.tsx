import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, X } from "lucide-react";

interface LegalDisclaimerModalProps {
  onAccept: () => void;
  onDecline: () => void;
}

const LegalDisclaimerModal = ({ onAccept, onDecline }: LegalDisclaimerModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("legalDisclaimerAccepted");
    if (!hasAccepted) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("legalDisclaimerAccepted", "true");
    setIsOpen(false);
    onAccept();
  };

  const handleDecline = () => {
    setIsOpen(false);
    onDecline();
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 80 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      scale: 0.85,
      y: 80,
      transition: { duration: 0.3 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999]"
            onClick={handleDecline}
          />

          {/* Center Wrapper */}
          <div className="fixed inset-0 z-[10000] flex items-center justify-center px-4">

            {/* Modal */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-t-4 border-[#C9A646]">

                {/* Header */}
                <div className="relative bg-gradient-to-r from-[#0F172A] to-[#1E293B] p-6 text-white">
                  <button
                    onClick={handleDecline}
                    className="absolute right-4 top-4 text-white/60 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#C9A646]/20 rounded-full flex items-center justify-center">
                      <Scale className="w-6 h-6 text-[#C9A646]" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Legal Disclaimer</h2>
                      <p className="text-sm text-gray-300">
                        Please read carefully before proceeding
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 space-y-4 text-gray-700">

                  <p className="text-sm leading-relaxed">
                    The rules of the Bar Council of India prohibit law firms from
                    advertising and soliciting work through communication in the public domain.
                  </p>

                  <p className="text-sm leading-relaxed">
                    This website is meant solely for the purpose of information and
                    not for the purpose of advertising.
                    <span className="font-semibold text-[#C9A646]">
                      {" "}J. Ashish Associates LLP
                    </span>{" "}
                    does not intend to solicit clients through this website.
                  </p>

                  <p className="text-sm leading-relaxed">
                    We do not take responsibility for decisions taken by the reader
                    based solely on the information provided in the website.
                  </p>

                  <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-[#C9A646]">
                    <p className="text-sm text-gray-600 italic">
                      By clicking <span className="font-semibold text-[#C9A646]">AGREE</span>,
                      you acknowledge that the information:
                    </p>

                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                      <li>• does not amount to advertising or solicitation</li>
                      <li>• is only for understanding about our services</li>
                    </ul>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAccept}
                      className="flex-1 px-6 py-3 bg-[#C9A646] text-white font-semibold rounded-lg hover:bg-[#0F172A] transition-all duration-500"
                    >
                      AGREE
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDecline}
                      className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-500"
                    >
                      DECLINE
                    </motion.button>
                  </div>

                  <p className="text-xs text-center text-gray-400 mt-4">
                    This is required under Bar Council of India rules.
                  </p>

                </div>
              </div>
            </motion.div>

          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LegalDisclaimerModal;