import { Icon } from '@/components/basics/Icon';
import type { IconName } from '@/types';
import { projects } from '@/data/projects';
import { useOpenProposalCount } from '@/data/proposals';
import { useState } from 'react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'tasks', label: 'Tasks', icon: 'tasks' },
  { id: 'forecast', label: 'Forecast', icon: 'forecast' },
  { id: 'inbox', label: 'Inbox', icon: 'inbox', badge: true },
  { id: 'calendar', label: 'Calendar', icon: 'calendar' },
  { id: 'team', label: 'Team', icon: 'team' },
  { id: 'docs', label: 'Docs', icon: 'documents' },
  { id: 'automations', label: 'Automations', icon: 'automations' },
  { id: 'reporting', label: 'Reporting', icon: 'reporting' },
];

interface SidebarProps {
  active: string;
  onNavigate: (id: string) => void;
}

export function Sidebar({ active, onNavigate }: SidebarProps) {
  const [projectsOpen, setProjectsOpen] = useState(true);
  const inboxCount = useOpenProposalCount();

  return (
    <div
      className="flex flex-col h-full flex-shrink-0"
      style={{
        width: 264,
        background: '#F7F7F9',
        borderRight: '1px solid #EAEAEF',
      }}
    >
      {/* Workspace switcher */}
      <div className="p-3">
        <div
          className="flex items-center gap-2.5 p-2.5 rounded-xl bg-surface cursor-pointer hover:bg-surface-hover transition-colors"
          style={{ border: '1px solid #EAEAEF', boxShadow: '0 1px 2px rgba(22,22,29,0.04)' }}
        >
          <div
            className="flex-shrink-0 flex items-center justify-center rounded-lg text-white text-xs font-bold"
            style={{ width: 32, height: 32, background: '#5F63C9', fontFamily: 'var(--font-tight)', fontSize: 13 }}
          >
            T
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-text-primary font-semibold truncate" style={{ fontSize: 13, fontFamily: 'var(--font-tight)' }}>
              Meridian Ops
            </div>
            <div className="text-text-tertiary" style={{ fontSize: 11 }}>Team · 24 members</div>
          </div>
          <Icon name="chevronDown" size={14} className="text-text-tertiary" />
        </div>
      </div>

      {/* Search */}
      <div className="px-3 pb-2">
        <div
          className="flex items-center gap-2 px-3 rounded-lg bg-surface cursor-text"
          style={{ height: 36, border: '1px solid #EAEAEF', fontSize: 13 }}
        >
          <Icon name="search" size={15} className="text-text-tertiary" />
          <span className="text-text-tertiary flex-1">Search</span>
          <span
            className="text-text-tertiary rounded px-1.5 py-0.5 bg-surface-sunk"
            style={{ fontSize: 10, fontFamily: 'var(--font-mono)' }}
          >
            ⌘F
          </span>
        </div>
      </div>

      {/* Essentials */}
      <div className="px-3 pb-1">
        <div
          className="text-text-tertiary mb-1 mt-1"
          style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}
        >
          Essentials
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="w-full flex items-center gap-2.5 px-2.5 rounded-lg transition-all mb-0.5 cursor-pointer press hover:bg-surface-hover"
              style={{
                height: 36,
                background: isActive ? '#FFFFFF' : 'transparent',
                boxShadow: isActive ? '0 1px 2px rgba(22,22,29,0.04)' : 'none',
                border: isActive ? '1px solid #EAEAEF' : '1px solid transparent',
              }}
            >
              <Icon
                name={item.icon as IconName}
                size={17}
                weight={isActive ? "fill" : "regular"}
                className={isActive ? "text-text-primary" : "text-text-secondary"}
              />
              <span
                className={isActive ? 'text-text-primary font-medium' : 'text-text-secondary'}
                style={{ fontSize: 13, fontFamily: 'var(--font-sans)' }}
              >
                {item.label}
              </span>
              {item.badge && inboxCount > 0 && (
                <span
                  className="ml-auto rounded-full text-white flex items-center justify-center"
                  style={{
                    background: '#8B8FE8',
                    fontSize: 10,
                    fontWeight: 600,
                    minWidth: 18,
                    height: 18,
                    padding: '0 5px',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {inboxCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Projects */}
      <div className="px-3 mt-2">
        <div className="flex items-center justify-between mb-1">
          <span
            className="text-text-tertiary"
            style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}
          >
            Projects
          </span>
          <div className="flex items-center gap-1">
            <button className="text-text-tertiary hover:text-text-secondary p-0.5 rounded transition-colors cursor-pointer">
              <Icon name="plus" size={14} />
            </button>
            <button
              onClick={() => setProjectsOpen(!projectsOpen)}
              className="text-text-tertiary hover:text-text-secondary p-0.5 rounded transition-colors cursor-pointer"
            >
              <span
                className="flex"
                style={{
                  transform: projectsOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
                  transition: 'transform 0.18s var(--ease-out)',
                }}
              >
                <Icon name="chevronDown" size={14} />
              </span>
            </button>
          </div>
        </div>
        {projectsOpen && projects.map((p) => (
          <button
            key={p.id}
            onClick={() => onNavigate(`project:${p.id}`)}
            className="w-full flex items-center gap-2 px-2 rounded-lg hover:bg-surface-hover transition-all mb-0.5 cursor-pointer press"
            style={{ height: 32, background: active === `project:${p.id}` ? "#F3F3F6" : "transparent" }}
          >
            <div
              className="flex-shrink-0 rounded"
              style={{ width: 10, height: 10, background: p.color, borderRadius: 3 }}
            />
            <span className="text-text-secondary truncate" style={{ fontSize: 13 }}>{p.name}</span>
          </button>
        ))}
      </div>

      {/* Support */}
      <div className="px-3 mt-2">
        <div
          className="text-text-tertiary mb-1"
          style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}
        >
          Support
        </div>
        {['Settings', 'Releases'].map((item) => (
          <button
            key={item}
            onClick={() => item === 'Settings' && onNavigate('settings')}
            className="w-full flex items-center gap-2.5 px-2.5 rounded-lg hover:bg-surface-hover transition-colors mb-0.5 cursor-pointer"
            style={{ height: 36 }}
          >
            <span className="text-text-secondary" style={{ fontSize: 13 }}>{item}</span>
          </button>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* User card */}
      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-surface-hover transition-colors cursor-pointer">
          <div
            className="flex-shrink-0 flex items-center justify-center rounded-full text-white font-semibold text-xs"
            style={{ width: 32, height: 32, background: '#16161D' }}
          >
            CW
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-text-primary font-medium truncate" style={{ fontSize: 13 }}>Courtney Webb</div>
            <div className="text-text-tertiary truncate" style={{ fontSize: 11 }}>Operations Lead</div>
          </div>
          <Icon name="more" size={16} className="text-text-tertiary" />
        </div>
      </div>
    </div>
  );
}

