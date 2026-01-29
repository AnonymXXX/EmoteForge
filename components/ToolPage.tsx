import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactGA from 'react-ga4';
import { Info, Lock, Monitor, ServerOff, Sparkles, Youtube, Zap } from 'lucide-react';
import UploadZone from './UploadZone';
import ResultsGrid from './ResultsGrid';
import CookieBanner from './CookieBanner';
import SeoArticle from './SeoArticle';
import { resizeImage, fileToDataUrl } from '../services/imageService';
import { ResizedImage, ProcessingState, PlatformSize } from '../types';
import { TwitchLogo, DiscordLogo } from './BrandIcons';
import { defaultPlatform, platforms } from '../data/platforms';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
    <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
    <div className="w-12 h-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center mb-6 text-slate-700 relative z-10 shadow-sm">
      {icon}
    </div>
    <h4 className="font-bold text-slate-900 mb-2 relative z-10">{title}</h4>
    <p className="text-sm text-slate-500 leading-relaxed relative z-10">{description}</p>
  </div>
);

const getPlatformIcon = (key: string) => {
  switch (key) {
    case 'twitch':
      return <TwitchLogo className="w-8 h-8 fill-white" />;
    case 'discord':
      return <DiscordLogo className="w-9 h-7 fill-white" />;
    case 'youtube':
      return <Youtube className="w-8 h-8" />;
    case 'slack':
      return <Sparkles className="w-8 h-8" />;
    case 'kick':
      return <Zap className="w-8 h-8" />;
    default:
      return <Info className="w-8 h-8" />;
  }
};

const PlatformInfoSection: React.FC<{ sizeGroups: typeof defaultPlatform.sizeGroups }> = ({ sizeGroups }) => (
  <div className="mb-24">
    <div className="text-center mb-12">
      <h3 className="text-3xl font-bold text-slate-900 mb-3">Target Sizes</h3>
      <p className="text-slate-500">We automatically resize your artwork to these official specs.</p>
    </div>
    <div
      className={`grid gap-6 ${
        sizeGroups.length === 1 ? 'md:grid-cols-1 md:justify-items-center' : 'md:grid-cols-2'
      }`}
    >
      {sizeGroups.map((group) => (
        <div
          key={group.key}
          className={`bg-white rounded-2xl p-8 border border-slate-100 shadow-sm relative overflow-hidden group ${
            sizeGroups.length === 1 ? 'w-full max-w-xl' : ''
          }`}
        >
          <div
            className="absolute top-0 right-0 w-32 h-32 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"
            style={{ backgroundColor: `${group.themeColor}0D` }}
          ></div>
          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div
              className="w-14 h-14 text-white flex items-center justify-center rounded-2xl shadow-lg"
              style={{ backgroundColor: group.themeColor }}
            >
              {getPlatformIcon(group.key)}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-xl">{group.label}</h3>
              <p className="text-xs font-bold uppercase tracking-wider mt-1" style={{ color: group.themeColor }}>
                Size Guidelines
              </p>
            </div>
          </div>
          <ul className="space-y-4 relative z-10">
            <li className="flex items-center justify-between text-sm border-b border-slate-50 pb-3">
              <span className="text-slate-500 font-medium">Required Sizes</span>
              <span className="text-slate-900 font-bold">{group.sizes.join(', ')}px</span>
            </li>
            <li className="flex items-center justify-between text-sm border-b border-slate-50 pb-3">
              <span className="text-slate-500 font-medium">File Format</span>
              <span className="text-slate-900 font-bold">PNG</span>
            </li>
            <li className="flex items-center justify-between text-sm">
              <span className="text-slate-500 font-medium">Shape</span>
              <span className="text-slate-900 font-bold">Square (1:1)</span>
            </li>
          </ul>
        </div>
      ))}
    </div>
  </div>
);

