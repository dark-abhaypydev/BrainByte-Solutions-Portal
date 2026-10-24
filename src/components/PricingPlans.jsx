import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Check, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  CreditCard, 
  Lock, 
  X, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { PRICING_PLANS } from '../data/portalData';

export default function PricingPlans({ onPlanPurchased, razorpayKey }) {
  const [billingType, setBillingType] = useState('onetime'); // 'onetime', 'subscription'
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentStep, setPaymentStep] = useState('select_method'); // 'select_method', 'processing', 'success'

  const handleSelectPlan = (plan) => {
    // If Admin provided a Real Razorpay Key
    if (razorpayKey && window.Razorpay) {
      const options = {
        key: razorpayKey,
        amount: (billingType === 'subscription' ? Math.round(plan.price / 3) : plan.price) * 100,
        currency: "INR",
        name: "BrainByte Solutions",
        description: `${plan.name} Access`,
        image: "/brainbyte-logo.jpg",
        handler: function (response) {
          alert(`Payment Successful! Razorpay ID: ${response.razorpay_payment_id}`);
          confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
          if (onPlanPurchased) onPlanPurchased(plan);
        },
        prefill: {
          name: "Student",
          email: "student@example.com"
        },
        theme: {
          color: "#1d68ff"
        }
      };
      try {
        const rzp = new window.Razorpay(options);
        rzp.open();
        return;
      } catch (err) {
        console.error("Razorpay error:", err);
      }
    }

    // Default simulated checkout modal
    setSelectedPlan(plan);
    setPaymentStep('select_method');
  };


  const handleSimulatePayment = () => {
    setPaymentStep('processing');
    setTimeout(() => {
      setPaymentStep('success');
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 }
      });
      if (onPlanPurchased) {
        onPlanPurchased(selectedPlan);
      }
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      
      {/* Header Section matching screenshot */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
          INVEST IN YOUR AI CAREER
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Flexible Plans for Every Learner
        </h1>
        <p className="text-sm text-slate-400">
          Choose your plan, get hands-on with real AI engineering and build industry-grade projects.
        </p>

        {/* Toggle matching screenshot: One-time Purchase vs Subscription */}
        <div className="inline-flex items-center p-1 rounded-2xl bg-[#091122] border border-[#1a2b4c] mt-4">
          <button
            onClick={() => setBillingType('onetime')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              billingType === 'onetime'
                ? 'bg-blue-600 text-white shadow-neon-blue'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            One-time Purchase
          </button>
          <button
            onClick={() => setBillingType('subscription')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              billingType === 'subscription'
                ? 'bg-blue-600 text-white shadow-neon-blue'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Subscription
          </button>
        </div>
      </div>

      {/* 3 Pricing Cards Grid matching screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto pt-6">
        {PRICING_PLANS.map((plan) => {
          const isPro = plan.isPopular;
          return (
            <div
              key={plan.id}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                isPro
                  ? 'bg-gradient-to-b from-[#101e3b] via-[#0d1628] to-[#070d18] border-2 border-blue-500/60 shadow-neon-blue scale-105 z-10'
                  : 'bg-[#0d1628]/95 border border-[#1a2b4c] hover:border-blue-500/40 hover:bg-[#121f38]'
              }`}
            >
              {/* Most Popular Glow Badge */}
              {isPro && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[11px] font-bold uppercase tracking-wider shadow-neon-blue flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Most Popular</span>
                </div>
              )}

              {/* Header: Plan Name & Subtitle */}
              <div>
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{plan.subtitle}</p>

                {/* Price Display in ₹ */}
                <div className="my-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-white">
                      ₹{billingType === 'subscription' ? (Math.round(plan.price / 3)).toLocaleString('en-IN') : plan.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {billingType === 'subscription' ? '/month' : 'one-time'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-through mt-0.5">
                    Regular: ₹{plan.originalPrice.toLocaleString('en-IN')}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-3 pt-4 border-t border-[#1e335a] text-xs">
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        isPro ? 'bg-blue-500/20 text-cyan-400' : 'bg-slate-800 text-blue-400'
                      }`}>
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-slate-300 leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buy Now Button matching screenshot */}
              <div className="pt-8">
                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-md ${
                    isPro
                      ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-neon-blue hover:scale-105'
                      : 'bg-[#15233d] hover:bg-blue-600 text-white border border-[#1e335a] hover:border-blue-500/40'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="max-w-3xl mx-auto p-4 rounded-2xl bg-[#091122] border border-[#1a2b4c] flex flex-col sm:flex-row items-center justify-around gap-4 text-xs text-slate-400 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>7-Day 100% Money-Back Guarantee</span>
        </div>
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-blue-400" />
          <span>256-Bit SSL Encrypted Checkout</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Instant Course & Lab Access</span>
        </div>
      </div>

      {/* Payment Checkout Modal Simulation */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0c1527] border border-[#1e335a] rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            
            <button
              onClick={() => setSelectedPlan(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {paymentStep === 'select_method' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Secure Checkout</h3>
                    <p className="text-xs text-slate-400">{selectedPlan.name} Plan • ₹{selectedPlan.price}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#070b16] border border-[#1a2b4c] space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Plan Subtotal:</span>
                    <span>₹{selectedPlan.price}</span>
                  </div>
                  <div className="flex justify-between text-emerald-400">
                    <span>Platform Scholarship Discount:</span>
                    <span>-₹{selectedPlan.originalPrice - selectedPlan.price}</span>
                  </div>
                  <div className="flex justify-between text-white font-bold pt-2 border-t border-slate-800">
                    <span>Total Amount Payable:</span>
                    <span className="text-cyan-300 text-sm">₹{selectedPlan.price}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Choose Payment Method
                  </span>
                  
                  <button
                    onClick={handleSimulatePayment}
                    className="w-full p-3 rounded-xl bg-[#0f1b33] border border-[#1e335a] hover:border-blue-500 text-slate-200 hover:text-white flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-cyan-300">UPI</span>
                      <span>(GPay, PhonePe, Paytm, BHIM)</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </button>

                  <button
                    onClick={handleSimulatePayment}
                    className="w-full p-3 rounded-xl bg-[#0f1b33] border border-[#1e335a] hover:border-blue-500 text-slate-200 hover:text-white flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-blue-400" />
                      <span>Credit / Debit Card (Visa, Mastercard, RuPay)</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </button>

                  <button
                    onClick={handleSimulatePayment}
                    className="w-full p-3 rounded-xl bg-[#0f1b33] border border-[#1e335a] hover:border-blue-500 text-slate-200 hover:text-white flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-amber-400" />
                      <span>Net Banking (SBI, HDFC, ICICI, Axis)</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>
            )}

            {paymentStep === 'processing' && (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin mx-auto"></div>
                <h4 className="text-base font-bold text-white">Connecting with Banking Gateway...</h4>
                <p className="text-xs text-slate-400">Verifying payment authorization and activating enrollment.</p>
              </div>
            )}

            {paymentStep === 'success' && (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Payment Successful!</h4>
                <p className="text-xs text-slate-300">
                  You now have full unlocked access to the <strong className="text-cyan-300">{selectedPlan.name}</strong> curriculum and practice labs!
                </p>
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                >
                  Start Learning Now ↗
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
