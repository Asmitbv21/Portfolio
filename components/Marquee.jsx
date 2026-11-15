import { Fragment } from 'react';
import { marqueeItems } from '@/lib/data';

function MarqueeGroup() {
  return (
    <div className="marquee-group">
      {marqueeItems.map((item) => (
        <Fragment key={item}>
          <span>{item}</span>
          <i className="fas fa-asterisk" aria-hidden="true" />
        </Fragment>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <MarqueeGroup />
        <MarqueeGroup />
      </div>
    </div>
  );
}
