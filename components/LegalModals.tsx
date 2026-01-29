import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl relative z-10 flex flex-col animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
            <X size={20} />
          </button>
        </div>
        <div className="p-8 overflow-y-auto">
          <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-800 prose-p:text-slate-600 prose-a:text-emerald-600">
            {children}
          </div>
        </div>
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
             <button onClick={onClose} className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors">
                Close
             </button>
        </div>
      </div>
    </div>
  );
};

export const PrivacyContent = () => (
    <>
        <p>Last Updated: {new Date().toLocaleDateString()}</p>
        <p>At EmoteForge, we prioritize your privacy above all else. This Privacy Policy explains how we handle your data.</p>
        
        <h3>1. Data Collection</h3>
        <p><strong>We do not collect, store, or transmit your images.</strong></p>
        <p>EmoteForge operates entirely as a client-side application. When you upload an image, it is processed directly within your web browser using HTML5 Canvas technology. Your files never leave your device and are never uploaded to any external server.</p>

        <h3>2. Analytics</h3>
        <p>We may use basic, anonymous analytics (such as plausible.io or similar privacy-focused tools) to count site visits. We do not track individual users or use persistent cookies for ad targeting.</p>

        <h3>3. Local Storage</h3>
        <p>We do not use cookies or local storage to save your personal data. Any settings or files are cleared from memory as soon as you refresh or close the tab.</p>
    </>
);

export const TermsContent = () => (
    <>
        <p>By using EmoteForge, you agree to the following terms:</p>

        <h3>1. Service Utility</h3>
        <p>EmoteForge is a free tool provided "as is". While we strive for high-quality output, we cannot guarantee that the resized images will meet the specific, changing requirements of third-party platforms (Twitch, Discord) at all times.</p>

        <h3>2. User Responsibility</h3>
        <p>You retain full ownership and copyright of any images you process. You are solely responsible for ensuring you have the right to resize and use the images you upload. EmoteForge assumes no liability for copyright infringement committed by users.</p>

        <h3>3. No Warranty</h3>
        <p>We make no warranties regarding the uptime, availability, or accuracy of this service. We are not liable for any data loss or damages resulting from the use of this tool.</p>
    </>
);

export const ContactContent = () => (
    <>
        <h3>Get in Touch</h3>
        <p>Have questions, feature requests, or bug reports? We'd love to hear from you.</p>
        
        <p><strong>Email Support:</strong><br/>
        <a href="mailto:melancholyzzzzz17@gmail.com">melancholyzzzzz17@gmail.com</a></p>
        
        <p><strong>X:</strong><br/>
        <a href="https://x.com/CChan86750" target="_blank" rel="noopener noreferrer">@CChan86750</a></p>
        
        <p className="text-sm text-slate-500 mt-8">Please note: Since we do not store your images, we cannot help recover lost files. Please ensure you download your work before closing the tab.</p>
    </>
);

export default Modal;