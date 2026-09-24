'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Upload, CheckCircle } from 'lucide-react';
import type { Product, ProductVariant, LensType, LensMaterial, LensCoating, PrescriptionData } from '@/types';
import { LENS_PRICES, COATING_PRICES } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/components/cart/CartProvider';
import { useToast } from '@/components/ui/Toaster';

interface PrescriptionFlowProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  variant?: ProductVariant;
}

type FlowStep = 'lens-type' | 'lens-material' | 'coating' | 'prescription' | 'review';

const STEPS: { id: FlowStep; label: string }[] = [
  { id: 'lens-type', label: 'Lens Type' },
  { id: 'lens-material', label: 'Material' },
  { id: 'coating', label: 'Coating' },
  { id: 'prescription', label: 'Prescription' },
  { id: 'review', label: 'Review' },
];

const LENS_TYPE_OPTIONS: { value: LensType; label: string; description: string; icon: string }[] = [
  { value: 'SINGLE_VISION', label: 'Single Vision', description: 'For nearsightedness, farsightedness, or astigmatism', icon: '○' },
  { value: 'BIFOCAL', label: 'Bifocal', description: 'Corrects both near and distance vision', icon: '◑' },
  { value: 'PROGRESSIVE', label: 'Progressive', description: 'Multi-focal with smooth transition — no visible line', icon: '◉' },
];

const MATERIAL_OPTIONS: { value: LensMaterial; label: string; description: string; thickness: string }[] = [
  { value: 'STANDARD', label: 'Standard', description: '1.50 index — suitable for mild prescriptions', thickness: 'Standard thickness' },
  { value: 'THIN', label: 'Thin', description: '1.61 index — suitable for moderate prescriptions', thickness: '30% thinner' },
  { value: 'ULTRA_THIN', label: 'Ultra Thin', description: '1.74 index — ideal for strong prescriptions', thickness: '50% thinner' },
];

const COATING_OPTIONS: { value: LensCoating; label: string; description: string; icon: string }[] = [
  { value: 'ANTI_REFLECTION', label: 'Anti-Reflection', description: 'Reduces glare for clearer vision', icon: '✦' },
  { value: 'BLUE_LIGHT', label: 'Blue Light Filter', description: 'Protects from screen blue light', icon: '💻' },
  { value: 'UV_PROTECTION', label: 'UV Protection', description: 'Blocks 100% UVA & UVB rays', icon: '☀️' },
  { value: 'PHOTOCHROMIC', label: 'Photochromic', description: 'Darkens automatically in sunlight', icon: '🔆' },
  { value: 'TRANSITION', label: 'Transition', description: 'Premium auto-tinting technology', icon: '✨' },
];

const EMPTY_EYE = { sph: '', cyl: '', axis: '', add: '', pd: '' };

