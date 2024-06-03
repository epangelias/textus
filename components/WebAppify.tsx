export function WebAppify() {
  return (
    <>
      {/* <meta name='theme-color' content='#FFFFFF' /> */}
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="translucent"
      />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta
        content="minimum-scale=1.0, width=device-width, maximum-scale=1, user-scalable=no"
        name="viewport"
      />
    </>
  );
}
