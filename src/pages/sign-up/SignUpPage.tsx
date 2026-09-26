import { useNavigate } from 'react-router-dom';
import { routeFor } from '@/data/navigation';
import { Avatar } from "@/components/basics/Avatar";
import { getFeaturedPerson, scenes } from "@/data/people";


export interface SignUpPageProps {
  /** The same screen serves both — only the copy and the CTA change. */
  mode?: 'signup' | 'signin';
}

export function SignUpPage({ mode = 'signup' }: SignUpPageProps) {
  const routerNavigate = useNavigate();
  const onNavigate = (screen: string) => routerNavigate(routeFor(screen));
  const ada = getFeaturedPerson("ada");

  return (
    <div className="min-h-screen grid" style={{ gridTemplateColumns: '1fr 1fr', background: '#FFFFFF' }}>
      {/* Left */}
      <div className="flex flex-col items-center justify-center px-16">
        <div className="w-full" style={{ maxWidth: 400 }}>
          {/* Logo */}
          <div className="flex items-center gap-2 mb-10 cursor-pointer" onClick={() => onNavigate('landing')}>
            <div className="flex items-center justify-center rounded-lg text-white font-bold" style={{ width: 28, height: 28, background: '#5F63C9', fontFamily: 'var(--font-tight)', fontSize: 14 }}>T</div>
            <span style={{ fontFamily: 'var(--font-tight)', fontWeight: 600, fontSize: 20, letterSpacing: '-0.014em', color: '#16161D' }}>TAMA</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-tight)', fontWeight: 600, fontSize: 30, letterSpacing: '-0.015em', margin: '0 0 8px', color: '#16161D' }}>
            {mode === 'signup' ? (
              <>Create your <span className="accent">workspace</span></>
            ) : (
              <>Welcome <span className="accent">back</span></>
            )}
          </h1>
          <p className="text-text-secondary mb-8" style={{ fontSize: 14.5, lineHeight: '22px' }}>
            {mode === 'signup'
              ? 'Two tools connected and you will have a forecast before this coffee goes cold.'
              : 'Everything is where you left it.'}
          </p>

          {/* SSO */}
          <div className="flex flex-col gap-3 mb-6">
            {[
              { name: 'Google', icon: 'G', bg: '#4285F4' },
              { name: 'Microsoft', icon: 'M', bg: '#00A4EF' },
              { name: 'Slack', icon: 'S', bg: '#4A154B' },
            ].map(sso => (
              <button
                key={sso.name}
                className="w-full flex items-center gap-3 rounded-lg transition-colors cursor-pointer"
                style={{ height: 44, background: '#FFFFFF', border: '1px solid #D5D5DE', padding: '0 16px', fontSize: 14, color: '#16161D' }}
              >
                <div className="flex items-center justify-center rounded font-bold text-white" style={{ width: 22, height: 22, background: sso.bg, fontSize: 12, fontFamily: 'var(--font-tight)' }}>
                  {sso.icon}
                </div>
                <span>Continue with {sso.name}</span>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ background: '#EAEAEF' }} />
            <span className="text-text-tertiary" style={{ fontSize: 13 }}>or</span>
            <div className="flex-1 h-px" style={{ background: '#EAEAEF' }} />
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-4 mb-6">
            <div>
              <label className="text-text-tertiary uppercase mb-1.5 block" style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.06em' }}>Email</label>
              <input
                type="email"
                placeholder="courtney@company.com"
                className="w-full rounded-lg px-3 outline-none text-text-primary"
                style={{ height: 40, border: '1px solid #D5D5DE', fontSize: 13, background: '#FFFFFF' }}
              />
            </div>
            <div>
              <label className="text-text-tertiary uppercase mb-1.5 block" style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.06em' }}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-lg px-3 outline-none text-text-primary"
                style={{ height: 40, border: '1px solid #D5D5DE', fontSize: 13, background: '#FFFFFF' }}
              />
              {mode === 'signup' && (
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4].map(seg => (
                    <div key={seg} className="flex-1 h-1 rounded-full" style={{ background: seg <= 2 ? '#8B8FE8' : '#EAEAEF' }} />
                  ))}
                </div>
              )}
              {mode === 'signin' && (
                <div className="text-right mt-1.5">
                  <a href="#" className="text-text-tertiary hover:text-text-secondary" style={{ fontSize: 12 }}>Forgot password?</a>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => onNavigate('onboarding')}
            className="w-full rounded-lg text-white font-medium transition-colors cursor-pointer"
            style={{ height: 40, background: '#16161D', border: 'none', fontSize: 14, fontFamily: 'var(--font-sans)' }}
          >
            Continue
          </button>

          <p className="text-text-tertiary text-center mt-4" style={{ fontSize: 12 }}>
            By continuing, you agree to our{' '}
            <a href="#" className="underline">Terms</a> and{' '}
            <a href="#" className="underline">Privacy Policy</a>.
          </p>

          <p className="text-text-secondary text-center mt-4" style={{ fontSize: 13 }}>
            {mode === 'signup' ? (
              <>Already have an account? <button onClick={() => onNavigate('signin')} className="text-action font-medium cursor-pointer" style={{ background: 'none', border: 'none', padding: 0 }}>Sign in</button></>
            ) : (
              <>No account? <button onClick={() => onNavigate('signup')} className="text-action font-medium cursor-pointer" style={{ background: 'none', border: 'none', padding: 0 }}>Create workspace</button></>
            )}
          </p>
        </div>
      </div>

      {/* Right — a room, not a mockup */}
      <div className="relative overflow-hidden" style={{ borderLeft: '1px solid #EAEAEF' }}>
        <img
          src={scenes.studio}
          alt="A product team at work in their studio"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(22,22,29,0.10) 0%, rgba(22,22,29,0.30) 45%, rgba(22,22,29,0.82) 100%)',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 p-12">
          <blockquote
            className="m-0 mb-6"
            style={{
              fontFamily: 'var(--font-tight)',
              fontSize: 26,
              lineHeight: '1.32',
              letterSpacing: '-0.014em',
              color: '#FFFFFF',
              maxWidth: 440,
            }}
          >
            “We stopped arguing about whether a date was realistic and started
            arguing about what to change.”
          </blockquote>
          <div className="flex items-center gap-3">
            <Avatar
              initials={ada.initials}
              color={ada.color}
              src={ada.photo}
              name={ada.name}
              size={40}
              ring={false}
            />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#FFFFFF', fontFamily: 'var(--font-tight)' }}>
                {ada.name}
              </div>
              <div style={{ fontSize: 12.5, color: '#D5D5DE' }}>{ada.role}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
