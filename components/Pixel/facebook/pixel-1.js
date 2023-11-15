import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default () => (
  <React.Fragment>
    <script
      dangerouslySetInnerHTML={{
        __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '359252785196040');
fbq('track', 'PageView');
fbq('track', 'ViewContent');
fbq('track', 'Search');
fbq('track', 'AddToCart');
fbq('track', 'InitiateCheckout');
fbq('track', 'AddPaymentInfo');
fbq('track', 'Purchase', { value: '0.00', currency: 'USD' });
fbq('track', 'Lead');
fbq('track', 'CompleteRegistration');
`,
      }}
    />
    <noscript
      dangerouslySetInnerHTML={{
        __html: `<img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=359252785196040&ev=PageView&noscript=1"
        />`,
      }}
    />
  </React.Fragment>
);
