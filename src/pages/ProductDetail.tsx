import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getBrandBySlug } from '../data/brands';
import { getProtocol } from '../data/protocols';
import { getProductByMpn, Product } from '../data/products';
import { useData } from '../state/DataContext';
import { useToast } from '../state/ToastContext';
import { BlockFrame } from '../components/layout/BlockFrame';
import { ProductSilhouette } from '../components/ui/ProductSilhouette';
import { downloadSamplePdf } from '../lib/pdf';
import { damUrl } from '../lib/damUrl';
import {
  Copy,
  Check,
  Download,
  Link as LinkIcon,
  FileText,
  AlertTriangle,
  ArrowRight,
  Maximize2,
  X,
  ShieldCheck,
  Sliders,
  Share2
} from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { brand: brandSlug, protocol: protocolSlug, mpn } = useParams<{
    brand: string;
    protocol: string;
    mpn: string;
  }>();

  const { products, trackDownload } = useData();
  const { addToast } = useToast();

  const [selectedView, setSelectedView] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null);
  const [isCopiedMpn, setIsCopiedMpn] = useState(false);
  const [showStickyDownload, setShowStickyDownload] = useState(false);

  const brand = getBrandBySlug(brandSlug || '');
  const protocol = getProtocol(brandSlug || '', protocolSlug || '');
  const product = getProductByMpn(mpn || '', products);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowStickyDownload(scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!brand || !protocol || !product) {
    return (
      <div className="max-w-content mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-serif-display text-3xl text-ink">Product Not Found</h1>
        <p className="text-xs text-ink-2">The requested part number could not be located in our catalog.</p>
        <Link to="/brands" className="inline-block px-4 py-2 rounded bg-primary text-paper text-xs font-medium">
          Return to Brands Directory
        </Link>
      </div>
    );
  }

  // Related products
  const relatedProducts = product.related
    .map(relMpn => getProductByMpn(relMpn, products))
    .filter((p): p is Product => Boolean(p));

  const copyMpnToClipboard = () => {
    navigator.clipboard?.writeText(product.mpn);
    setIsCopiedMpn(true);
    addToast(`Part number ${product.mpn} copied to clipboard.`, 'info');
    setTimeout(() => setIsCopiedMpn(false), 2000);
  };

  const copyPermanentLink = (url: string, title: string) => {
    const perm = damUrl(url);
    navigator.clipboard?.writeText(perm);
    addToast(`Permanent DAM URL copied: ${perm}`, 'info');
  };

  const handleDownload = (doc: any) => {
    setDownloadingFile(doc.title);
    setTimeout(() => {
      downloadSamplePdf(product.mpn, doc.title);
      trackDownload(product.mpn, doc.title, doc.type);
      addToast(`${doc.title} downloaded — logged in analytics.`, 'success');
      setDownloadingFile(null);
    }, 600);
  };

  const copySpecsText = () => {
    const specsString = [
      `Part Number: ${product.mpn}`,
      `Product: ${product.name}`,
      `Brand: ${brand.name} | Protocol: ${protocol.name}`,
      `Dimensions: ${product.specs.dimensions}`,
      `Weight: ${product.specs.weight}`,
      `Supply Voltage: ${product.specs.supplyVoltage}`,
      `Power: ${product.specs.powerConsumption}`,
      `Mounting: ${product.specs.mounting}`,
      `IP Rating: ${product.specs.ipRating}`,
      `Operating Temp: ${product.specs.operatingTemp}`,
      `Interface/Ports: ${product.specs.interfacePorts}`,
      `Certifications: ${product.specs.certifications.join(', ')}`
    ].join('\n');

    navigator.clipboard?.writeText(specsString);
    addToast('All technical parameters copied as plain text.', 'info');
  };

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-12">
      {/* 1. dcai/product-header */}
      <BlockFrame
        block="dcai/product-header"
        type="Dynamic"
        source="Product Metadata & Breadcrumb Schema"
        className="space-y-4 border-b border-line pb-6"
      >
        <div className="flex items-center gap-2 text-xs font-mono text-ink-3 flex-wrap">
          <Link to="/home" className="hover:text-ink">Home</Link>
          <span>/</span>
          <Link to="/brands" className="hover:text-ink">Brands</Link>
          <span>/</span>
          <Link to={`/brands/${brand.slug}`} className="hover:text-ink">{brand.name}</Link>
          <span>/</span>
          <Link to={`/brands/${brand.slug}/${protocol.slug}`} className="hover:text-ink">{protocol.name}</Link>
          <span>/</span>
          <span className="font-semibold text-accent-text">{product.mpn}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-mono text-sm sm:text-base font-semibold text-accent-text px-2 py-0.5 rounded bg-accent-tint/60 border border-accent/20">
                {product.mpn}
              </span>
              <button
                onClick={copyMpnToClipboard}
                className="p-1 rounded hover:bg-surface text-ink-3 hover:text-ink transition-colors"
                title="Copy MPN"
              >
                {isCopiedMpn ? <Check className="w-4 h-4 text-status-success" /> : <Copy className="w-4 h-4" />}
              </button>

              <span className={`text-xs font-mono px-2 py-0.5 rounded flex items-center gap-1.5 ${
                product.status === 'Active'
                  ? 'bg-status-success/15 text-status-success font-medium'
                  : 'bg-status-error/15 text-status-error font-medium'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${product.status === 'Active' ? 'bg-status-success' : 'bg-status-error'}`} />
                <span>{product.status}</span>
              </span>

              {product.isNew && (
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-status-success text-paper font-semibold">
                  Newly Imported
                </span>
              )}
            </div>

            <h1 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl text-ink font-normal leading-tight">
              {product.name}
            </h1>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              to={`/contact#trade?mpn=${product.mpn}`}
              className="px-4 py-2 rounded-md bg-primary hover:bg-primary-hover text-paper text-xs font-medium transition-colors"
            >
              Ask Technical Team
            </Link>
          </div>
        </div>

        {/* Discontinued Banner if applicable */}
        {product.status === 'Discontinued' && (
          <div className="p-4 rounded-md bg-status-error/10 border border-status-error/30 text-xs text-ink flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-status-error shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-semibold text-status-error">Product Status: Discontinued (End of Sale)</div>
              <p className="text-ink-2">
                This part number has been archived. Datasheets and legacy wiring manuals remain permanently accessible for existing installations.
              </p>
              {product.replacementMpn && (
                <div className="pt-1 font-mono text-[11px]">
                  Recommended modern replacement: {' '}
                  <Link
                    to={`/brands/${brand.slug}/${protocol.slug}/${product.replacementMpn.toLowerCase()}`}
                    className="font-bold text-primary underline"
                  >
                    {product.replacementMpn} →
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </BlockFrame>

      {/* Main Product Layout: 7/5 Desktop Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column (Cols 1-7): Visuals & Technical Parameters */}
        <div className="lg:col-span-7 space-y-10">
          {/* 2. dcai/product-images */}
          <BlockFrame
            block="dcai/product-images"
            type="Dynamic"
            source="DAM Vector Images (Permanent Asset Storage)"
            className="space-y-3"
          >
            <div className="relative aspect-[4/3] rounded-lg bg-surface border border-line overflow-hidden shadow-sh-1 group">
              <ProductSilhouette
                type={product.illustrationType}
                viewIndex={selectedView}
                brandName={brand.name}
                mpn={product.mpn}
              />
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="absolute top-3 right-3 p-2 rounded-md bg-paper/80 hover:bg-paper text-ink-2 border border-line shadow-sm transition-colors"
                title="Open lightbox"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* 3 View Thumbnails */}
            <div className="grid grid-cols-3 gap-3">
              {['Front Elevation', 'Isometric Projection', 'Wiring & Terminals'].map((label, idx) => (
                <button
                  key={label}
                  onClick={() => setSelectedView(idx)}
                  className={`p-2 rounded border text-left transition-colors flex items-center justify-between ${
                    selectedView === idx
                      ? 'bg-primary-tint border-primary text-primary font-semibold'
                      : 'bg-surface border-line hover:border-line-strong text-ink-2'
                  }`}
                >
                  <span className="text-[11px] font-mono">{label}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${selectedView === idx ? 'bg-accent' : 'bg-line'}`} />
                </button>
              ))}
            </div>
          </BlockFrame>

          {/* 3. dcai/product-description */}
          <BlockFrame
            block="dcai/product-description"
            type="Dynamic"
            source="ACF Longform Technical Prose"
            className="space-y-6"
          >
            <div className="space-y-3">
              <h2 className="font-serif-display text-xl sm:text-2xl text-ink font-medium">
                Engineering Overview
              </h2>
              <p className="text-sm text-ink-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Key Engineering Features */}
            <div className="space-y-3 pt-4 border-t border-line">
              <div className="text-xs font-mono uppercase tracking-wider text-ink-3 font-semibold">
                Key Features
              </div>
              <ul className="space-y-2">
                {product.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-2">
                    <Check className="w-4 h-4 text-status-success shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Use Cases */}
            <div className="space-y-2 pt-4 border-t border-line">
              <div className="text-xs font-mono uppercase tracking-wider text-ink-3 font-semibold">
                Typical Applications
              </div>
              <div className="flex flex-wrap gap-2">
                {product.useCases.map(uc => (
                  <span
                    key={uc}
                    className="px-2.5 py-1 rounded bg-surface border border-line text-xs text-ink-2 font-medium"
                  >
                    {uc}
                  </span>
                ))}
              </div>
            </div>
          </BlockFrame>

          {/* 4. dcai/technical-parameters (Desktop Table, Mobile Definition List) */}
          <BlockFrame
            block="dcai/technical-parameters"
            type="Dynamic"
            source="ACF Technical Parameter Group"
            className="space-y-4 pt-4 border-t border-line"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-serif-display text-xl sm:text-2xl text-ink font-medium">
                Technical Specifications
              </h2>
              <button
                onClick={copySpecsText}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-line text-xs font-mono text-ink-2 hover:bg-surface hover:text-primary transition-colors"
                title="Copy all specs as text"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Specs</span>
              </button>
            </div>

            {/* Desktop Spec Table */}
            <div className="hidden sm:block overflow-hidden rounded-lg bg-surface border border-line shadow-sh-1">
              <table className="w-full text-left text-xs divide-y divide-line">
                <tbody className="divide-y divide-line/60">
                  <tr className="hover:bg-primary-tint/20">
                    <td className="py-2.5 px-4 font-mono text-ink-3 w-1/3">Dimensions</td>
                    <td className="py-2.5 px-4 font-mono font-medium text-ink">{product.specs.dimensions}</td>
                  </tr>
                  <tr className="hover:bg-primary-tint/20">
                    <td className="py-2.5 px-4 font-mono text-ink-3">Weight</td>
                    <td className="py-2.5 px-4 font-mono font-medium text-ink">{product.specs.weight}</td>
                  </tr>
                  <tr className="hover:bg-primary-tint/20">
                    <td className="py-2.5 px-4 font-mono text-ink-3">Supply Voltage</td>
                    <td className="py-2.5 px-4 font-mono font-medium text-ink">{product.specs.supplyVoltage}</td>
                  </tr>
                  <tr className="hover:bg-primary-tint/20">
                    <td className="py-2.5 px-4 font-mono text-ink-3">Power Consumption</td>
                    <td className="py-2.5 px-4 font-mono font-medium text-ink">{product.specs.powerConsumption}</td>
                  </tr>
                  <tr className="hover:bg-primary-tint/20">
                    <td className="py-2.5 px-4 font-mono text-ink-3">Mounting Form</td>
                    <td className="py-2.5 px-4 font-mono font-medium text-ink">{product.specs.mounting}</td>
                  </tr>
                  <tr className="hover:bg-primary-tint/20">
                    <td className="py-2.5 px-4 font-mono text-ink-3">IP Rating</td>
                    <td className="py-2.5 px-4 font-mono font-medium text-ink">{product.specs.ipRating}</td>
                  </tr>
                  <tr className="hover:bg-primary-tint/20">
                    <td className="py-2.5 px-4 font-mono text-ink-3">Operating Temp</td>
                    <td className="py-2.5 px-4 font-mono font-medium text-ink">{product.specs.operatingTemp}</td>
                  </tr>
                  <tr className="hover:bg-primary-tint/20">
                    <td className="py-2.5 px-4 font-mono text-ink-3">Interface / Ports</td>
                    <td className="py-2.5 px-4 font-mono font-medium text-ink">{product.specs.interfacePorts}</td>
                  </tr>
                  <tr className="hover:bg-primary-tint/20">
                    <td className="py-2.5 px-4 font-mono text-ink-3">Certifications</td>
                    <td className="py-2.5 px-4 font-mono font-medium text-ink">
                      {product.specs.certifications.join(' · ')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile Definition List (No Horizontal Scrolling) */}
            <div className="sm:hidden space-y-2">
              {[
                { label: 'Dimensions', val: product.specs.dimensions },
                { label: 'Weight', val: product.specs.weight },
                { label: 'Supply Voltage', val: product.specs.supplyVoltage },
                { label: 'Power Consumption', val: product.specs.powerConsumption },
                { label: 'Mounting Form', val: product.specs.mounting },
                { label: 'IP Rating', val: product.specs.ipRating },
                { label: 'Operating Temp', val: product.specs.operatingTemp },
                { label: 'Interface / Ports', val: product.specs.interfacePorts },
                { label: 'Certifications', val: product.specs.certifications.join(', ') }
              ].map(item => (
                <div key={item.label} className="p-2.5 rounded bg-surface border border-line">
                  <div className="text-[10px] font-mono uppercase text-ink-3">{item.label}</div>
                  <div className="font-mono text-xs text-ink font-medium mt-0.5">{item.val}</div>
                </div>
              ))}
            </div>
          </BlockFrame>
        </div>

        {/* Right Column (Cols 8-12): Downloads & Technical Library */}
        <div className="lg:col-span-5 space-y-8 sticky top-24">
          {/* 5. dcai/downloads — Technical Documentation Downloads */}
          <BlockFrame
            block="dcai/downloads"
            type="Dynamic"
            source="ACF Repeater (File Object with Permanent DAM URL)"
            className="p-6 rounded-lg bg-surface border border-line shadow-sh-1 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div>
                <h3 className="font-serif-display text-lg text-ink font-medium">
                  Technical Documentation
                </h3>
                <div className="text-[11px] font-mono text-ink-3">Permanent DAM referenced</div>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-paper border border-line text-ink-2">
                {product.downloads.length} {product.downloads.length === 1 ? 'File' : 'Files'}
              </span>
            </div>

            <div className="space-y-3">
              {product.downloads.map(doc => {
                const isLoading = downloadingFile === doc.title;

                return (
                  <div
                    key={doc.title}
                    className="p-3.5 rounded-md bg-paper border border-line hover:border-line-strong transition-colors space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5">
                        <FileText className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-medium text-ink leading-snug">
                            {doc.title}
                          </div>
                          <div className="text-[10px] font-mono text-ink-3 mt-0.5">
                            PDF · {doc.fileSize} · {doc.version} · {doc.updated}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => handleDownload(doc)}
                        disabled={isLoading}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded bg-primary hover:bg-primary-hover text-paper text-xs font-medium transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{isLoading ? 'Generating PDF…' : 'Download File'}</span>
                      </button>

                      <button
                        onClick={() => copyPermanentLink(doc.url, doc.title)}
                        className="p-1.5 rounded border border-line hover:bg-surface text-ink-3 hover:text-ink transition-colors"
                        title="Copy Permanent DAM URL"
                      >
                        <LinkIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-[11px] font-mono text-ink-3 pt-2 border-t border-line">
              Need the ETS application database or engineering submittals? Contact our trade support team.
            </div>
          </BlockFrame>

          {/* 6. dcai/related-products */}
          {relatedProducts.length > 0 && (
            <BlockFrame
              block="dcai/related-products"
              type="Dynamic"
              source="WooCommerce Related Products Field"
              className="space-y-3"
            >
              <div className="text-xs font-mono uppercase tracking-wider text-ink-3 font-semibold">
                Complementary Products
              </div>
              <div className="space-y-2">
                {relatedProducts.map(rel => (
                  <Link
                    key={rel.id}
                    to={`/brands/${rel.brandSlug}/${rel.protocolSlug}/${rel.mpn.toLowerCase()}`}
                    className="p-3 rounded-md bg-surface border border-line hover:border-primary transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-mono text-xs font-semibold text-accent-text group-hover:text-primary">
                        {rel.mpn}
                      </div>
                      <div className="text-xs text-ink-2 truncate max-w-xs">{rel.name}</div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-ink-3 group-hover:text-primary group-hover:translate-x-1 transition-transform shrink-0" />
                  </Link>
                ))}
              </div>
            </BlockFrame>
          )}

          {/* 7. dcai/cta-single */}
          <BlockFrame
            block="dcai/cta-single"
            type="Static"
            source="Dealer-Safe Project Router"
            className="p-6 rounded-lg bg-dark-ground text-dark-ink space-y-3"
          >
            <div className="text-[10px] font-mono uppercase text-accent font-semibold tracking-wider">
              Project Specification
            </div>
            <h4 className="font-serif-display text-lg text-dark-ink font-medium">
              Need assistance designing with {product.mpn}?
            </h4>
            <p className="text-xs text-dark-ink2 leading-relaxed">
              DCAI works through authorized system integrators. We provide design review and connect you with certified installers.
            </p>
            <div className="pt-2">
              <Link
                to={`/contact#trade?mpn=${product.mpn}`}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded bg-accent hover:bg-accent-text text-paper text-xs font-medium transition-colors"
              >
                <span>Ask Technical Team</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </BlockFrame>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-dark-ground/90 p-4 animate-fade-in">
          <div className="relative max-w-3xl w-full bg-elevated rounded-lg overflow-hidden border border-line shadow-sh-3 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div>
                <span className="font-mono text-xs text-accent-text font-semibold">{product.mpn}</span>
                <h3 className="font-serif-display text-lg text-ink font-medium">{product.name}</h3>
              </div>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-1 rounded text-ink-3 hover:text-ink"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="w-full aspect-[4/3] rounded bg-paper border border-line overflow-hidden">
              <ProductSilhouette
                type={product.illustrationType}
                viewIndex={selectedView}
                brandName={brand.name}
                mpn={product.mpn}
              />
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-ink-3">
              <span>View: {selectedView === 0 ? 'Front' : selectedView === 1 ? 'Isometric' : 'Ports'}</span>
              <div className="flex gap-2">
                {[0, 1, 2].map(i => (
                  <button
                    key={i}
                    onClick={() => setSelectedView(i)}
                    className={`px-2 py-1 rounded border ${selectedView === i ? 'bg-primary text-paper' : 'bg-surface text-ink-2'}`}
                  >
                    View {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Mobile Download Bar (Section 14.8) */}
      {showStickyDownload && (
        <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-elevated border-t border-line shadow-sh-3 flex items-center justify-between gap-3 animate-slide-up">
          <div className="truncate">
            <div className="font-mono text-[11px] font-semibold text-accent-text truncate">{product.mpn}</div>
            <div className="text-[10px] text-ink-3 truncate">{product.downloads.length} Technical Documents</div>
          </div>
          <button
            onClick={() => handleDownload(product.downloads[0])}
            className="px-4 py-2 rounded bg-primary text-paper text-xs font-medium shrink-0 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Datasheet</span>
          </button>
        </div>
      )}
    </div>
  );
};
