# Omniplex - AI Chat Assistant

A sophisticated AI chat assistant platform with support for plugins, history management, and premium subscription features.

## Table of Contents

- Fixed Bugs & Configuration Issues
- Feature Implementations
- Project Structure
- Deployment

## Fixed Bugs & Configuration Issues

### Redux & Data Management

- **Timestamp Handling Error**: Fixed issue in History component where the application expected Firebase Timestamp objects but received JavaScript Date objects.
  ```typescript
  // Modified formatTimestamp to handle multiple timestamp formats
  export const formatTimestamp = (timestamp: any): string => {
    let date;
    if (timestamp instanceof Date) {
      date = timestamp;
    } else if (typeof timestamp === 'string') {
      date = new Date(timestamp);
    } else if (timestamp && typeof timestamp.toDate === 'function') {
      date = timestamp.toDate();
    } else {
      date = new Date();
    }
    // Format date...
  }
  ```

- **Missing Chat Thread Properties**: Added required `createdAt` field to chat thread objects in Redux store.
  ```typescript
  // Updated addChatThread reducer to include createdAt
  addChatThread: (state, action) => {
    const { id, chats, messages, shared = false } = action.payload;
    state.threads[id] = { 
      id, chats, messages, shared,
      createdAt: new Date() 
    };
  }
  ```

### Next.js & React Issues

- **Client/Server Component Conflicts**: Fixed issues with components that use client-side hooks being rendered on the server.
  - Added `"use client"` directive to components using React hooks
  - Implemented dynamic imports with `ssr: false` for browser-dependent components

- **Chunk Loading Timeout Error**: Addressed the "Loading chunk app/layout failed" error during initial page load.
  ```javascript
  // Enhanced Next.js config with optimized chunk loading
  config.output.chunkLoadTimeout = 60000;
  ```

- **Initial Page Black Screen**: Fixed issue where the application would show a blank black screen on first load before working on refresh.
  - Implemented proper loading states
  - Improved client-side hydration process

- **Document Reference Error**: Fixed "document is not defined" errors during build by properly handling browser-only code.
  ```typescript
  // Used dynamic imports for components with browser APIs
  const Dictionary = dynamic(() => import('@/components/Dictionary/Dictionary'), {
    ssr: false
  });
  ```

### Plugin Systems

- **Plugin Routes 404 Errors**: Created proper route handlers for all plugin pages (Stocks, Weather, Dictionary).

- **Function Serialization Error**: Fixed issue with passing functions to client components in the Stocks plugin.
  ```typescript
  // Added "use client" directive and proper function handling
  "use client";
  const dataFormatter = (number: number) => {
    return `${Intl.NumberFormat("us").format(number).toString()}`;
  };
  ```

## Feature Implementations

### Stripe Integration

- Implemented Stripe checkout for Pro plan subscription
- Added secure API route for creating checkout sessions
- Created success and cancel pages for payment flow
- Added Pro plan button in the application interface

```typescript
// Stripe checkout session creation
export async function POST(req: NextRequest) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: 'price_1HKiSf2eZvKYlo2CxjF9qwbr',
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: error.message || "Error creating checkout session" },
      { status: 500 }
    );
  }
}
```