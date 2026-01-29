import React from 'react';

const SeoArticle: React.FC = () => {
  return (
    <article className="mt-20 max-w-none prose prose-slate prose-lg text-slate-600">
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 pb-6 border-b border-slate-200 tracking-tight">
        The Ultimate Guide to Resizing Emotes for Twitch & Discord
      </h2>

      <div className="space-y-6 text-lg">
        <p>
          Creating custom emotes is the most effective way to build a brand identity and connect with your community. 
          However, platforms like Twitch and Discord have strict technical requirements. If your image file size is 
          too large or the dimensions are wrong, your upload will be rejected.
        </p>

        <p>
          <strong className="text-slate-900 font-bold">EmoteForge</strong> is a professional, privacy-focused tool 
          designed to solve this problem. We automatically generate the exact pixel dimensions required by streaming 
          platforms, ensuring your art looks crisp and professional.
        </p>
      </div>

      <div className="mt-16">
        <h3 className="mb-8 flex items-start gap-3 text-2xl font-bold text-slate-900 sm:items-center">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
            1
          </span>
          How to Create Custom Emotes: A Step-by-Step Guide
        </h3>
        
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-8 relative overflow-hidden">
          {/* Decor */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-8 -mt-8 pointer-events-none"></div>

          <div className="relative z-10 grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-lg">Step 1: Prepare your Artwork</h4>
              <p className="text-slate-600 leading-relaxed">
                Start with a high-resolution square image (we recommend at least 500x500 pixels). Ensure your 
                image has a transparent background (PNG format) so it blends seamlessly into chat windows.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-lg">Step 2: Upload to EmoteForge</h4>
              <p className="text-slate-600 leading-relaxed">
                Drag and drop your file into the box above. Our tool runs locally in your browser, meaning your 
                data is never sent to a server. It&apos;s faster and 100% private.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-lg">Step 3: Download Optimized Files</h4>
              <p className="text-slate-600 leading-relaxed">
                We automatically generate all required sizes (112px, 56px, 28px for Twitch; 128px for Discord). 
                Click &quot;Download All&quot; to get a ZIP file containing every version you need.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-lg">Step 4: Upload to Platform</h4>
              <p className="text-slate-600 leading-relaxed">
                Go to your Creator Dashboard on Twitch or Server Settings on Discord and upload the respective 
                files. You&apos;re done!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="mb-6 flex items-start gap-3 text-2xl font-bold text-slate-900 sm:items-center">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-600">
            2
          </span>
          Twitch Emote Size Requirements (2025 Updated)
        </h3>
        <p className="mb-6 text-lg">
          Twitch has specific requirements for Affiliate and Partner emotes. While they now support 
          auto-resizing, manually resizing your emotes often yields sharper results, especially for pixel art.
        </p>

        <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-900 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-4 w-1/3">Image Type</th>
                <th className="p-4 w-1/3">Dimensions (px)</th>
                <th className="p-4 w-1/3">Max File Size</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-medium text-slate-900">Emote (Large)</td>
                <td className="p-4 font-mono text-slate-500">112 x 112</td>
                <td className="p-4 font-mono text-slate-500">1MB</td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-medium text-slate-900">Emote (Medium)</td>
                <td className="p-4 font-mono text-slate-500">56 x 56</td>
                <td className="p-4 font-mono text-slate-500">1MB</td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-medium text-slate-900">Emote (Small)</td>
                <td className="p-4 font-mono text-slate-500">28 x 28</td>
                <td className="p-4 font-mono text-slate-500">1MB</td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-medium text-slate-900">Sub Badge</td>
                <td className="p-4 font-mono text-slate-500">72, 36, 18</td>
                <td className="p-4 font-mono text-slate-500">25KB</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="mb-4 flex items-start gap-3 text-2xl font-bold text-slate-900 sm:items-center">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
            3
          </span>
          Discord Requirements
        </h3>
        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6">
          <p className="text-lg text-slate-700">
            <strong>Discord:</strong> The standard size for emojis is <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-blue-200 text-blue-700">128x128</span> pixels. 
            Stickers require <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-blue-200 text-blue-700">320x320</span> pixels. 
            The file size must be under 256KB.
          </p>
        </div>
      </div>

      <section className="mt-20 border-t border-slate-200 pt-16" id="faq">
        <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Frequently Asked Questions</h2>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          <div>
            <h4 className="font-bold text-slate-900 text-lg mb-3">Why are my emotes blurry on Twitch?</h4>
            <p className="text-slate-600 leading-relaxed">
              Blurriness usually happens when you resize a small image to a larger size (upscaling).
              To avoid this, always create your art on a larger canvas (e.g., 500x500px) and scale it
              down using our tool. We use high-quality resampling algorithms (Lanczos/Bicubic) to keep edges sharp.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-lg mb-3">Is this tool safe for personal photos?</h4>
            <p className="text-slate-600 leading-relaxed">
              Yes, absolutely. EmoteForge uses <strong>Client-Side Processing</strong> technology. Unlike other
              converters that upload your files to a cloud server, our tool processes everything
              directly in your web browser. Your images never leave your computer, guaranteeing
              100% privacy.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-lg mb-3">How do I remove the white background?</h4>
            <p className="text-slate-600 leading-relaxed">
              This tool is a resizer, not a background remover. You should remove the background using
              Photoshop or a free online tool before uploading it here. Once uploaded, we will preserve
              the transparency of your PNG files.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-lg mb-3">What formats are supported?</h4>
            <p className="text-slate-600 leading-relaxed">
              We currently support PNG, JPEG, and WEBP. For emotes, we strongly recommend using <strong>PNG </strong> 
              because it supports transparency and offers lossless compression.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
};

export default SeoArticle;
