# Zoho Deluge signed-callback template

Status: reviewed template for a Zoho sandbox/controlled workflow only. Do not paste a production endpoint or secret, enable the function, or invoke a live Lead without approval.

The callback route signs the exact string:

```text
<unix-seconds>.<nonce>.<exact-JSON-body>
```

The body contains no email, phone, message, click ID, value, or Google action ID. The server refetches the CRM record and uses allowlisted configuration.

```deluge
// Function arguments:
// record_id, module_name, event_key, occurred_at, endpoint_url, webhook_secret
// occurred_at must be the immutable first milestone time, for example
// 2026-08-04T14:30:00+04:00 (Asia/Dubai).

if(record_id == null || !record_id.toString().matches("[0-9]{6,30}"))
{
    return {"ok":false,"error":"invalid_record_id"};
}
if(module_name != "Leads" && module_name != "Deals")
{
    return {"ok":false,"error":"invalid_module"};
}
if(event_key != "qualified_lead" && event_key != "meeting_booked" && event_key != "quotation_submitted" && event_key != "deal_won")
{
    return {"ok":false,"error":"invalid_event"};
}
if(!occurred_at.matches("[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(\\.[0-9]{1,9})?\\+04:00"))
{
    return {"ok":false,"error":"invalid_occurred_at"};
}

payload = Map();
payload.put("module",module_name);
payload.put("recordId",record_id.toString());
payload.put("eventKey",event_key);
payload.put("occurredAt",occurred_at);
body_text = payload.toString();

unix_seconds = (zoho.currenttime.toLong() / 1000).floor().toLong().toString();
nonce_seed = record_id.toString() + ":" + event_key + ":" + unix_seconds + ":" + randomNumber(100000000,999999999).toString();
nonce = zoho.encryption.hmacsha256(webhook_secret,nonce_seed,"hex").subString(0,32);
signature_input = unix_seconds + "." + nonce + "." + body_text;
signature = zoho.encryption.hmacsha256(webhook_secret,signature_input,"hex");

headers = Map();
headers.put("Content-Type","application/json");
headers.put("x-emitronix-timestamp",unix_seconds);
headers.put("x-emitronix-nonce",nonce);
headers.put("x-emitronix-signature","sha256=" + signature);

callback_response = invokeurl
[
    url: endpoint_url
    type: POST
    headers: headers
    body: body_text
    detailed: true
];
return callback_response;
```

Use a protected/approved Zoho secret mechanism available in the organisation; do not hard-code `webhook_secret`, put it in a URL, log it, or expose it to ordinary CRM users. Restrict `endpoint_url` to `https://emitronix.ae/api/integrations/zoho/google-ads` in the reviewed production function.

Zoho documents the HMAC task as `zoho.encryption.hmacsha256(key, data, "hex")` and supports request headers/body in `invokeUrl`: [HMAC-SHA256](https://www.zoho.com/deluge/help/encryption/hmac-sha256.html), [invokeUrl](https://www.zoho.com/deluge/help/webhook/invokeurl-api-task.html), [date/time toLong](https://www.zoho.com/deluge/help/functions/common/tolong.html).

## Workflow mapping

Create one disabled workflow/function binding per approved first transition:

- `qualified_lead`: `Leads`, first Qualification Date field.
- `meeting_booked`: `Leads`, first confirmed Meeting/Site Visit field.
- `quotation_submitted`: `Leads`, first issued-quotation field.
- `deal_won`: `Deals`, first Closed Won field and only after related attribution/consent mapping is designed and verified.

Use the same nonce and exact body only for an HTTP transport retry. A new event/delivery creates a new nonce. Treat HTTP `202` as queued/idempotently accepted, `409` as a data conflict requiring review, `422` as ineligible/held, and `5xx` as retryable with exponential backoff.
