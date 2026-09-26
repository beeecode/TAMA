import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Icon, SparkleIcon } from "@/components/basics/Icon";
import { ConfidenceBar } from "@/components/forecast/ConfidenceBar";

const SUGGESTIONS = [
  { icon: 'alert', text: "What's at risk this week?" },
  { icon: 'target', text: "Why did Vega slip?" },
  { icon: 'team', text: "Who has capacity on Thursday?" },
  { icon: 'forecast', text: "Forecast Orion to P85" },
] as const;

const ANSWER_QUERY = "Why did Vega slip?";
const ANSWER_TEXT = `The Vega Brand Refresh forecast slipped 5 days over the past 8 weeks, moving from a P85 of March 27 to April 2. Three factors account for 87% of the drift: two approval-dependent tasks have been blocked for 6 business days, scope expanded with the addition of a microsite workstream in the Feb 17 sprint, and the team's cycle time rose from 2.1 to 2.8 days after Tom's return from leave.`;

const EVIDENCE = [
  { source: 'Task', text: '"Stakeholder approval — brand guidelines" · Blocked 6 days' },
  { source: 'Slack', text: '#vega-brand · "adding microsite to scope" · Feb 17, 14:32' },
  { source: 'Calendar', text: '"Vega design review" cancelled × 2 · Feb 10 & Feb 17' },
];

export function AskPage() {
  const navigate = useNavigate();
  /** Ask is an overlay over whatever you were looking at, so closing goes back. */
  const onClose = () => navigate(-1);

  const [query, setQuery] = useState('');
  const [answered, setAnswered] = useState(false);
  const [thumbState, setThumbState] = useState<'up' | 'down' | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query.trim()) {
      setAnswered(true);
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleSuggestion = (text: string) => {
    setQuery(text);
    setAnswered(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center"
      style={{ paddingTop: '10%', background: 'rgba(22,22,29,0.3)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full bg-surface rounded-2xl overflow-hidden"
        style={{
          maxWidth: 720,
          boxShadow: '0 16px 48px rgba(22,22,29,0.12), 0 2px 8px rgba(22,22,29,0.06)',
        }}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-5" style={{ height: 56, borderBottom: '1px solid #EAEAEF' }}>
          <SparkleIcon size={20} color="#5F63C9" />
          <input
            autoFocus
            value={query}
            onChange={e => { setQuery(e.target.value); setAnswered(false); }}
            onKeyDown={handleKeyDown}
            className="flex-1 outline-none bg-transparent text-text-primary"
            style={{ fontSize: 16, fontFamily: 'var(--font-sans)', border: 'none' }}
            placeholder="Ask anything about your work…"
          />
          <span
            className="text-text-tertiary rounded px-1.5 py-0.5"
            style={{ fontSize: 10, fontFamily: 'var(--font-mono)', background: '#F7F7F9', border: '1px solid #EAEAEF' }}
          >
            ⌘K
          </span>
        </div>

        {/* Results */}
        {!answered ? (
          <div className="px-5 py-4">
            <div className="text-text-tertiary uppercase mb-3" style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.06em' }}>
              Suggested
            </div>
            {SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSuggestion(s.text)}
                className="w-full flex items-center gap-3 px-3 rounded-lg hover:bg-surface-hover transition-colors cursor-pointer"
                style={{ height: 44, background: 'none', border: 'none', textAlign: 'left' }}
              >
                <span className="text-text-tertiary flex">
                  <Icon name={s.icon} size={16} />
                </span>
                <span className="text-text-primary" style={{ fontSize: 14 }}>{s.text}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="px-5 py-5">
            {/* Query */}
            <div className="flex items-center gap-2 mb-4">
              <SparkleIcon size={14} />
              <span className="text-text-secondary" style={{ fontSize: 13 }}>{query || ANSWER_QUERY}</span>
            </div>

            {/* Answer */}
            <p className="text-text-primary mb-5" style={{ fontSize: 15, lineHeight: '24px' }}>
              {ANSWER_TEXT}
            </p>

            {/* Confidence bar */}
            <div
              className="rounded-xl p-4 mb-5"
              style={{ background: '#EEEFFC', border: '1px solid #DCDDF8' }}
            >
              <div className="text-ai-strong font-medium mb-3" style={{ fontSize: 12 }}>Current Vega Brand Refresh forecast</div>
              <ConfidenceBar
                p50Label="14 Mar"
                p85Label="2 Apr"
                p95Label="12 Apr"
                targetPosition={0.72}
                p50Position={0.32}
                p85Position={0.68}
                height={10}
              />
            </div>

            {/* Evidence */}
            <div className="mb-5">
              <div className="text-text-tertiary uppercase mb-2" style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.06em' }}>Sources</div>
              {EVIDENCE.map((e, i) => (
                <div key={i} className="flex items-start gap-3 py-2" style={{ borderTop: i > 0 ? '1px solid #EAEAEF' : 'none' }}>
                  <span
                    className="rounded px-2 py-0.5 flex-shrink-0"
                    style={{ fontSize: 10, fontWeight: 500, background: '#F7F7F9', color: '#62626F', textTransform: 'uppercase', letterSpacing: '0.04em' }}
                  >
                    {e.source}
                  </span>
                  <span className="text-text-secondary" style={{ fontSize: 13 }}>{e.text}</span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid #EAEAEF' }}>
              <button
                className="text-ai-strong cursor-pointer"
                style={{ fontSize: 13, background: 'none', border: 'none', padding: 0 }}
              >
                Open forecast →
              </button>
              <div className="flex items-center gap-2">
                <span className="text-text-tertiary" style={{ fontSize: 12 }}>Helpful?</span>
                {['up', 'down'].map(dir => (
                  <button
                    key={dir}
                    onClick={() => setThumbState(dir as 'up' | 'down')}
                    className="p-1.5 rounded-lg transition-colors cursor-pointer"
                    style={{
                      background: thumbState === dir ? (dir === 'up' ? '#E8F7F1' : '#FBECEC') : '#F7F7F9',
                      border: 'none',
                    }}
                  >
                    <Icon name="thumbsUp" size={14} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AskPage;
