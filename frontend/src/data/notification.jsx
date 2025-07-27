export const notificationLabels = {
  en: {
    success: "Payment Success",
    pending: "Payment Pending",
    warning: "Warning",
    message: "You have an outstanding payment due. Please settle it at your earliest convenience.",
  },
  si: {
    success: "ගෙවීම සාර්ථකයි",
    pending: "ගෙවීම බලාපොරොත්තුයි",
    warning: "අවවාදයයි",
    message: "ඔබට ගෙවිය යුතු මුදලක් ඇත. කරුණාකර ඉක්මනින් ගෙවන්න.",
  },
  ta: {
    success: "கட்டணம் வெற்றி",
    pending: "கட்டணம் நிலுவையில்",
    warning: "எச்சரிக்கை",
    message: "நீங்கள் செலுத்த வேண்டிய கட்டணம் உள்ளது. தயவுசெய்து விரைவில் செலுத்தவும்.",
  },
};

export const notifications = [
  {
    type: "success",
    icon: "✅",
    className: "bg-green-100 text-green-900",
    roles: ["ShopOwner"],
  },
  {
    type: "pending",
    icon: "⚠️",
    className: "bg-yellow-100 text-yellow-900",
    roles: ["ShopOwner"],
  },
  {
    type: "warning",
    icon: "❌",
    className: "bg-red-100 text-red-900",
    roles: ["ShopOwner"],
  },
];
