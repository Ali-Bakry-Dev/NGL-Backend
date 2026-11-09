---
title: Default module
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.30"

---

# Default module

Base URLs:

# Authentication

# Auth

## POST Register

POST /api/auth/register

> Body Parameters

```json
{
    "name": "Ali Bakry",
    "email": "kurapika2464@gmail.com",
    "password": "A123456"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| yes |none|

> Response Examples

> 200 Response

```json
{"success":false,"message":"Email already exists"}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST Send OTP

POST /api/auth/send-otp

> Body Parameters

```json
{
  "email": "kurapika2464@gmail.com",
  
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| yes |none|

> Response Examples

> 200 Response

```json
{"success":true,"message":"Verification code sent successfully"}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST verify-account

POST /api/auth/verify-account

> Body Parameters

```json
{
  "email": "kurapika2464@gmail.com",
  "code": "904581"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| yes |none|

> Response Examples

> 200 Response

```json
{"success":true,"message":"Account verified successfully","data":{"_id":"6ae924de6572f183197ce893","name":"Ali Bakry","email":"kurapika2464@gmail.com","password":"$2b$10$hju2SsIXmI1nMBWYLXuSUuitJ6dQ0AkYnz/GYbwy/gjpyEUBf.ctS","provider":"local","isVerified":true,"isDeleted":false,"twoStepVerification":false,"createdAt":"2026-11-03T00:03:42.241Z","updatedAt":"2026-11-03T00:24:52.652Z","__v":0}}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST Login

POST /api/auth/login

> Body Parameters

```json
{
    
    "email": "kurapika2464@gmail.com",
    "password": "A123456"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| yes |none|

> Response Examples

> 200 Response

```json
{"success":true,"message":"Login successful"}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST refresh-token

POST /api/auth/refresh-token

> Body Parameters

```json
{}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| yes |none|

> Response Examples

> 200 Response

```json
{"success":true,"message":"Tokens refreshed successfully"}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST reset-password

POST /api/auth/reset-password

> Body Parameters

```json
{
    "email": "kurapika2464@gmail.com",
    "code": "640097",
    "newPassword": "A12345"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| yes |none|

> Response Examples

> 200 Response

```json
{"success":true,"message":"Password reset successfully"}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST login with google

POST /api/auth/google

> Body Parameters

```json
{
    "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk0M2EzYTVkN2Q5MTk2MjVhNDU0ZTQ4OWI3NWMyOWFkYWI1N2FjYmEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzNjc2NDcwNTY4MzMtbW8za3UxbW00MGgydjllcXZuNDBhZDhqYWYyYm9haTAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIzNjc2NDcwNTY4MzMtbW8za3UxbW00MGgydjllcXZuNDBhZDhqYWYyYm9haTAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTE4MDE3NTM1NTk1MDcxNTkyNjciLCJlbWFpbCI6IjNlbHdhMjQ2NEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibm9uY2UiOiJub3RfcHJvdmlkZWQiLCJuYmYiOjE3OTM2NzA3MzgsIm5hbWUiOiJBbGkgQmFrcnkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jS3RzeURCYTVJOWhab09ySXlFd3BTd19hVXRFaW5QQ0drMDcxRWI2dXdsRzRaSTN3PXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkFsaSIsImZhbWlseV9uYW1lIjoiQmFrcnkiLCJpYXQiOjE3OTM2NzEwMzgsImV4cCI6MTc5MzY3NDYzOCwianRpIjoiZGI5ODcwNzY0YzExZTdlOTE2MjRiZjYwYmYwY2QzMTg3OWQ1NTMxOCJ9.Bf6wb8g9HZ1iN160g-A_IZIkGQtJ9aQqWWRuaegaTlq1CZWwY2pIgz9sUjr9_Z5m9sgaDeOA4bC2k8z3_OO9APN7rXUe9Fz7Yz_B9sn0WTc8wFB9gHKeSfuGGZhAFwI7Ar6wzN2lq5UBssvT9fqkg4myccsSXAvftJT24XJpwHkRjwiHv_4L0OcvwgamGjxRhpAXJHJ9GxPr03Byf9_NQrDGPEgbKKJnN8ScvR_JNDXAQfQCG-ZhnyO8eMUCfbB4tCjGlPEUzT9vij3rM1DQ0VvH61hDR6tpLAnl8VCBAgFEA_JVlRzfx51U4U9R0wx7g1rrdOOWanGJjaY7Rs7qXw"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| yes |none|

> Response Examples

> 200 Response

```json
{"success":true,"message":"Google login successful"}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST request-enable-two-step

