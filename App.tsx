import React, { useState, useRef, useEffect } from 'react';
import UploadZone from './components/UploadZone';
import ResultsGrid from './components/ResultsGrid';
import { resizeImage, fileToDataUrl } from './services/imageService';
import { ResizedImage, ProcessingState, PlatformSize } from './types';
import { Image as ImageIcon, Lock, Zap, ServerOff, Monitor, Download, Info } from 'lucide-react';
import Modal, { PrivacyContent, TermsContent, ContactContent } from './components/LegalModals';
import { TwitchLogo, DiscordLogo } from './components/BrandIcons';

const SIZES: PlatformSize[] = [
  { platform: 'twitch', size: 112 },
  { platform: 'twitch', size: 56 },
  { platform: 'twitch', size: 28 },
  { platform: 'discord', size: 128 },
  { platform: 'discord', size: 32 },
];

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
      <div className="w-12 h-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center mb-6 text-slate-700 relative z-10 shadow-sm">
          {icon}
      </div>
      <h4 className="font-bold text-slate-900 mb-2 relative z-10">{title}</h4>
      <p className="text-sm text-slate-500 leading-relaxed relative z-10">
          {description}
      </p>
  </div>
);

const PlatformInfoSection = () => (
    <div className="mb-24">
        <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-3">Platform Standards</h3>
            <p className="text-slate-500">We automatically resize your emotes to meet these official specifications.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
            {/* Twitch Card */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm relative overflow-hidden group hover:border-[#9146FF]/30 transition-colors">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#9146FF]/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                
                <div className="flex items-center gap-4 mb-8 relative z-10">
                    <div className="w-14 h-14 bg-[#9146FF] text-white flex items-center justify-center rounded-2xl shadow-lg shadow-[#9146FF]/20">
                        <TwitchLogo className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 text-xl">Twitch</h3>
                        <p className="text-xs font-bold text-[#9146FF] uppercase tracking-wider mt-1">Emote Guidelines</p>
                    </div>
                </div>
                
                <ul className="space-y-4 relative z-10">
                    {[
                        { label: 'Required Sizes', value: '112px, 56px, 28px' },
                        { label: 'File Format', value: 'PNG (Transparent)' },
                        { label: 'Max File Size', value: '1MB' },
                        { label: 'Shape', value: 'Square (1:1 Ratio)' },
                    ].map((item, i) => (
                        <li key={i} className="flex items-center justify-between text-sm border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                            <span className="text-slate-500 font-medium">{item.label}</span>
                            <span className="text-slate-900 font-bold">{item.value}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Discord Card */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm relative overflow-hidden group hover:border-[#5865F2]/30 transition-colors">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#5865F2]/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                
                <div className="flex items-center gap-4 mb-8 relative z-10">
                    <div className="w-14 h-14 bg-[#5865F2] text-white flex items-center justify-center rounded-2xl shadow-lg shadow-[#5865F2]/20">
                        <DiscordLogo className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 text-xl">Discord</h3>
                        <p className="text-xs font-bold text-[#5865F2] uppercase tracking-wider mt-1">Emote Guidelines</p>
                    </div>
                </div>

                <ul className="space-y-4 relative z-10">
                    {[
                        { label: 'Upload Size', value: '128x128px (Recommended)' },
                        { label: 'Display Size', value: '32x32px' },
                        { label: 'Max File Size', value: '256KB' },
                        { label: 'Naming', value: 'Alphanumeric Only' },
                    ].map((item, i) => (
                        <li key={i} className="flex items-center justify-between text-sm border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                            <span className="text-slate-500 font-medium">{item.label}</span>
                            <span className="text-slate-900 font-bold">{item.value}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
);

const App: React.FC = () => {
  const [resizedImages, setResizedImages] = useState<ResizedImage[]>([]);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [baseName, setBaseName] = useState<string>('emote');
  const [status, setStatus] = useState<ProcessingState>({
    isResizing: false,
  });
  const [error, setError] = useState<string | null>(null);
  
  // Modal State
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'contact' | null>(null);

  // Scroll Ref
  const resultsRef = useRef<HTMLDivElement>(null);

  // Auto-scroll when images are ready
  useEffect(() => {
    if (resizedImages.length > 0 && !status.isResizing) {
        // Small timeout to ensure DOM render
        setTimeout(() => {
            resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
  }, [resizedImages, status.isResizing]);

  const handleFileSelect = async (file: File) => {
    // Reset state
    setResizedImages([]);
    setOriginalImage(null);
    setError(null);
    setStatus({ isResizing: true });

    // Set base name from file name (sanitize it)
    const name = file.name.split('.')[0].replace(/[^a-zA-Z0-9_-]/g, '_');
    setBaseName(name);

    try {
        // 1. Load and display original immediately
        const dataUrl = await fileToDataUrl(file);
        setOriginalImage(dataUrl);

        // 2. Start resizing logic (Pica High Quality)
        resizeImage(file, SIZES).then((images) => {
            setResizedImages(images);
            setStatus({ isResizing: false });
        }).catch(err => {
            console.error(err);
            setError("Failed to resize images. Please try a valid image file.");
            setStatus({ isResizing: false });
        });

    } catch (err) {
        console.error(err);
        setError("An error occurred while processing the file.");
        setStatus({ isResizing: false });
    }
  };

  return (
    <div className="min-h-screen text-slate-800 pb-20 relative overflow-hidden">
      
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-200/20 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob"></div>
          <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-[20%] left-[20%] w-96 h-96 bg-pink-200/20 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/50 bg-white/70 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="bg-slate-900 text-white p-2 rounded-xl shadow-lg shadow-slate-200">
                <ImageIcon size={18} />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900">
              EmoteForge
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-600">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/50 rounded-full border border-slate-200/60 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                <span>Browser Secure</span>
              </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-16 relative z-10">
        
        {/* Intro */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/5 border border-slate-900/10 text-slate-600 text-xs font-semibold mb-6 uppercase tracking-wide">
             <Monitor size={12} />
             <span>For Streamers & Community Managers</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight text-slate-900 leading-[1.1]">
            Perfect emotes,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">pixel perfect.</span>
          </h2>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            The professional tool to resize your artwork for Twitch & Discord. 
            High-quality downscaling that keeps your art sharp.
          </p>
        </div>

        {/* Upload Area */}
        <div className="mb-20">
            <UploadZone 
                onFileSelected={handleFileSelect} 
                isProcessing={status.isResizing} 
            />
            {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-center text-sm font-medium animate-in slide-in-from-top-2">
                    {error}
                </div>
            )}
        </div>

        {/* Results Area */}
        {(originalImage || status.isResizing) && (
             <div ref={resultsRef} className="space-y-16 animate-in fade-in duration-700 scroll-mt-24 mb-24">
                {/* Resized Images Grid */}
                {resizedImages.length > 0 ? (
                    <ResultsGrid 
                        images={resizedImages} 
                        baseName={baseName} 
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-slate-100 shadow-sm">
                        <div className="animate-spin mb-4">
                           <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-900 rounded-full"></div>
                        </div>
                        <p className="text-slate-500 font-medium">Forging emotes...</p>
                    </div>
                )}
             </div>
        )}

        {/* Platform Info Section */}
        <PlatformInfoSection />

        {/* Safety Section - Feature Cards */}
        <div className="mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-2 text-center">Built for performance & privacy</h3>
            <p className="text-center text-slate-500 mb-12">No servers. No tracking. Just code running in your browser.</p>
            
            <div className="grid md:grid-cols-3 gap-6">
                <FeatureCard 
                    icon={<ServerOff size={24} strokeWidth={1.5} />}
                    title="Serverless"
                    description="Your images never touch our servers. Processing happens locally on your device."
                />
                    <FeatureCard 
                    icon={<Lock size={24} strokeWidth={1.5} />}
                    title="Zero Data Collection"
                    description="We don't track your uploads, save your files, or sell your data. 100% private."
                />
                    <FeatureCard 
                    icon={<Zap size={24} strokeWidth={1.5} />}
                    title="Smart Resizing"
                    description="Uses multi-step downscaling algorithms to ensure your pixel art stays crisp."
                />
            </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white/50 py-12 relative z-10">
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center">
             <div className="flex items-center gap-2 mb-6 opacity-80 grayscale hover:grayscale-0 transition-all">
                <div className="bg-slate-900 p-1.5 rounded">
                     <ImageIcon size={16} className="text-white" />
                </div>
                <span className="font-bold text-slate-900">EmoteForge</span>
             </div>
             
             <div className="flex justify-center gap-8 text-slate-500 text-sm font-medium mb-8">
                <button onClick={() => setActiveModal('privacy')} className="hover:text-slate-900 transition-colors">Privacy Policy</button>
                <button onClick={() => setActiveModal('terms')} className="hover:text-slate-900 transition-colors">Terms of Service</button>
                <button onClick={() => setActiveModal('contact')} className="hover:text-slate-900 transition-colors">Contact</button>
             </div>
             <p className="text-xs text-slate-400">
                &copy; {new Date().getFullYear()} EmoteForge. All processing is performed client-side.
             </p>
        </div>
      </footer>

      {/* Modals */}
      <Modal isOpen={activeModal === 'privacy'} onClose={() => setActiveModal(null)} title="Privacy Policy">
        <PrivacyContent />
      </Modal>
      <Modal isOpen={activeModal === 'terms'} onClose={() => setActiveModal(null)} title="Terms of Service">
        <TermsContent />
      </Modal>
      <Modal isOpen={activeModal === 'contact'} onClose={() => setActiveModal(null)} title="Contact Us">
        <ContactContent />
      </Modal>

    </div>
  );
};

export default App;