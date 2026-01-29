import React from 'react';

interface SeoArticleProps {
  title: string;
  intro: string;
  steps: { title: string; body: string }[];
  specs: {
    platform: string;
    type: string;
    dimensions: string;
    maxFileSize: string;
    note: string;
  }[];
  faq: { question: string; answer: string }[];
}

const SeoArticle: React.FC<SeoArticleProps> = ({ title, intro, steps, specs, faq }) => {
  return (
    <article className="mt-20 max-w-none prose prose-slate prose-lg text-slate-600">
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 pb-6 border-b border-slate-200 tracking-tight">
        {title}
      </h2>

      <div className="space-y-6 text-lg">
        {intro.split('\n\n').map((paragraph) => (
          <p key={paragraph} dangerouslySetInnerHTML={{ __html: paragraph }} />
        ))}
      </div>

      <div className="mt-16">
        <h3 className="mb-8 flex items-start gap-3 text-2xl font-bold text-slate-900 sm:items-center">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
            1
          </span>
          Step-by-step workflow
        </h3>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-8 -mt-8 pointer-events-none"></div>

          <div className="relative z-10 grid md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="space-y-2">
                <h4 className="font-bold text-slate-900 text-lg">Step {index + 1}: {step.title}</h4>
                <p className="text-slate-600 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="mb-6 flex items-start gap-3 text-2xl font-bold text-slate-900 sm:items-center">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-600">
            2
          </span>
          Specs & target sizes
        </h3>
        <p className="mb-6 text-lg">
          Use the official target sizes below to keep your artwork crisp across every platform surface.
        </p>

        <div className="space-y-4 md:hidden">
          {specs.map((group) => (
            <div
              key={`${group.platform}-${group.type}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-base font-semibold text-slate-900">{group.platform}</h4>
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{group.type}</span>
              </div>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <p>
                  <span className="font-medium text-slate-900">Dimensions:</span>{' '}
                  <span className="font-mono text-slate-500">{group.dimensions}</span>
                </p>
                <p>
                  <span className="font-medium text-slate-900">Max size:</span>{' '}
                  <span className="font-mono text-slate-500">{group.maxFileSize}</span>
                </p>
                <p>
                  <span className="font-medium text-slate-900">Note:</span> {group.note}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden overflow-hidden rounded-2xl border border-slate-200 shadow-sm md:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-900 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-4 w-1/5">Platform</th>
                <th className="p-4 w-1/5">Type</th>
                <th className="p-4 w-1/5 whitespace-nowrap">Target Dimensions (px)</th>
                <th className="p-4 w-1/5">Max File Size</th>
                <th className="p-4 w-1/5">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {specs.map((group) => (
                <tr key={`${group.platform}-${group.type}`} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-medium text-slate-900">{group.platform}</td>
                  <td className="p-4 text-slate-600">{group.type}</td>
                  <td className="p-4 font-mono text-slate-500">{group.dimensions}</td>
                  <td className="p-4 font-mono text-slate-500">{group.maxFileSize}</td>
                  <td className="p-4 text-slate-500">{group.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <section className="mt-20 border-t border-slate-200 pt-16" id="faq">
        <div className="mb-10 flex items-start gap-3 text-2xl font-bold text-slate-900 sm:items-center">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
            3
          </span>
          <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          {faq.map((item) => (
            <div key={item.question}>
              <h4 className="font-bold text-slate-900 text-lg mb-3">{item.question}</h4>
              <p className="text-slate-600 leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};

export default SeoArticle;