POST /api/auth/request-enable-two-step

> Body Parameters

```json
{
  "email": "kurapika2464@gmail.com",
  
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| yes |none|

> Response Examples

> 200 Response

```json
{"success":true,"message":"Two-step verification code sent successfully"}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST enable-two-step

POST /api/auth/enable-two-step

> Body Parameters

```json
{
  "email": "kurapika2464@gmail.com",
  "code":"797355" 
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| yes |none|

> Response Examples

> 200 Response

```json
{"success":true,"message":"Two-step verification enabled successfully"}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST verify-login

POST /api/auth/verify-login

> Body Parameters

```json
{
  "email": "kurapika2464@gmail.com",
  "code":"164964" 
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| yes |none|

> Response Examples

> 200 Response

```json
{"success":true,"message":"Login successful"}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

# User

## GET GET User Profile

GET /api/user/profile/6ae936af0cd90bafd2b67d01

> Response Examples

> 200 Response

```json
{"message":"User profile retrieved successfully","success":true,"data":{"_id":"6ae936af0cd90bafd2b67d01","name":"Ali Bakry","email":"kurapika2464@gmail.com","provider":"local","isVerified":true,"isDeleted":false,"twoStepVerification":true,"createdAt":"2026-11-03T01:19:43.144Z","updatedAt":"2026-11-03T02:53:51.517Z","__v":0}}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## GET GET All Users

GET /api/user/users

> Response Examples

> 200 Response

```json
{"message":"Users retrieved successfully","success":true,"data":[{"_id":"6ae936af0cd90bafd2b67d01","name":"Ali Bakry","email":"kurapika2464@gmail.com","provider":"local","isVerified":true,"isDeleted":false,"twoStepVerification":true,"createdAt":"2026-11-03T01:19:43.144Z","updatedAt":"2026-11-03T02:53:51.517Z","__v":0},{"_id":"6ae93fce0cd90bafd2b67d04","name":"Ali Bakry","email":"3elwa2464@gmail.com","provider":"google","profilePic":"https://lh3.googleusercontent.com/a/ACg8ocKtsyDBa5I9hZoOrIyEwpSw_aUtEinPCGk071Eb6uwlG4ZI3w=s96-c","isVerified":true,"isDeleted":false,"twoStepVerification":false,"createdAt":"2026-11-03T01:58:38.908Z","updatedAt":"2026-11-03T01:58:38.908Z","__v":0}]}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## PATCH Update User Profile

PATCH /api/user/profile

> Body Parameters

```json
{
    
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| yes |none|

> Response Examples

> 200 Response

```json
{"success":false,"message":"Validation failed","details":[{"field":"","message":"At least one field is required"}]}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## PATCH Profile Pic

PATCH /api/user/profile/picture

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

# Message

## POST Send Message

POST /api/message

> Body Parameters

```json
{
    "receiver": "6ae93fce0cd90bafd2b67d04",
    "content": "Hello! This is my first message.",
    "isAnonymous": true,
    "isPublic": false
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| yes |none|

> Response Examples

> 200 Response

```json
{"message":"Message sent successfully","success":true,"data":{"sender":"6ae936af0cd90bafd2b67d01","receiver":"6ae93fce0cd90bafd2b67d04","content":"Hello! This is my first message.","isAnonymous":true,"isPublic":false,"isDeleted":false,"_id":"6ae97c28641d67ea18c48434","createdAt":"2026-11-03T06:16:08.782Z","updatedAt":"2026-11-03T06:16:08.782Z","__v":0}}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## GET Pagination

GET /api/message/my-messages

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|page|query|string| no |none|
|limit|query|string| no |none|

> Response Examples

> 200 Response

