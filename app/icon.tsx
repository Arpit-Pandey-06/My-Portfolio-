import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0f1a',
          borderRadius: 7,
          color: '#5eead4',
          fontSize: 16,
          fontWeight: 700,
          fontFamily: 'monospace'
        }}
      >
        AP
      </div>
    ),
    { ...size }
  );
}
