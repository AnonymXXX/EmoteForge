import React, { useCallback, useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';

interface UploadZoneProps {
  onFileSelected: (file: File) => void;
  isProcessing: boolean;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onFileSelected, isProcessing }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateAndProcess = (file: File) => {
    setError(null);
    if (!file.type.startsWith('image/')) {
      setError("Please upload a valid image file (PNG, JPG, WEBP).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File is too large. Max 5MB.");
      return;
    }
    onFileSelected(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcess(e.dataTransfer.files[0]);
    }
  }, [onFileSelected]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcess(e.target.files[0]);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative group cursor-pointer
        border-2 border-dashed rounded-3xl p-10
        transition-all duration-300 ease-out
        flex flex-col items-center justify-center text-center
        h-72 w-full
        bg-white shadow-soft
        ${isDragging 
          ? 'border-primary bg-emerald-50/50 scale-[1.01]' 
          : 'border-slate-200 hover:border-primary/50 hover:shadow-glow'}
        ${isProcessing ? 'opacity-80 pointer-events-none' : ''}
      `}
    >
      {/* 
         FIX: Increased z-index to z-50 to ensure it sits on top of all decorative elements 
         so clicks are always registered.
      */}
      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
        onChange={handleInputChange}
        disabled={isProcessing}
      />
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none z-0">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-100/40 rounded-full blur-3xl transition-transform group-hover:scale-110"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-100/40 rounded-full blur-3xl transition-transform group-hover:scale-110"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center pointer-events-none">
        <div className="bg-emerald-50 p-5 rounded-full mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-emerald-100">
            {isProcessing ? (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            ) : (
            <Upload className="w-8 h-8 text-primary" />
            )}
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-2">
            {isProcessing ? 'We are resizing it...' : 'Upload your artwork'}
        </h3>
        <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
            Drag & drop or click to browse.<br/>
            <span className="text-slate-400 text-xs">Supports PNG, JPG, GIF</span>
        </p>
      </div>

      {error && (
        <div className="absolute bottom-4 flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-full text-sm font-medium border border-red-100 shadow-sm z-20">
          <AlertCircle size={16} />
          {error}
        </div>
      )}
    </div>
  );
};

export default UploadZone;