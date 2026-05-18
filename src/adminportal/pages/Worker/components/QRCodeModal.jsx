import React from 'react';
import { motion } from 'framer-motion';
import { X, Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const QRCodeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const downloadQRCode = () => {
    const svg = document.getElementById('worker-qr-code');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'worker-application-qr.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Worker Application QR Code</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="bg-gray-50/50 rounded-2xl p-8 flex items-center justify-center mb-6 border border-gray-100">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <QRCodeSVG
              id="worker-qr-code"
              value="https://ndatechnology.in/public/worker-inquiry/697ce60cac25c1f712b6cfcc"
              size={200}
              level="H"
              includeMargin={false}
            />
          </div>
        </div>

        <button
          onClick={downloadQRCode}
          className="w-full py-3 bg-[#0066cc] text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
        >
          Download
        </button>
      </motion.div>
    </div>
  );
};

export default QRCodeModal;
