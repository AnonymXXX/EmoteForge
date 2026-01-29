import React from 'react';
import { Download, Package, CheckCircle2, Sparkles } from 'lucide-react';
import { ResizedImage } from '../types';
import { TwitchLogo, DiscordLogo } from './BrandIcons';
import JSZip from 'jszip';
import FileSaver from 'file-saver';

interface ResultsGridProps {
  images: ResizedImage[];
  baseName: string;
}

interface ResultSectionProps {
  title: string;
  icon: React.ReactNode;
  themeColor: string; // Hex color
  items: ResizedImage[];
  onDownload: (img: ResizedImage) => void;
  onDownloadZip: () => void;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

const ResultSection = ({ title, icon, themeColor, items, onDownload, onDownloadZip }: ResultSectionProps) => (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-card overflow-hidden flex flex-col h-full hover:shadow-card-hover transition-shadow duration-300">
        {/* Brand Header */}
        <div 
            className="px-6 py-6 flex items-center justify-between border-b border-slate-50"
            style={{ backgroundColor: `${themeColor}05` }} // Very subtle tint
        >
            <div className="flex items-center gap-5">
                <div 
                    className="w-14 h-14 flex items-center justify-center rounded-2xl shadow-sm border border-black/5"
                    style={{ backgroundColor: themeColor, color: '#fff' }}
                >
                    {icon}
                </div>
                <div>
                    <h3 className="font-bold text-slate-900 text-xl leading-tight">{title}</h3>
                    <p className="text-sm font-medium opacity-70" style={{ color: themeColor }}>
                        {items.length} sizes generated
                    </p>
                </div>
            </div>
            
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onDownloadZip();
                }}
                className="group flex items-center gap-2 px-5 py-2.5 bg-white border rounded-xl text-sm font-bold transition-all shadow-sm active:scale-95"
                style={{ borderColor: `${themeColor}40`, color: themeColor }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = themeColor;
                    e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = themeColor;
                }}
                title={`Download all ${title} emotes as ZIP`}
            >
                <Package size={16} />
                <span>ZIP PACK</span>
            </button>
        </div>
        
        {/* List Content */}
        <div className="p-6 space-y-3 bg-slate-50/30 flex-grow">
            {items.map((img) => (
                <div 
                    key={img.size} 
                    onClick={() => onDownload(img)}
                    className="group flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm cursor-pointer transition-all duration-200 relative overflow-hidden"
                    style={{ borderColor: '#e2e8f0', ['--theme-color' as React.CSSProperties['color']]: themeColor }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = themeColor}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                >
                    <div className="flex items-center gap-5 relative z-10">
                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 check-board shadow-inner w-16 h-16 flex items-center justify-center shrink-0">
                                <img src={img.dataUrl} alt={`${title} ${img.size}`} className="max-w-full max-h-full object-contain pixelated" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-slate-800 font-mono">
                                    {img.size}px
                                </span>
                                <span className="text-xs text-slate-400 font-medium mt-0.5">
                                    {formatFileSize(img.blob.size)} • PNG
                                </span>
                            </div>
                    </div>

                    <button 
                        className="w-10 h-10 flex items-center justify-center rounded-full text-slate-300 group-hover:text-white transition-all relative z-10 group-hover:bg-[var(--theme-color)]"
                        title="Download PNG"
                        onClick={(e) => {
                            e.stopPropagation(); 
                            onDownload(img);
                        }}
                    >
                        <Download size={20} strokeWidth={2.5} />
                    </button>
                </div>
            ))}
        </div>
    </div>
);

const ResultsGrid: React.FC<ResultsGridProps> = ({ images, baseName }) => {
  
  const handleDownloadSingle = (img: ResizedImage) => {
    FileSaver.saveAs(img.blob, `${baseName}_${img.size}x${img.size}.png`);
  };

  const handleDownloadZip = async (platform?: 'twitch' | 'discord') => {
    const zip = new JSZip();
    const folder = zip.folder(baseName || 'emotes');
    
    const targetImages = platform 
        ? images.filter(img => img.platform === platform)
        : images;

    if (folder && targetImages.length > 0) {
        targetImages.forEach((img) => {
            folder.file(`${baseName}_${img.platform}_${img.size}.png`, img.blob);
        });
        
        const content = await zip.generateAsync({ type: "blob" });
        const fileName = platform 
            ? `${baseName}_${platform}_pack.zip`
            : `${baseName}_emote_pack.zip`;
            
        FileSaver.saveAs(content, fileName);
    }
  };

  const twitchImages = images.filter(i => i.platform === 'twitch');
  const discordImages = images.filter(i => i.platform === 'discord');

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Main Header Section */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-soft mb-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        {/* Decorative background gradients */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -ml-16 -mb-16 opacity-50 pointer-events-none"></div>

        <div className="flex items-start gap-4 relative z-10 max-w-lg">
            <div className="bg-emerald-100/50 text-emerald-600 p-3 rounded-2xl">
                <Sparkles size={24} fill="currentColor" className="opacity-20" />
                <CheckCircle2 size={24} className="absolute top-3 left-3" />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Your Emotes are Ready!</h2>
                <p className="text-slate-500 mt-1 leading-relaxed">
                    We've generated optimized, high-quality PNGs for all platforms. 
                    They are ready to be uploaded directly.
                </p>
            </div>
        </div>

        <button
            onClick={() => handleDownloadZip()}
            className="relative z-10 flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white pl-6 pr-8 py-4 rounded-xl font-bold shadow-lg shadow-slate-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95 active:translate-y-0 duration-200 group whitespace-nowrap"
        >
            <div className="bg-white/10 p-1.5 rounded-lg group-hover:bg-white/20 transition-colors">
                <Download size={20} />
            </div>
            <span className="text-lg">Download All</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <ResultSection 
            title="Twitch" 
            icon={<TwitchLogo className="w-8 h-8 fill-white" />}
            themeColor="#9146FF" 
            items={twitchImages} 
            onDownload={handleDownloadSingle}
            onDownloadZip={() => handleDownloadZip('twitch')}
        />
        <ResultSection 
            title="Discord" 
            icon={<DiscordLogo className="w-9 h-7 fill-white" />}
            themeColor="#5865F2" 
            items={discordImages} 
            onDownload={handleDownloadSingle}
            onDownloadZip={() => handleDownloadZip('discord')}
        />
      </div>
    </div>
  );
};

export default ResultsGrid;