```json
{"message":"Messages retrieved successfully","success":true,"data":[{"_id":"6ae97edd641d67ea18c48437","sender":"6ae936af0cd90bafd2b67d01","receiver":"6ae93fce0cd90bafd2b67d04","content":"Hello! This is a puplic message.","isAnonymous":false,"isPublic":true,"isDeleted":false,"createdAt":"2026-11-03T06:27:41.208Z","updatedAt":"2026-11-03T06:27:41.208Z","__v":0},{"_id":"6ae97c28641d67ea18c48434","receiver":"6ae93fce0cd90bafd2b67d04","content":"Hello! This is my first message.","isAnonymous":true,"isPublic":false,"isDeleted":false,"createdAt":"2026-11-03T06:16:08.782Z","updatedAt":"2026-11-03T06:16:08.782Z","__v":0}],"pagination":{"currentPage":1,"limit":5,"totalMessages":2,"totalPages":1}}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## GET  Puplic Pagination

GET /api/message/public

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|page|query|string| no |none|
|limit|query|string| no |none|

> Response Examples

> 200 Response

```json
{"message":"Public messages retrieved successfully","success":true,"data":[{"_id":"6ae97edd641d67ea18c48437","sender":"6ae936af0cd90bafd2b67d01","content":"Hello! This is a puplic message.","isAnonymous":false,"isPublic":true,"isDeleted":false,"createdAt":"2026-11-03T06:27:41.208Z","updatedAt":"2026-11-03T06:27:41.208Z","__v":0}],"pagination":{"currentPage":1,"limit":5,"totalMessages":1,"totalPages":1}}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## DELETE Delete Message

DELETE /api/message/6ae97c51641d67ea18c48435

> Response Examples

> 200 Response

```json
{"message":"Message deleted successfully","success":true}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

# Req

## POST request

POST /api/request

> Body Parameters

```json
{
  "message": "6af1e7e26aace718e7baebf6"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| yes |none|

> Response Examples

> 200 Response

```json
{"success":false,"message":"You are not authorized to request this message"}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## GET GET Req

GET /api/request

> Response Examples

> 200 Response

```json
{"success":true,"data":[{"_id":"6af1eae38ea458dc99153939","message":{"_id":"6af1e7e26aace718e7baebf6","receiver":"6ae936af0cd90bafd2b67d01","content":"Hello Bakry","isAnonymous":true,"isPublic":false,"isDeleted":false},"requester":{"_id":"6ae936af0cd90bafd2b67d01","name":"Ali Hashim","profilePic":"/uploads/cd566296-2a2d-4c1d-8918-85eefbf75cb1.jpeg"},"targetUser":"6ae93fce0cd90bafd2b67d04","status":"pending","respondedAt":null,"createdAt":"2026-11-09T15:46:43.110Z","updatedAt":"2026-11-09T15:46:43.110Z","__v":0}]}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## PATCH Accept req

PATCH /api/request/6af1eae38ea458dc99153939/respond

> Body Parameters

```json
{
  "status": "accepted"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| yes |none|

> Response Examples

> 200 Response

```json
{"success":true,"message":"Request accepted successfully","data":{"_id":"6af1eae38ea458dc99153939","message":{"_id":"6af1e7e26aace718e7baebf6","receiver":"6ae936af0cd90bafd2b67d01","content":"Hello Bakry","isAnonymous":true,"isPublic":false,"isDeleted":false},"requester":{"_id":"6ae936af0cd90bafd2b67d01","name":"Ali Hashim","profilePic":"/uploads/cd566296-2a2d-4c1d-8918-85eefbf75cb1.jpeg"},"targetUser":"6ae93fce0cd90bafd2b67d04","status":"accepted","respondedAt":"2026-11-09T15:50:41.520Z","createdAt":"2026-11-09T15:46:43.110Z","updatedAt":"2026-11-09T15:50:41.520Z","__v":0}}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## GET GET Req After Accept

GET /api/request/6af1eae38ea458dc99153939

> Response Examples

> 200 Response

```json
{"success":true,"data":{"_id":"6af1eae38ea458dc99153939","message":{"_id":"6af1e7e26aace718e7baebf6","receiver":"6ae936af0cd90bafd2b67d01","content":"Hello Bakry","isAnonymous":true,"isPublic":false,"isDeleted":false},"requester":{"_id":"6ae936af0cd90bafd2b67d01","name":"Ali Hashim","profilePic":"/uploads/cd566296-2a2d-4c1d-8918-85eefbf75cb1.jpeg"},"targetUser":"6ae93fce0cd90bafd2b67d04","status":"accepted","respondedAt":"2026-11-09T15:50:41.520Z","createdAt":"2026-11-09T15:46:43.110Z","updatedAt":"2026-11-09T15:50:41.520Z","__v":0,"revealedSender":"6ae93fce0cd90bafd2b67d04"}}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

# Data Schema

