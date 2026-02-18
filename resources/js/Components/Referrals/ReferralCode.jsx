import { useState } from "react";
import { Copy, CheckCircle, Share2 } from "lucide-react";

export default function ReferralCode({ referralCode }) {
    const [copied, setCopied] = useState(false);

    const handleCopyReferral = () => {
        navigator.clipboard.writeText(referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShareReferral = () => {
        const shareText = `¡Únete usando mi código de referido: ${referralCode}!`;
        const shareUrl = `${window.location.origin}/register?ref=${referralCode}`;

        if (navigator.share) {
            // API de compartir nativa (móvil)
            navigator.share({
                title: "Código de Referido",
                text: shareText,
                url: shareUrl,
            }).catch((err) => console.log("Error al compartir:", err));
        } else {
            // Fallback: copiar enlace
            navigator.clipboard.writeText(shareUrl);
            alert("Enlace de referido copiado al portapapeles");
        }
    };

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur p-8">
            <p className="text-amber-400 font-medium mb-3">
                Tu código de referido
            </p>

            <div className="flex items-center justify-between bg-slate-800 border border-slate-700 rounded-xl px-4 py-3">
                <code className="text-amber-400 font-semibold tracking-wider">
                    {referralCode || "Cargando..."}
                </code>

                <div className="flex items-center gap-3">
                    
                    <button
                        onClick={handleCopyReferral}
                        disabled={!referralCode}
                        className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Copiar código"
                    >
                        {copied ? (
                            <CheckCircle size={18} className="text-green-400" />
                        ) : (
                            <Copy size={18} className="text-slate-300" />
                        )}
                    </button>

                    <button
                        onClick={handleShareReferral}
                        disabled={!referralCode}
                        className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Compartir código"
                    >
                        <Share2 size={18} className="text-slate-300" />
                    </button>
                </div>
            </div>
        </div>
    );
}