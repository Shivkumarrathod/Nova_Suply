import { X } from 'lucide-react'

export function AuthDialog({ pendingProduct, onClose, onLogin }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="close-button" type="button" aria-label="Close sign in" onClick={onClose}><X size={20} /></button>
        <p className="eyebrow">Member access</p><h2 id="auth-title">Sign in to continue</h2>
        <p>{pendingProduct ? `${pendingProduct.name} is ready to join your cart.` : 'Access your profile, orders, and saved addresses.'}</p>
        <label htmlFor="phone">Phone number</label>
        <div className="phone-row"><span>+1</span><input id="phone" type="tel" placeholder="555 000 1234" autoFocus /></div>
        <button className="primary-button" type="button" onClick={() => onLogin('phone')}>Continue with phone</button>
        <div className="divider"><span>or</span></div>
        <button className="google-button" type="button" onClick={() => onLogin('google')}><b>G</b> Continue with Google</button>
        <small>Prototype only. No credentials are sent or stored.</small>
      </section>
    </div>
  )
}