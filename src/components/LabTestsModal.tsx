import React, { useState } from 'react';
import { X, ShieldCheck, FileText, CheckCircle2, Download, ExternalLink } from 'lucide-react';

interface LabTestsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LabTestsModal: React.FC<LabTestsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('bacteriostatic');

  const labReports = [
    {
      id: 'bacteriostatic',
      name: 'Bacteriostatic Water (0.9% Benzyl Alcohol)',
      batch: 'BATCH: PS-BAC-2026-08',
      laboratory: 'Symbio Laboratories Australia (NATA Accredited)',
      testMethod: 'HPLC & USP <85> Bacterial Endotoxin Testing',
      results: [
        { parameter: 'Benzyl Alcohol Content', target: '0.85% - 0.95%', result: '0.91% w/v', status: 'PASS' },
        { parameter: 'pH at 25°C', target: '4.5 - 7.0', result: '5.72', status: 'PASS' },
        { parameter: 'Bacterial Endotoxins', target: '< 0.25 EU/ml', result: '< 0.05 EU/ml', status: 'PASS' },
        { parameter: 'Total Aerobic Microbial Count', target: '< 10 CFU/ml', result: '0 CFU/ml', status: 'PASS' },
        { parameter: 'Total Yeast & Mould Count', target: '< 10 CFU/ml', result: '0 CFU/ml', status: 'PASS' },
      ],
    },
    {
      id: 'creatine',
      name: 'Micronised Creatine Monohydrate 200 Mesh',
      batch: 'BATCH: PS-CRE-2026-11',
      laboratory: 'Eurofins Analytical Services AU',
      testMethod: 'High Performance Liquid Chromatography (HPLC)',
      results: [
        { parameter: 'Creatine Assay (Dry Basis)', target: '≥ 99.5%', result: '99.87%', status: 'PASS' },
        { parameter: 'Particle Sieve Size', target: '≥ 95% passing 200 mesh', result: '98.6%', status: 'PASS' },
        { parameter: 'Loss on Drying', target: '≤ 12.0%', result: '11.1%', status: 'PASS' },
        { parameter: 'Lead (Pb)', target: '< 0.5 ppm', result: '< 0.02 ppm', status: 'PASS' },
        { parameter: 'Arsenic (As)', target: '< 0.5 ppm', result: '< 0.01 ppm', status: 'PASS' },
      ],
    },
    {
      id: 'methylene-blue',
      name: 'Methylene Blue 1% Solution (10mg/ml)',
      batch: 'BATCH: PS-MB-2026-04',
      laboratory: 'ALS Life Sciences Australia',
      testMethod: 'Spectrophotometry & HPLC USP Standard',
      results: [
        { parameter: 'Concentration (10mg/ml)', target: '9.5 - 10.5 mg/ml', result: '10.04 mg/ml', status: 'PASS' },
        { parameter: 'Preservative (Benzyl Alcohol)', target: '0.90%', result: '0.91%', status: 'PASS' },
        { parameter: 'Heavy Metals Screen', target: 'USP Specification', result: 'Within limits', status: 'PASS' },
        { parameter: 'Visual Appearance', target: 'Clear dark blue solution', result: 'Conforms', status: 'PASS' },
      ],
    },
    {
      id: 'shilajit',
      name: 'Pure Himalayan Shilajit Resin (Gilgit-Baltistan)',
      batch: 'BATCH: PS-SHIL-2026-02',
      laboratory: 'Analytical Research Laboratories AU',
      testMethod: 'Fulvic Acid UV Titration & ICP-MS Trace Minerals',
      results: [
        { parameter: 'Fulvic Acid Assay', target: '≥ 50.0%', result: '58.4%', status: 'PASS' },
        { parameter: 'Humic Acid', target: '≥ 10.0%', result: '12.3%', status: 'PASS' },
        { parameter: 'Cadmium (Cd)', target: '< 0.3 ppm', result: '< 0.01 ppm', status: 'PASS' },
        { parameter: 'Mercury (Hg)', target: '< 0.1 ppm', result: '< 0.005 ppm', status: 'PASS' },
      ],
    },
  ];

  const currentReport = labReports.find((r) => r.id === activeTab) || labReports[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-[#FBF6E0] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl z-10 border border-stone-300">
        
        {/* Header */}
        <div className="p-6 border-b border-stone-300 bg-stone-900 text-white rounded-t-3xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-['Instrument_Sans'] font-black text-xl tracking-tight uppercase">
                HPLC Laboratory Test Certificates
              </h3>
              <p className="text-xs text-stone-400">
                Independent Third-Party Verification • Australian NATA Accredited Labs
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="p-6 pb-2">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {labReports.map((report) => (
              <button
                key={report.id}
                onClick={() => setActiveTab(report.id)}
                className={`text-xs font-['Instrument_Sans'] font-bold uppercase tracking-wider px-4 py-2.5 rounded-full transition-all whitespace-nowrap ${
                  activeTab === report.id
                    ? 'bg-stone-900 text-white shadow-md'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-300'
                }`}
              >
                {report.name.split(' ')[0]} {report.name.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>

        {/* Report Content */}
        <div className="p-6 pt-2 space-y-6">
          
          <div className="bg-white rounded-2xl p-5 border border-stone-300 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                  Product Formulation
                </span>
                <h4 className="font-['Instrument_Sans'] font-black text-lg text-stone-900">
                  {currentReport.name}
                </h4>
              </div>
              <span className="inline-flex items-center gap-1.5 font-['Instrument_Sans'] text-xs font-black bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full w-fit">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                VERIFIED PURE
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-600 pt-1">
              <div>
                <span className="font-bold text-stone-900">Batch Number:</span> {currentReport.batch}
              </div>
              <div>
                <span className="font-bold text-stone-900">Testing Lab:</span> {currentReport.laboratory}
              </div>
              <div className="sm:col-span-2">
                <span className="font-bold text-stone-900">Protocol:</span> {currentReport.testMethod}
              </div>
            </div>
          </div>

          {/* Results Table */}
          <div className="bg-white rounded-2xl border border-stone-300 overflow-hidden shadow-sm">
            <div className="bg-stone-100 px-4 py-2.5 border-b border-stone-200 text-xs font-['Instrument_Sans'] font-bold text-stone-700 uppercase tracking-wider">
              Chromatographic Assay &amp; Safety Parameters
            </div>
            <div className="divide-y divide-stone-100 text-xs">
              {currentReport.results.map((res, i) => (
                <div key={i} className="px-4 py-3 flex items-center justify-between gap-4 hover:bg-stone-50">
                  <div className="flex-1">
                    <div className="font-bold text-stone-800">{res.parameter}</div>
                    <div className="text-[11px] text-stone-400">Spec: {res.target}</div>
                  </div>
                  <div className="font-mono font-bold text-stone-900 text-right">
                    {res.result}
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                    {res.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center pt-2">
            <p className="text-xs text-stone-500 mb-3">
              Independent certificates are updated on every production batch run.
            </p>
            <button
              onClick={() => alert(`Downloading Certificate of Analysis (COA) for ${currentReport.name}...`)}
              className="bg-stone-900 hover:bg-[#D0473E] text-white font-['Instrument_Sans'] font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-full inline-flex items-center gap-2 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download Official PDF Certificate</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
