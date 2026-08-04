# Proposed tracking architecture

```mermaid
flowchart LR
  A[Google Ads click] --> B[emitronix.ae]
  B --> C[Consent defaults and stored choice]
  C --> D[Attribution capture]
  C --> E[GTM-MSM8MPD6]
  B --> F[Contact or blog enquiry]
  F --> G[/api/contact validation and idempotency]
  G --> H[Zoho CRM Lead create or update]
  H -->|stores canonical lead_id; success only| I[Server lead ID response]
  I --> J[dataLayer generate_lead with lead_id]
  J -->|transaction ID = lead_id| K[Direct Google Ads website conversion]
  J --> L[GA4 lead event]
  B --> M[Approved phone / WhatsApp / email clicks]
  M --> E
  B --> N[SalesIQ widget]
  N --> E
  H --> O[Zoho lifecycle status]
  O --> P[Signed webhook and conversion ledger]
  P -->|transactionId = same lead_id| Q[Google Data Manager API]
  Q --> R[Qualified / quote / won conversions]

  classDef browser fill:#eaf2ff,stroke:#1d4ed8,color:#0f172a;
  classDef server fill:#ecfdf5,stroke:#047857,color:#0f172a;
  classDef external fill:#fff7ed,stroke:#c2410c,color:#0f172a;
  class B,C,D,E,F,J,M,N browser;
  class G,I,P server;
  class A,H,K,L,O,Q,R external;
```

## Ownership boundaries

- Browser data layer: non-PII event state and opaque IDs only.
- GTM: Google tag, GA4, direct website conversion and secondary engagement events.
- Website backend: validation, server lead ID, idempotency and Zoho synchronization.
- Zoho/Data Manager worker: authoritative CRM milestones, consented hashing, retries and persistent conversion deduplication.
- GTM must not reproduce backend qualified, quotation or won conversions.
- The canonical server `lead_id` is the reconciliation bridge across GTM, Zoho and each separate Google Ads conversion action; the browser transport `submission_id` is not.
