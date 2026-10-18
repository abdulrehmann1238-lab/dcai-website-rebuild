import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../../state/DataContext';
import { useToast } from '../../state/ToastContext';
import { Product } from '../../data/products';
import {
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Layers,
  HelpCircle,
  ExternalLink,
  Download,
  AlertCircle
} from 'lucide-react';

export const ImportWizard: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [fileSelected, setFileSelected] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  // Column mappings state (with intentional unmapped datasheet_url)
  const [mappings, setMappings] = useState<Record<string, string>>({
    'MPN': 'wc_sku',
    'Product Name': 'wc_title',
    'Brand': 'tax_brand',
    'Protocol': 'tax_protocol',
    'Status': 'wc_status',
    'Short Description': 'wc_short_description',
    'Dimensions': 'acf_specs_dimensions',
    'Power': 'acf_specs_power',
    'Voltage': 'acf_specs_voltage',
    'IP Rating': 'acf_specs_ip',
    'Mounting': 'acf_specs_mounting',
    'Image 1 URL': 'acf_image_primary',
    'Datasheet URL': '', // INTENTIONAL UNMAPPED COLUMN FOR WOW MOMENT #3
    'Manual URL': 'acf_download_manual',
    'Related MPNs': 'acf_related_products'
  });

  const [useMpnKey, setUseMpnKey] = useState(true);

  // Import run state
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importStatusText, setImportStatusText] = useState('Initializing...');
  const [importCompleted, setImportCompleted] = useState(false);
  const [importFailed, setImportFailed] = useState(false);

  const { importProducts, trackPageView } = useData();
  const { addToast } = useToast();
  const navigate = useNavigate();

  // Handle sample file click
  const handleUseSampleFile = () => {
    setFileError(null);
    setFileSelected(true);
    addToast('Sample file loaded: dcai_master_products.csv (40 rows).', 'info');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      if (!files[0].name.endsWith('.csv')) {
        setFileError("That file isn't a CSV. Export your Master sheet as CSV (UTF-8) and try again.");
        return;
      }
      setFileError(null);
      setFileSelected(true);
    }
  };

  // Check if unmapped column is resolved
  const isDatasheetMapped = mappings['Datasheet URL'] === 'acf_download_datasheet';

  // Run the 12-row sample import
  const handleRunImport = (simulateError: boolean = false) => {
    setIsImporting(true);
    setImportProgress(10);
    setImportStatusText('Parsing CSV records & verifying UTF-8 encoding…');
    setImportFailed(false);

    setTimeout(() => {
      setImportProgress(35);
      setImportStatusText('Validating 12 products against Brand/Protocol taxonomies…');

      setTimeout(() => {
        if (simulateError) {
          setIsImporting(false);
          setImportFailed(true);
          addToast('Import halted at Row 9: Missing required MPN field.', 'error');
          return;
        }

        setImportProgress(70);
        setImportStatusText('Creating WooCommerce records & binding ACF field groups…');

        setTimeout(() => {
          setImportProgress(90);
          setImportStatusText('Resolving DAM asset URLs & rebuilding search index…');

          setTimeout(() => {
            // New 12 imported products
            const newProducts: Product[] = [
              {
                id: 'hld-kx-9904',
                mpn: 'HLD-KX-9904',
                name: 'Halden 4-Channel KNX LED Phase Dimmer 300W',
                brandSlug: 'halden',
                protocolSlug: 'knx',
                productType: 'Dimmer',
                status: 'Active',
                shortDescription: 'High-density trailing-edge phase dimmer with automatic load curve detection.',
                description: 'Imported via Master CSV: 4-channel universal dimming actuator for high-end residential chandeliers and LED coves.',
                features: ['4× 300 W load capability', 'Overload thermal latch', 'ETS6 ready'],
                useCases: ['Luxury dining chandelier control', 'Residential coves'],
                images: ['https://assets.dcai.example/products/halden/knx/hld-kx-9904/front.svg'],
                illustrationType: 'din-rail',
                specs: {
                  dimensions: '72 × 90 × 64 mm (4 DIN)',
                  weight: '240 g',
                  supplyVoltage: '230 V AC, 50 Hz',
                  powerConsumption: '< 0.5 W',
                  ipRating: 'IP20',
                  operatingTemp: '-5 °C to +45 °C',
                  mounting: 'DIN rail',
                  interfacePorts: 'KNX bus terminal, 8× phase out screw terminals',
                  certifications: ['KNX Certified', 'CE']
                },
                downloads: [
                  { type: 'datasheet', title: 'HLD-KX-9904 Technical Datasheet', fileSize: '1.4 MB', version: 'v1.0', updated: 'March 2026', url: 'https://assets.dcai.example/products/halden/knx/hld-kx-9904/datasheet.pdf' }
                ],
                related: ['HLD-KX-4412'],
                createdAt: '2026-03-28',
                updatedAt: '2026-03-28',
                isNew: true
              },
              {
                id: 'vrl-d2-9901',
                mpn: 'VRL-D2-9901',
                name: 'Verelli DALI-2 High-Bay Microwave Motion Detector',
                brandSlug: 'verelli',
                protocolSlug: 'dali-2',
                productType: 'Sensor',
                status: 'Active',
                shortDescription: 'High-ceiling microwave presence detector covering up to 14 meters mounting height.',
                description: 'Imported via Master CSV: Industrial logistics and retail high-bay DALI-2 presence sensor.',
                features: ['Microwave 5.8 GHz detection', 'DALI-2 certified input device'],
                useCases: ['High-ceiling commercial atriums', 'Logistics warehouses'],
                images: ['https://assets.dcai.example/products/verelli/dali-2/vrl-d2-9901/front.svg'],
                illustrationType: 'sensor',
                specs: {
                  dimensions: 'Ø 85 × 45 mm',
                  weight: '110 g',
                  supplyVoltage: 'DALI bus powered',
                  powerConsumption: '< 0.1 W',
                  ipRating: 'IP65',
                  operatingTemp: '-20 °C to +55 °C',
                  mounting: 'Ceiling flush',
                  interfacePorts: 'DALI terminal pair',
                  certifications: ['DALI-2', 'CE']
                },
                downloads: [
                  { type: 'datasheet', title: 'VRL-D2-9901 Datasheet', fileSize: '1.1 MB', version: 'v1.0', updated: 'March 2026', url: 'https://assets.dcai.example/products/verelli/dali-2/vrl-d2-9901/datasheet.pdf' }
                ],
                related: ['VRL-D2-2004'],
                createdAt: '2026-03-28',
                updatedAt: '2026-03-28',
                isNew: true
              }
            ];

            importProducts(newProducts);
            setImportProgress(100);
            setIsImporting(false);
            setImportCompleted(true);
            addToast('Master CSV Import Complete: 12 created, 3 updated, 1 skipped.', 'success');
          }, 600);
        }, 700);
      }, 700);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Title & Breadcrumb */}
      <div className="space-y-1">
        <div className="text-xs font-mono text-ink-3">Staff &bull; WP All Import Simulation</div>
        <h1 className="font-serif-display text-2xl sm:text-3xl text-ink font-medium">
          Master Product CSV &bull; Ingest Wizard
        </h1>
        <p className="text-xs text-ink-2">
          Re-runnable import pipeline using MPN as the unique key. Creates WooCommerce product records and maps ACF technical groups.
        </p>
      </div>

      {/* 4-Step Stepper */}
      <div className="p-3 bg-surface rounded-lg border border-line shadow-sh-1 flex items-center justify-between">
        {[
          { stepNum: 1, title: 'Upload' },
          { stepNum: 2, title: 'Map Fields' },
          { stepNum: 3, title: 'Preview & Validate' },
          { stepNum: 4, title: 'Import' }
        ].map((s, idx) => {
          const isCurrent = step === s.stepNum;
          const isDone = step > s.stepNum;
          return (
            <div key={s.stepNum} className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-semibold ${
                  isCurrent
                    ? 'bg-primary text-paper'
                    : isDone
                    ? 'bg-status-success text-paper'
                    : 'bg-paper text-ink-3 border border-line'
                }`}
              >
                {isDone ? '✓' : s.stepNum}
              </span>
              <span className={`text-xs font-medium hidden sm:inline ${isCurrent ? 'text-ink font-semibold' : 'text-ink-3'}`}>
                {s.title}
              </span>
              {idx < 3 && <span className="text-line-strong mx-2 hidden sm:inline">&bull;</span>}
            </div>
          );
        })}
      </div>

      {/* STEP 1: UPLOAD */}
      {step === 1 && (
        <div className="p-8 rounded-xl bg-surface border border-line shadow-sh-1 space-y-6 animate-fade-in">
          <div className="space-y-1">
            <h2 className="font-serif-display text-xl text-ink font-medium">Step 1: Select Master CSV File</h2>
            <p className="text-xs text-ink-2">
              Export your spreadsheet from Google Sheets or Excel as a standard comma-delimited UTF-8 CSV.
            </p>
          </div>

          {/* Drag & Drop Box */}
          <div
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
            className={`p-10 rounded-lg border-2 border-dashed text-center space-y-3 transition-colors ${
              fileSelected
                ? 'border-status-success bg-status-success/5'
                : 'border-line-strong hover:border-primary bg-paper/60'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-surface border border-line mx-auto flex items-center justify-center text-primary">
              {fileSelected ? <CheckCircle2 className="w-6 h-6 text-status-success" /> : <UploadCloud className="w-6 h-6" />}
            </div>

            <div>
              <div className="text-xs font-semibold text-ink">
                {fileSelected ? 'dcai_master_products.csv ready' : 'Drag & drop your Master CSV here'}
              </div>
              <div className="text-[11px] text-ink-3 mt-0.5">Accepts .csv up to 25 MB</div>
            </div>

            {/* Link to trigger pre-bundled sample */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleUseSampleFile}
                className="text-xs font-mono text-primary font-medium hover:underline inline-flex items-center gap-1"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-accent" />
                <span>Use sample file (dcai_master_products.csv &bull; 40 rows)</span>
              </button>
            </div>
          </div>

          {fileError && (
            <div className="p-3 rounded bg-status-error/10 border border-status-error/30 text-xs text-status-error flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{fileError}</span>
            </div>
          )}

          {fileSelected && (
            <div className="p-4 rounded bg-paper border border-line flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <div className="font-semibold text-ink font-mono">dcai_master_products.csv</div>
                <div className="text-[11px] font-mono text-ink-3">42.6 KB &bull; 40 rows detected &bull; UTF-8 verified &bull; Delimiter: Comma</div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-status-success/15 text-status-success font-semibold">
                Valid Structure
              </span>
            </div>
          )}

          <div className="flex justify-end pt-4 border-t border-line">
            <button
              onClick={() => setStep(2)}
              disabled={!fileSelected}
              className="px-5 py-2 rounded-md bg-primary hover:bg-primary-hover disabled:opacity-40 text-paper text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <span>Continue to Field Mapping</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: MAP FIELDS (WITH INTENTIONAL UNMAPPED COLUMN) */}
      {step === 2 && (
        <div className="p-8 rounded-xl bg-surface border border-line shadow-sh-1 space-y-6 animate-fade-in">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h2 className="font-serif-display text-xl text-ink font-medium">Step 2: Map CSV Headers to CMS Schema</h2>
              <span className="text-[11px] font-mono text-ink-3">15 Columns Detected</span>
            </div>
            <p className="text-xs text-ink-2">
              Auto-matched 13 of 14 target fields. Notice the unmapped column below requiring manual specification.
            </p>
          </div>

          {/* Unique Key Toggle */}
          <div className="p-3.5 rounded bg-paper border border-line flex items-center justify-between text-xs">
            <div>
              <div className="font-semibold text-ink">Use MPN as Unique Key</div>
              <div className="text-[11px] text-ink-3">Updates existing parts if matched; creates new if missing (re-runnable)</div>
            </div>
            <input
              type="checkbox"
              checked={useMpnKey}
              onChange={e => setUseMpnKey(e.target.checked)}
              className="rounded text-primary w-4 h-4 focus:ring-primary"
            />
          </div>

          {/* Two-Column Mapping Table */}
          <div className="overflow-hidden rounded-lg border border-line">
            <table className="w-full text-left text-xs">
              <thead className="bg-paper border-b border-line font-mono text-[11px] text-ink-3 uppercase">
                <tr>
                  <th className="py-2.5 px-4 font-semibold">CSV Column Header</th>
                  <th className="py-2.5 px-4 font-semibold">Target CMS Field Group</th>
                  <th className="py-2.5 px-4 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {Object.entries(mappings).map(([csvCol, target]) => {
                  const isUnmapped = !target;
                  return (
                    <tr key={csvCol} className={`hover:bg-paper/40 ${isUnmapped ? 'bg-amber-500/10' : ''}`}>
                      <td className="py-2.5 px-4 font-mono font-medium text-ink">
                        {csvCol}
                      </td>
                      <td className="py-2.5 px-4">
                        <select
                          value={target}
                          onChange={e => setMappings({ ...mappings, [csvCol]: e.target.value })}
                          className={`w-full max-w-sm px-2.5 py-1 text-xs rounded border bg-elevated text-ink focus:outline-none ${
                            isUnmapped ? 'border-amber-500 ring-1 ring-amber-500' : 'border-line'
                          }`}
                        >
                          <option value="">-- Please select target field --</option>
                          <optgroup label="WooCommerce Core">
                            <option value="wc_title">Product Name (post_title)</option>
                            <option value="wc_sku">MPN / SKU (sku)</option>
                            <option value="wc_short_description">Short Description (post_excerpt)</option>
                            <option value="wc_status">Catalog Status (post_status)</option>
                            <option value="tax_brand">Taxonomy: Brand (product_brand)</option>
                            <option value="tax_protocol">Taxonomy: Protocol (product_protocol)</option>
                          </optgroup>
                          <optgroup label="ACF: Technical Parameters">
                            <option value="acf_specs_dimensions">Specs &bull; Dimensions</option>
                            <option value="acf_specs_voltage">Specs &bull; Supply Voltage</option>
                            <option value="acf_specs_power">Specs &bull; Power Consumption</option>
                            <option value="acf_specs_ip">Specs &bull; IP Rating</option>
                            <option value="acf_specs_mounting">Specs &bull; Mounting</option>
                          </optgroup>
                          <optgroup label="ACF: Downloads & Media (DAM)">
                            <option value="acf_image_primary">Image Primary DAM URL</option>
                            <option value="acf_download_datasheet">Datasheet PDF URL (datasheet_url)</option>
                            <option value="acf_download_manual">Manual PDF URL (manual_url)</option>
                            <option value="acf_related_products">Related Products (related_mpns)</option>
                          </optgroup>
                        </select>
                      </td>
                      <td className="py-2.5 px-4 text-right">
                        {target ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-status-success font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Matched</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-600 font-semibold animate-pulse">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Unmapped</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {!isDatasheetMapped && (
            <div className="p-3.5 rounded bg-amber-500/10 border border-amber-500/30 text-xs text-amber-800 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Intentional Mapping Check:</strong> Column <code>Datasheet URL</code> is unmapped.
                Please select <em>&ldquo;ACF: Downloads &bull; Datasheet PDF URL (datasheet_url)&rdquo;</em> to proceed.
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-line">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 rounded border border-line text-xs font-medium text-ink hover:bg-paper"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!isDatasheetMapped}
              className="px-5 py-2 rounded-md bg-primary hover:bg-primary-hover disabled:opacity-40 text-paper text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <span>Preview 5 Records</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: PREVIEW & VALIDATE */}
      {step === 3 && (
        <div className="p-8 rounded-xl bg-surface border border-line shadow-sh-1 space-y-6 animate-fade-in">
          <div className="space-y-1">
            <h2 className="font-serif-display text-xl text-ink font-medium">Step 3: Ingest Validation Summary</h2>
            <p className="text-xs text-ink-2">
              Validating sample batch before committing records to the WordPress database.
            </p>
          </div>

          {/* Validation Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-status-success/10 border border-status-success/30 space-y-1">
              <div className="font-mono text-2xl font-bold text-status-success">38</div>
              <div className="text-xs text-ink">Ready for Import</div>
            </div>
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 space-y-1">
              <div className="font-mono text-2xl font-bold text-amber-600">2</div>
              <div className="text-xs text-ink">Non-Fatal Warnings</div>
            </div>
            <div className="p-4 rounded-lg bg-paper border border-line space-y-1">
              <div className="font-mono text-2xl font-bold text-ink-3">0</div>
              <div className="text-xs text-ink">Fatal Syntax Errors</div>
            </div>
          </div>

          {/* Non-fatal warnings disclosure */}
          <div className="p-3.5 rounded bg-paper border border-line text-xs space-y-1 text-ink-2 font-mono text-[11px]">
            <div className="font-bold text-ink">Validation Notices:</div>
            <div>&bull; Row 17: Related MPN <code>TSR-BX-0099</code> not in database yet (will link upon secondary run).</div>
            <div>&bull; Row 31: Image URL returned permanent 200 OK via Cloudflare CDN proxy.</div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-line">
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2 rounded border border-line text-xs font-medium text-ink hover:bg-paper"
            >
              Back to Mapping
            </button>
            <button
              onClick={() => setStep(4)}
              className="px-5 py-2 rounded-md bg-primary hover:bg-primary-hover text-paper text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <span>Proceed to Ingest Execution</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: RUN IMPORT WITH PROGRESS */}
      {step === 4 && (
        <div className="p-8 rounded-xl bg-surface border border-line shadow-sh-1 space-y-6 animate-fade-in">
          <div className="space-y-1">
            <h2 className="font-serif-display text-xl text-ink font-medium">Step 4: Execute Batch Import</h2>
            <p className="text-xs text-ink-2">
              Ready to write 12 sample records to the WooCommerce repository and update search indexes.
            </p>
          </div>

          {isImporting && (
            <div className="p-6 rounded-lg bg-paper border border-line space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-semibold text-ink">{importStatusText}</span>
                <span className="text-primary font-bold">{importProgress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-line overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${importProgress}%` }}
                />
              </div>
            </div>
          )}

          {importCompleted && (
            <div className="p-8 rounded-lg bg-status-success/10 border border-status-success/30 text-center space-y-4 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-status-success/20 text-status-success mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif-display text-2xl text-ink font-medium">
                  Import Process Successfully Completed
                </h3>
                <p className="text-xs text-ink-2 max-w-md mx-auto">
                  12 products created &bull; 3 updated &bull; 1 skipped (blank row). Global search index and facet counts have automatically re-indexed.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link
                  to="/staff/products"
                  className="px-4 py-2 rounded bg-primary text-paper text-xs font-semibold hover:bg-primary-hover transition-colors"
                >
                  View in Staff Product List
                </Link>
                <Link
                  to="/brands/halden/knx/hld-kx-9904"
                  className="px-4 py-2 rounded border border-line-strong hover:bg-paper text-ink text-xs font-medium transition-colors"
                >
                  Inspect Newly Created &ldquo;HLD-KX-9904&rdquo;
                </Link>
              </div>
            </div>
          )}

          {importFailed && (
            <div className="p-6 rounded-lg bg-status-error/10 border border-status-error/30 space-y-3">
              <div className="flex items-center gap-2 text-status-error font-semibold text-xs">
                <AlertCircle className="w-4 h-4" />
                <span>Simulated Error Encountered at Row 9</span>
              </div>
              <p className="text-xs text-ink-2 leading-relaxed">
                Row 9 is missing the mandatory <code>MPN</code> part identifier. The batch was safely halted to prevent orphaned database records.
              </p>
              <button
                onClick={() => alert('Simulated error report CSV downloaded.')}
                className="text-xs font-mono text-status-error underline"
              >
                Download error report (CSV) &bull; 1 error
              </button>
            </div>
          )}

          {!isImporting && !importCompleted && (
            <div className="space-y-4">
              <button
                onClick={() => handleRunImport(false)}
                className="w-full py-3 rounded-md bg-primary hover:bg-primary-hover text-paper text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <FileSpreadsheet className="w-4 h-4 text-accent" />
                <span>Run Sample Import (12 Rows)</span>
              </button>

              <div className="text-center">
                <button
                  onClick={() => handleRunImport(true)}
                  className="text-[11px] font-mono text-ink-3 hover:text-status-error underline"
                >
                  Simulate a failed import (Row 9 error test)
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
