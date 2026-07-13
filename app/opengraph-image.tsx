import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 96,
          background: '#0a0f1a',
          backgroundImage:
            'radial-gradient(circle at 15% 20%, rgba(94,234,212,0.12), transparent 55%), radial-gradient(circle at 85% 70%, rgba(96,165,250,0.08), transparent 55%)',
          color: '#e6ecf3',
          fontFamily: 'monospace'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#5eead4', fontSize: 22 }}>
          <div
            style={{
              display: 'flex',
              width: 14,
              height: 14,
              borderRadius: 999,
              background: '#5eead4',
              boxShadow: '0 0 14px #5eead4'
            }}
          />
          system online
        </div>
        <div style={{ display: 'flex', marginTop: 28, fontSize: 76, fontWeight: 700, letterSpacing: -2 }}>
          Arpit <span style={{ color: '#5eead4', marginLeft: 20 }}>Pandey</span>
        </div>
        <div style={{ display: 'flex', marginTop: 20, fontSize: 30, color: '#9aa5b1' }}>
          Backend Engineer · API Design · System Architecture
        </div>
        <div style={{ display: 'flex', marginTop: 48, fontSize: 22, color: '#5a6472' }}>{SITE.url}</div>
      </div>
    ),
    { ...size }
  );
}
