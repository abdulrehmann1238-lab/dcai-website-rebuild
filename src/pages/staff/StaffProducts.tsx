import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../state/DataContext';
import { useToast } from '../../state/ToastContext';
import { Product } from '../../data/products';
import {
  Search,
  Filter,
  Edit3,
  ExternalLink,
  CheckCircle2,
  X,
  Save,
  RotateCcw,
  Tag,
  FileText
} from 'lucide-react';

export const StaffProducts: React.FC = () => {
  const { products, updateProduct } = useData();
  const { addToast } = useToast();

  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form edit fields
  const [editStatus, setEditStatus] = useState<'Active' | 'Discontinued'>('Active');
  const [editDesc, setEditDesc] = useState('');
  const [editMounting, setEditMounting] = useState<any>('DIN rail');

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchBrand = selectedBrand === 'all' || p.brandSlug === selectedBrand;
      const matchStatus = selectedStatus === 'all' || p.status === selectedStatus;
      const matchQuery = !search.trim() ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.mpn.toLowerCase().includes(search.toLowerCase());
      return matchBrand && matchStatus && matchQuery;
    });
  }, [products, selectedBrand, selectedStatus, search]);

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setEditStatus(p.status);
    setEditDesc(p.shortDescription);
    setEditMounting(p.specs.mounting);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setIsSaving(true);
    setTimeout(() => {
      updateProduct(editingProduct.mpn, {
        status: editStatus,
        shortDescription: editDesc,
        specs: {
          ...editingProduct.specs,
          mounting: editMounting
        }
      });
      setIsSaving(false);
      setEditingProduct(null);
      addToast(`Updated ${editingProduct.mpn} in CMS. Changes are live on public site!`, 'success');
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-ink-3">Staff &bull; Content Autonomy</div>
          <h1 className="font-serif-display text-2xl text-ink font-medium">
            Product Repository &bull; ACF Schema Manager
          </h1>
          <p className="text-xs text-ink-2">
            Click any row to open the live ACF editing drawer. Edits update the public catalog instantly.
          </p>
        </div>

        <span className="text-xs font-mono px-3 py-1.5 rounded bg-surface border border-line text-ink">
          Total Products: <strong>{products.length}</strong>
        </span>
      </div>

      {/* Filter / Search Bar */}
      <div className="p-3.5 rounded-lg bg-surface border border-line flex flex-wrap items-center justify-between gap-3 shadow-sh-1">
        <div className="flex items-center gap-2 flex-1 min-w-[200px] max-w-sm">
          <Search className="w-4 h-4 text-ink-3" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by part number (MPN) or name…"
            className="w-full text-xs bg-paper border border-line rounded px-2.5 py-1.5 text-ink placeholder:text-ink-3 focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <select
            value={selectedBrand}
            onChange={e => setSelectedBrand(e.target.value)}
            className="px-2.5 py-1.5 rounded bg-paper border border-line text-ink focus:outline-none"
          >
            <option value="all">All Brands</option>
            <option value="halden">Halden</option>
            <option value="verelli">Verelli</option>
            <option value="korvane">Korvane</option>
            <option value="tessaro">Tessaro</option>
          </select>

          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="px-2.5 py-1.5 rounded bg-paper border border-line text-ink focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Discontinued">Discontinued</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto rounded-lg bg-surface border border-line shadow-sh-1">
        <table className="w-full text-left border-collapse text-xs">
          <thead className="bg-paper border-b border-line font-mono text-[11px] text-ink-3 uppercase tracking-wider">
            <tr>
              <th className="py-2.5 px-4 font-semibold">MPN</th>
              <th className="py-2.5 px-4 font-semibold">Product Name</th>
              <th className="py-2.5 px-4 font-semibold">Brand / Protocol</th>
              <th className="py-2.5 px-4 font-semibold">Status</th>
              <th className="py-2.5 px-4 font-semibold">Mounting</th>
              <th className="py-2.5 px-4 font-semibold">Assets</th>
              <th className="py-2.5 px-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/60">
            {filtered.map(prod => (
              <tr
                key={prod.id}
                onClick={() => handleOpenEdit(prod)}
                className="hover:bg-primary-tint/30 transition-colors cursor-pointer group"
              >
                <td className="py-3 px-4 font-mono font-semibold text-accent-text">
                  <div className="flex items-center gap-1.5">
                    <span>{prod.mpn}</span>
                    {prod.isNew && (
                      <span className="text-[9px] px-1 rounded bg-status-success text-paper">New</span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4 font-medium text-ink group-hover:text-primary max-w-xs truncate">
                  {prod.name}
                </td>
                <td className="py-3 px-4 font-mono text-ink-3 uppercase text-[11px]">
                  {prod.brandSlug} / {prod.protocolSlug}
                </td>
                <td className="py-3 px-4">
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    prod.status === 'Active' ? 'bg-status-success/15 text-status-success' : 'bg-status-error/15 text-status-error'
                  }`}>
                    {prod.status}
                  </span>
                </td>
                <td className="py-3 px-4 font-mono text-ink-3">
                  {prod.specs.mounting}
                </td>
                <td className="py-3 px-4 font-mono text-ink-3">
                  <span className="text-[10px] bg-paper px-1.5 py-0.5 rounded border border-line">
                    {prod.downloads.length} PDFs ✓
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={e => { e.stopPropagation(); handleOpenEdit(prod); }}
                    className="p-1 rounded hover:bg-paper text-primary"
                    title="Edit ACF fields"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Right Edit Drawer (480px) */}
      {editingProduct && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-dark-ground/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md h-full bg-elevated border-l border-line shadow-sh-3 flex flex-col justify-between overflow-y-auto animate-slide-left p-6 space-y-6">
            <div>
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div>
                  <div className="font-mono text-xs text-accent-text font-semibold">{editingProduct.mpn}</div>
                  <h3 className="font-serif-display text-lg text-ink font-medium">ACF Field Editor</h3>
                </div>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="p-1 rounded text-ink-3 hover:text-ink hover:bg-paper"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 pt-4 text-xs">
                {/* Product Name (Read-only core) */}
                <div className="space-y-1">
                  <label className="font-semibold text-ink">Post Title (WooCommerce)</label>
                  <input
                    type="text"
                    disabled
                    value={editingProduct.name}
                    className="w-full px-2.5 py-1.5 rounded bg-paper border border-line text-ink-3 select-none"
                  />
                </div>

                {/* Status Toggle */}
                <div className="space-y-1">
                  <label className="font-semibold text-ink">Catalog Status</label>
                  <select
                    value={editStatus}
                    onChange={e => setEditStatus(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 rounded bg-surface border border-line text-ink focus:outline-none focus:border-primary"
                  >
                    <option value="Active">Active (Visible in grid & searches)</option>
                    <option value="Discontinued">Discontinued (Displays archived warning & replacement)</option>
                  </select>
                </div>

                {/* Short Description */}
                <div className="space-y-1">
                  <label className="font-semibold text-ink">Short Description (Excerpt)</label>
                  <textarea
                    rows={3}
                    value={editDesc}
                    onChange={e => setEditDesc(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded bg-surface border border-line text-ink focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Mounting Form */}
                <div className="space-y-1">
                  <label className="font-semibold text-ink">Mounting Parameter</label>
                  <select
                    value={editMounting}
                    onChange={e => setEditMounting(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded bg-surface border border-line text-ink focus:outline-none focus:border-primary"
                  >
                    <option value="DIN rail">DIN rail (EN 60715)</option>
                    <option value="Wall mount">Wall mount</option>
                    <option value="Ceiling flush">Ceiling flush</option>
                    <option value="Door mortise">Door mortise</option>
                    <option value="Surface box">Surface box</option>
                  </select>
                </div>

                {/* Attached Downloads Preview */}
                <div className="space-y-1.5 pt-2 border-t border-line">
                  <div className="font-semibold text-ink">Bound Technical Documents (DAM)</div>
                  <div className="space-y-1">
                    {editingProduct.downloads.map(doc => (
                      <div key={doc.title} className="p-2 rounded bg-paper border border-line flex items-center justify-between text-[11px] font-mono">
                        <span className="truncate max-w-[240px]">{doc.title}</span>
                        <span className="text-status-success">Linked ✓</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-line flex items-center gap-2">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 py-2 rounded bg-primary hover:bg-primary-hover text-paper font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isSaving ? 'Saving to Database…' : 'Save to CMS'}</span>
                  </button>

                  <Link
                    to={`/brands/${editingProduct.brandSlug}/${editingProduct.protocolSlug}/${editingProduct.mpn.toLowerCase()}`}
                    target="_blank"
                    className="p-2 rounded border border-line hover:bg-paper text-ink-2"
                    title="View live product page in new tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </form>
            </div>

            <div className="text-[11px] font-mono text-ink-3 pt-3 border-t border-line">
              Notice: Saving updates the in-memory product store immediately. Discontinuing this product will display the warning banner live on the public detail page.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