function EyeFields({ eye, setEye, label }: { eye: typeof EMPTY_EYE; setEye: (e: typeof EMPTY_EYE) => void; label: string }) {
  return (
    <div
      style={{
        padding: '1.125rem',
        background: 'var(--color-surface-2)',
        borderRadius: 'var(--radius-xl)',
      }}
    >
      <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {label}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem' }}>
        {(['sph', 'cyl', 'axis', 'add', 'pd'] as const).map((field) => (
          <div key={field}>
            <label className="label" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>
              {field.toUpperCase()}
            </label>
            <input
              type="number"
              step={field === 'axis' ? '1' : '0.25'}
              value={eye[field]}
              onChange={(e) => setEye({ ...eye, [field]: e.target.value })}
              className="input"
              style={{ padding: '0.5rem 0.375rem', fontSize: '0.8125rem', textAlign: 'center' }}
              placeholder="—"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PrescriptionFlow({ open, onClose, product, variant }: PrescriptionFlowProps) {
  const [step, setStep] = useState<FlowStep>('lens-type');
  const [lensType, setLensType] = useState<LensType>('SINGLE_VISION');
  const [lensMaterial, setLensMaterial] = useState<LensMaterial>('STANDARD');
  const [coating, setCoating] = useState<LensCoating>('ANTI_REFLECTION');
  const [rightEye, setRightEye] = useState({ ...EMPTY_EYE });
  const [leftEye, setLeftEye] = useState({ ...EMPTY_EYE });
  const [uploadMode, setUploadMode] = useState(false);
  const { addItem } = useCart();
  const { success } = useToast();

  const stepIndex = STEPS.findIndex((s) => s.id === step);

  const lensPrice = LENS_PRICES[lensType][lensMaterial];
  const coatingPrice = COATING_PRICES[coating];
  const totalLensPrice = lensPrice + coatingPrice;
  const framePrice = product.salePrice || product.price;
  const grandTotal = framePrice + totalLensPrice;

  const next = () => {
    const nextStep = STEPS[stepIndex + 1];
    if (nextStep) setStep(nextStep.id);
  };

  const prev = () => {
    const prevStep = STEPS[stepIndex - 1];
    if (prevStep) setStep(prevStep.id);
  };

  const handleAddToCart = () => {
    const prescription: PrescriptionData = {
      rightEye: {
        sph: parseFloat(rightEye.sph) || 0,
        cyl: parseFloat(rightEye.cyl) || 0,
        axis: parseInt(rightEye.axis) || 0,
        add: parseFloat(rightEye.add) || undefined,
        pd: parseFloat(rightEye.pd) || undefined,
      },
      leftEye: {
        sph: parseFloat(leftEye.sph) || 0,
        cyl: parseFloat(leftEye.cyl) || 0,
        axis: parseInt(leftEye.axis) || 0,
        add: parseFloat(leftEye.add) || undefined,
        pd: parseFloat(leftEye.pd) || undefined,
      },
    };

    addItem({
      productId: product.id,
      product,
      variantId: variant?.id,
      variant,
      quantity: 1,
      unitPrice: grandTotal,
      lensConfig: {
        type: lensType,
        material: lensMaterial,
        coating,
        price: totalLensPrice,
      },
      prescription,
    });

    success('Added with prescription lens!', `${product.name} + ${lensType.replace('_', ' ')} lens`);
    onClose();
    setStep('lens-type');
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 'var(--z-modal)', backdropFilter: 'blur(3px)' }}
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              maxWidth: '560px',
              maxHeight: '90vh',
              background: 'white',
              borderRadius: 'var(--radius-2xl)',
              zIndex: 'calc(var(--z-modal) + 1)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)',
            }}
          >
            {/* Modal Header */}
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
              <div>
                <h2 style={{ fontSize: '1rem', fontWeight: 700 }}>Add Power Lens</h2>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '0.125rem' }}>
                  {product.name}
                </p>
              </div>
              <button onClick={onClose} style={{ display: 'flex', border: 'none', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-md)', padding: '0.375rem', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>

            {/* Step Indicator */}
            <div style={{ padding: '1rem 1.5rem 0', display: 'flex', gap: '0.375rem', flexShrink: 0 }}>
              {STEPS.map((s, i) => (
                <div
                  key={s.id}
                  style={{
                    flex: 1,
                    height: '3px',
                    borderRadius: '2px',
                    background: i <= stepIndex ? 'var(--color-primary)' : 'var(--color-border)',
                    transition: 'background 0.3s ease',
                  }}
                />
              ))}
            </div>
            <p style={{ padding: '0.375rem 1.5rem 0', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted)' }}>
              Step {stepIndex + 1} of {STEPS.length}: {STEPS[stepIndex].label}
            </p>

            {/* Step Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Step: Lens Type */}
                  {step === 'lens-type' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {LENS_TYPE_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setLensType(opt.value)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '1rem 1.125rem',
                            background: lensType === opt.value ? 'var(--color-primary)' : 'var(--color-surface-2)',
                            border: `2px solid ${lensType === opt.value ? 'var(--color-primary)' : 'var(--color-border)'}`,
                            borderRadius: 'var(--radius-xl)',
                            cursor: 'pointer',
                            textAlign: 'left',
                            color: lensType === opt.value ? 'white' : 'var(--color-text)',
                            transition: 'all 0.2s ease',
                            fontFamily: 'var(--font-sans)',
                          }}
                        >
                          <span style={{ fontSize: '1.5rem' }}>{opt.icon}</span>
                          <div>
                            <p style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{opt.label}</p>
                            <p style={{ fontSize: '0.8125rem', opacity: 0.8, marginTop: '0.125rem' }}>{opt.description}</p>
                          </div>
                          <span style={{ marginLeft: 'auto', fontWeight: 700, fontSize: '0.875rem', color: lensType === opt.value ? 'rgba(255,255,255,0.8)' : 'var(--color-accent-dark)' }}>
                            from {formatPrice(LENS_PRICES[opt.value].STANDARD)}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Step: Lens Material */}
                  {step === 'lens-material' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {MATERIAL_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setLensMaterial(opt.value)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '1rem 1.125rem',
                            background: lensMaterial === opt.value ? 'var(--color-primary)' : 'var(--color-surface-2)',
                            border: `2px solid ${lensMaterial === opt.value ? 'var(--color-primary)' : 'var(--color-border)'}`,
                            borderRadius: 'var(--radius-xl)',
                            cursor: 'pointer',
                            color: lensMaterial === opt.value ? 'white' : 'var(--color-text)',
                            transition: 'all 0.2s ease',
                            fontFamily: 'var(--font-sans)',
                            textAlign: 'left',
                          }}
                        >
                          <div>
                            <p style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{opt.label}</p>
                            <p style={{ fontSize: '0.8125rem', opacity: 0.8, marginTop: '0.125rem' }}>{opt.description}</p>
                            <p style={{ fontSize: '0.75rem', marginTop: '0.25rem', fontWeight: 500, opacity: 0.7 }}>{opt.thickness}</p>
                          </div>
                          <span style={{ fontWeight: 700, fontSize: '0.9375rem', flexShrink: 0, marginLeft: '1rem' }}>
                            +{formatPrice(LENS_PRICES[lensType][opt.value])}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Step: Coating */}
                  {step === 'coating' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                      {COATING_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setCoating(opt.value)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.875rem',
                            padding: '0.875rem 1rem',
                            background: coating === opt.value ? 'var(--color-primary)' : 'var(--color-surface-2)',
                            border: `2px solid ${coating === opt.value ? 'var(--color-primary)' : 'var(--color-border)'}`,
                            borderRadius: 'var(--radius-xl)',
                            cursor: 'pointer',
                            color: coating === opt.value ? 'white' : 'var(--color-text)',
                            transition: 'all 0.2s ease',
                            fontFamily: 'var(--font-sans)',
                            textAlign: 'left',
                          }}
                        >
                          <span style={{ fontSize: '1.25rem' }}>{opt.icon}</span>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontWeight: 700, fontSize: '0.875rem' }}>{opt.label}</p>
                            <p style={{ fontSize: '0.8125rem', opacity: 0.8 }}>{opt.description}</p>
                          </div>
                          <span style={{ fontWeight: 700, fontSize: '0.875rem', flexShrink: 0 }}>
                            +{formatPrice(COATING_PRICES[opt.value])}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Step: Prescription */}
                  {step === 'prescription' && (
                    <div>
                      <div style={{ display: 'flex', gap: '0.625rem', marginBottom: '1.25rem' }}>
                        <button
                          onClick={() => setUploadMode(false)}
                          className={`btn btn-sm ${!uploadMode ? 'btn-primary' : 'btn-outline'}`}
                          style={{ flex: 1 }}
                        >
                          Enter Manually
                        </button>
                        <button
                          onClick={() => setUploadMode(true)}
                          className={`btn btn-sm ${uploadMode ? 'btn-primary' : 'btn-outline'}`}
                          style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.375rem', justifyContent: 'center' }}
                        >
                          <Upload size={14} />
                          Upload Prescription
                        </button>
                      </div>

                      {uploadMode ? (
                        <div
                          style={{
                            border: '2px dashed var(--color-border)',
                            borderRadius: 'var(--radius-xl)',
                            padding: '2.5rem',
                            textAlign: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          <Upload size={32} style={{ color: 'var(--color-muted)', margin: '0 auto 0.875rem' }} />
                          <p style={{ fontWeight: 600, marginBottom: '0.375rem' }}>Upload your prescription</p>
                          <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', marginBottom: '1rem' }}>
                            JPG, PNG or PDF — max 5MB
                          </p>
                          <button className="btn btn-outline btn-sm">
                            Choose File
                          </button>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          <EyeFields eye={rightEye} setEye={setRightEye} label="Right Eye (OD)" />
                          <EyeFields eye={leftEye} setEye={setLeftEye} label="Left Eye (OS)" />
                          <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', textAlign: 'center' }}>
                            Not sure about your prescription? We&apos;ll contact you to confirm before manufacturing.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step: Review */}
                  {step === 'review' && (
                    <div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        {[
                          { label: 'Frame', value: product.name },
                          { label: 'Lens Type', value: lensType.replace('_', ' ') },
                          { label: 'Lens Material', value: lensMaterial.replace('_', ' ') },
                          { label: 'Coating', value: coating.replace('_', ' ') },
                        ].map((item) => (
                          <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-lg)' }}>
                            <span style={{ fontSize: '0.875rem', color: 'var(--color-muted)' }}>{item.label}</span>
                            <span style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'capitalize' }}>{item.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Price breakdown */}
                      <div style={{ background: 'var(--color-surface-2)', borderRadius: 'var(--radius-xl)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--color-muted)' }}>
                          <span>Frame price</span>
                          <span>{formatPrice(framePrice)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--color-muted)' }}>
                          <span>Lens + Coating</span>
                          <span>{formatPrice(totalLensPrice)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: 800, color: 'var(--color-primary)', paddingTop: '0.5rem', borderTop: '1px solid var(--color-border)', marginTop: '0.25rem' }}>
                          <span>Total</span>
                          <span>{formatPrice(grandTotal)}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', padding: '0.75rem', background: '#F0FAF4', borderRadius: 'var(--radius-lg)', border: '1px solid #B7E4C7' }}>
                        <CheckCircle size={16} style={{ color: '#2D7A4F', flexShrink: 0 }} />
                        <p style={{ fontSize: '0.8125rem', color: '#2D7A4F' }}>
                          Our opticians will review your prescription and contact you if clarification is needed.
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer navigation */}
            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
              {stepIndex > 0 && (
                <button
                  onClick={prev}
                  className="btn btn-outline"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
                >
                  <ChevronLeft size={16} />
                  Back
                </button>
              )}

              {step !== 'review' ? (
                <button
                  onClick={next}
                  className="btn btn-primary"
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem' }}
                >
                  Continue
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="btn btn-accent"
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontWeight: 700 }}
                >
                  Add to Cart — {formatPrice(grandTotal)}
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
