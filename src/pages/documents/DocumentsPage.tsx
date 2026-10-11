import { useNavigate } from "react-router-dom";
import { Avatar } from "@/components/basics/Avatar";
import { Button } from "@/components/basics/Button";
import { Icon, SparkleIcon } from "@/components/basics/Icon";
import { documents } from "@/data/documents";

export function DocumentsPage() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="text-text-tertiary mb-1" style={{ fontSize: 12 }}>Workspace</div>
          <h1 style={{ fontSize: 34, fontWeight: 600, fontFamily: 'var(--font-tight)', letterSpacing: '-0.005em', margin: 0, color: '#16161D' }}>Docs</h1>
        
          <p className="text-text-secondary" style={{ fontSize: 14.5, margin: "6px 0 0", maxWidth: 560 }}>
            Plans, specs and decisions — flagged when they stop matching the work.
          </p>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 flex">
              <Icon name="search" size={14} color="#9494A3" />
            </span>
            <input className="rounded-lg pl-9 pr-3" style={{ width: 220, height: 36, border: '1px solid #D5D5DE', background: '#FFFFFF', fontSize: 13, outline: 'none' }} placeholder="Search docs..." />
          </div>
          <Button variant="primary" size="sm">New doc</Button>
        </div>
      </div>

      <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {documents.map((doc, index) => (
          <button
            key={doc.id}
            onClick={() => navigate(`/app/documents/${doc.id}`)}
            className="rounded-xl p-5 cursor-pointer text-left lift press rise"
            style={{
              background: '#FFFFFF',
              border: '1px solid #EAEAEF',
              boxShadow: '0 1px 2px rgba(22,22,29,0.05)',
              ["--i" as string]: index,
            }}
          >
            <div className="flex items-start gap-3 mb-3">
              <Icon name="documents" size={24} color="#9494A3" />
              <div className="flex-1 min-w-0">
                <h3 className="text-text-primary font-semibold truncate" style={{ fontSize: 14, fontFamily: 'var(--font-tight)' }}>{doc.title}</h3>
              </div>
              {doc.auto && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: '#EEEFFC', fontSize: 10, color: '#5F63C9', fontWeight: 500 }}>
                  <SparkleIcon size={10} />
                  Auto-synced
                </span>
              )}
            </div>
            <p className="text-text-secondary mb-4" style={{ fontSize: 12, lineHeight: '18px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {doc.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-1.5">
                {doc.authors.map((author) => (
                  <Avatar key={author.initials} initials={author.initials} color={author.color} size={20} />
                ))}
              </div>
              <span className="text-text-tertiary" style={{ fontSize: 11 }}>Edited {doc.edited}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default DocumentsPage;