const ToolPage: React.FC = () => {
  const { slug } = useParams();
  const location = useLocation();
  const [resizedImages, setResizedImages] = useState<ResizedImage[]>([]);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [baseName, setBaseName] = useState<string>('emote');
  const [status, setStatus] = useState<ProcessingState>({
    isResizing: false
  });
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const platformConfig = useMemo(() => {
    if (!slug) return defaultPlatform;
    return platforms.find((platform) => platform.slug === slug) ?? defaultPlatform;
  }, [slug]);

  const sizes: PlatformSize[] = useMemo(() => {
    return platformConfig.sizeGroups.flatMap((group) =>
      group.sizes.map((size) => ({ platform: group.key, size }))
    );
  }, [platformConfig]);

  const sections = useMemo(
    () =>
      platformConfig.sizeGroups.map((group) => ({
        key: group.key,
        title: group.label,
        icon: getPlatformIcon(group.key),
        themeColor: group.themeColor
      })),
    [platformConfig]
  );

  useEffect(() => {
    ReactGA.initialize('G-VK0CB4WH37');
  }, []);

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname });
  }, [location.pathname]);

  useEffect(() => {
    if (resizedImages.length > 0 && !status.isResizing) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [resizedImages, status.isResizing]);

  const handleFileSelect = async (file: File) => {
    setResizedImages([]);
    setOriginalImage(null);
    setError(null);
    setStatus({ isResizing: true });

    const name = file.name.split('.')[0].replace(/[^a-zA-Z0-9_-]/g, '_');
    setBaseName(name);

    try {
      const dataUrl = await fileToDataUrl(file);
      setOriginalImage(dataUrl);

      resizeImage(file, sizes)
        .then((images) => {
          setResizedImages(images);
          setStatus({ isResizing: false });
        })
        .catch((err) => {
          console.error(err);
          setError('Failed to resize images. Please try a valid image file.');
          setStatus({ isResizing: false });
        });
    } catch (err) {
      console.error(err);
      setError('An error occurred while processing the file.');
      setStatus({ isResizing: false });
    }
  };

  return (
    <div className="min-h-screen text-slate-800 pb-20 relative overflow-hidden">
      <Helmet>
        <title>{platformConfig.title}</title>
        <meta name="description" content={platformConfig.description} />
      </Helmet>

      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-200/20 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-[20%] left-[20%] w-96 h-96 bg-pink-200/20 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/50 bg-white/70 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="EmoteForge logo" className="h-9 w-9 object-contain" />
            <span className="text-lg font-bold tracking-tight text-slate-900">EmoteForge</span>
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
          {platformConfig.isDefault ? (
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight text-slate-900 leading-[1.05]">
              Perfect emotes,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                pixel perfect.
              </span>
            </h1>
          ) : (
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-slate-900 leading-[1.1]">
              {platformConfig.h1Prefix ? `${platformConfig.h1Prefix} ` : ''}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: platformConfig.accentGradient
                    ? `linear-gradient(90deg, ${platformConfig.accentGradient.from}, ${platformConfig.accentGradient.to})`
                    : undefined
                }}
              >
                {platformConfig.h1Highlight ?? platformConfig.h1}
              </span>
              {platformConfig.h1Suffix ? ` ${platformConfig.h1Suffix}` : ''}
            </h1>
          )}
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            {platformConfig.description}
          </p>
        </div>

        {/* Upload Area */}
        <div className="mb-20">
          <UploadZone onFileSelected={handleFileSelect} isProcessing={status.isResizing} />
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-center text-sm font-medium animate-in slide-in-from-top-2">
              {error}
            </div>
          )}
        </div>

        {/* Results Area */}
        {(originalImage || status.isResizing) && (
          <div ref={resultsRef} className="space-y-16 animate-in fade-in duration-700 scroll-mt-24 mb-24">
            {resizedImages.length > 0 ? (
              <ResultsGrid images={resizedImages} baseName={baseName} sections={sections} />
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

        <PlatformInfoSection sizeGroups={platformConfig.sizeGroups} />

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

        <SeoArticle
          title={platformConfig.seoTitle}
          intro={platformConfig.seoIntro}
          steps={platformConfig.seoSteps}
          specs={
            platformConfig.specsRows ??
            platformConfig.sizeGroups.map((group) => ({
              platform: group.label,
              type: 'Emotes',
              dimensions: group.sizes.join(', '),
              maxFileSize: group.maxFileSize,
              note: 'Square'
            }))
          }
          faq={platformConfig.seoFaq}
        />
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-transparent py-12 relative z-10">
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center">
          <div className="flex items-center gap-1.5 mb-6 opacity-80 grayscale hover:grayscale-0 transition-all">
            <img src="/logo.png" alt="EmoteForge logo" className="h-7 w-7 object-contain" />
            <span className="font-bold text-slate-900">EmoteForge</span>
          </div>

          <div className="flex justify-center gap-8 text-slate-500 text-sm font-medium mb-8">
            <a href="/privacy.html" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="/terms.html" className="hover:text-slate-900 transition-colors">Terms of Service</a>
            <a href="mailto:melancholyzzzzz17@gmail.com" className="hover:text-slate-900 transition-colors">Contact</a>
          </div>
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} EmoteForge. All processing is performed client-side.
          </p>
        </div>
      </footer>

      <CookieBanner />
    </div>
  );
};

export default ToolPage;
